<template>
  <section class="container">
    <loading v-if="loading"/>
    <classification @pageIsShow="menuShow" />
    <div class="guide-container">
        <guide-tab :navList="navList"
                   @tabChannel="handlerTabExchange"
                   :isActive="activeExchange" />
        <guide-list-item :navList="navList"  :isActive="activeExchange"/>
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
  import guideListItem from '~/components/guide/guide-list-item.vue'
  import guideTab from '~/components/guide/guide-tab.vue'
  import loading from '~/components/common/loading.vue'
  export default {
    name: "guide",
    components: {
      classification,
      footerBanner,
      menuGuide,
      menuHeader,
      guideTab,
      guideListItem,
      loading
    },
    data(){
      return{
        isShowMeun:false,
        langCode: this.$store.state.locale,
        navList:[],
        activeExchange: 0,
        loading:false,
      }
    },
    head () {
      return {
        title: this.$store.state.guideHead[this.langCode].title,
        meta: [
          { hid: 'guide',  name: 'keywords',content: this.$store.state.guideHead[this.langCode].keywords },
          { hid: 'guide',  name: 'description',content: this.$store.state.guideHead[this.langCode].description },
          { hid: "guide", name: "referrer", content: "no-referrer" }
        ]
      }
    },
    methods:{
      handlerTabExchange(index){
        this.activeExchange=index
      },
      async guideNav() {
        let lang='';
        switch (this.langCode) {
          case "en":
            lang = "en";
            break;
          case "ko":
            lang = "ko";
            break;
          case "kr":
            lang = "ko";
            break;
          case "ru":
            lang = "ru";
            break;
          case "jp":
            lang = "ja";
            break;
          case "ja":
            lang = "ja";
            break;
          default:
            lang = 'jp';
            break;
        }
        let guide = await this.$store.dispatch('FETCH_GUIDE_NAV',lang);
        this.navList = guide.data;

        for(let item in this.navList){
          for( let type in this.navList[item].types){
            let sites = this.navList[item].types[type].sites
            if(sites.length>8){
              this.navList[item].types[type].moreFlag=true
              this.navList[item].types[type].arrowCollapse=false
            }
            for(let i = 0 ;i<sites.length;i++){
              if(i<8){
                sites[i].show=true
              }else{
                sites[i].show=false
              }
            }
          }
        }

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
      this.guideNav()
      this.isLoading()
    }
  }
</script>

<style lang="less" scoped>
.guide-container{
  display: flex;
  margin-top:72px;
  width: 100%;
  -webkit-overflow-scrolling : touch
}
</style>
