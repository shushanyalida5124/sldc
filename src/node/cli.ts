import cac from 'cac';
import { transformFile, transformFiles } from './transform';

import { resolve } from 'path';
import { createDevServer } from './dev';
import { FILE_SUFFIX_REG } from './constants';

const cli = cac('sldc').help();

cli
  .command('[root]', 'sldc start')
  .option('-w, --watch', 'watching changes')
  .action(async (root: string, { watch }: { watch: boolean }) => {
    root = root ? resolve(root) : process.cwd();
    if (FILE_SUFFIX_REG.test(root)) {
      transformFile(root);
      return;
    }
    if (watch) {
      await createDevServer(root);
      console.log('sldc start');
    } else {
      transformFiles(root);
    }
  });

cli.parse();
