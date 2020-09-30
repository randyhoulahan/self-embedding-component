module.exports = {
  transpileDependencies: [ '@houlagins/default-options', 'change-case' ],
  css                  : { extract: false },
  devServer            : {
    port: 8887
  },
  lintOnSave  : true,
  chainWebpack: config => {
    config.resolve.symlinks(true)
  }
}