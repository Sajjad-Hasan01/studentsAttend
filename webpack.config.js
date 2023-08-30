const path = import('path');

module.exports = {
    context: __dirname,
    entry: '/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.jsx',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
    },
};