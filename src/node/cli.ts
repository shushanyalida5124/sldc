import cac from 'cac';
import { transformFiles } from './transform';

import { resolve } from 'path';
import { createDevServer } from './dev';

const cli = cac('sldc').version('0.0.1').help();

cli
  .command('[root]', 'sldc start')
  .option('-w, --watch', 'watching changes')
  .action(async (root: string, { watch }: { watch: boolean }) => {
    if (watch) {
      root = root ? resolve(root) : process.cwd();
      await createDevServer(root);
      console.log('sldc start');
    } else {
      transformFiles(root);
    }
  });

cli.parse();
