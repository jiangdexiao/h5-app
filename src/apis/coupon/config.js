
export default [
    { name: '查询用户详情', method: 'getUserDetail', path: 'm2c.users/user/detail', type: 'get'},
    { name: '推荐好友分享——查询当前生效规则下对应的优惠券详情',method: 'getCouponDetail',path: 'm2c.market/h5/coupon/recommend/shareCoupon/detail',type: 'get'},
    { name: '（单个）H5活动分享券查询',method: 'getSingleCoupon',path: 'm2c.market/h5/coupon/activity/present',type: 'get'},
    { name: '（单个）用户领取H5活动分享券',method: 'receiveSingleCoupon',path: 'm2c.market/h5/coupon/activity/receive',type: 'post'},
    { name: '（多个）支付分享优惠券列表',method: 'getManyCoupon',path: 'm2c.market/h5/coupon/receive',type: 'get'},
    { name: '（多个）用户领取支付成功分享券',method: 'receiveManyCoupon',path: 'm2c.market/h5/coupon/receive',type: 'post'},
    { name: '推送消息内容', method: 'getMsgContent', path: 'm2c.support/jpush/msg/detail', type: 'get' },
    { name: '获取商品详情', method: 'getGoodDetail', path: 'm2c.scm/goods/app/detail', type: 'get' },
    { name: '看了该商品的人还买了什么', method: 'guess', path: 'm2c.scm/goods/app/guess', type: 'get' },
  ]
  