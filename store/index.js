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
        title: "wap",
        keys: "key",
        description: "description"
      },
      jp: {
        title: "wap",
        keys: "key",
        description: "description"
      },
      kr: {
        title: "wap",
        keys: "key",
        description: "description"
      },
      ru: {
        title: "wap",
        keys: "key",
        description: "description"
      }
    },
    briefHead:{
      jp:{
        title: "wap",
        keys: "key",
        description: "description"
      },
      kr:{
        title: "wap",
        keys: "key",
        description: "description"
      },
      ru:{
        title: "wap",
        keys: "key",
        description: "description"
      }
    },
    guideHead:{
      jp:{
        title: "wap",
        keys: "key",
        description: "description"
      },
      kr:{
        title: "wap",
        keys: "key",
        description: "description"
      },
      ru:{
        title: "wap",
        keys: "key",
        description: "description"
      }
    },
    homeHead:{
      jp:{
        title: "wap",
        keys: "key",
        description: "description"
      },
      kr:{
        title: "wap",
        keys: "key",
        description: "description"
      },
      ru:{
        title: "wap",
        keys: "key",
        description: "description"
      }
    }
  },
  mutations,
  getters,
  actions
})

export default store
