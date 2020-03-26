import Vue from 'vue'
import Router from 'vue-router'

//商品
const goodImageDetail = resolve => require(['@/views/good/goodImageDetail.vue'], resolve)
//分享商品
const goodShareDetail = resolve => require(['@/views/good/goodShareDetail.vue'], resolve)
//关于
const Above = resolve => require(['@/views/above/Above.vue'], resolve)
//活动
const Activety = resolve => require(['@/views/activety/Activety.vue'], resolve)
//单个优惠券
const SingleCoupon = resolve => require(['@/views/coupon/SingleCoupon.vue'], resolve)
//多个优惠券
const MutipleCoupon = resolve => require(['@/views/coupon/MutipleCoupon.vue'], resolve)
//邀请好友
const Invitingfriends = resolve => require(['@/views/coupon/Invitingfriends.vue'], resolve)
//用户协议
const Agreement = resolve => require(['@/views/user/Agreement.vue'], resolve)
//注册页
const Register = resolve => require(['@/views/user/Register.vue'], resolve)
//帮助中心
const HelpCenter = resolve => require(['@/views/help/HelpCenter.vue'], resolve)
//拍货链接
const PhTop = resolve => require(['@/views/help/PhTop.vue'], resolve)
//消息推送
const message = resolve => require(['@/views/message/message.vue'], resolve)
//主页
const Home = resolve => require(['@/views/Home.vue'], resolve)

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/',redirect(to){ return '/home'}},
        {path: '/home',name: 'home',component: Home},
        {path: '/goodImageDetail/:id',name: 'goodImageDetail',component: goodImageDetail},
        {path: '/goodShareDetail/:goodsId/:skuName/:type',name: 'goodShareDetail',component: goodShareDetail},
        {path: '/above/:code',name: 'above',component: Above},
        {path: '/activety/:id',name: 'activety',component: Activety},
        {path: '/register',name: 'register',component: Register},
        {path: '/singleCoupon/:couponId',name: 'singleCoupon',component: SingleCoupon},
        {path: '/mutipleCoupon/:orderId',name: 'mutipleCoupon',component: MutipleCoupon},
        {path: '/Invitingfriends/:id',name: 'Invitingfriends',component: Invitingfriends},
        {path: '/message/:id',name: 'message',component: message},
        {path: '/agreement',name: 'agreement',component: Agreement},
        {path: '/helpcenter/:id',name: 'helpcenter',component: HelpCenter},
        {path: '/phtop/:id',name: 'phtop',component: PhTop}
    ]
})