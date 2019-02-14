<template>
  <section class="container">
    <loading v-if="loading"/>
    <tag-header @pageIsShow="menuShow" :tagName="tagName" v-if="hideTitle"/>
    <div
         v-infinite-scroll="loadMoreTag"
         :infinite-scroll-disabled="busy"
         infinite-scroll-distance="8"
         :class="[hideTitle? 'news-main-container' : '']"
         >
        <tag-list-item :newsList="tagNewsList" :env="env"/>
    </div>
    <div class="no_more" v-if="newsIsEnd">{{$t(("common.noMore"))}}</div>
    <footer-banner v-if="hideTitle"/>
    <div v-if="isShowMeun" class="menu-guide"  @touchmove="touchGuide">
      <menu-header @isPageShow="pageShow" />
      <menu-guide/>
    </div>
  </section>
</template>

<script>
  import tagHeader from '~/components/tag/tag-header.vue'
  import footerBanner from '~/components/common/footer-banner.vue'
  import menuGuide from '~/components/common/tab-guide.vue'
  import menuHeader from '~/components/common/tab-header.vue'
  import tagListItem from '~/components/home/news-list-item.vue'
  import loading from '~/components/common/loading.vue'
  export default {
      name: "tag",
      components: {
        tagHeader,
        footerBanner,
        menuGuide,
        menuHeader,
        tagListItem,
        loading
      },
      head () {
        return {
          script: [
            {
              type: 'text/javascript',
              charset:"UTF-8" ,
              src:"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
            }
          ]
        }
      },
      data(){
        return{
          langCode: this.$store.state.locale,
          tagName: this.$route.query.tagName,
          tagId: this.$route.query.tagId,
          env: this.$route.query.env,
          isShowMeun:false,
          tagNewsList: [],
          newsPages: 1,
          busy:false,
          newsIsEnd:false,
          hideTitle:false,
          loading:false
        }
      },
      methods: {
        menuShow(){
          this.isShowMeun=true
        },
        pageShow(){
          this.isShowMeun=false
        },
        touchGuide(e){
          e.preventDefault()
        },
        async loadMoreTag() {
          this.busy=true
          if (this.newsIsEnd || this.newsIsLoading) return
          this.newsIsLoading = true
          let res = await this.$store.dispatch('FETCH_NEWS_TAGS', {
            tagId:this.tagId,
            page: this.newsPages,
            limit: 20
          })
          if(res.data.length>0 && res.data.length<20){
            this.tagNewsList = [...this.tagNewsList, ...res.data]
            this.busy=false;
            this.newsIsEnd=true;
            return
          }else if(res.data.length>0) {
            this.newsPages++
            this.tagNewsList = [...this.tagNewsList, ...res.data]
          }else{
            this.busy=false;
            this.newsIsEnd=true
            return
          }
          this.$nextTick(() => {
            this.newsIsLoading = false
          })

        },
        isLoading(){
          this.loading=true
          setTimeout(() => this.loading=false, 800)
        },
        hideAppTitle(){
          if(this.env=='app'){
              this.hideTitle=false
          }else{
            this.hideTitle=true
          }
        }
      },
      mounted(){
        document.title=this.tagName
        this.isLoading()
        this.hideAppTitle()
      }
    }

</script>

<style lang="less" scoped>
  .news-main-container{
    margin-top: 64px;
  }
  .no_more{
    width: 100%;
    height: 30px;
    text-align: center;
    color: #020202;
    font-size: 14px;
    line-height: 30px;
    background: #ffffff;
  }
</style>
