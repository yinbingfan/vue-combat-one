<template>
  <section class="container">
    <loading v-if="loading"/>
      <classification @pageIsShow="menuShow" :dropSelect="dropSelect"/>
      <banner-swiper :bannerList="bannerList"/>
      <div v-if="newsList.length>0"
           v-infinite-scroll="loadMoreNews"
           :infinite-scroll-disabled="newsPages >3?true:'busy'"
           infinite-scroll-distance="10"
           class="news-main-container">
        <news-list-item :newsList="newsList"/>
      </div>
      <div class="no_more" v-if="newsIsEnd">{{$t(("common.noMore"))}}</div>
      <div class="news_loading" v-if="newsLoading">
        <img src="~assets/img/1.svg" alt="">
      </div>
      <home-footer/>
      <footer-banner />

      <div v-if="isShowMeun" class="menu-guide"  @touchmove="touchGuide">
        <menu-header @isPageShow="pageShow" />
        <menu-guide/>
      </div>
  </section>
</template>

<script>

import classification from '~/components/common/classification.vue'
import bannerSwiper from '~/components/home/banner-swiper.vue'
import newsListItem from '~/components/home/news-list-item.vue'
import homeFooter from '~/components/home/home-footer.vue'
import footerBanner from '~/components/common/footer-banner.vue'
import menuGuide from '~/components/common/tab-guide.vue'
import menuHeader from '~/components/common/tab-header.vue'
import loading from '~/components/common/loading.vue'

export default {
  name: "index",
  components: {
    classification,
    bannerSwiper,
    newsListItem,
    footerBanner,
    homeFooter,
    menuGuide,
    menuHeader,
    loading
  },
  data(){
    return{
      newsPages:2,
      langCode: this.$store.state.locale,
      newsList:[],
      bannerList:[],
      isShowMeun:false,
      newsIsEnd:false,
      newsLoading:false,
      channelId:'',
      dropSelect:true,
      loading:false
    }
  },
  head () {
    return {
      title: this.$store.state.homeHead[this.langCode].title,
      meta: [
        { hid: 'index',  name: 'keywords',content: this.$store.state.homeHead[this.langCode].keywords },
        { hid: 'index',  name: 'description',content: this.$store.state.homeHead[this.langCode].description }
      ]
    }
  },
  /*
  * 轮播图
  * adFlag 0为新闻，1为广告
  *
  * */
  async asyncData({app, store, route}) {
    let banner = await store.dispatch('FETCH_SLIDE_LISTS', {
      languageId: store.state.languageId
    })
    let channel = await store.dispatch('FETCH_CHANNEL', {
      languageId: store.state.languageId
    })
    let channelId = channel.data[0].id
    let news = await store.dispatch('FETCH_NEWS_LISTS', {
      channelId:channelId,
      page:1,
      limit:20,
    })
    return {
     bannerList: banner.data,
     newsList:news.data,
     channelId:channel.data[0].id
    }
  },
  methods: {
    async loadMoreNews() {
      if (this.newsIsEnd || this.newsIsLoading) return
      this.newsIsLoading = true
      let res = await this.$store.dispatch('FETCH_NEWS_LISTS', {
        channelId:this.channelId,
        page: this.newsPages,
        limit: 20
      })
      if(res.data.length<=0) {
        this.newsIsEnd = true;
        this.newsLoading=false
        return
      }
      this.$nextTick(() => {
        this.newsIsLoading = false
      })
      this.newsPages++
      setTimeout(()=>{
        this.newsLoading=true
      },200)
      this.newsList = [...this.newsList, ...res.data]

    },
    menuShow(){
      this.isShowMeun=true
    },
    pageShow(){
      this.isShowMeun=false
    },
    touchGuide(e){
      e.preventDefault()
    },
    isLoading(){
      this.loading=true
      setTimeout(() => this.loading=false, 1000)
    }
  },
  created(){
    this.isLoading()
  }
}
</script>

<style lang="less" scoped>
.no_more{
  width: 100%;
  height: 30px;
  text-align: center;
  color: #020202;
  font-size: 14px;
  line-height: 30px;
  background: #ffffff;
}
.news_loading{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  background: #ffffff;
  img{
    width: 50px;
  }
}
</style>
