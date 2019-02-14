<template>
  <div class="main-content">
    <div class="dbit-logo">
      <img src="~assets/img/intermediate_logo.png" alt="">
    </div>
    <p class="dbit-title">
      {{$t('Intermediate.DbitMedia')}}
    </p>
    <div class="dbit-photo">
      <img   v-if="langCode==='kr'" src="~assets/img/intermediate_phone_kr.png" alt="">
      <img   v-else-if="langCode==='jp'" src="~assets/img/intermediate_phone_jp.png" alt="">
      <img   v-else-if="langCode==='ru'" src="~assets/img/intermediate_phone_ru.png" alt="">
      <img   v-else  src="~assets/img/intermediate_phone_jp.png" alt="">
    </div>
    <div class="dbit-des">
      <h2 :class="[blockchainMedia>15 ? 'active' : '']">{{$t('Intermediate.blockchainMedia')}}</h2>
      <p>
        {{$t('Intermediate.DbitContent')}}
      </p>
    </div>
    <div class="dbit-button" id="downloadButton">
      {{$t('Intermediate.Download')}}
    </div>
    <p class="dbit-button-des">
      {{$t('Intermediate.DownloadNow')}}
    </p>
  </div>
</template>

<script>
    export default {
        name: "intermediate-content",
        data(){
          return{
            langCode: this.$store.state.locale,
            blockchainMedia:this.$t('Intermediate.blockchainMedia').length,
            DbitContent:this.$t('Intermediate.DbitContent').length
          }
        }
    }
</script>


<style lang="less" scoped>
  .main-content{
    width: 100%;
    height: auto;
    background: url("~assets/img/intermediate_bg.png");
    background-size: cover;
    .dbit-logo{
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: .64rem;
      img{
        width: 1.94rem;
        height: 1.94rem;
      }
    }
  }
  .dbit-title{
    font-size: .54rem;
    color: #00ffde;
    text-align: center;
    margin: .60rem 0 .98rem;
  }
  .dbit-photo{
    margin: 0 8%;
    img{
      width: 100%;
    }
  }
  .dbit-des{
    .active{
      font-size: .5rem;
    }
    h2{
      font-weight: bold;
      font-size: .70rem;
      color: #00ffde;
      text-align: center;
      margin: .96rem  2% .64rem;
    }
    p{
      margin: 0 6%;
      font-size: .46rem;
      color: #00ffde;
      text-align: center;
      line-height: .74rem;
    }
  }
  .dbit-button{
    width: 80%;
    height: 1.20rem;
    color: #020b1c;
    font-size: .60rem;
    background: #FDB438;
    border-radius: .60rem;
    text-align: center;
    line-height: 1.2rem;
    margin: .68rem  10% .32rem;
  }
  .dbit-button-des{
    font-size: .38rem;
    color: #00ffde;
    text-align: center;
    line-height: .54rem;
    padding-bottom: 1rem;
    margin: 0 5%;
  }

  @media only screen and (min-device-width: 550px) {
    html {
      display: flex;
      justify-content: center;
      background-color: #fafafa;
    }
    body {
      width: 500px !important;
    }
    .main-content {
      width: 500px !important;
    }
  }
</style>
