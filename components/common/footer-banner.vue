=<template>
  <div class="load-app" v-if="loadApp">
    <div class="load-title">
      <img src="~assets/img/wap_banner_logo.png" alt="wap_banner_logo.png">
      <div class="load-title-name">
        <p class="Daily">Dbit</p>
        <div class="better-exprience">
          <p>{{$t('common.GETApplicationForBetterBxprience')}}</p>
          <div class="down-btn" @click="downLoad">{{$t('common.CLICKHERE')}}</div>
        </div>
      </div>
    </div>
    <div class="appClose" @click="close">
      <img src="~assets/img/appclose.png" alt="appclose.png">
    </div>
  </div>
</template>

<script>
  export default {
    name: "load-app",
    data(){
      return{
        loadApp:true,
        downUrlBanner:'',
        langCode: this.$store.state.locale
      }
    },
    created(){
      this.downUrl()
    },

    methods:{
      close () {
        this.loadApp=false
      },
      /*
      * 判断设备类型
      * 点击下载
      * */
      downLoad () {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var urls = {
          'android':'https://play.google.com/store/apps/details?id=com.dbit',
          'ios':'https://itunes.apple.com/us/app/dbit/id1411329952?mt=8',
          'other':this.downUrlBanner
        };
        if(isAndroid){
          window.location.href=urls.android;
        }else if(isiOS){
          window.location.href=urls.ios;
        }else{
          window.location.href=urls.other;
        }
      },
      /*
      * 非ios/android  跳转链接
      * */
      downUrl() {
        switch (this.langCode){
          case 'jp': this.downUrlBanner = 'https://m.thedbit.com/jp/lp/index.html'; break;
          case 'ja': this.downUrlBanner = 'https://m.thedbit.com/jp/lp/index.html'; break;
          case 'kr': this.downUrlBanner = 'https://m.thedbit.com/kr/lp/index.html'; break;
          case 'ko': this.downUrlBanner = 'https://m.thedbit.com/kr/lp/index.html'; break;
          case 'ru': this.downUrlBanner = 'https://m.thedbit.com/ru/lp/index.html'; break;
          case 'en': this.downUrlBanner = 'https://m.thedbit.com/en/lp/index.html'; break;
          default: ;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .load-app{
    position: fixed;
    bottom:0;
    z-index: 0;
    width: 100%;
    height: 70px;
    background: rgba(254,201,48,0.9);
    display: flex;
    .load-title{
      display: flex;
      margin-left: 16px;
      width: 100%;
      img{
        width: 40px;
        height: 40px;
        align-self: center;
        border-radius: 50%;
      }
      .load-title-name{
        align-self: center;
        padding-left: 10px;
        width: 100%;
        .Daily{
          font-size: 16px;
          color: #202020;
          letter-spacing: -0.77px;
          margin-top: 6px;
        }
        .better-exprience{
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 30px;
          p{
            font-size: 12px;
            color: #202020;
            letter-spacing: -0.63px;
            font-style:italic;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            width: 70%;
          }
          .down-btn{
            width: 22%;
            height: 20px;
            background: #202020;
            border-radius: 6px;
            text-align: center;
            line-height: 16px;
            font-size: 12px;
            color: #FEC930;
            letter-spacing: -0.63px;
            margin: 0 5px;
            padding: 3px 2px;
          }
        }
      }
    }
    .appClose{
      position: absolute;
      top:5px;
      right: 5px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      img{
        width: 12px;
        height: 12px;
      }
    }
  }


</style>
