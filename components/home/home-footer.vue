<template>
  <div class="footer" >
    <div class="JoinUsOn">
      {{$t(("common.JoinUsOn"))}}
    </div>
    <div class="JoinBottom"></div>
    <social-footer/>
    <p class="copyRight">©Copyright by Dbit 2018</p>
  </div>
</template>

<script>
  import socialFooter from '~/components/common/social-footer.vue'
    export default {
        name: "home-footer",
        components: {
          socialFooter

        },
    }
</script>

<style lang="less" scoped>
  .footer {
    display: block;
    width: 100%;
    background: #EEF1F6;
    padding-top: 10px;
    .JoinUsOn{
      text-align: center;
    }
    .JoinBottom {
      height: 2px;
      width: 16px;
      background: #FDB438;
      border-radius: 3px;
      margin: 6px auto;
    }
  }
  .copyRight{
    font-size: 12px;
    color: #B4B3B3;
    text-align: center;
    margin-top: 20px;
    padding-bottom:40px;
  }
</style>
