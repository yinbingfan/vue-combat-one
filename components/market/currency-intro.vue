<template>
  <!--交易所展示区域-->
  <div class="Exchange-list">
    <div class="Exchange-list-left">
      <img  :src="currency.logo" :alt="currency.logo">
      <div class="Exchange-list-name">
        <div class="Exchange-list-bi">{{currency.currency}}</div>
        <div class="Exchange-list-zhong">{{currency.name}}</div>
      </div>
    </div>
    <div class="Exchange-list-right">
      <div class="Exchange-list-right-data">
        <div  class="turnover"
              v-if="currency.price!=undefined">
          {{currency.mark}}{{currency.price |formatDouble}}
        </div>
        <div class="gray" v-else>-</div>
        <div class="trend"
             v-if="currency.percent_change_24h>0">
          +{{currency.percent_change_24h}}%
        </div>
        <div class="trendRed"
             v-else-if="currency.percent_change_24h<0">
          {{currency.percent_change_24h}}%
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "currency-intro",
        props: ['currency'],
    }
</script>

<style lang="less" scoped>
  .Exchange-list{
    width: 96%;
    margin: 107px 2% 0;
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #B4B3B3;
    background: #ffffff;
    .Exchange-list-left{
      display: flex;
      align-items: center;
      img{
        display: block;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right:6px;
      }

      .Exchange-list-bi{
        font-size: 20px;
        font-weight: bold;
        color: #202020;
        letter-spacing: -0.96px;
      }
      .Exchange-list-zhong{
        font-size: 12px;
        color: #202020;
        letter-spacing: -0.99px;
      }
    }

    .Exchange-list-right{
      width: 50%;
      .gray{
        text-align: right;
      }
      .Exchange-list-right-data{
        .turnover{
          font-size:16px;
          color: #0E0E0E;
          letter-spacing: -0.96px;
          text-align: right;
          line-height:28px;
        }
        .trend{
          font-size: 12px;
          color: #3BD41F;
          letter-spacing: -0.96px;
          text-align: right;
        }
        .trendRed{
          font-size: 12px;
          color: #E76D42;
          letter-spacing: -0.96px;
          text-align: right;
        }
      }
    }
  }
</style>
