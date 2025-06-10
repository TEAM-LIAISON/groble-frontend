import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "https://api.groble.im/v3/api-docs/%EB%AA%A8%EB%93%A0%20API",
    output: {
      target: "./lib/api.ts",
      client: "fetch",
      prettier: true,
      override: {
        mutator: {
          path: "./lib/custom-fetch.ts",
          name: "customFetch",
        },
      },
    },
  },
});
