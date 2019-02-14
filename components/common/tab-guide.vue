<template>
  <div class="content-menu">
    <a  :href="`../../${this.langCode}/`">{{$t('common.News')}}</a>
    <a  :href="`../../${this.langCode}/brief`">{{$t('common.Brief')}}</a>
    <a  :href="`../../${this.langCode}/market`">{{$t('common.MarketPrice')}}</a>
    <a  :href="`../../${this.langCode}/guide`">{{$t('common.WebGuide')}}</a>
  </div>
</template>

<script>
    export default {
        name: "menu-guide",
        data(){
          return{
            langCode: this.$store.state.locale,
          }
        }
    }
</script>

<style lang="less" scoped>
  .content-menu{
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.95);
    a{
      display: block;
      height: 80px;
      width: 55%;
      margin: 0 auto;
      padding: .6rem .8rem;
      border-bottom: 1px solid rgba(180,179,179,.5);
      font-size: 18px;
      color: #202020;
      letter-spacing: -0.43px;
      text-align: center;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
  }
</style>
