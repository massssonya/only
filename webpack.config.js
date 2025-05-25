const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// Функция-обёртка для конфига, чтобы принимать env
module.exports = (env) => {
  const isDev = env.NODE_ENV === "development";
  const isAnalyze = env.analyze || process.env.NETLIFY !== 'true';

  return {
    mode: isDev ? "development" : "production",

    entry: "./src/app/index.tsx",

    output: {
      filename: isDev ? "bundle.js" : "js/[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      clean: true
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },

    devServer: {
      static: "./dist",
      port: 4200,
      open: true,
      hot: true,
      historyApiFallback: true
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.module\.s[ac]ss$/i,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: { modules: true }
            },
            "sass-loader"
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /\.module\.s[ac]ss$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.css$/i,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader"
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          enforce: "pre",
          use: [
            {
              loader: "style-resources-loader",
              options: {
                patterns: [
                  path.resolve(__dirname, "src/shared/styles/variables.scss")
                ]
              }
            }
          ]
        }
      ]
    },

    optimization: {
      minimizer: [new CssMinimizerPlugin()],
      splitChunks: {
        chunks: "all",
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          }
        }
      },
      runtimeChunk: "single",
      usedExports: true,
      minimize: !isDev
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./index.html",
        minify: !isDev && {
          collapseWhitespace: true,
          removeComments: true
        }
      }),
      !isDev && new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css"
      }),
      isAnalyze && new BundleAnalyzerPlugin({
        analyzerMode: "server",  // Автоматически открывает в браузере
        openAnalyzer: true,
        generateStatsFile: true
      })
    ].filter(Boolean)
  };
};
