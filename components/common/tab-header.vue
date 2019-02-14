<template>
  <div class="head-wrap">
    <header class="header-theme-1 ">
      <a href="javascript:void(0); " class="title">
        <img class="logo" src="~assets/img/logo_wap.svg" alt="logo_wap">
      </a>
      <a class="head-icon" @click="close">
        <img src="~assets/img/close.png" alt="">
      </a>
    </header>
  </div>
</template>

<script>
  export default {
    methods:{
      close () {
        this.$emit('isPageShow')
      },
    }
  }
</script>
<style lang="less" scoped>
  .head-wrap {
    width: 100%;
    background: #ffffff;
    z-index: 200;
    .header-theme-1{
      width: 96%;
      margin: 0 2%;
      height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title{
        .logo{
          width: 80px;
        }
      }
    }
    .head-icon{
      img{
        width: 20px;
      }
    }
  }
</style>
