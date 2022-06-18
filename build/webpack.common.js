// @ts-check
const Copy = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const { DefinePlugin } = require('webpack')
const { getBaseConfig, getLocalConfig, resolve } = require('./utils')

const getConfig = () => Object.assign(getBaseConfig(), getLocalConfig())

/**
 * @type {import('webpack').Configuration}
 */
const config = {
    mode: 'none',
    entry: resolve('src/game.ts'),
    cache: {
        type: 'filesystem',
        cacheDirectory: resolve('.cache/webpack')
    },
    target: 'web',
    output: {
        clean: {
            keep: filename => {
                if (filename === 'project.config.json') {
                    return true
                }
                return false
            },
            dry: true
        },
        publicPath: './',
        path: resolve('dist'),
        filename: 'game.js',
        libraryTarget: 'commonjs2',
        globalObject: 'GameGlobal'
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            '@': resolve('src'),
            '@engine': resolve('src/engine')
        },
        extensions: ['.ts', '.js', '.json', '.cjs', '.mjs']
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|bmp|gif|png)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name][ext]'
                }
            },
            {
                test: /\.(mp3|wave?|aac)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/audios/[name][ext]'
                }
            },
            {
                test: /\.(j|t)s$/,
                include: [/src\/.*/],
                exclude: [/node_modules/, /dist/],
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }
            }
        ]
    },
    plugins: [
        new Copy({
            patterns: [
                {
                    from: resolve('src/project.config.json'),
                    to: 'project.config.json',
                    transform(content) {
                        const { project } = getConfig()
                        const config = JSON.parse(content.toString())
                        Object.assign(config, project)
                        return JSON.stringify(config, null, 2)
                    }
                },
                {
                    from: resolve('src/game.json'),
                    to: 'game.json',
                    transform(content) {
                        const { game } = getConfig()
                        const config = JSON.parse(content.toString())
                        Object.assign(config, game)
                        return JSON.stringify(config, null, 2)
                    }
                }
            ]
        }),
        // @ts-ignore
        new WebpackBar({}),
        new DefinePlugin({
            self: 'GameGlobal',
            window: 'GameGlobal',
            global: 'GameGlobal'
        })
    ],
    watch: true
}

module.exports = config
