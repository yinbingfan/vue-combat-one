const log4js = require('log4js')
const config = require('../config.js')
const spawn = require('child_process').spawn

let logger = log4js.getLogger('nuxt');
log4js.configure(config.log4jsConfig);

function execNode (jsName, node, api) {
  let bash
  if (api == 'active') {
    logger.info('info', `[${api}]请求成功 开始执行 ${jsName}.js - 参数： false`)
    bash = spawn('node', [`server/${jsName}.js`, 'false','-a'])
  } else if (api == 'detail') {
    logger.info('info', `[${api}]请求成功 开始执行 ${jsName}.js - 参数： ${JSON.stringify(node)}`)
    bash = spawn('node', [`server/${jsName}.js`].concat(node).concat(['-i']))
  } else {
    logger.info('info', `[${api}]请求成功 开始执行 ${jsName}.js - 参数： ${JSON.stringify(node)}`)
    bash = spawn('node', [`server/${jsName}.js`].concat(node))
  }
  
  bash.stdout.on('data', (data) => {
    // logger.info('info', `[${api}] ${jsName} stdout: ${data}`)
    console.log(`${jsName} stdout: ${data}`);
  });
  bash.stderr.on('data', (data) => {
    // logger.info('info', `[${api}] ${jsName} stderr: ${data}`)
    console.log(`${jsName} stderr: ${data}`);
  });
  bash.on('close', (code) => {
    logger.info('info', `[${api}] 退出子进程${jsName}.js`)
    console.log(`子进程退出码：${code}`);
    // 删除结束后重新生成html
    if (api == 'active') {
      node.forEach((e) => {
        execNode('build', e, 'detail')
      })
      // splitBash(node).forEach((e) => {
      //   execNode('build', [e], 'detail')
      // })
    }
    if (api == 'detail') {
      execNode('build', [...[node], ...['-i', '-nf']], 'end')
    }
    if (api == 'static') {
      execNode('build', node.concat(['-nf']), 'end')
    }
    if (jsName == 'delete') {
      node.splice(0, 1)
      console.log('node', ['false'].concat(node))
      execNode('build', ['false'].concat(node), 'static')
    }
  });
  bash.on('error', (code) => {
    console.log(`node server/${jsName}.js ${JSON.stringify(node)} 启动子进程失败 ` + code)
    logger.info('error', `[${api}] node server/${jsName}.js ${JSON.stringify(node)} 启动子进程失败 ` + code)
  })
}

function splitBash(node) {
  let queue = []
  node.forEach((e) => {
      let stack = e.split('=')
      let name = stack[0]
      let item = stack[1].split(',')
      
      while(item.length > 0) {
          queue.push(name + '=' + item.splice(0, 100))
      }
     
  })
  return queue
}

module.exports = execNode