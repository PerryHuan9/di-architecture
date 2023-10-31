import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  mode: 'production',
  build: {
    target: 'modules',
    lib: {
      entry: './src/index.ts',
      name: 'DiArchitecture',
      fileName: 'index',
      formats: ['es', 'umd', 'cjs'],
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
});
