const { defineConfig } = require('@vue/cli-service')
const path = require('path');
const webpack = require('webpack')
const backendDistPath = path.join(__dirname, '../../BACK/dist');




module.exports = defineConfig({
  transpileDependencies: true,

//     publicPath: process.env.NODE_ENV === 'production' ? '/easing/' : '/',

    outputDir: backendDistPath,
    assetsDir: 'assets',

   devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            }
        }
    },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        // Vue CLI is in maintenance mode, and probably won't merge my PR to fix this in their tooling
        // https://github.com/vuejs/vue-cli/pull/7443
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      })
    ],
  },
})
