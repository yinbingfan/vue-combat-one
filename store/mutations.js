export default {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  // 无国家路径获取国家路由
  SET_DEFAULT_LANG(state, langId) {
    switch(langId) {
      case '152':
        state.locale = 'jp'
        break;
      case '204':
        state.locale = 'ru'
        break;
      case '160':
        state.locale = 'kr'
        break;
      default:
        state.locale = 'jp'

    }
  },

  SET_LANGUAGE_ID(state, lanCode) {
    switch(lanCode) {
      case 'jp':
        state.languageId = 152
        break;
      case 'ru':
        state.languageId = 204
        break;
      case 'kr':
        state.languageId = 160
        break;
      default:
        state.languageId = 152
    }
  },
  SET_DETAILS_STATE(state, isShow) {
    state.detailsIsShow = isShow
  }
}
