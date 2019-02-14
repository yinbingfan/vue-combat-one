<template>
  <div class="tabsRight" >
    <div class="exchanges"
         v-for="(item,index) in navList"
         v-show="isActive == index"
         :key='index'
    >
      <div class="tabsRightName">{{item.nav}}</div>
      <div class="exchangeList"  v-for="(lists,typesIndex) in item.types" :key="typesIndex">
        <h1>{{lists.type_title}}</h1>
        <div class="typeLists">
          <div  class="typeList" v-for="(list,key) in lists.sites" :key="key"
                v-show="list.show" >
            <a :rel="nofollow"
               :href="list.site_url" target="_blank">
              <img  :src="list.logo"  alt="">
              <span>
                  {{list.site_title}}
              </span>
            </a>
          </div>
        </div>
        <div  class="arrowMore" @click="showMore(index,typesIndex)"
              v-show="lists.moreFlag" v-if="lists.sites.length>=8?true:false"
              >
          <span>{{$t(("common.more"))}}</span>
          <img src="~assets/img/arrow.svg" alt="arrow.svg">
        </div>
        <div  class="arrowCollapse" @click="collapseMore(index,typesIndex)"
              v-show="lists.arrowCollapse" v-if="lists.sites.length>=8?true:false"
        >
          <span>{{$t(("common.collapse"))}}</span>
          <img src="~assets/img/arrowup.svg" alt="arrowup.svg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "guide-list-item",
        props: ['navList','isActive'],
        data(){
          return{
            nofollow:'nofollow',
            arrowCollapse:-1,
            show:-1
          }
        },
        methods: {
          /*
           * 点击更多展开
           * */
          showMore (index,typeIndex) {
            let res=this.navList;
            for(let i=0;i<res.length;i++){
              if(index === i){
                for(let j=0;j<res[i].types.length;j++){
                  if(j===typeIndex){
                    res[i].types[j].moreFlag = false;
                    res[i].types[j].arrowCollapse = true;
                    let sites = res[i].types[j].sites;
                    for(let k=0;k<sites.length;k++){
                      sites[k].show = true;
                    }
                  }
                }
              }
            }
          },
          /*
          * 点击收起
          * */
          collapseMore (index,typeIndex) {
            let res=this.navList;
            for(let i=0;i<res.length;i++){
              if(index === i){
                for(let j=0;j<res[i].types.length;j++){
                  if(j===typeIndex){
                    res[i].types[j].moreFlag = true;
                    res[i].types[j].arrowCollapse = false;
                    let sites = res[i].types[j].sites;
                    for(let k=0;k<sites.length;k++){
                      if(k>=8){
                        sites[k].show = false;
                      }
                    }
                  }
                }
              }
            }
          }

        }
    }
</script>

<style lang="less" scoped>
  .tabsRight{
    width: 7.03rem;
    height: 100vh;
    position: relative;
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
    background-color: #ffffff!important;
  }
  ::-webkit-scrollbar{
    display: none;
    width: 0 !important;
  }

  .exchanges{
    padding-bottom: 3rem;
    display: flex;
    flex-flow: column;
    overflow-y: scroll;
    height: auto;
    -webkit-overflow-scrolling: touch;
    .tabsRightName{
      padding:.32rem 0 0 .32rem;
      font-weight: bold;
      font-size: 16px;
      color: #202020;
    }
    .exchangeList {
      height: auto;
      padding: .32rem 0 0rem .3rem;
      -webkit-overflow-scrolling: touch;
      h1{
        font-weight: bold;
        font-size: 14px;
        color: #202020;
        letter-spacing: 0.24px;
      }
      .typeLists{
        width: 100%;
        height: auto;
        display: flex;
        flex-flow: wrap;
        -webkit-overflow-scrolling : touch;
        .typeList {
          width: 50%;
          padding: 25px 0;
          a{
            display: flex;
            align-items: baseline;
            height: auto;
            width: 100%;
            img{
              width: 11px;
              height:11px;
              display: block;
              vertical-align:middle;
            }
            span{
              font-size: 14px;
              color: #202020;
              letter-spacing: 0.21px;
              display: block;
              margin-left: .06rem;
              word-wrap:break-word;
            }
          }
        }
      }
    }
  }

  .arrowMore {
    display: flex;
    padding: 0 0 .4rem 3.2rem;
    cursor: pointer;
    span{
      font-size: .26rem;
      color: #908F8F;
      margin-right: .1rem;
    }
  }
  .arrowCollapse {
    display: flex;
    width: 100%;
    padding: .5rem 0 .4rem 3rem;
    cursor: pointer;
    span{
      font-size: .26rem;
      color: #908F8F;
      letter-spacing: 0.21px;
      margin-right: .1rem;
    }
  }
</style>
