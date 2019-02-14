const {
  Nuxt,
  Builder,
  Generator
} = require('nuxt');

const config = require('./config.js')
const execNode = require('./middlewares/execNode.js')
const rimraf = require('rimraf');
const axios = require('axios');
const log4js = require('log4js')
const path = require('path')
const moment = require('moment')
const rootPath = path.resolve('pages/_lang')
const redis  = require('redis');
const webpack = require('webpack')

let nuxt, builder, file = require('../nuxt.config.js'),
    common = require('./middlewares/common.js'),
    env = process.env.NODE_ENV || 'test',
    // 判断是否本地环境
    local = process.argv.indexOf('-l') >= 0?true:false,
    // 判断是否build静态资源生成html
    build = process.argv.indexOf('-b') >= 0?true:false,
    // 判断仅build静态资源
    dist = process.argv.indexOf('-d') >= 0?true:false,
    // 判断是否间隔
    interval = process.argv.indexOf('-i') >= 0?true:false,
    nofolder = process.argv.indexOf('-nf') >= 0?true:false,
    allFile = process.argv.indexOf('-a') >= 0?true:false,
    client  = redis.createClient(config.redis.port, config.redis.host[env]),
    redisInterval


let generateConf = {
  dir: 'dist',
  subFolders: nofolder?false:true,
  interval: interval?500:0, // build详情页如不加入此属性，会导致socket hang up错误
  routes: allFile?[...'/',...common.getStaticRoutes(rootPath, 'jp'), ...common.getStaticRoutes(rootPath, 'kr'), ...common.getStaticRoutes(rootPath, 'ru'), '/en/Intermediate_page','/cn/Intermediate_page']:['/','/jp','/kr','/ru']
  // routes: ['/','/jp','/jp/channel','/jp/tag','/jp/contact','/jp/privacy','jp/twitter','/jp/terms','/jp/web_guide','/jp/wiki_tag','/jp/wiki','/jp/gainer','/kr','/kr/channel','/kr/tag','/kr/contact','/kr/BriefTwitter','/kr/privacy','/kr/terms','kr/twitter','/kr/web_guide','/kr/wiki_tag','/kr/wiki','/ru','/ru/channel','/ru/tag','/ru/contact','/ru/BriefTwitter','/ru/privacy','/ru/terms','ru/twitter','/ru/web_guide','/ru/wiki_tag','/ru/wiki','/wiki/1923']
}


if(interval && process.argv[2].indexOf('news')>=0) {
  generateConf.dir = 'news'
} else if (interval && process.argv[2].indexOf('wiki')>=0) {
  generateConf.dir = 'wiki'
}

file.dev = false
file.generate = generateConf
file.build.publicPath = config.publicPath
file.axios.baseURL = config.apiBaseUrl[env]
file.axios.browserBaseURL = config.apiBaseUrl[env]
file.build.plugins = [
  new webpack.DefinePlugin({
    'process.env.socketUrl': JSON.stringify(config.websocketUrl[env])
  }
)]


 // 错误日志收集
log4js.configure(config.log4jsConfig);
let logger = log4js.getLogger('nuxt');
let errorId = {
  route: '',
  idList: []
}


async function start() {

  
  if(interval) {
    // 加入间隔，仅build详情页
    file.generate.routes = [...common.getRoute(process.argv[2])]
  } else {
    // 获取路由路径
    file.generate.routes = [...file.generate.routes, ...common.getRoute(process.argv[2])]
  }
  console.log('routes', file.generate.routes)
  

  if(!local) {
    // 判断非本地环境获取资源地址
    await getStaticPath()
  }

  nuxt = new Nuxt(file)
  
  builder = new Builder(nuxt);
  if(dist) {
    await builder.build()
    // 自动化部署
    rimraf('./dist.zip',(e) => {
      if(e) {
        console.log(e)
        return
      }
      common.zipFile(path.resolve('nuxt-dist/dist'),'dist.zip', () => {
        common.uploadFile(config.uploadPath[env], path.resolve('dist.zip'), (res) => {
          let key = JSON.parse(res).data.key
          console.log('[redis-key]',key)
          logger.info('[redis-key]',key)
          redisInterval = setInterval(() => {handlerRedis(key)},10000)
        })
        
      })
    })
  } else {
    // nuxt.hook('generate:routeCreated', function (route, path,errors) {
    //   console.log('path')
    // })
    nuxt.hook('generate:routeFailed', function ({nuxt, errors}) {
      // 收集错误id
      let cache = []
      let str = JSON.stringify(errors[0], (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return;
          }
          // Store value in our collection
          cache.push(value);
      }
        return value;
      })
      if(str.indexOf('socket hang up')>=0) {
        if(errors[0].route.indexOf('news') >=0 || errors[0].route.indexOf('wiki')>= 0) {
           try { 
             let errId = errors[0].route.split('/').splice(-1,1)[0]
             if(!errorId.route) {
               errorId.route = errors[0].route.split('/').splice(-2,1)[0]
             }
             if(Number(errId) > 0) {
               errorId.idList.push(errId)
             }
           } catch (error) {
           }
         }
       }
       console.log('[generate:routeFailed][error]',errors[0])
    })
    nuxt.hook('generate:done', function ({nuxt, errors}) {
    
       // 重新构建错误id
      console.log('html生成完成开始移动')
      logger.info('info','html生成完成开始移动')
      let htmlPath = local?config.htmlPublishPathLocal:config.htmlPublishPath
      moveHtmlDir(htmlPath)
      
      if(errorId.idList.length > 0) {
        let bashParam = errorId.route + '=' + errorId.idList.join(',')
        execNode('build',[bashParam], 'detail')
      }
      process.exit(0)
     
    })
    // console.log(222)
    // 开始生成静态化html
    try {
      await new Generator(nuxt, builder).generate({
        build: build?true:false, // *如果不执行new Builder 或是开启此属性，.nuxt文件下不会生成dist文件，导致生成html卡住
        init: false
      })
    } catch (error) {
      // console.log(error)
    } 
  }
}

async function getStaticPath () {
  // 判断内网外网环境请求s3资源地址
  let url, distPath
  url = config.staticVersion[env]
  // switch (env) {
  //   case 'dev':
  //     url = config.staticVersion.dev
  //     break;
  //   case 'test':
  //     url = config.staticVersion.test
  //     break;
  //   case 'pro':
  //     url = config.staticVersion.pro
  //     break;
  //   default:
  //     url = config.staticVersion.test
  // }
 
  let currentDate = moment().format('YYYYMMDD')  
  let staticPath = await axios.get(url)
  if(!staticPath.data.data) {
    logger.error('error','[getStaticPath()]' + errors)
    throw new Error('资源路径未找到')
  }
  
  if(dist) {
    if(staticPath.data.data.indexOf(currentDate) >= 0){
      distPath = Number(staticPath.data.data) + 1
    } else {
      distPath = currentDate + '101'
    }
  } else {
      distPath = staticPath.data.data
  }
  console.log('distPath', distPath)
  
  file.build.publicPath = `https://media.thedbit.com/dailymedia/${env}/${distPath}/wap/dist/`
}



  // 移动dist目录下html到制定目录
function moveHtmlDir(htmlPath) {
  common.copyDir(path.join(__dirname, `../${generateConf.dir}`), htmlPath, (e) => {
    if(e) {
      console.log(e)
      logger.error('error','[moveHtmlDir]' + e)
    }
    process.exit(0)
  })
  
}

function handlerRedis(key) {
  client.select(config.redis.database[env], function(error){
    if(error) {
        console.log('selectErr',error);
        logger.error('error','[redis-select]' + error)
    } else {
        // set
        client.get(key, function(error, res) {
            if(error) {
                console.log('error','[redis-get]' +error);
            } else {
                logger.info('info','[redis-res]' + res)
                console.log(res)
                console.log('isEnd',res == "end")
                if(JSON.parse(res) === "end" || res === null) { // 激活完成
                  console.log('[redisKey]', res)
                  clearInterval(redisInterval)
                  // 开始执行激活
                  axios.post(config.activePath[env])
                    .then((res) => {
                      logger.info('info','[active]' + res.data)
                      console.log('activePost',res.data)
                    })
                  // 关闭链接
                  client.end(true);
                } 
            }  
        });
    }
  });
}

// module.exports = start

rimraf(`./${generateConf.dir}`,(e) => {
  start()
})
