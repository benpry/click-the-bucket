import RemarkHTML from "remark-html";

/** @param {import("webpack").Configuration} config */
export function webpack(config) {
  config.module.rules.push({
    test: /\.md$/,
    use: [
      {
        loader: "html-loader",
      },
      {
        loader: "remark-loader",
        options: {
          remarkOptions: {
            plugins: [RemarkHTML],
          },
        },
      },
    ],
  });
  config.resolve.extensions.push(".md");
  return config;
}

/** @param {import("webpack-dev-server").Configuration} devServerConfig */
export function webpackDevServer(devServerConfig) {
  return devServerConfig;
}
