const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    devtool: 'source-map' // Enables source maps for better debugging
  }
})