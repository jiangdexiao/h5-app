
/**
 * 所有接口配置模块
 */
import coupon from './coupon/'
import user from './user/'

export default [
    {
        module: 'coupon',
        name: '优惠券',
        list: coupon
    },
    {
        module: 'user',
        name: '用户',
        list: user
    }
]
