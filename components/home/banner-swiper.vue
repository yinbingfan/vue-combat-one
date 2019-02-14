<template>
  <van-swipe class="banner-swiper-contain" :autoplay="3000">
    <van-swipe-item v-for="(item, index) in bannerList"
                    :key="index" v-if="index<6"
                    @click="clickBanner(item.id,item.newsId,item.url)">
      <a class="banner-swiper-list"
         v-if="item.adFlag==0"
         :href="`/news/${item.newsId}`"
        >
      <img :src="item.imgUrl" :alt="item.imgAlt">
      <div class="banner-mask">
        <p class="banner-title">
          {{item.title|setString(80)}}
        </p>
      </div>
      </a>

      <a class="banner-swiper-list"
         v-else-if="item.adFlag==1"
         :href="item.url"
         target="_blank"
      >
        <img :src="item.imgUrl" :alt="item.imgAlt">
        <div class="banner-mask">
          <p class="banner-title">
            {{item.title|setString(80)}}
          </p>
        </div>
      </a>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
    export default {
        name: "banner-swiper",
        props: ['bannerList'],
        data(){
          return{
            getRandom:''
          }
        },
        methods: {
          async clickBanner(id,newsId,url) {
            await this.$store.dispatch('FETCH_SEDN_SLIDING', {
              slidingId:id,
              userId:'',
              deviceId:this.getRandom,
              clientType:'2',
              languageId: this.$store.state.languageId
            })
          },
          setLocalStorageRandom(){
            this.getRandom=window.localStorage.getItem('code');
            if(this.getRandom!=null&&this.getRandom!=''){
              return this.getRandom
            }else {
              window.localStorage.setItem('code',this.$store.state.random);
              return this.getRandom=this.$store.state.random
            }

          },
        },
        mounted(){
            this.setLocalStorageRandom()
        }
    }
</script>

<style lang="less" >
.banner-swiper-contain{
  margin-top: 64px;
  width: 100%;
  height: 200px;
  .banner-swiper-list{
    position: relative;
    img{
      width: 100%;
      height: 200px;

    }
    .banner-mask{
      position: absolute;
      bottom: 3px;
      left: 0;
      width: 100%;
      height: 42px;
      background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.42) 31%, rgba(0,0,0,0.60) 55%, #121111 100%);
      .banner-title{
        width: 96%;
        height: 42px;
        margin:0 2%;
        font-size: 14px;
        font-weight: bold;
        color: #ffffff;
      }
    }

  }
}
.van-swipe__indicators{
  bottom: 43px;
}
.van-swipe__indicator--active{
  background-color: rgba(255,255,255,.9);
}
.van-swipe__indicator{
  width: 8px;
  height: 8px;
}

</style>
