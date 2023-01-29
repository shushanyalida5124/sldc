import { createServer as createViteDevServer } from 'vite';
import { FILE_SUFFIX_REG } from './constants';
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
          if (FILE_SUFFIX_REG.test(file)) {
            transformFile(file);
          }
        }
      }
    ]
  });
}
