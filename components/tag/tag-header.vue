<template>
  <div class="chead-wrap">
    <header class="header-theme-1 ">
      <a href="javascript:void(0); " class="title">
        <img class="logo" src="~assets/img/wap_banner_logo.png" alt="logo_wap">
      </a>
      <h1>{{tagName |setString(30)}}</h1>
      <a class="head-icon" @click="menuButton">
        <img src="~assets/img/menu.png"   alt="menu.png">
      </a>
    </header>
  </div>
</template>

<script>

  export default {
    name: "tag-header",
    props:['tagName'],
    data(){
      return{
        langCode: this.$store.state.locale
      }
    },
    head () {
      return {
        title:this.tagName
      }
    },
    methods: {
      menuButton () {
        this.$emit('pageIsShow');
      },

    }
  }
</script>

<style lang="less" scoped>
  .chead-wrap{
    width: 100%;
    height: 64px;
    background: #ffffff;
    position: fixed;
    top:0;
    z-index: 100;
    .header-theme-1{
      width: 96%;
      margin: 0 2%;
      height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .title{
        img{
          width: 40px;
        }
      }
      .head-icon{
        img{
          width: 20px;
        }
      }
      h1{
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
</style>
