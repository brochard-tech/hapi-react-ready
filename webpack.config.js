const path = require("path"),
  CleanWebpackPlugin = require("clean-webpack-plugin");


module.exports = {
  entry: {
    app: "./view/index.jsx"
  },
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    contentBase: "./public"
  },
  plugins: [
    new CleanWebpackPlugin(["dist"])
  ],
  resolve: {
    extensions: [".js", ".json", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      }
    ]
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
