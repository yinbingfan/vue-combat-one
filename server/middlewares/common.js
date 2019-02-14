const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
const request = require('request')

let common = {
  copyDir(f, t, cb) {
    let _f = f
    let _t = t
    
    _copydir(_f, _t, cb);
    
  },


  // 获取详情页id参数，生成路由
  getRoute(str) {
    let routesArr = []
    if(str == 'false') {
      return routesArr
    }
    let routes = str.split('=')
    // if(!routes) {
    //   throw new Error('未输入detail id')
    // }
    routes[1].split(',').forEach((e, i) => {
      if (e.indexOf('-') >= 0) {
        let limit = e.split('-'),
          min = Number(limit[0]),
          max = Number(limit[1]) + 1
        for (let i = min; i < max; i++) {
          routesArr.push(`/${routes[0]}/${i}`)
        }
      } else {
        routesArr.push(`/${routes[0]}/${e}`)
      }
    })
    return routesArr
  },
  getStaticRoutes: (root, lang) => {
    // 遍历文件获取静态
    let paths = fs.readdirSync(root),
        routes = []
    paths.forEach((p) => {
        let file = fs.statSync(root +'/'+ p)
        if(file.isFile()) {
          if(p.indexOf('index') >= 0) {
            routes.push(`/${lang}`)
          } else {
            routes.push(`/${lang}/${path.parse(p).name}`)
          }
        }
    })
    return routes
  },
  zipFile: (src, dst, callback) => {
    let output = fs.createWriteStream(dst)
    var archive = archiver('zip', {
      store: false // Sets the compression method to STORE. 
    });
  
    // listen for all archive data to be written 
    output.on('close', function () {
      if(callback && callback()) 
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
    });
    // good practice to catch this error explicitly 
    archive.on('error', function (err) {
      throw err;
    });
    // pipe archive data to the file 
    archive.pipe(output);
    // append files from a directory 
    archive.directory(src, false);
    // finalize the archive (ie we are done appending files but streams have to finish yet) 
    archive.finalize();
  },
  uploadFile: (link, zip, callback) => {
    let r = request.post(link, (error, response, body) => {
      if(error ) {
          console.error(error) 
          return;
      } 
      if(callback && callback(body)){}
    });
    let form = r.form();
    form.append('my_field', 'my_value')
    form.append('my_buffer', new Buffer([1, 2, 3]))
    form.append('file', fs.createReadStream(zip))
  }
}

function _copydir(f, t, cb) {
  try {
      fs.accessSync(t);
  } catch (e) {
      fs.mkdirSync(t);
  }
  try {
      fs.readdirSync(f).forEach(function (p) {
          let _f = f + '/' + p;
          let _t = t + '/' + p;
          try {
              let stat = fs.statSync(_f)
              if (stat.isFile()) {
                  fs.writeFileSync(_t, fs.readFileSync(_f));
              } else if (stat.isDirectory()) {
                  _copydir(_f, _t, cb)
              }
          } catch (e) {
              cb(e)
          }
      })
  } catch (e) {
      cb(e)
  }
}
module.exports = common