<template>
  <div class="loading-page">
   <div class="loading">
     <img src="~assets/img/1.svg" alt="">
   </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="less" scoped>
  .loading-page{
    position :fixed;
    top :0;
    left :0;
    z-index: 10000;
    width :100%;
    height :100%;
    opacity: 1;
    transition :opacity .3s ease;
    box-sizing: border-box;
    background: white;
  }
  .loading{
    width:50px;
    position:absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    img{
    width: 100%;
    }
  }



</style>
