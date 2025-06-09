import express from 'express';
import { registerRoutes } from './routes.js';
import { configureAuth } from './auth.js';

const app = express();

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure authentication
configureAuth(app);

// Register routes
await registerRoutes(app);

export const handler = async (event, context) => {
  // Handle preflight CORS requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: ''
    };
  }

  // Create Express-compatible request object
  const req = {
    method: event.httpMethod,
    url: event.path.replace('/.netlify/functions/api', ''),
    headers: event.headers,
    body: event.body ? (event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body) : undefined,
    query: event.queryStringParameters || {},
    path: event.path.replace('/.netlify/functions/api', ''),
    originalUrl: event.path,
    ip: event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || '127.0.0.1'
  };

  // Parse JSON body if content-type is application/json
  if (req.headers['content-type'] === 'application/json' && req.body) {
    try {
      req.body = JSON.parse(req.body);
    } catch (e) {
      // Keep as string if parsing fails
    }
  }

  let response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Content-Type': 'application/json'
    },
    body: ''
  };

  // Mock Express response object
  const res = {
    status: (code) => {
      response.statusCode = code;
      return res;
    },
    json: (data) => {
      response.headers['Content-Type'] = 'application/json';
      response.body = JSON.stringify(data);
      return res;
    },
    send: (data) => {
      response.body = typeof data === 'string' ? data : JSON.stringify(data);
      return res;
    },
    setHeader: (name, value) => {
      response.headers[name] = value;
      return res;
    },
    header: (name, value) => {
      response.headers[name] = value;
      return res;
    },
    end: (data) => {
      if (data) response.body = data;
      return res;
    },
    redirect: (url) => {
      response.statusCode = 302;
      response.headers['Location'] = url;
      return res;
    }
  };

  try {
    // Find matching route in the Express app
    const router = app._router;
    let routeFound = false;

    if (router && router.stack) {
      for (const layer of router.stack) {
        if (layer.route) {
          const methods = Object.keys(layer.route.methods);
          const path = layer.route.path;
          
          if (methods.includes(req.method.toLowerCase()) && 
              (path === req.path || req.path.startsWith(path))) {
            routeFound = true;
            
            // Execute the route handler
            const handler = layer.route.stack[0].handle;
            await new Promise((resolve, reject) => {
              handler(req, res, (err) => {
                if (err) reject(err);
                else resolve();
              });
            });
            break;
          }
        }
      }
    }

    if (!routeFound) {
      response.statusCode = 404;
      response.body = JSON.stringify({ error: 'Not Found' });
    }

    return response;
  } catch (error) {
    console.error('Netlify function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message })
    };
  }
};