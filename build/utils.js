// @ts-check
const path = require('path')

const resolve = (...dirs) => path.resolve(process.cwd(), ...dirs)

const getBaseConfig = () => {
    try {
        return require('../config')
    } catch (err) {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`local config.js file not found.`)
            console.warn(
                `please creating config.js file at '${resolve()}' and setup info required.`
            )
        }
        return {
            game: {},
            project: {}
        }
    }
}

const getLocalConfig = () => {
    try {
        return require('../config.local')
    } catch (err) {
        return {}
    }
}

module.exports = {
    resolve,
    getBaseConfig,
    getLocalConfig
}
