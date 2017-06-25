const webpack = require('atool-build/lib/webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = function (webpackConfig, env) {
  webpackConfig.babel.plugins.push('transform-runtime')
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: true,
  }])

  // Support hmr
  if (env === 'development') {
    webpackConfig.devtool = '#eval'
    webpackConfig.babel.plugins.push(['dva-hmr', {
      entries: [
        'webpack-hot-middleware/client',
        './src/index.js',
      ],
    }])
  } else {
    webpackConfig.babel.plugins.push('dev-expression')
    webpackConfig.entry = { index: './src/index.js' }
    //模板文件导入hash过的静态资源
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/_index.html', // 源模板文件
        filename: './index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
        inject: true,
        hash: true,
        chunks: ["common",'index'] //index为entry中的配置项
      })
    );
    //去除atool-build自带的file-loader
    webpackConfig.module.loaders.forEach(function (e,i) {
      let str = JSON.stringify(e);
      if(str.indexOf("file?") !== -1){
        webpackConfig.module.loaders.splice(i,1);
      }

    });
  }

  // Don't extract common.js and common.css
  webpackConfig.plugins = webpackConfig.plugins.filter((plugin) => {
    return !(plugin instanceof webpack.optimize.CommonsChunkPlugin)
  })

  // Support CSS Modules
  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach((loader) => {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/
      loader.test = /\.less$/
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/
      loader.test = /\.less$/
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader.include = /node_modules/
      loader.test = /\.css$/
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader.exclude = /node_modules/
      loader.test = /\.css$/
    }
  })

  return webpackConfig
}
