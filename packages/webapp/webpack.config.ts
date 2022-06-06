import * as path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import DotenvWebpackPlugin from "dotenv-webpack";
// import { configValues } from "./src/utils/ConfigService";

module.exports = (
  env: { development?: boolean; platform?: string; dotenv?: boolean } = {}
) => ({
  mode: env.development ? "development" : "production",
  entry: {
    app: "./demo/index",
  },
  output: {
    path: path.resolve(__dirname, `build/${env.platform as string}`),
    publicPath: "/",
    filename: "js/[name].js",
    sourceMapFilename: "js/[name].map",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(png|gif|jpg)$/,
        loader: "url-loader",
        options: {
          limit: "25000",
          outputPath: "images/",
          publicPath: "images/",
        },
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        loader: "file-loader",
        options: { outputPath: "fonts/", publicPath: "fonts/" },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    fallback: {
      path: require.resolve("path-browserify"),
      fs: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "assets/index.html",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: "tsconfig.demo.json",
      },
    }),
    new DotenvWebpackPlugin(),
    // env.dotenv
    //   ? new DotenvWebpackPlugin()
    //   : new webpack.EnvironmentPlugin(Object.keys(configValues)),
  ],
  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "common",
          chunks: "all",
        },
      },
    },
  },
  performance: {
    hints: false,
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: {
      "/auth": {
        target: "http://localhost",
        changeOrigin: true,
      },
    },
  },
  devtool: env.development ? "eval-cheap-source-map" : "source-map", // TODO setting this to false or "source-map" solves the warning overload bug on console.. why?
});