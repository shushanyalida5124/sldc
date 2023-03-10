import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: {
    cli: 'src/node/cli.ts',
    index: 'src/index.ts'
  },
  bundle: true,
  splitting: true,
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: true,
  shims: true
});
