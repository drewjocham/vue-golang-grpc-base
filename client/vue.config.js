const { defineConfig } = require('@vue/cli-service')

// vue.config.js
module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // mutate config for production...
        } else {
            // mutate for development...
        }
    }
}
