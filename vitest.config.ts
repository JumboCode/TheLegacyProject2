import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
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
