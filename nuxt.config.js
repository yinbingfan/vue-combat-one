const pkg = require('./package')

module.exports = {
  // mode: 'universal',
  build: {
    filenames:{
      css: 'common.css',
      manifest: 'manifest.js',
      vendor: 'common.js',
      app: 'app.js',
      chunk: '[name].js'
    }
  },
  buildDir: 'nuxt-dist',
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width ,user-scalable=no, initial-scale=1.0, maximum-scale=1.0'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: 'https://media.thedbit.com/dailymedia/pro/20180911101/img/favicon.ico'
    }]
  },
  router: {
    middleware: 'i18n',
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  // loading:'~components/common/loading.vue',




  /*
   ** Global CSS
   */
  css: [
    '~assets/css/normalize.css',
    '~assets/css/common.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/common.js',
    '~plugins/i18n.js',
    '~plugins/filters.js',
    {
      src: '~plugins/flexible.js',
      ssr: false
    },
    {
      src: '~plugins/vue-infinite-scroll.js',
      ssr: false
    },
    {
      src: '~plugins/fastclick.js',
      ssr: false
    },
    {
      src: '~plugins/vant.js',
      ssr: true
    }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    credentials: false,
    baseURL: 'https://apid.thedbit.com',
    browserBaseURL: 'https://apid.thedbit.com',
    // baseURL: 'http://172.30.30.99:9080',
    // browserBaseURL: 'http://172.30.30.99:9080',
    // baseURL: 'http://172.30.11.49:39080',
    // browserBaseURL: 'http://172.30.11.49:39080',
    // baseURL: 'http://172.30.30.186:9080',
    // browserBaseURL: 'http://172.30.30.186:9080',
    retry: {retries: 3}
    // proxyHeaders: false,
    // prefix: '/json/',
    // proxy: true,
  },

  /*
   ** Build configuration
   */
}
