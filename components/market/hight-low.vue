<template>
  <div class="quotes-table" >
    <div class="quotes-table-hight low">
      <span class="quotes-table-title">{{$t(("market.High"))}}</span>
      <div class="volume">
        <span v-if="currency.max_price_in_24h!=undefined" class="price foldLine">
            {{currency.mark}}{{currency.max_price_in_24h|formatDouble}}
        </span>
        <span class="gray" v-else>-</span>
      </div>
    </div>
    <div class="quotes-table-hight low">
      <span class="quotes-table-title">{{$t(("market.Low"))}}</span>
      <div class="volume">
       <span v-if="currency.min_price_in_24h!=undefined" class="price foldLine">
        {{currency.mark}}{{currency.min_price_in_24h|formatDouble}}
       </span>
        <span class="gray" v-else>-</span>
      </div>
    </div>
    <div class="quotes-table-hight low cap">
      <span class="quotes-table-title">{{$t(("market.cap"))}}</span>
      <div class="volume">
        <span class=" foldLine" v-if="currency.market_cap_usd!=undefined">
              {{currency.mark}}{{currency.market_cap_usd| BinaryProcess}}
        </span>
        <span class="gray" v-else> - </span>
      </div>
    </div>
    <div class="quotes-table-hight">
      <span class="quotes-table-title">{{$t(("market.Volume"))}}(24{{$t(("market.h"))}}）</span>
      <div class="volume">
        <span  class="volumeDays" v-if="currency.volume_usd_24h!=undefined">
           {{currency.mark}}{{currency.volume_usd_24h| BinaryProcess}}
        </span>
        <span class="volumeDay" v-else>-</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "hight-low",
        props: ['currency'],
    }
</script>

<style lang="less" scoped>
  .quotes-table{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-around;
    background: #FFFFFF;
  }
  .quotes-table-hight{
    display: flex;
    flex-flow: column;
    align-items: center;
    margin: 13px 0;
    justify-content: center;
    width: 25%;
    font-size: 10px;
    .quotes-table-title{
      font-size: 12px;
      color: #B4B3B3;
      letter-spacing: -0.63px;
      margin-bottom: .1rem;
      word-wrap:break-word;
      text-align: center;
    }
    .changeRed{
      color: #6DD046 ;
    }
    .red{
      color: #F86464 ;
    }
    .gray{
      color: #B4B3B3;
    }
    span{
      display: block;

    }
    span:nth-of-type(2){
      font-size: 12px;
      color: #202020;
      letter-spacing: -0.63px;
      display: flex;
      word-wrap:break-word;
      justify-content: center;

    }
  }
  .low{
    border-right: 1px solid rgba(180,179,179,.5);
  }
  .price{
    color: #202020;
  }

  .volume{
    width: 100%;
    text-align: center;
    word-wrap:break-word;
    .volumeDays{
      color: #202020!important;
    }
    .volumeDay{
      color: #B4B3B3!important;
    }
  }

  .foldLine{
    display: inline-block;
    width: 100%;
    word-wrap:break-word;
  }

  .changePercent{
    width: 15%;
    text-align: left;
  }

</style>
