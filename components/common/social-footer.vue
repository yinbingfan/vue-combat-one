<template>
  <div>
    <div class="external" v-if="langCode=='ru'">
      <a href="https://www.facebook.com/groups/bcnews34/">
        <img src="~assets/img/facebook@2x.png" alt="facebook@2x.png">
      </a>
      <a href="https://twitter.com/DBitRU">
        <img src="~assets/img/twitter@2x.png" alt="twitter@2x.png">
      </a>
      <a href="https://t.me/bitcoinnews34">
        <img src="~assets/img/telegram.png" alt="telegram.png">
      </a>
      <a href="https://vk.com/bcnews34">
        <img src="~assets/img/VK.png" alt="VK.png">
      </a>
    </div>

    <div class="external" v-if="langCode=='kr'">
      <a href="https://www.facebook.com/groups/1784066818556777">
        <img src="~assets/img/facebook@2x.png" alt="facebook@2x.png">
      </a>
      <a href="https://twitter.com/DbitKR">
        <img src="~assets/img/twitter@2x.png" alt="twitter@2x.png">
      </a>
      <a href="https://t.me/KRblockchain">
        <img src="~assets/img/telegram.png" alt="telegram.png">
      </a>
      <a href="http://post.naver.com/my.nhn?memberNo=41234546">
        <img src="~assets/img/naverpost.png" alt="naverpost.png">
      </a>
    </div>
    <div class="external" v-if="langCode=='jp'">
      <a href="https://www.facebook.com/groups/177144199612662">
        <img src="~assets/img/facebook@2x.png" alt="facebook@2x.png">
      </a>
      <a href="https://twitter.com/DBitJP">
        <img src="~assets/img/twitter@2x.png" alt="twitter@2x.png">
      </a>
      <a href="http://line.me/ti/p/bKtiJPhcPi">
        <img src="~assets/img/line@2x.png" alt="line@2x.png">
      </a>
      <a href="https://blogs.yahoo.co.jp/bishijie_0212/MYBLOG/yblog.html">
        <img src="~assets/img/yooho@2x.png" alt="yooho@2x.png">
      </a>
    </div>
  </div>

</template>

<script>
    export default {
      name: "social-footer",
      data(){
        return{
          langCode: this.$store.state.locale
        }
      },
    }
</script>

<style lang="less" scoped>
  .external {
    display: flex;
    justify-content: space-between;
    margin: .4rem 1.3rem .37rem 1.3rem;
    a {
      display: block;
      width: 15px;
      height: 15px;
      img{
        width: 100%;
      }
    }
  }
</style>
