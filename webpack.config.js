
const Copy = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const path = require('path')
const { DefinePlugin } = require('webpack')

const getBaseConfig = () => {
  try {
    return require('./config')
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`local config.js file not found.`)
      console.warn(`please creating config.js file at '${__dirname}' and setup info requried.`)
    }
    return {
      game: {},
      project: {},
    }
  }
}

const getLocalConfig = () => {
  try {
    return require('./config.local')
  } catch (err) {
    return {}
  }
}

const getConfig = () => Object.assign(getBaseConfig(), getLocalConfig())

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'production',
  entry: './src/game.ts',
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.cache/webpack')
  },
  target: 'web',
  output: {
    clean: {
      keep: (filename)=> {
        if (filename === 'project.config.json') {
          return true
        }
        return false
      },
      dry: true,
    },
    path: __dirname + '/dist',
    filename: 'game.js',
    libraryTarget: 'commonjs2',
    globalObject: 'GameGlobal',
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@engine': path.resolve(__dirname, './src/engine'),
    },
    extensions: ['.ts', '.js', '.json', '.cjs', '.mjs']
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|bmp|gif|png)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.(mp3|wave?|aac)$/,
        type: 'asset/resource',
        generator: {
          filename: 'audios/[name][ext]'
        }
      },
      {
        test: /\.(j|t)s$/,
        include: [
          /src\/.*/
        ],
        exclude: [
          /node_modules/,
          /dist/
        ],
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
          from: './src/project.config.json',
          to: 'project.config.json',
          transform(content) {
            const { project } = getConfig()
            const config = JSON.parse(content.toString())
            Object.assign(config, project)
            return JSON.stringify(config, null, 2)
          }
        },
        {
          from: './src/game.json',
          to: 'game.json',
          transform(content) {
            const { game } = getConfig()
            const config = JSON.parse(content.toString())
            Object.assign(config, game)
            return JSON.stringify(config, null, 2)
          }
        },
        {
          from: './src/assets',
          to: 'assets',
          transform(content) {
            // TODO
            // compressing files
            return content
          }
        }
      ]
    }),
    new WebpackBar({}),
    new DefinePlugin({
      'self': 'GameGlobal',
      'window': 'GameGlobal',
      'global': 'GameGlobal'
    })
  ],
  watch: true,
}

module.exports = config
