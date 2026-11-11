import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const ssrDir = path.join(root, 'dist-ssr');
const slot = '<div id="root"></div>';

const { render, files } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

for (const file of files) {
  const target = path.join(root, 'dist', file);
  const html = fs.readFileSync(target, 'utf8');
  if (!html.includes(slot)) throw new Error(`prerender: ${slot} not found in dist/${file}`);
  fs.writeFileSync(target, html.replace(slot, `<div id="root">${render(file)}</div>`));
  console.log(`prerender: dist/${file}`);
}

fs.rmSync(ssrDir, { recursive: true, force: true });
