import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { templateCompilerOptions } from '@tresjs/core';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) =>
            tag.startsWith('Tres') && tag !== 'TresCanvas',
        },
      },
      ...templateCompilerOptions,
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
