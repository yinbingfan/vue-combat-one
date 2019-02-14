<template>
  <van-tabs class="currency_tab" @click="marketTab" type="line" color="#ffffff">
    <van-tab  v-for="(item, index) in currencyList" :key="index"
              :title="item.virCurrencyCode">
    </van-tab>
  </van-tabs>
</template>

<script>
    export default {
        name: "currency-tab",
        props: {
          currencyList: {
            type: Array,
            default: []
          }
        },
        methods:{
          marketTab(index,title){
            this.$emit('tabChannel', title)
          }
        }
    }
</script>

<style  lang="less">
  .currency_tab{
    position: fixed;
    top:64px;
    left: 0;
    z-index: 600;
    width: 100%;
  }
  .van-tab{
    background-color: #fec930;
  }
  .van-tabs__wrap--scrollable .van-tab {
    flex: 0 0 17% !important;
  }
  .van-tabs__line{
    bottom: 22px;
    width: 32px!important;
  }
  .van-ellipsis{
    color:rgba(255,255,255,1);
    font-size: 15px;
  }
</style>
