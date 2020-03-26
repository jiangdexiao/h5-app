
export default [
    { name: '按来源方式注册', method: 'sourceRegister', path: 'm2c.users/user/source/register', type: 'post'},
    { name: '发送短信', method: 'sendSms', path: 'm2c.users/user/sendSms', type: 'post'},
    { name: '用户协议', method: 'getAgreenment', path: 'm2c.operate/scontent/html', type: 'get'},
    { name: '检测手机号是否注册过', method: 'isregistered', path: 'm2c.users/user/isregistered', type: 'get'},
    { name: '帮助中心', method: 'helpcenter', path: 'm2c.operate/app/helpcenter/content', type: 'get'},
    { name: '拍货头条', method: 'topline', path: 'm2c.operate/app/adv/location/topline/content', type: 'get'}
  ]
  