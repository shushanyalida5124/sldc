import { createServer as createViteDevServer } from 'vite';
import { transformFiles, transformFile } from './transform';
export async function createDevServer(root = process.cwd()) {
  return createViteDevServer({
    root,
    plugins: [
      {
        name: 'hmr',
        config() {
          transformFiles(root);
        },
        async handleHotUpdate({ file }) {
          if (/\.[tj]s$/.test(file)) {
            transformFile(file);
          }
        }
      }
    ]
  });
}
