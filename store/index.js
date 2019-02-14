import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

function createCode(){
  let code = "";
  let codeLength = 12;//验证码的长度
  let random = new Array(0,1,2,3,4,5,6,7,8,9,
    'a','b','c','d','e','f',
    'g','h','i','j','k','l',
    'm','n','o','p','q','r',
    's','t','u','v','w','x','y','z',
    'A','B','C','D','E',
    'F','G','H','I','J','K','L','M',
    'N','O','P','Q','R',
    'S','T','U','V','W','X','Y','Z');//随机数
  for(let i = 0; i < codeLength; i++) {
    //循环操作
    let index = Math.floor(Math.random()*62);//取得随机数的索引（0~35）
    code += random[index];//根据索引取得随机数加到code上
  }

  // this.randomNumber = code;//把code值赋给验证码
  return code
}
Vue.use(Vuex)

const store = () => new Vuex.Store({


  state: {
    locales: ['jp', 'kr', 'ru','en','cn'],
    locale: 'jp',
    languageId: 152,
    random:createCode(),
    marketHead: {
      en: {
        title: "Dbit",
        keys: "key",
        description: "description"
      },
      jp: {
        title : 'Dbit-価格と資本|ビットコイン価格　仮想通貨価格　ビットコイン相場情報　XRP相場情報|theDbit',
        keys:'ETH価格、XRP価格、BTC価格、MONA価格、XRP価格',
        description:'Dbitが主要な取引所のデータベースと繋ぎ、ユーザーはリアルタイムに仮想通貨価格を得ます。' +
               'ビットコイン相場情報、仮想通貨相場情報、イーサリアム相場情報、' +
            'リップル相場情報なのCryptocurrency価格トレンドを判断できます。'
      },
      kr: {
        title: "Dbit-가격정보및 시세|비트코인 가격 가상화폐 가격 비트코인 시세 XRP시세| theDbit",
        keys: "이더리운 가격, 리플 가격, BTC 가격, MONA 가격, XRP 가격",
        description: "Dbit 여러 군데 거래소의 데이터를 제공 받고 있으며 사용자는 즉시로 암호화폐 가격을 얻음로써 비트코인 시세, ' +\n" +
                      "  '암호화폐 시세,' +\n" +
                      "  ' 이더리움 시세, 리플 시세등 Cryptocurrency 가격 추세를 파악할 수 있게 됩니다."
      },
      ru: {
        title: 'Dbit - курсы и котировки|курсы Биткойна    \n' +
        'курсы виртуальных валют         котировка Биткойа \n' +
        'котировка XRP|theDbit',
        keys: 'курсы Ethereum, курсы Ripple, курсы BTC, курсы MONA, курсы XRP',
        description: 'Dbit устанавливает базы данных основных криптобирж, ' +
        'пользователи могут вовремя получить курсы виртуальных валют,' +
        ' чтобы точно определить тенденцию курсов биткойна,' +
        ' эфириума, Ripple и других криптовалют.'

      }
    },
    briefHead:{
      jp:{
        title : 'Dbit-まとめ|ビットコインまとめ 仮想通貨まとめ　リップルまとめ| theDbit',
        keywords:'blockchain速報、BTC速報、XRP速報、ETH速報',
        description:'世界中bitcoin速報、coinmarketcap速報、altcoin速報、Ethereum速報、' +
          'Ripple速報などの仮想通貨速報をリアルタイムに更新します。同時に公式twitterの速報も更新します。'

      },
      kr:{
        title : 'Dbit-속보|비트코인 속보 암호화폐 속보 리플 속보| theDbit',
        keywords:'blockchain 속보, BTC 속보, XRP 속보, ETH 속보.',
        description:'실시간으로 전세계의 bitcoin속보, coinmarketcap 속보, altcoin 속보, ' +
          '이더리움 속보, 리플 속보등 가상화폐 속보를 제공합니다. 또한 트위터 공식 계정에 실시간 동기화합니다. '

      },
      ru:{
        title : 'Dbit-репортаж|репортаж о Биткойне            \n' +
          'репортаж о виртуальных валютах     репортаж о Ripple| theDbit',
        keywords:'репортаж о блокчейне, репортаж о BTC, репортаж о XRP, репортаж о ETH',
        description:'Можно получить репортажи о Биткойне, coinmarketcap, альткоинов, Ethereum, ' +
              'Ripple и других виртуальных валютах со всего мира. Одновременно ' +
              'официальные новости на Твиттере также будут синхронизованными в реальном времени.'


      }
    },
    guideHead:{
      jp:{
        title : 'Dbit-サイト案内 | ビットコイン投資  ビットコイン取引ビットコインウォレットXRP取引| theDbit',
        keywords:'イーサリアム取引、イーサリアム投資、BTCウォレット、ETHウォレット、リップル投資',
        description:'Dbitユーザーがいつでもデジタル通貨に関する仮想通貨取引、仮想通貨投資などの情報にアクセスできます。' +
          '同時に、このセクションにアクセスして、' +
          '仮想通貨ウォレット、白書、スマート契約、取引所、ブロックチェーンテクノロジ、DAPPなどの情報を得られます。'

      },
      kr:{
        title : 'Dbit-사이트 가이드라인| 비트코인투자 비트코인 투자 비트코인 지갑 XRP 거래|theDbit',
        keywords:'이더리움 거래, 이더리움 투자, BTC 지갑, ETH 지갑, 리플 투자',
        description:'사용자는 디비트 통해서 암호화폐와 관련된 암호화폐거래 정보및 암호화폐 투자등 정보를 수시로 조회할 수 있습니다, ' +
          '또한 암호화폐 지갑, 백서, 스마트계약, 거래소, 블록체인 기술, ' +
          'Dapp 등 정보에 대해서 방문하고 싶다면 가이드라인을 이용하셔서  관련된 정보를 받아 보실 수 있습니다. '
      },
      ru:{
        title : 'Dbit-руководство сайта|инвестиция в биткойн    \n' +
        'трейдинг Биткойнами      Биткойн-кошелёк    \n' +
        'трейдинг XRP|theDbit',
        keywords:'трейдинг Ethereum, инвестиция в Ethereum, BTC-кошелёк,  ETH-кошелёк, инвестиция в Ripple',
        description:'Пользователи Dbit могут в любое время посещать криптобиржи,' +
          ' связанные с данной виртуальной валютой и получать информацию инвестиций в виртуальных валютах и т.д..' +
          ' В то же время другую информацию, ' +
          'такую как кошельки виртуальных валютных, белая бумага, интеллектуальные контракты, биржи,' +
          ' технология блокчейн, DAPP, также можете получить на данной рубрике.'

      }
    },
    homeHead:{
      jp:{
        title:'Dbit-ニュース|ビットコイン ブロックチェーン ビットコインニュース  ブロックチェーンニュース| theDbit',
        keywords:'ICOニュース、BTC news、blockchainニュース、Bitcoin news、blockchain news',
        description:'Dbitがユーザーにイーサリアム ニュース、リップルニュース、仮想通貨ニュース、Cryptocurrencyニュースを提供しています。ユーザーがビットコイン、altcoin、ETH、XRPなどの仮想通貨に関するリアルタイムニュース及び金融技術、ブロックチェーン会議、エアドロップなどの情報を把握できます。'
      },
      kr:{
        title:'Dbit-뉴스|비트코인 블록체인 비트코인 뉴스 블록체인 뉴스',
        keywords:'ICO뉴스,BTC news, blockchain뉴스, Bitcoin news, blockchain news',
        description:'디비트는 사용자에게 이더리움 뉴스, 리플 뉴스, 암호화폐 뉴스와Cryptocurrency 뉴스를 제공합니다. 사용자는 실시간으로 비트코인, altcoin、ETH、XRP등 암호화폐와 관련된 최신 뉴스를 보실 수 있습니다. 또한 핀테크, 블록체인 포럼, airdrop등 업계 소식 실기간 전달합니다.'
      },
      ru:{
        title:'Dbit-новости|Биткоин    Блокчейн   Новости биткойна         Новости Блокчейна|theDbit',
        keywords:'новости ICO, новости BTC, новости о блокчейне, новости биткойна, новости blockchain',
        description:'Dbit предоставляет новости о ETH, XRP и других криптовалютах. Пользователи могут получать первичные новости о Bitcoin, Altcoin, ETH, XRP и других виртуальных валютах в реальном времени. Другие отраслевые тенденции, такие как финансовые технологии, конференции блокчейн, airdrop, также будут своевременно выдвинуты.'
      }
    }
  },
  mutations,
  getters,
  actions
})

export default store
