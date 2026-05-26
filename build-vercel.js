import { execSync } from 'child_process';
import { cpSync, rmSync, existsSync, mkdirSync, writeFileSync } from 'fs';

// Clean and build
if (existsSync('dist')) rmSync('dist', { recursive: true });
if (existsSync('api/server')) rmSync('api/server', { recursive: true });

execSync('./node_modules/.bin/vite build', { 
  stdio: 'inherit',
  env: { ...process.env, NITRO_PRESET: 'vercel-edge' }
});

// Copy server output to api/server for Vercel Edge Function
mkdirSync('api/server', { recursive: true });
cpSync('dist/server', 'api/server', { recursive: true });

// Create Edge Function entry point
writeFileSync('api/index.js', `// Vercel Edge Function entry point
import server from './server/server.js';

export const config = {
  runtime: 'edge',
};

export default function handler(request) {
  return server.default.fetch(request, {}, {});
}
`);

console.log('Vercel build complete!');
