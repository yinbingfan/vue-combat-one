<template>
  <div   class="news-lists-wrap" >
    <h3 v-if="type=='serial'">{{$t(("details.ThePastReview"))}}</h3>
    <h3 v-if="type=='related'">{{$t(("details.RelatedNews"))}}</h3>
    <h3 v-if="type=='recommend'">{{$t(("details.Recommend"))}}</h3>
    <div class="news-topics-last" :key="index" v-for="(item,index) in newsList">
      <a class="news-topic-img" v-if="env=='app'" :href="`/news/${item.id}?env=${env}`">
        <div class="news-img"  >
          <img class="lazy-lable"  v-lazy="item.listImgUrl"  :alt="item.listImgAlt" >
          <img class="radius"  v-if="item.mutlimedia==1" src="~assets/img/radio@2x.png" alt="">
          <img class="video" v-if="item.mutlimedia==2" src="~assets/img/video@2x.png" alt="">
        </div>
        <div class="news-topic-wrap">
          <div  class="news-topic-title">
            {{item.title}}
          </div>
          <div class="news-subscript" >
            <span v-if="item.conermarkTitle">{{item.conermarkTitle}}</span>
          </div>
          <div class="news-description">
            <span>{{item.timestamp | newsListTime($store.state.locale)}}</span>
            <span  class="news-time">|</span>
            <span>{{item.mediaName|setString(20)}}</span>
          </div>
        </div>
      </a>

      <a class="news-topic-img" v-else-if="env!='app'" :href="`/news/${item.id}`">
        <div class="news-img"  >
          <img class="lazy-lable"  v-lazy="item.listImgUrl"  :alt="item.listImgAlt" >
          <img class="radius"  v-if="item.mutlimedia==1" src="~assets/img/radio@2x.png" alt="">
          <img class="video" v-if="item.mutlimedia==2" src="~assets/img/video@2x.png" alt="">
        </div>
        <div class="news-topic-wrap">
          <div  class="news-topic-title">
            {{item.title}}
          </div>
          <div class="news-subscript" >
            <span v-if="item.conermarkTitle">{{item.conermarkTitle}}</span>
          </div>
          <div class="news-description">
            <span>{{item.timestamp | newsListTime($store.state.locale)}}</span>
            <span  class="news-time">|</span>
            <span>{{item.mediaName|setString(20)}}</span>
          </div>
        </div>
      </a>


    </div>
  </div>
</template>

<script>
    export default {
        name: "news-list-item",
        props: {
          newsList: {
            type: Array,
            default: []
          },
          type: {
            type: String,
            default: ''
          },
          env:{
            type:String
          }
        },
        data () {
          return {
            langCode: this.$store.state.locale,
          }
        }
    }
</script>

<style lang="less" scoped>
  .news-lists-wrap{
    background: #ffffff;
    padding-bottom: 10px;
    h3{
      font-size:14px;
      font-weight: bold;
      float: left;
      color: #000000;
      margin-left: 2%;
      line-height: 32px;
    }
    h3::before{
      content: " ";
      display: block;
      width:3px;
      height: 20px;
      background: #FEC930;
      float: left;
      margin-right: 10px;
      margin-top: 5px;
    }
    .news-topics-last{
      width: 100%;
      .news-topic-img{
        width: 96%;
        margin: 0 2%;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(180,179,179,.5);
        padding:10px 0;
        .news-img{
          width:30%;
          height: 80px;
          position: relative;
          .lazy-lable{
            width: 100%;
            height: 100%;
            border-radius: 5px;
            &[lazy=error]{
              background: url('~assets/img/erron.png') no-repeat;
              background-size: contain;
            }
            &[lazy=loading]{
              background: url('~assets/img/news_cover_default@2x.png') no-repeat;
              background-size: contain;
            }
          }

          .radius{
            position: absolute;
            right:5px;
            top: 5px;
            width: 35px;
          }
          .video{
            position: absolute;
            top:30%;
            left: 35%;
            width: 35px;
          }
        }
        .news-topic-wrap{
          width: 68%;
          margin-left: 2%;
          .news-topic-title{
            height: 40px;
            line-height: 20px;
            width: 100%;
            font-weight: bold;
            color: #202020;
            font-size: 16px;
            word-wrap: break-word;
            word-break: break-all;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            white-space: normal;
          }
          .news-subscript{
            height: 24px;
            background: #FFFFFF;
            line-height: 24px;
            font-weight: bold;
            color: #FDB438;
            span{
              padding: 3px 5px;
              font-weight: bold;
              border: 1px solid rgba(253,180,56,0.60);
              border-radius: 11px;
              font-size: 8px;
            }
          }
          .news-description{
            font-size: 12px;
            color: #B4B3B3;
            text-align: left;
            .news-time{
              margin:0 5px;
            }
          }
        }

      }
    }
  }
</style>
