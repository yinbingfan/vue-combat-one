<template>
  <div class="tabsLeft" >
    <div class="silderNavs" >
      <div  class="silderNavlists" v-for="(item , index) in navList" :key="index"
           :class="isActive == index?'active':''"  @click="guideTab(index)">
        <span class="navName">{{item.nav}}</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "guide-tab",
      props: ['navList','isActive'],
      methods:{
        guideTab(index){
          this.$emit('tabChannel', index)
        }
      }
    }
</script>

<style lang="less" scoped>
  ::-webkit-scrollbar{
    display: none;
    width: 0 !important;
  }
  .tabsLeft{
    width: 2.86rem;
    height: 100vh;
    background: #FAFAFA;
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
    .silderNavs{
      padding-bottom: 1rem;
      overflow: scroll;
      background: #FAFAFA;
      cursor: pointer;
      outline:none;
      -webkit-overflow-scrolling: touch;
      -webkit-tap-highlight-color:rgba(0,0,0,0);
      -webkit-tap-highlight-color: transparent;
      .silderNavlists{
        line-height: 30px;
        font-size: 14px;
        color: #908F8F;
        letter-spacing:0.24px;
        padding-left: .1rem;
        word-wrap: break-word;
        word-break: normal;
        .navName{
          width: 2.0rem;
          padding: .2rem;
          display: inline-block;
          border-bottom: 1px solid rgba(180,179,179,.4);
          cursor: pointer;
        }
      }
      .active{
        background: #FFFFFF;
        color: #202020;
        border-left:.06rem solid #FEC930;
        line-height: .8rem;
        -webkit-user-select: none;
        user-select: none;
        .navName{
          border: none;
        }
      }
    }
  }
</style>
