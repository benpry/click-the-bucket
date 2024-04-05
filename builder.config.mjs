import RemarkHTML from "remark-html";

/** @param {import("webpack").Configuration} config */
export function webpack(config) {
  console.log("webpack config", config);
  console.log(config.module.rules);
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
  console.log("webpack dev server config", devServerConfig);
  return devServerConfig;
}
