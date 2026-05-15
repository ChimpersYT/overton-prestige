/**
 * Minimal static file server for previewing the built site.
 * Serves dist/ on http://127.0.0.1:4321, falls back to dist/404.html for
 * missing paths so the custom 404 page actually gets used. Unlike
 * `python -m http.server`, this respects 404.html the way Cloudflare Pages,
 * Netlify and GitHub Pages do, so the preview matches production behaviour.
 *
 * Usage: node scripts/serve-preview.mjs
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, '..', 'dist');
const port = Number(process.env.PORT) || 4321;
const host = process.env.HOST || '127.0.0.1';

const mimes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const send = (res, filePath, status = 200) => {
  try {
    const body = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(status, {
      'Content-Type': mimes[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    res.end(body);
    return true;
  } catch {
    return false;
  }
};

const notFound = (res) => {
  if (!send(res, path.join(dist, '404.html'), 404)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
};

http
  .createServer((req, res) => {
    const pathname = decodeURIComponent((req.url || '/').split('?')[0]);
    let resolved = path.normalize(path.join(dist, pathname));
    if (!resolved.startsWith(dist)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      return;
    }

    let stat;
    try {
      stat = fs.statSync(resolved);
    } catch {
      // Try with .html extension (extensionless URLs)
      if (send(res, resolved + '.html')) return;
      notFound(res);
      return;
    }

    if (stat.isDirectory()) {
      // Try directory's index.html
      const idx = path.join(resolved, 'index.html');
      if (send(res, idx)) return;
      notFound(res);
      return;
    }

    if (send(res, resolved)) return;
    notFound(res);
  })
  .listen(port, host, () => {
    // eslint-disable-next-line no-console
    console.log(`Serving ${dist} at http://${host}:${port}/`);
  });
