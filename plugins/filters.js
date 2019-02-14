import Vue from 'vue'
const moment  = require('moment')
/*
* 详情页发布时间
* */
export function detailsReleaseTime(date,judgment) {
  let onlyTime
  switch(judgment) {
    case "kr" :
      //2018-03-05 11:00 (不区分AM和PM，使用二十四小时制）
      moment.locale('ko');
      onlyTime =moment(date).format("YYYY-MM-DD  HH:mm");
      break;
    case "jp" :
      //2018/05/20  11:00 AM（区分AM和PM）
      moment.locale('ja');
      onlyTime =moment(date).format("YYYY/MM/DD  HH:mm A");
      break;
    case "ru" :
      //5 мар. 2018 г. 11:00 （俄罗斯采用24小时时间制）
      moment.locale('ru');
      onlyTime =moment(date).format("DD MMM YYYY [г.]  HH:mm");
      break;
  }
  return onlyTime
}
/*
* 快讯列表时间
* */
export function birefListTime(date) {
  let time = moment(date).format('HH:mm')
  return time.replace('|','at')
}
/*
* 快讯列表时间顶部
* */
export function birefTopTime(timestamp,judgment) {
  let now = Date.parse(new Date()) / 1000;
  let time = (timestamp)/ 1000;
  let limit = now - time;
  let nowDate = new Date();
  let time1 = new Date(timestamp)
  let onlyTime='';
  switch(judgment){
    case "kr" :
      moment.locale('ko');
      if (limit >= 0 && limit < 86400 && time1.getDate() == nowDate.getDate()) {
        onlyTime =moment(timestamp).format("[오늘] YYYY-MM-DD (dd) ");
      } else if (limit >= 86400 && limit < 172800 || time1.getDate() == (nowDate.getDate() - 1)) {
        onlyTime =moment(timestamp).format("[어제] YYYY-MM-DD (dd)");
      } else if (limit >= 172800){
        onlyTime =moment(timestamp).format("YYYY-MM-DD");
      }
      break;
    case "jp" :
      moment.locale('ja');
      if (limit >= 0 && limit < 86400 && time1.getDate() == nowDate.getDate()) {
        onlyTime =moment(timestamp).format("YYYY.MM.DD  [今日] dddd");
      } else if (limit >= 86400 && limit < 172800 || (time1.getDate()+1) == nowDate.getDate()) {
        onlyTime =moment(timestamp).format("YYYY.MM.DD  [昨日] dddd");
      } else if (limit >= 172800){
        onlyTime =moment(timestamp).format("YYYY.MM.DD");
      }
      break;
    case "ru" :
      moment.locale('ru');
      if (limit >= 0 && limit < 86400 && time1.getDate() == nowDate.getDate()) {
        onlyTime =moment(timestamp).format("[Сегодня] DD MMM YYYY [г.] dd. ");
      } else if (limit >= 86400 && limit < 172800  || (time1.getDate()+1) == nowDate.getDate()) {
        onlyTime =moment(timestamp).format("[Вчера] DD MMM YYYY [г.] dd.");
      } else if (limit >= 172800){
        onlyTime =moment(timestamp).format(" DD MMM YYYY [г.]");
      }
      break;
    default: ;
  }

  return onlyTime

}

/*
* 新闻列表时间
* */
export function newsListTime(timestamp,judgment) {
  //0分则显示“ナウ、Сейчас、지금”
  let now = Date.parse(new Date()) / 1000;
  let time1 = (timestamp)/ 1000;
  let limit = now - time1;
  let onlyTime='';
  switch(judgment){
    case "kr" :
      /*
      * 发布时间如果少于1小时，则显示“1분 전-59분 전”；
      * 如果介于1小时和24小时之间，则显示"1시간 전-24시간 전"；
      * 如果大于24小时，且为今年的文章，则显示具体时间点，如“03-23 13:24（不显示年）"；(韩国新闻基本都显示年月日+时间)
      * 如果为今年以前的文章，则显示“2018-03-23（即不显示具体时间）”。
      * */
      moment.locale('ko');
      if(limit <= 0){
        onlyTime='지금'
      }else if (limit >= 0 && limit < 3600) {
        onlyTime = Math.floor(limit / 60) + "분 전";
      } else if (limit >= 3600 && limit < 86400) {
        onlyTime = Math.floor(limit / 3600) + "시간 전";
      } else if (limit >= 86400 && limit < 31536000000) {
        onlyTime =moment(timestamp).format("MM-DD HH:mm");
      } else  {
        onlyTime =moment(timestamp).format("YYYY-MM-DD");
      }
      break;
    case "jp" :
      /*
      * 发布时间如果少于1小时，则显示“1分-59分”；
      *如果介于1小时和24小时之间，则显示“1時間-24時間”；
      *如果大于24小时，且为今年的文章，则显示具体时间点，如“03/23 13:24（不显示年）"；　
      *如果为今年以前的文章，则显示“2018 /03/23（即不显示具体时间）”。
      * */
      moment.locale('ja');
      if(limit <= 0){
        onlyTime='ナウ'
      }else if (limit >= 0 && limit < 3600) {
        onlyTime = Math.floor(limit / 60) + " 分";
      } else if (limit >= 3600 && limit < 86400) {
        onlyTime = Math.floor(limit / 3600) + " 時間";
      } else if (limit >= 86400 && limit < 31536000000) {
        onlyTime =moment(timestamp).format("MM/DD HH:mm");
      } else  {
        onlyTime =moment(timestamp).format("YYYY/MM/DD");
      }
      break;
    case "ru" :
      /*
      *发布时间如果少于1小时，则显示“1 мин. -59 мин. ”；
        如果介于1小时和24小时之间，则显示“1 ч. – 24 ч. ”；
        如果大于24小时，且为今年的文章，则显示具体时间点，如“13:24, 23 мар. （不显示年）"；
        如果为今年以前的文章，则显示“ 23 мар. 2018 г.（即不显示具体时间）”
      * */
      moment.locale('ru');
      if(limit <= 0){
        onlyTime='Сейчас'
      }else if (limit >= 0 && limit < 3600) {
        onlyTime = Math.floor(limit / 60) + " мин.";
      } else if (limit >= 3600 && limit < 86400) {
        onlyTime = Math.floor(limit / 3600) + " ч.";
      } else if (limit >= 86400 && limit < 31536000000) {
        onlyTime =moment(timestamp).format("HH:mm, DD MMM");
      } else  {
        onlyTime =moment(timestamp).format("DD MMM. YYYY г.");
      }
      break;
    default: ;
  }
  return onlyTime
}

function isIE(){
  if(!!window.ActiveXObject || "ActiveXObject" in window)
    return true;
  else
    return false;

}

export function setString(str, len, local) {
  if (process.browser) {
    if(local && !isIE()) return str
  }

  let strlen = 0;
  let s = "";
  let count = Math.floor(len/50)
  if(local == 'kr') {
    len += 10* count
  }
  try {
    for (let i = 0; i < str.length; i++) {

      if (str.charCodeAt(i) <= 255) {
        if (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) {
          strlen++;
        } else if (str.charCodeAt(i) == 32 || str.charCodeAt(i) == 39) {
          strlen++;
        } else if (str.charCodeAt(i) >= 48 && str.charCodeAt(i)<= 57) {
          strlen++;
        } else if (local == 'ru') {
          strlen++;
        } else {
          strlen += 2;
        }
      } else {
        strlen += 2;
      }
      if (strlen <= len) {
        s += str.charAt(i);
      } else {
        return s+"...";
      }
    }
  } catch (error) {

  }

  return s;

}
/*千位进制*/
export function formatDouble(value, integer){
  if(!value) return ''
  var num = parseFloat(value);
  num = num.toFixed(2)+"";
  var str = num.split(".")[0];
  var lis = num.split(".")[1];
  var siz = 0;
  var result = "";
  for (var i=str.length-1;i>=0;i--){
    siz++;
    if (siz%3==0){
      siz=0;
      result = ","+str.substr(i,3)+result;
    }
  }

  if (str.length%3 != 0){
    result = str.substr(0,str.length%3)+result;
  }else{
    result = result.substring(1,result.length);
  }
  if(integer) {
    return result
  } else {
    return result+"."+lis;
  }
}
/* KMB */
export function BinaryProcess(str){
  if(str == '' || str == null) return '--'
  str=Number(str);
  if(0<=str&&str<=999.994){
    // str = str
    str = str.toFixed(2)
  }else if(999.995<=str&&str<=999994) {
    str = (str/1000).toFixed(2)+'K'
  }else if(999995<=str&&str<=999994999){
    str = (str/1000000).toFixed(2)+'M'
  }else if(999995000<=str){
    // str = (str/1000000000).toFixed(2)
    str = formatDouble(str/1000000000) + 'B'
  }
  return str
}

export function PrecentFilter(val) {
  return (Number(val) * 100).toFixed(2)
}


const filters = {
  birefListTime:birefListTime,
  birefTopTime:birefTopTime,
  detailsReleaseTime:detailsReleaseTime,
  newsListTime:newsListTime,
  setString:setString,
  formatDouble: formatDouble,
  BinaryProcess: BinaryProcess,
  PrecentFilter: PrecentFilter
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

export default filters
