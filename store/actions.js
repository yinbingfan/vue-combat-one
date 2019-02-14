const baseUrl = '/v1/api'
export default {
  async FETCH_CHANNEL({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/channel/list.json`,
      params:params
    })
    return data
  },
  async FETCH_NEWS_LISTS({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/news/list.json`,
      params:params
    })
    return data
  },
  async FETCH_SLIDE_LISTS({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/slide/list.json`,
      params:params
    })
    return data
  },
  async FETCH_SEDN_SLIDING({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/eventTrack/sendTrackSliding.json`,
      params:params
    })
    return data
  },
  async FETCH_NEWS_DETAILS({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/news/queryDetail.json`,
      params:params
    })
    return data
  },
  async FETCH_NEWS_RELATED({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/news/queryRelatedNews.json`,
      params:params
    })
    return data
  },
  async FETCH_NEWS_RECOMMEND({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/news/queryRecommendNews.json`,
      params:params
    })
    return data
  },
  async FETCH_NEWS_SERIAL({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/news/querySerialNews.json`,
      params:params
    })
    return data
  },
  async FETCH_NEWS_BROWSE_NUM({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/eventTrack/sendTrackNews.json`,
      params:params
    })
    return data
  },
  async FETCH_NEWS_TAGS({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/news/list.json`,
      params:params
    })
    return data
  },
  async FETCH_BRIEF_LIST({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url:  baseUrl+`/shortMessage/listByWAP.json`,
      params:params
    })
    return data
  },
  async FETCH_TWITTER_LIST({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url:  baseUrl+`/twitter/queryTwitter.json`,
      params:params
    })
    return data
  },
  async FETCH_GUIDE_NAV({state}, params) {
    const { data } = await this.$axios({
      method: 'get',
      url:baseUrl+`/hangqing/nav/${params}`,
    });
    return data
  },
  async FETCH_WIKI_DETAILS({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/wiki/queryDetail.json`,
      params:params
    });
    return data
  },
  async FETCH_WIKI_TAGS({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url:  baseUrl+`/wiki/queryWikiListByTag.json`,
      params:params
    })
    return data
  },
  async FETCH_MARKET_CURRENCY({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/currency/list.json`,
      params:params
    })
    return data
  }
}
