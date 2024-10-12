const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const typescript = require('@rollup/plugin-typescript');

const path = require("path");

const resolvePath = (str) => {
  return path.resolve(process.cwd(), str);
};

module.exports = (context) => {
  const { entry, output, name, runtimePath } = context.config;

  return defineConfig({
    plugins: [
      react.default(),
      typescript.default({
        tsconfig: resolvePath(path.join(runtimePath, 'tsconfig.json')),
        declaration: true,
        declarationDir: `${output}/types`,
        rootDir: resolvePath(entry),
        include: ['*.ts', '*.tsx'],
      }),
    ],
    build: {
      outDir: output,
      lib: {
        entry: resolvePath(path.join(entry, 'index.ts')),
        name,
        fileName: name,
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
};

