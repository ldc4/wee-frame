import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import typescript from '@rollup/plugin-typescript';

const path = require("path");

const resolvePath = (str: string) => path.resolve(__dirname, str);

export default defineConfig({
  plugins: [
    react(),
    typescript({
      target: 'es5',
      rootDir: resolve('src/'),
      declaration: true,
      declarationDir: resolve('lib'),
      exclude: resolve('node_modules/**'),
      allowSyntheticDefaultImports: true,
    }),
  ],
  build: {
    lib: {
      entry: resolvePath("src/index.ts"),
      name: "componentsName",
      fileName: format => `componentsName.${format}.js`,
    },
    rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          globals: {
            react: "react",
            "react-dom": "react-dom",
          },
        },      
    },
  },
});

