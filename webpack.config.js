const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
	mode: "development",
	entry: "./src/app/index.tsx",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/"
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	devServer: {
		static: "./dist",
		port: 4200,
		open: true
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.scss$/i,
				use: ["style-loader", "css-loader", "sass-loader"]
			},
			{
				test: /\.module\.scss$/i,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: true
						}
					},
					"sass-loader"
				]
			},
			{
				test: /\.s[ac]ss$/i,
				enforce: "pre", // важно: подключается до остальных
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
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./index.html"
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: "server", // или 'static' для генерации HTML-файла
			openAnalyzer: true // Автоматически открывать в браузере
		})
	]
};
