<template>
  <section class="container">
     <loading v-if="loading"/>
    <classification @pageIsShow="menuShow"/>
    <currency-tab :currencyList="currencyList" @tabChannel="handlerTabExchange"/>
    <currency-intro v-if="exchange" :currency="exchange"/>
    <high-low v-if="exchange" :currency="exchange"/>
    <market-list-item :marketCurrency="marketCurrency"/>
    <footer-banner/>
    <div v-if="isShowMeun" class="menu-guide" @touchmove="touchGuide">
      <menu-header @isPageShow="pageShow"/>
      <menu-guide/>
    </div>
    
  </section>
</template>

<script>
import classification from "~/components/common/classification.vue";
import footerBanner from "~/components/common/footer-banner.vue";
import menuGuide from "~/components/common/tab-guide.vue";
import menuHeader from "~/components/common/tab-header.vue";
import currencyTab from "~/components/market/currency-tab.vue";
import currencyIntro from "~/components/market/currency-intro.vue";
import highLow from "~/components/market/hight-low.vue";
import marketListItem from "~/components/market/market-list-item.vue";
import loading from '~/components/common/loading.vue'
export default {
  name: "market",
  components: {
    classification,
    footerBanner,
    menuGuide,
    menuHeader,
    currencyTab,
    marketListItem,
    currencyIntro,
    highLow,
    loading
  },
  head() {
    return {
      title: this.$store.state.marketHead[this.langCode].title,
      meta: [
        {
          hid: "market",
          name: "keywords",
          content: this.$store.state.marketHead[this.langCode].keys
        },
        {
          hid: "market",
          name: "description",
          content: this.$store.state.marketHead[this.langCode].description
        },
        { hid: "market", name: "referrer", content: "no-referrer" }
      ]
    };
  },
  data() {
    return {
      langCode: this.$store.state.locale,
      isShowMeun: false,
      getRandom: "",
      currencyList: [],
      // websocketsUrl:'172.30.30.99:9080',
      websocketsUrl: process.env.socketUrl || "172.30.11.49:39080",
      currencyCode: "",
      active: 0,
      marketCurrency: [],
      exchange: [],
      ws: "",
      loading:false
    };
  },
  mounted() {
    this.setLocalStorageRandom();
    this.loadMoreCurrency();
  },
  created(){
    this.isLoading()
  },
  methods: {
    menuShow() {
      this.isShowMeun = true;
    },
    pageShow() {
      this.isShowMeun = false;
    },
    touchGuide(e) {
      e.preventDefault();
    },
    /*
     * 点击切换币种列表
     * @param title 币种
     * */
    handlerTabExchange(title) {
      this.currencyCode = title;
      this.getData(this.ws, title);
      this.ws.onmessage = evt => {
        let lists = JSON.parse(evt.data).lists;
        this.exchange = JSON.parse(evt.data).currency;
        if (lists) {
          lists.sort(
            (a, b) => Number(b.data.volume_1day) - Number(a.data.volume_1day)
          );
          this.marketCurrency = lists;
        }
      };
    },
    /*
     * 获取随机数
     * */
    setLocalStorageRandom() {
      this.getRandom = window.localStorage.getItem("code");
      if (this.getRandom != null && this.getRandom != "") {
        return this.getRandom;
      } else {
        window.localStorage.setItem("code", this.$store.state.random);
        return (this.getRandom = this.$store.state.random);
      }
    },
    /*
     * 获取币列表
     * */
    async loadMoreCurrency() {
      let Currency = await this.$store.dispatch("FETCH_MARKET_CURRENCY", {
        languageId: this.$store.state.languageId
      });
      this.currencyList = Currency.data.lists;
      this.currencyCode = Currency.data.lists[this.active].virCurrencyCode;
      this.init();
    },
    /*
     * 初始化界面
     * 调用ws
     * */
    init() {
      if ("WebSocket" in window) {
        this.ws = new WebSocket(
          "wss://" + this.websocketsUrl + "/socketServer/" + this.getRandom
        );
      } else if ("MozWebSocket" in window) {
        this.ws = new MozWebSocket(
          "wss://" + this.websocketsUrl + "/socketServer/" + this.getRandom
        );
      } else {
        alert("该浏览器不支持websocket");
      }

      this.ws.onopen = () => {
        this.getData(this.ws, this.currencyCode);
      };

      this.ws.onmessage = evt => {
        let lists = JSON.parse(evt.data).lists;
        this.exchange = JSON.parse(evt.data).currency;
        if (lists) {
          lists.sort(
            (a, b) => Number(b.data.volume_1day) - Number(a.data.volume_1day)
          );
          this.marketCurrency = lists;
        }
      };
      this.ws.onclose = () => {
        // 重连
        setTimeout(() => {
          this.init();
        }, 500);
      };
    },
    /*
     * 获取WebSocket的data
     * @param ws 调用ws send方法
     * @param userId ：随机数
     * @param languageId：对应的语言码id
     * @param currencyCode：币种
     * */
    getData(ws, currencyCode) {
      let currency = {};
      currency.pushFlag = "currency_send_all";
      currency.userId = this.getRandom;
      currency.param = JSON.stringify({
        languageId: this.$store.state.languageId,
        currencyCode: currencyCode
      });
      ws.send(JSON.stringify(currency));
    },
    isLoading(){
      this.loading=true
      setTimeout(() => this.loading=false, 1000)
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  background: #ffffff;
}
</style>
