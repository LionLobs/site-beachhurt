// Vercel Edge Function entry point
// Wraps the TanStack Start server for Vercel Edge Runtime

import server from '../dist/server/server.js';

export const config = {
  runtime: 'edge',
};

export default function handler(request) {
  // The server exports { default: { fetch } }
  // We need to call server.default.fetch
  return server.default.fetch(request, {}, {});
}
