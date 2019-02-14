const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const cors = require('@koa/cors')
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3456
const log4js = require('log4js')
const config = require('./config.js')
const execNode = require('./middlewares/execNode.js')
const path = require('path')
const fs = require('fs')
let distIsExist = false


let logger = log4js.getLogger('nuxt');
log4js.configure(config.log4jsConfig);

let static = new Router()


static.get('/', async (ctx) => {
  let ctx_query = ctx.request.querystring
  try {
    ctx.body = {
      code: 0,
      msg: "Successful",
      data: ""
    }
    if(!distIsExist) {
      try {
        fs.accessSync(path.resolve('nuxt-dist/dist/server-bundle.json'))
        distIsExist = true
      } catch (error) {
        console.log(error)
        return
      }
    }
    execNode('build', [ctx_query], 'static')
  } catch (error) {
    ctx.body = {
      msg: "error",
      data: error
    }
    console.log(`node server/build.js ${JSON.stringify(ctx_query)}` + error)
    logger.error(`node server/build.js ${JSON.stringify(ctx_query)}` + error)
  }

})

let del = new Router()

del.get('/', async (ctx) => {
  let ctx_query = ctx.request.querystring
  try {
    ctx.body = {
      code: 0,
      msg: "Successful",
      data: "删除成功"
    }
    if(!distIsExist) {
      try {
        fs.accessSync(path.resolve('nuxt-dist/dist/manifest.js'))
        distIsExist = true
      } catch (error) {
        console.log(error)
        return
      }
    }
    execNode('delete', [ctx_query], 'delete')
  } catch (error) {
    ctx.body = {
      msg: "error",
      data: error
    }
    logger.error(`node server/delete.js ${JSON.stringify(ctx_query)} ` + error)
    console.log(`node server/delete.js ${JSON.stringify(ctx_query)} ` + error)
  }
})

let active = new Router()

active.post('/', async (ctx) => {
  let ctxBody = ctx.request.body
  try {
    ctx.body = {
      code: 0,
      msg: "Successful",
      data: "激活成功"
    }
    
    let node = []
    Object.keys(ctxBody).forEach(element => {
        node.push(`${element}=${ctxBody[element]}`)
        // node.push(element)
    });
    console.log(`node server/build.js `)
    execNode('build', node, 'active')
  } catch (error) {
    ctx.body = {
      msg: "error",
      data: error
    }
    logger.error(`node server/build.js ${JSON.stringify(ctx_query)} ` + error)
    console.log(`node server/build.js ${JSON.stringify(ctx_query)} ` + error)
  }
})
  

let router = new Router()

app.use(cors())
app.use(bodyParser())

app
  .use(router.routes())
  .use(router.allowedMethods())

router.use('/static', static.routes(), static.allowedMethods())
router.use('/delete', del.routes(), del.allowedMethods())
router.use('/active', active.routes(), del.allowedMethods())

setTimeout(() => {
  execNode('build', ['false','-d'], 'init')
},10000)


app.listen(port, host)
console.warn('node已服务开启 ' + host + ':' + port)
