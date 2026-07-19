// Netlify Function that serves the whole Express API.
//
// Bundled by `npm run build:netlify` into netlify/functions/api.mjs, which
// Netlify deploys. The _redirects / netlify.toml rule sends /api/* here.
//
// Why serverless-http: it runs the full Express middleware chain (JSON parsing,
// session, cookies, auth) correctly. The previous hand-rolled router walk could
// not handle route params or sessions.

import serverless from "serverless-http";
import { createApp } from "../../server/app";

// Netlify invokes this function at /.netlify/functions/api/<rest>, but the
// Express routes are mounted at /api/<rest>. Normalize the path so they match.
const FUNCTION_PREFIX = "/.netlify/functions/api";

let cached: ReturnType<typeof serverless> | undefined;

export const handler = async (event: any, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (!cached) {
    const app = await createApp();
    cached = serverless(app);
  }

  if (typeof event.path === "string" && event.path.startsWith(FUNCTION_PREFIX)) {
    const rest = event.path.slice(FUNCTION_PREFIX.length);
    event.path = "/api" + rest;
  }

  return cached(event, context);
};
