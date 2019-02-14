// import axios from 'axios'
// const config = require('../server/config.js')
// const baseUrl = config.apiPath
// const baseUrl = 'http://172.30.11.49:39080/v1/api/wap'
const baseUrl = '/v1/api/wap'
// const baseUrl = 'http://172.30.30.99:9080/v1/api/wap'
// const baseUrl = 'https://apid.thedbit.com/v1/api/wap'


export default {
  /*
  * 获取新聞欄目
  * */
  async FETCH_CHANNEL({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/channel/list.json`,
      params:params
    })
    return data
  },
  /*
  * 新聞列表
  * */
  async FETCH_NEWS_LISTS({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/news/list.json`,
      params:params
    })
    return data
  },
  /*
  * 輪播圖
  * */
  async FETCH_SLIDE_LISTS({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/slide/list.json`,
      params:params
    })
    return data
  },
  /*
  * 轮播图埋点数
  * */
  async FETCH_SEDN_SLIDING({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/eventTrack/sendTrackSliding.json`,
      params:params
    })
    return data
  },
  /*
  * 新闻详情页
  * */
  async FETCH_NEWS_DETAILS({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/news/queryDetail.json`,
      params:params
    })
    return data
  },
  /*
  * 获取相关新闻
  * */
  async FETCH_NEWS_RELATED({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/news/queryRelatedNews.json`,
      params:params
    })
    return data
  },
  /*
 * 获取推荐新闻
 * */
  async FETCH_NEWS_RECOMMEND({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/news/queryRecommendNews.json`,
      params:params
    })
    return data
  },
    /*
  * 获取往期新闻
  * */
  async FETCH_NEWS_SERIAL({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/news/querySerialNews.json`,
      params:params
    })
    return data
  },

  /*
 * 获取新闻浏览数
 * */
  async FETCH_NEWS_BROWSE_NUM({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/eventTrack/sendTrackNews.json`,
      params:params
    })
    return data
  },
  /*
  * 新聞tag列表
  * */
  async FETCH_NEWS_TAGS({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/news/list.json`,
      params:params
    })
    return data
  },
  /*
  * 快訊列表
  * */
  async FETCH_BRIEF_LIST({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url:  baseUrl+`/shortMessage/listByWAP.json`,
      params:params
    })
    return data
  },
  /*
  * 推特列表
  * */
  async FETCH_TWITTER_LIST({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url:  baseUrl+`/twitter/queryTwitter.json`,
      params:params
    })
    return data
  },
  /*
  * 網址導航
  * */
  async FETCH_GUIDE_NAV({state}, params) {
    const { data } = await this.$axios({
      method: 'get',
      url:baseUrl+`/hangqing/nav/${params}`,
    });
    return data
  },
  /*
  * wiki詳情頁面
  * */
  async FETCH_WIKI_DETAILS({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/wiki/queryDetail.json`,
      params:params
    });
    return data
  },
  /*
  * wiki-tag列表
  * */
  async FETCH_WIKI_TAGS({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url:  baseUrl+`/wiki/queryWikiListByTag.json`,
      params:params
    })
    return data
  },
  /*
  * 獲取幣列表
  * */
  async FETCH_MARKET_CURRENCY({state}, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: baseUrl+`/currency/list.json`,
      params:params
    })
    return data
  }


}
