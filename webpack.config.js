const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const WebExtPlugin = require('web-ext-plugin');

module.exports = {
    entry: './src/extension/background_script.js',
    output: {
        filename: 'background_script.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/extension", to: "." },
            ],
        }),
        new WebExtPlugin({
            /**
             * TODO: According to docs 'sourceDir' should be relative to source
             * but is relative to package location in node_modules dir. Test if
             * this behaviour is different on Linux.
             * https://github.com/hiikezoe/web-ext-webpack-plugin/blob/master/README.md
             */
            sourceDir: '../../dist', 
            startUrl: [
                'about:debugging#/runtime/this-firefox',
                'about:devtools-toolbox?id=poc_extension%40example.com&type=extension',
            ],
        }),
    ],
}