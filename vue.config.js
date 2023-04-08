const { resolve } = require('path');
const path = require('path');

const devServerPort = 10003;
const name = '前端通用模板';
const { PurgeIcons } = require('purge-icons-webpack-plugin');
const mockServer = require('./mock/mock-server.ts');

module.exports = {
  devServer: {
    port: devServerPort,
    open: false,
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    proxy: {
      '/api': {
        target: 'http://mockjs.com/api',
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        // ws: true,// proxy websockets
        pathRewrite: {
          // pathRewrite方法重写url
          '^/api': '',
        },
      },
    },
    setupMiddlewares(middlewares, devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      mockServer(devServer.app);
      return middlewares;
    },
  },
  // lintOnSave: false,
  lintOnSave: process.env.NODE_ENV === 'development',
  // publicPath:'./',
  publicPath: process.env.NODE_ENV === 'production' ? '/vue2-ts-template/' : '/',
  outputDir: 'dist',
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name);

    config.plugin('html').tap((args) => {
      const htmlConfig = args[0];
      htmlConfig.title = name;
      return args;
    });
    // https://webpack.js.org/configuration/devtool/#development
    config.when(process.env.NODE_ENV === 'development', (_config) =>
      _config.devtool('cheap-source-map'),
    );

    // 不压缩类名, 组件类名同时也是组件的名称
    config.optimization.minimizer('terser').tap((args) => {
      const { terserOptions } = args[0];
      terserOptions.keep_classnames = true;
      terserOptions.keep_fnames = true;
      return args;
    });
    config.when(process.env.NODE_ENV !== 'development', (_config) => {
      _config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: path.resolve(__dirname, 'src/components'),
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      _config.optimization.runtimeChunk('single');
    });
    config.resolve.alias
      .set('@', path.resolve('src'))
      .set('@c', path.resolve('src/components'))
      .set('@assets', path.resolve('src/assets'));
    return {
      plugins: [new PurgeIcons({})],
    };
  },
  css: {
    loaderOptions: {
      sass: {
        // 屏蔽编译时 dart-scss 的warning日志
        sassOptions: {
          quietDeps: true,
        },
        prependData: `
        @use "@/assets/styles/variables.scss" as *;
        @use "@/assets/styles/mixins.scss" as *;
      `,
      },
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      // 公共使用的样式
      patterns: [],
    },
  },
};
