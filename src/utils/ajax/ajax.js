import axios from 'axios'

/**
 * @export
 * @param {string} path 
 * @param {string} type
 * @param {object} data 
 * @param {string} pathParams  
 * @param {string} headers 
 * @param {object} opts 
 * @returns 
 */
export default function ({ path, type, data,pathParams, headers, opts,baseurl } = {}) {
    type = type ? type : 'get'
    path = path?path.trim():''
    pathParams = pathParams?pathParams.trim():''
    if(path.endsWith('/')){
        path = path.substring(0,path.lastIndexOf('/'))
    }
    if(pathParams){
        path = path + pathParams
    }
    
    var options = {
        method: type,
        url: (baseurl?baseurl:this.BASE_URL) + path,
        // data:data,
        headers: headers||{} 
    }
    if( options.headers['Content-Type'] && options.headers['Content-Type'].indexOf('application/json')!=-1){
        options['data'] = data
    }else{
        options['params'] = data
    }
    // options[type === 'get' ? 'params' : 'data'] = data
    // 分发显示加载样式任务
    // this.$store.dispatch('show_loading')
    // axios内置属性均可写在这里
    if (opts && typeof opts === 'object') {
        for (var f in opts) {
            options[f] = opts[f]
        }
    }
    
    // 发送请求
    return new Promise((resolve, reject) => {
        axios(options).then((res) => {
            if (res.data.status != 200) {
                reject(res.data)
            }else{
                resolve(res.data)
            }
        }).catch((err) => {
            if (err.response) {
                reject(err.response.data)
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                // alert(`${err.response.data.errorMessage}`)
              } else {
                reject({errorMessage:'网络超时'})
                // Something happened in setting up the request that triggered an Error
                // alert(`${err.message}`)
              }
            
        })
    })
}