<template>
  <div  class="twitter-list-item">
    <div class="contentList"   v-for="(item,index) in twitterList" :key="index">
      <div class="contentList-img">
        <img  v-lazy="item.picUrl"  :alt="item.picUrl">
      </div>
      <div class="contentList-left">
        <div class="contentList-left-img">
          <a :href="twitterUrl+item.twitterId"  target="_blank" class="contentList-left-ccpv">
            {{item.twitterName}}
            <img src="~assets/img/twitter@2x.png" alt="twitter_02@3x.png">
          </a>
        </div>
        <p class="contentList-left-time">{{item.timestamp|newsListTime($store.state.locale)}} </p>
        <p class="contentList-left-title" v-html="item.content">

        </p>
        <div class="contentList-left-source"  v-if="item.imgUrl!=null" >
          <img   v-lazy="item.imgUrl" :alt="item.imgUrl">
        </div>
        <div  v-else>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "twitter-list-item",
      props:['twitterList'],
      data(){
        return{
          langCode: this.$store.state.locale,
          twitterUrl:'https://twitter.com/'
        }
      },
      methods: {
        menuButton () {
          this.$emit('pageIsShow');
        },

      }
    }
</script>

<style lang="less" >
  .twitter-list-item{
    /*display: flex;*/
    /*flex-flow: column;*/
    /*flex: 1;*/
    background: #F5F5F5;
    -webkit-overflow-scrolling : touch;
    margin-top:115px;
  }

  .contentList{
    width: 96%;
    height: auto;
    display: flex;
    margin: .16rem;
    background: #FFFFFF;
    box-shadow: 0 12px 13px 1px rgba(228,227,227,0.50);
    border-radius: 1px;
    .contentList-img{
      width: 30px;
      height: 30px;
      margin: 0.4rem  0.05rem 0  0.32rem;
      border-radius: 50%;
      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        &[lazy=error]{
          background: url('~assets/img/news_cover_default@2x.png') no-repeat;
          background-size: cover;
        }
        &[lazy=loading]{
          background: url('~assets/img/news_cover_default@2x.png') no-repeat;
          background-size: cover;
        }
      }
    }
  }

  .contentList-left{
    padding:  .4rem .28rem 0 .32rem;
    width: 100%;
    .contentList-left-img{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .contentList-left-ccpv{
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        color: #202020;
        letter-spacing: 0;
        line-height: 24px;
        width: 100%;
        img{
          width: 13px;
          height: 13px;
        }
      }
    }
    .contentList-left-time{
      width: 100%;
      margin-top: 4px;
      font-size: .26rem;
      color: #908F8F;
      text-align: left;
    }
    .contentList-left-title{
      margin: .2rem 0;
      width: 100%;
      font-size: 13px;
      color: #0E0E0E;
      letter-spacing: 0;
      line-height: 22px;
      word-break: break-all;
      a{
        color: #1DA2F2;
      }
    }

    .contentList-left-source{
      width: 100%;
      margin-bottom: .44rem;
      img{
        max-width: 100%;
        &[lazy=error]{
          background: url('~assets/img/erron.png') no-repeat;
          background-size: cover;
        }
        &[lazy=loading]{
          background: url('~assets/img/news_cover_default@2x.png') no-repeat;
          background-size: cover;
        }
      }
    }
  }
</style>
