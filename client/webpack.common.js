const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

// Extend it as you need.
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const cssLoaders = [
  "style-loader",
  { loader: "vue-style-loader" },
  {
    loader: "postcss-loader",
    options: {
      plugins: function() {
        return [require("autoprefixer")];
      }
    }
  }
];

const sassLoaders = [
  ...cssLoaders,
  {
    loader: "sass-loader",
    options: {
      implementation: require("sass"),
      fiber: require("fibers"),
      indentedSyntax: true
    }
  }
];

const scssLoaders = [
  ...cssLoaders,
  {
    loader: "sass-loader",
    options: {
      implementation: require("sass"),
      fiber: require("fibers"),
      indentedSyntax: false
    }
  }
];

module.exports = {
  entry: {
    app: "./client/src/main.js"
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: sassLoaders
      },
      {
        test: /\.scss$/,
        use: scssLoaders
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/i,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("client/src")
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },
  plugins: [new VueLoaderPlugin()]
};
