// Vercel Edge Function entry point
import server from './server/server.js';

export const config = {
  runtime: 'edge',
};

export default function handler(request) {
  return server.fetch(request, {}, {});
}
