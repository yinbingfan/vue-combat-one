<template>
  <div class="market-list-item">
    <div class="quotesForm">
      <ul class="quotesHeader">
        <li class="Exchanges-name">
          {{$t(("market.Exchanges"))}}
        </li>
        <li class="Exchanges-Volume">{{$t(("market.Volume"))}}(24{{$t(("market.h"))}}）</li>
        <li class="latest">{{$t(("market.Latest"))}}</li>
        <li>{{$t(("market.Changes"))}}</li>
      </ul>

      <ul class="quoteshuobi" v-for="(item,index) in marketCurrency" :key="index">
        <div class="huobileft">
          <img :src="item.logo" :alt="item.logo">
          <span >{{item.exchange}}</span>
        </div>
        <li class="units_traded">
          <span class="foldLine latest" v-if="item.data!= null && item.data.volume_1day!=null ">
              {{item.localCurrencyMark}}{{item.data.volume_1day|BinaryProcess}}
          </span>
          <span class="gray" v-else>
              -
          </span>
        </li>
        <li class="center">
          <span class="foldLine latest" v-if="item.data!= null">
              {{item.localCurrencyMark}}{{item.data.closing_price|formatDouble}}
          </span>
          <span class="gray" v-else>
              -
          </span>
        </li>
        <li class="changePercent">
          <span class="changGreen"
                v-if="item.data != null && item.data.changePercent>0">
            +{{item.data.changePercent}}%
          </span>
          <span class="red"
                v-else-if="item.data != null && item.data.changePercent<0">
            {{item.data.changePercent}}%
          </span>
          <span class="changGreen"
                v-else-if="item.data != null && item.data.changePercent=='0.00'">
            0.00%
          </span>
          <span class="gray" v-else> - </span>
        </li>
      </ul>

    </div>

  </div>
</template>

<script>
    export default {
        name: "market-list-item",
        props: ['marketCurrency'],
    }
</script>

<style lang="less" scoped>
  .market-list-item{
    margin: 0;
    background: #ffffff;
    display: flex;
    flex-flow: wrap;
  }
  .quotesForm{
    width: 100%;
    height: auto;
    background: #ffffff;
    ul{
      width: 100%;
    }
  }
  .quotesHeader{
    height:40px;
    width: 100%;
    line-height: 40px;
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    color: #B4B3B3;
    letter-spacing: 0;
    text-align: center;
    background: #EEF1F6;
    li{
      width: 25%;
    }
    .Exchanges-name{
      width: 20% ;
    }
    .Exchanges-Volume{
      width: 30%;
      text-align: right;
    }
  }

  .quoteshuobi{
    width: 100%;
    line-height: 50px;
    display: flex;
    justify-content: space-around;
    font-size: 11px;
    color: #202020;
    letter-spacing: 0;
    text-align: center;
    border-bottom: 1px solid rgba(180,179,179,0.5);
    .units_traded{
      width: 21%;
      text-align: left;
    }
    .center{
      text-align: center;
      width: 32%;
    }
    .changePercent{
      width: 15%;
      text-align: left;
      .changGreen{
         color: #6DD046 ;
      }
    }

    .huobileft {
      width: 25%;
      margin:0 2%;
      text-align: left;
      display: flex;
      align-items: center;
      img{
        margin-right: 10px;
        display: block;
        width: 18px;
        height: 18px;
      }
      span{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
  .gray{
    color: #B4B3B3;
  }
  .red{
    color: #F86464;
  }
  .boderBottomTab{
    display: inline-block;
    position: absolute;
    bottom: -5px;
    left: 25%;
    width: 45%;
    height: .04rem;
    background: #FFFFFF;
    margin-top: .1rem;
  }
</style>
