<template>
  <section class="container">
    <loading v-if="loading"/>
    <classification @pageIsShow="menuShow" />
    <div class="navTab">
      <div class="tabBrief" @click="tabBrief">
        <span :class="{boderBottomTab:index == num}"></span>
        <span  :class="{active:index == num}">{{$t(("common.Brief"))}}</span>
      </div>
      <div  class="tabBrief" @click="tabTwitter">
        <span  :class="{active:key == num}">{{$t(("common.Twitter"))}}</span>
        <span :class="{boderBottomTab:key == num}" ></span>
      </div>
    </div>
    <div
         v-infinite-scroll="loadMoreTwitter"
         :infinite-scroll-disabled="busyTwitter"
         infinite-scroll-distance="10"
         class="news-main-container">
        <twitter-list-item  v-if="twitterLists.length>0&&key == num" :twitterList="twitterLists"/>
    </div>
    <div
         v-infinite-scroll="loadMoreBrief"
         :infinite-scroll-disabled="busyBrief"
         infinite-scroll-distance="10"
         class="news-main-container">
        <brief-list-item v-if="briefLists.length>0&&index == num" :briefList="briefLists"/>
    </div>

    <div class="no_more" v-if="briefIsEnd">{{$t(("common.noMore"))}}</div>
    <div class="news_loading" v-if="briefLoading">
      <img src="~assets/img/1.svg" alt="">
    </div>

    <div class="no_more" v-if="twitterIsEnd">{{$t(("common.noMore"))}}</div>
    <div class="news_loading" v-if="twitterLoading">
      <img src="~assets/img/1.svg" alt="">
    </div>

    <footer-banner />
    <div v-if="isShowMeun" class="menu-guide"  @touchmove="touchGuide">
      <menu-header @isPageShow="pageShow" />
      <menu-guide/>
    </div>
  </section>
</template>

<script>
  import classification from '~/components/common/classification.vue'
  import footerBanner from '~/components/common/footer-banner.vue'
  import menuGuide from '~/components/common/tab-guide.vue'
  import menuHeader from '~/components/common/tab-header.vue'
  import twitterListItem from '~/components/brief/twitter-list-item.vue'
  import briefListItem from '~/components/brief/brief-list-item.vue'
  import loading from '~/components/common/loading.vue'
    export default {
        name: "brief",
        components: {
          classification,
          footerBanner,
          menuGuide,
          menuHeader,
          twitterListItem,
          briefListItem,
          loading
        },
        data(){
          return{
            langCode: this.$store.state.locale,
            isShowMeun:false,
            key:'twitter',
            index:'brief',
            num:'brief',
            briefLists: [],
            twitterLists: [],
            pageSize:1,
            pageTwitter:1,
            busyBrief: false,
            busyTwitter: false,
            briefIsEnd:false,
            briefLoading: false,
            twitterIsEnd:false,
            twitterLoading: false,
            dateList: {
              brief:[],
              twitter: []
            },
            loading:false
          }
        },
        head () {
          return {
            title: this.$store.state.briefHead[this.langCode].title,
            meta: [
              { hid: 'brief',  name: 'keywords',content: this.$store.state.briefHead[this.langCode].keywords },
              { hid: 'brief',  name: 'description',content: this.$store.state.briefHead[this.langCode].description }
            ]
          }
        },
        methods:{
          tabBrief(){
            this.num='brief';
          },
          tabTwitter(){
            this.num='twitter';
            this.loadMoreTwitter()
          },
          async loadMoreBrief() {
            if(this.num=='brief'){
              this.busyBrief=true;
              this.busyTwitter = false;
              this.twitterLoading = false;
              if (this.briefIsEnd || this.briefIsLoading) return;
              this.briefIsLoading = true
              let res = await this.$store.dispatch('FETCH_BRIEF_LIST',{
                languageId: this.$store.state.languageId,
                page: this.pageSize,
                limit: 20
              });
              this.$nextTick(() => {
                this.briefIsLoading = false
              })
              if(res.data.length>0){
                setTimeout(()=>{
                  this.briefLoading=true
                },200)
                this.briefLists = [...this.briefLists, ...this.listDeWeight(res.data, 'brief')];
                this.pageSize++;
              }else {
                this.busyBrief = false;
                this.briefIsLoading = true;
                this.briefLoading=false;
                this.briefIsEnd=true;
                return
              }
            }

          },
          async loadMoreTwitter() {
            if(this.num=='twitter'){
              this.busyTwitter = true;
              this.busyBrief=false;
              this.briefLoading=false;
              if (this.twitterIsEnd||this.twitterIsLoading) return
              this.twitterIsLoading = true

              let twitter = await this.$store.dispatch('FETCH_TWITTER_LIST',{
                languageId: this.$store.state.languageId,
                page: this.pageTwitter,
                limit: 20
              });
              this.$nextTick(() => {
                this.twitterIsLoading = false
              })
              if(twitter.data.length>0){
                setTimeout(()=>{
                  this.twitterLoading=true
                },200)
                this.pageTwitter++;
                this.twitterLists = [...this.twitterLists, ...twitter.data];
              }else {
                this.busyTwitter = false;
                this.twitterIsLoading= true;
                this.twitterIsEnd= true;
                this.twitterLoading=false
                return
              }
            }
          },
          listDeWeight(list, type) {
            list.forEach(e => {
              if(this.dateList[type].indexOf(e.date)>=0) {
                e.isHide = true
              } else {
                e.isHide = false
                this.dateList[type].push(e.date)
              }
            });
            return list
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
            setTimeout(() => this.loading=false, 1200)
          }
        },
        created(){
          this.isLoading()
        }
    }
</script>

<style lang="less" scoped>
  .navTab{
    width: 100%;
    background: #FEC930;
    height:50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    font-size: 16px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    top: 64px;
    color: rgba(32,32,32,.6);
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    z-index: 99;
    .tabBrief{
      width: 50%;
      height: 50px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      cursor: pointer;
      .boderBottomTab{
        display: inline-block;
        position: absolute;
        bottom: 8px;
        left: 45%;
        width: 10%;
        height: .05rem;
        background: rgba(255,255,255,.6);
      }
      .active{
        width: 100%;
        height: 50px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        color:rgba(255,255,255,.6);
        -webkit-tap-highlight-color:rgba(0,0,0,0);
        -webkit-tap-highlight-color: transparent;
        background: none;
        outline:none;
        cursor: pointer;
        position: relative;
      }
    }
  }
  .no_more{
    width: 100%;
    height: 30px;
    text-align: center;
    color: #020202;
    font-size: 14px;
    line-height: 30px;
    background: #F5F5F5;
  }
  .news_loading{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
    background: #F5F5F5;
    img{
      width: 50px;
    }
  }
</style>
