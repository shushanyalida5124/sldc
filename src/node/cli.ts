import cac from 'cac';
import transform from './transform';
import fastGlob from 'fast-glob';
import fse from 'fs-extra';
import { pathToFileURL } from 'url';
import { resolve } from 'path';

const cli = cac('sldc').version('0.0.1').help();

cli.command('[root]', 'sldc start').action(async (root: string) => {
  root = root ? resolve(root) : process.cwd();

  const files = fastGlob
    .sync(['*.js'], {
      cwd: root,
      absolute: true,
      ignore: ['**/node_modules/**', '**/build/**', 'config.ts']
    })
    .sort();
  files.forEach(async (file) => {
    const { default: config } = await import(
      pathToFileURL(file) as unknown as string
    );
    const sld = transform(config);
    fse.writeFile(file.replace(/\.js$/, '.sld'), sld);
  });
});

cli.parse();
