import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch

  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: store.state.locale,
    messages: {
      'en': require('~/locales/en.json'),
      'jp': require('~/locales/jp.json'),
      'kr': require('~/locales/kr.json'),
      'ru': require('~/locales/ru.json'),
      'cn': require('~/locales/cn.json')
    }
  })


}
