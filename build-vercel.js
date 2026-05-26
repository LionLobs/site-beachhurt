import { execSync } from 'child_process';
import { cpSync, rmSync, existsSync, mkdirSync, writeFileSync } from 'fs';

// Clean and build
if (existsSync('dist')) rmSync('dist', { recursive: true });
if (existsSync('api/server')) rmSync('api/server', { recursive: true });
if (existsSync('.vercel/output')) rmSync('.vercel/output', { recursive: true });

execSync('./node_modules/.bin/vite build', { 
  stdio: 'inherit',
  env: { ...process.env, NITRO_PRESET: 'vercel-edge' }
});

// Copy server output to api/server for Vercel Edge Function
mkdirSync('api/server', { recursive: true });
cpSync('dist/server', 'api/server', { recursive: true });

// Create Edge Function entry point
const edgeEntry = `// Vercel Edge Function entry point
import server from './server/server.js';

export const config = {
  runtime: 'edge',
};

export default function handler(request) {
  return server.fetch(request, {}, {});
}
`;

writeFileSync('api/index.js', edgeEntry);

// Also emit Vercel Build Output API files so root and deep links never 404.
mkdirSync('.vercel/output/static', { recursive: true });
mkdirSync('.vercel/output/functions/index.func/server', { recursive: true });
cpSync('dist/client', '.vercel/output/static', { recursive: true });
cpSync('dist/server', '.vercel/output/functions/index.func/server', { recursive: true });
writeFileSync('.vercel/output/functions/index.func/index.js', edgeEntry);
writeFileSync(
  '.vercel/output/functions/index.func/.vc-config.json',
  JSON.stringify({ runtime: 'edge', entrypoint: 'index.js' }, null, 2),
);
writeFileSync(
  '.vercel/output/config.json',
  JSON.stringify(
    {
      version: 3,
      routes: [{ handle: 'filesystem' }, { src: '/(.*)', dest: '/index' }],
    },
    null,
    2,
  ),
);

console.log('Vercel build complete!');
