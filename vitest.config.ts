import path from "path";
import { loadEnv, defineConfig } from "vite";

const setUp = ({ mode }) => {
  return defineConfig({
    resolve: {
      alias: [
        {
          find: "@api",
          replacement: path.resolve(__dirname, "./src/app/api"),
        },
        {
          find: "@env",
          replacement: path.resolve(__dirname, "./src/env"),
        },
        {
          find: "@server",
          replacement: path.resolve(__dirname, "./src/server"),
        },
      ],
    },
  });
};

export default setUp;
