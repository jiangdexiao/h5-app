
import Vue from 'vue'
import plugins from './plugins'
import BASEURL from '../config/'
import { tool } from '../utils/'

Vue.use({
    install(Vue, options) {
        // 注册全局方法，如常用的接口方法，工具方法等。
        Vue.prototype.BASE_URL = BASEURL
        Vue.prototype.tool = tool
        // 注册全局方法，如常用的接口方法，工具方法等。
        _.each(plugins, (item, key) => {
            Vue.prototype[key] = item
        })
    }
})