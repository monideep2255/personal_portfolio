// Production configuration for deployment
export const productionConfig = {
  port: process.env.PORT || 5000,
  host: '0.0.0.0',
  nodeEnv: 'production',
  
  // Database configuration
  database: {
    url: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  },
  
  // Security settings
  session: {
    secret: process.env.SESSION_SECRET || 'your-production-secret-key',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },
  
  // Email configuration
  email: {
    service: 'SendGrid',
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY
    }
  }
};