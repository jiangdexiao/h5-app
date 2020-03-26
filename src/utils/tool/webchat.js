
//判断访问终端
const browser = {
    versions: function () {
        let u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == "qq", //是否QQ
            weibo: u.match(/WeiBo/i) == "weibo", //是否微博
        }
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

/*=======================================分享Start=======================================*/
const shareWX = function (shareObj, url) {
    /*微信分享*/
    $.ajax({
        type: "post",
        url: url,
        data: { "url": encodeURIComponent(window.location.href.split('#')[0]) },
        dataType: 'json',
        success: function (data) {
            data = data.content;
            /*微信接口*/
            var appId = data.appId;
            var timestamp = data.timestamp;
            var nonceStr = data.nonceStr;
            var signature = data.signature;
            var obj = {
                debug: false, // 开启调试模式
                appId: appId, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature, // 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
            }
            /*权限验证配置*/
            wx.config(obj);
            if (browser.versions.mobile) { //判断是否是移动设备打开。browser代码在下面
                var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    wx.ready(function () {
                        /*1-分享给朋友*/
                        wx.onMenuShareAppMessage(shareObj);
                        /*2-分享给朋友圈*/
                        // wx.onMenuShareTimeline(shareObj);
                        /*3-分享到QQ好友*/
                        // wx.onMenuShareQQ(shareObj);
                        /*4-分享到QQ空间*/
                        // wx.onMenuShareQZone(shareObj);
                        /*5-分享到腾讯微博*/
                        // wx.onMenuShareWeibo(shareObj);
                    });
                    wx.error(function (res) {
                        console.log('错误信息>', res)
                    });
                }
            }
        }
    });
}
/*=======================================分享End=======================================*/

export default shareWX