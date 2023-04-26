module.exports = {
  /**
   * 如果计划在子路径下部署站点，则需要设置publicPath，
   * 例如，Github页面。如果您计划将站点部署到https://foo.github.io/bar/，
   * 然后publicpath应设置为“/bar/”。
   * 在大多数情况下，请使用'/'！！！！
   * 详情：https://cli.vuejs.org/config/publicpath
   */
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    host: '127.0.0.1',
    // 端口
    port: 8080,
    // 设置为open，系统启动后将打开浏览器
    open: true,
    proxy: {
      '/': {
        // 后台接口
        target: 'http://localhost:8080',
        changeOrigin: true, // true访问8099， false 访问默认8080
        pathRewrite: {
          '^/testIp': ''
        },
        ws: false
      },
      // '/':{
      //   target: 'http://53649kn452.zicp.vip',
      //   ws: false
      // }
    }
  },
  runtimeCompiler: true,
  //  sass
 /* css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/rd_sass/_variable.scss";` //引入全局变量
      }
    }
  }*/
}
