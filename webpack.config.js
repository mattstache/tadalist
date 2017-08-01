var path = require('path');
// var nodeExternals = require('webpack-node-externals');

module.exports = {
	// target: 'node', // in order to ignore built-in modules like path, fs, etc. 
 //    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
 node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    module: 'empty'
  },
    entry: path.resolve(__dirname, 'src') + '/app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist') + '/app',
        filename: 'bundle.js',
        publicPath: '/app/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};