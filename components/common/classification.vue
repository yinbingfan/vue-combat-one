<template>
  <div class="chead-wrap">
    <header class="header-theme-1 ">
      <a href="javascript:void(0); " class="title">
        <img class="logo" src="~assets/img/logo_wap.svg" alt="logo_wap">
      </a>
      <drop-down-select v-if="dropSelect"/>
      <a class="head-icon" @click="menuButton">
        <img src="~assets/img/menu.png"   alt="menu.png">
      </a>
    </header>
  </div>
</template>

<script>
  import dropDownSelect from '~/components/home/drop-down-select.vue'
  export default {
    name: "classification",
    props:['dropSelect'],
    components: {
      dropDownSelect
    },
    data(){
      return{
        isShow:true,
        langCode: this.$store.state.locale,
      }
    },
    methods: {
      menuButton () {
        this.$emit('pageIsShow');
      }
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
          width: 80px;
        }
      }
      .head-icon{
        img{
          width: 20px;
        }
      }
    }
  }
</style>
