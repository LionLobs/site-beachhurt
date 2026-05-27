import { execSync } from 'child_process';
import { cpSync, rmSync, existsSync, mkdirSync, writeFileSync } from 'fs';

// Clean
if (existsSync('dist')) rmSync('dist', { recursive: true });
if (existsSync('api')) rmSync('api', { recursive: true });
if (existsSync('.vercel/output')) rmSync('.vercel/output', { recursive: true });

// Build with Vite (TanStack Start)
execSync('./node_modules/.bin/vite build', {
  stdio: 'inherit',
  env: { ...process.env, NITRO_PRESET: 'vercel-edge' },
});

// Edge Function entry that re-exports the bundled SSR handler.
const edgeEntry = `import server from './server-bundle.js';

export const config = { runtime: 'edge' };

export default function handler(request) {
  return server.fetch(request, {}, {});
}
`;

// Bundle the SSR server into a single file so the Vercel Edge runtime
// does not try to resolve npm packages at runtime (it can't).
mkdirSync('.vercel/output/static', { recursive: true });
mkdirSync('.vercel/output/functions/render.func', { recursive: true });
cpSync('dist/client', '.vercel/output/static', { recursive: true });

execSync(
  [
    './node_modules/.bin/esbuild',
    'dist/server/server.js',
    '--bundle',
    '--format=esm',
    '--platform=browser',
    '--target=es2022',
    '--conditions=workerd,worker,browser',
    '--external:node:*',
    '--outfile=.vercel/output/functions/render.func/server-bundle.js',
  ].join(' '),
  { stdio: 'inherit' },
);

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
