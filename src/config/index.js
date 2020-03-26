let BASEURL = 'http://api.m2c2017local.com:80/'

let href = window.location.href
if (href.includes('m2c2017local') || href.includes('localhost')|| href.includes('10.0.40.96')) { 
    // 开发环境
    BASEURL = 'http://api.m2c2017test.com:80/'
} else if (href.includes('m2c2017dev')) { 
    // 开发环境
    BASEURL = 'http://api.m2c2017dev.com:80/'
} else if (href.includes('m2c2017test')) { 
    // 测试环境
    BASEURL = 'http://api.m2c2017test.com:80/'
} else if (href.includes('m2c2017final')) {
     // 预演环境  
     BASEURL = 'http://api.m2c2017final.com:80/'
} else{ 
    // 生产环境
    BASEURL = 'http://api.m2c2017.com:80/'
}
export default BASEURL
