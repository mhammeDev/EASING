const { defineConfig } = require('@vue/cli-service')
const path = require('path');



module.exports = defineConfig({
  transpileDependencies: true,

//     publicPath: process.env.NODE_ENV === 'production' ? '/easing/' : '/',

    outputDir: 'dist',
    assetsDir: 'assets',

   /* devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            }
        }
    },*/

    pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
