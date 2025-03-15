import { defineConfig } from "cypress";
import webpackPreprocessor from "@cypress/webpack-preprocessor";

const webpackOptions = {
  resolve: {
    extensions: [".ts", ".js", ".jsx", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    baseUrl: "http://localhost:3000", 
    setupNodeEvents(on, config) {
      on("file:preprocessor", webpackPreprocessor({ webpackOptions }));
      // implement node event listeners here
    },
  },
});
