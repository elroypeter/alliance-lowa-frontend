/* eslint-disable no-undef */
const path = require("path");

module.exports = (env) => {
    return {
        mode: "development",
        entry: "./src/index.js",
        output: {
            filename: "main.js",
            path: env.prod
                ? path.resolve(__dirname, "public")
                : path.resolve(__dirname, "dist"),
        },
        devServer: {
            static: [
                {
                    directory: path.join(__dirname, "public"),
                },
                {
                    directory: path.join(__dirname, "dist"),
                },
            ],
            port: env.port || 8080,
            liveReload: true,
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                            ],
                        },
                    },
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        { loader: "style-loader" },
                        { loader: "css-loader" },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: function () {
                                        return [require("autoprefixer")];
                                    },
                                },
                            },
                        },
                        { loader: "sass-loader" },
                    ],
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|jpeg|jpg|svg)$/,
                    type: "asset/resource",
                },
                {
                    test: /\.(woff(2)?|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[ext]",
                                outputPath: "fonts/",
                            },
                        },
                    ],
                },
            ],
        },
    };
};
