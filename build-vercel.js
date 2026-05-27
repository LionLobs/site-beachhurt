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
const nodeEntry = `import server from './server-bundle.js';

export default async function handler(req, res) {
  const url = \`https://\${req.headers.host}\${req.url}\`;
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (Array.isArray(v)) v.forEach((x) => headers.append(k, x));
    else if (v != null) headers.set(k, String(v));
  }
  const method = req.method || 'GET';
  let body;
  if (method !== 'GET' && method !== 'HEAD') {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    if (chunks.length) body = Buffer.concat(chunks);
  }
  const request = new Request(url, { method, headers, body });
  const response = await server.fetch(request, {}, {});
  res.statusCode = response.status;
  response.headers.forEach((value, key) => res.setHeader(key, value));
  if (response.body) {
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  }
  res.end();
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
