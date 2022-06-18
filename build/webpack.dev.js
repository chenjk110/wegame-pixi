const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')

const config = merge(commonConfig, {
    mode: 'development'
})

module.exports = config
