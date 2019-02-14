const fs = require('fs')
const path = require('path')
const log4js = require('log4js')
const common = require('./middlewares/common.js')
const config = require('./config.js')

log4js.configure(config.log4jsConfig);

let logger = log4js.getLogger('nuxt')
    ,local = process.argv.indexOf('-l') >= 0?true:false

function delFile (idParams) {
    if(!idParams) {
        console.error('未输入id')
        logger.error('error',`[delete.js]未输入id`)
        return 
    }
    let htmlPath = local?config.htmlPublishPathLocal:config.htmlPublishPath
    let ids = common.getRoute(idParams)
    ids.forEach((i) => {
        let p = path.join(htmlPath, i)
        console.log('p',p)
        fs.access(p, (err) => {
            if (err) {
              console.log(`${i}文件未找到`)
              logger.error('error',`[delete.js]${i}文件未找到`)
            }
            try {
                fs.unlinkSync(p + '.html')
            } catch (error) {
                
            }
            try {
                fs.unlinkSync(p + '/index.html')
                fs.rmdirSync(p)
            } catch (e) {

            }
            
            console.log(`${i}文件删除成功`)
            logger.error('info',`[delete.js]${i}文件删除成功`)
        });
    })
}

delFile(process.argv[2])
// module.exports = delFile