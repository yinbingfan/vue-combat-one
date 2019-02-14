<template>
  <div class="briefList" v-scroll="scrollHandler">
      <div  class="fixeds">
          <div  class="date-times" >{{timeTop}}</div>
      </div>
      <div class="briefLists"
          v-for="(list,index) in briefList" :key="index" ref="timeLine">
          <div
            v-if="!list.isHide"
            class="date-time">
            {{list.lists[0].timestamp | birefTopTime($store.state.locale)}}
          </div>
          <div   v-for="(item,key) in list.lists"  :key="key">
            <a  class="infoList">
              <div class="infoList-score">
                <span class="time">{{item.timestamp|birefListTime}}</span>
                <van-rate
                  v-if="item.level>0"
                  v-model="item.level"
                  :size="15"
                  :count="5"
                  :readonly="true"
                  color="#F29800"
                  void-color="#E1E1E1"
                />
              </div>
              <div   class="desc"  :class="item.level==5?'read':''">
                {{item.message }}
                <a  :href="item.url" target="_blank">{{item.urlTitle}}</a>
              </div>
              <div class="evaluation">
                <a class="appraise good"  @click="good" >
                  <img   src="~assets/img/bad.png" alt="bad.png">
                  <span>{{$t(("common.Good"))}}</span>
                  <span>{{item.goodNumber}}</span>
                </a>
                <a class="appraise bad" @click="bad">
                  <img  src="~assets/img/good.png" alt="good.png">
                  <span>{{$t(("common.Bad"))}}</span>
                  <span>{{item.badNumber}}</span>
                </a>
              </div>
            </a>
          </div>
        </div>
  </div>
</template>

<script>
    export default {
      name: "brief-list-item",
      props:['briefList'],
      data(){
        return{
          langCode: this.$store.state.locale,
          timeTop : ''
        }
      },
      methods: {
        good () {
          var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          var    urls = {
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
        bad(){
          var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          var    urls = {
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
        scrollHandler(){
          this.scroll = document.body.scrollTop||document.documentElement.scrollTop;
          this.$nextTick(() => {
            let timeLine=this.$refs.timeLine;
            for(let k=0;k<timeLine.length; k++){
              var next = timeLine[k+1]?timeLine[k+1].getBoundingClientRect().top:1;
              if(timeLine[k].getBoundingClientRect().top-120 < 0 && next > 0  ){
                this.timeTop= timeLine[k].firstChild.innerText;
                if(timeLine[k].firstChild.innerText==null||timeLine[k].firstChild.innerText==''){
                  this.timeTop= timeLine[k-1].firstChild.innerText;
                }
              }
            }
          })
        },
        initTimeTop() {
         this.timeTop=this.$options.filters.birefTopTime(this.briefList[0].lists[0].timestamp,this.$store.state.locale)
        }

      },
      mounted(){
        this.initTimeTop()
      }


    }
</script>

<style lang="less" scoped>
  .fixeds{
    position: fixed;
    top:114px;
    background: #F5F5F5;
    width: 98%;
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin: 0 1%;
    z-index: 66;
  }
  .date-times{
    color: rgba(32,32,32,.6);
    font-size: 14px;
  }
  .date-time{
    width: 96%;
    height: .8rem;
    margin: 0 2%;
    left: 0;
    top:2.2rem;
    line-height: .8rem;
    text-align: center;
    color: rgba(32,32,32,.6);
    font-size: 14px;
    background: #F5F5F5;
  }
  .briefList{
    margin-top:115px;
    width: 100%;
    background: #F5F5F5;
    -webkit-overflow-scrolling : touch;
    .infoList:nth-of-type(1){
      margin-top: 0;
    }
    .infoList{
      display: block;
      margin: .2rem .16rem;
      background: #FFFFFF;
      box-shadow: 0 12px 13px 1px rgba(228,227,227,0.50);
      border-radius: 1px;
      .infoList-score{
        display: flex;
        align-items: center;
        padding: .3rem 0 .2rem .24rem;
        font-size: .26rem;
        color: #908F8F;
        text-align: left;
        line-height: .31rem;
        .time{
          margin-right: 5px;
        }
        span{
        }
      }
      .desc{
        padding:0 .15rem .2rem .25rem;
        font-size: 14px;
        line-height: 26px;
        color: #000000;
        letter-spacing: 0;
        word-break: break-all;
        a{
          display: inline-block;
          font-size: .26rem;
          color: #B4B3B3;
          letter-spacing: 0;
        }
      }
      .evaluation{
        display: flex;
        padding: 0 .25rem 0.25rem;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        .appraise{
          display: flex;
          justify-content: center;
          align-items: center;
          height: .47rem;
          padding: .1rem;
          border-radius: 9px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          span:nth-of-type(1){
            margin: 0 .05rem;
          }
          img{
            width: .32rem;
            height: .32rem;
          }
        }
        .good{
          margin-right: .14rem;
          background: rgba(236,245,123,0.12);
          border: 1px solid #ECAF00;
          color: #EEB100;
        }
        .bad{
          background: rgba(104,170,233,0.09);
          border: 1px solid #6891E9;
          color: #688EE9;
        }
      }
      .read{
        color: #EEB100 ;
      }
    }
  }

</style>
