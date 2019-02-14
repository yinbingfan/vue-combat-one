let config = {
    publicPath: 'http://192.168.31.134:1234/dist/client/',
    // publicPath: 'http://192.168.31.134:5001/dist/',
    // publicPath: 'http://wwwd.thedbit.com/dist/'
    // feedbackPath: 'http://172.30.30.99:9080',
    feedbackPath: 'https://md.thedbit.com',
    // apiPath: 'http://172.30.10.158:9080/v1/api/website',
    // apiPath: 'http://172.30.30.99:9080/v1/api/website',
    // apiPath: 'http://172.30.30.186:9080/v1/api/website',
    // apiPath: 'http://172.30.11.49:39080/v1/api/website',
    // apiPath: '',
    apiBaseUrl: {
        dev: 'http://172.30.11.49:39080',
        test: 'https://apid.thedbit.com',
        pro: 'https://api.thedbit.com'
    },
    websocketUrl: {
        dev: '172.30.11.49:39080',
        test: 'apid.thedbit.com',
        pro: 'api.thedbit.com'
    },
    staticVersion: {
        dev:'http://172.30.11.49:39080/v1/api/wapVersion.json',
        test: 'https://apid.thedbit.com/v1/api/wapVersion.json',
        pro: 'https://api.thedbit.com/v1/api/wapVersion.json'
    },
    htmlPublishPathLocal: '/Users/haifeng/Documents/dbit-wap',
    htmlPublishPath: '/dianyi/wapsite/dbit',
    log4jsConfig: {
        appenders: { nuxt: { type: 'file', pattern:'%d{yyyy/MM/dd-hh.mm.ss} %p %c  %m%n',
        // filename: '/dianyi/website/dbit/log/nuxt.log'
        filename: 'nuxt.log'
        } },
        categories: { default: { appenders: ['nuxt'], level: 'info' } }
    },
    uploadPath: {
        dev:'http://172.30.11.49:38080/media/bcmWapVersion/uploadWapResources',
        test: 'https://managerd.thedbit.com/media/bcmWapVersion/uploadWapResources',
        pro: 'https://manager.thedbit.com/media/bcmWapVersion/uploadWapResources'
    },
    redis: {
        host: {
            dev: '172.30.10.78',
            test: 'dailycoin.247qwi.ng.0001.apse1.cache.amazonaws.com',
            pro: 'dailycoin.247qwi.ng.0001.apse1.cache.amazonaws.com'
        },
        port: '6379',
        database: {
            dev: '15',
            test: '1',
            pro: '0'
        }
    },
    activePath: {
        dev: 'http://172.30.11.49:38080/media/bcmWapVersion/active',
        test: 'https://managerd.thedbit.com/media/bcmWapVersion/active',
        pro: 'https://manager.thedbit.com/media/bcmWapVersion/active'
    }
}
module.exports = config
