// Netlify Function that serves the whole Express API.
//
// Netlify bundles this TypeScript source directly (esbuild, via node_bundler in
// netlify.toml), resolving the @shared path alias from tsconfig.json. We do not
// pre-bundle: letting Netlify own the bundling avoids the ESM/CJS interop breakage
// that a double-bundle causes.
//
// serverless-http runs the full Express middleware chain (JSON, session, cookies,
// auth) correctly, which the previous hand-rolled router walk could not.

import serverless from "serverless-http";
import { createApp } from "../../server/app";

// Netlify invokes this at /.netlify/functions/api/<rest>; Express routes are
// mounted at /api/<rest>. Normalize the path so they match.
const FUNCTION_PREFIX = "/.netlify/functions/api";

let cached: ReturnType<typeof serverless> | undefined;

export const handler = async (event: any, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (!cached) {
    const app = await createApp();
    cached = serverless(app);
  }

  if (typeof event.path === "string" && event.path.startsWith(FUNCTION_PREFIX)) {
    event.path = "/api" + event.path.slice(FUNCTION_PREFIX.length);
  }

  return cached(event, context);
};
