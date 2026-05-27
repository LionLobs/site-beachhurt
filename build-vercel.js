import { execSync } from 'child_process';
import { cpSync, rmSync, existsSync, mkdirSync, writeFileSync } from 'fs';

// Clean and build
if (existsSync('dist')) rmSync('dist', { recursive: true });
if (existsSync('api')) rmSync('api', { recursive: true });
if (existsSync('.vercel/output')) rmSync('.vercel/output', { recursive: true });

execSync('./node_modules/.bin/vite build', { 
  stdio: 'inherit',
  env: { ...process.env, NITRO_PRESET: 'vercel-edge' }
});

// Create Edge Function entry point for Vercel Build Output API.
const edgeEntry = `// Vercel Edge Function entry point
import server from './server/server.js';

export const config = {
  runtime: 'edge',
};

export default function handler(request) {
  return server.fetch(request, {}, {});
}
`;

// Emit Vercel Build Output API files so root and deep links never 404.
mkdirSync('.vercel/output/static', { recursive: true });
mkdirSync('.vercel/output/functions/render.func/server', { recursive: true });
cpSync('dist/client', '.vercel/output/static', { recursive: true });
cpSync('dist/server', '.vercel/output/functions/render.func/server', { recursive: true });
writeFileSync('.vercel/output/functions/render.func/index.js', edgeEntry);
writeFileSync(
  '.vercel/output/functions/render.func/.vc-config.json',
  JSON.stringify({ runtime: 'edge', entrypoint: 'index.js' }, null, 2),
);
writeFileSync(
  '.vercel/output/config.json',
  JSON.stringify(
    {
      version: 3,
      routes: [{ handle: 'filesystem' }, { src: '/(.*)', dest: '/render' }],
    },
    null,
    2,
  ),
);

console.log('Vercel build complete!');
