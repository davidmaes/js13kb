module.exports = {
    entry: {
        main: './src/app',
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js"]
    },
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'tslint-loader'
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
};
