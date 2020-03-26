<template>
  <div class="goodcontainer" >
    <div class="good_bs08 pinch-zoom" v-html="good.desc" :style="{'display':display?'none':'block'}">
        <!-- <img v-for="(item,i) in good.goodsMainImages" :key="i" :src="item"  /> -->
    </div>
    <!-- <div  style=" height: 1rem;"></div> -->
    <div class="default_message" :style="{'display':display?'block':'none'}">
      <img src="../../../static/images/default_picture@2x.png">
      <span>商品暂时还没有详情哦~</span>
    </div>
    
    <div class="foot_fx">
      <div  style="height:0.2rem;width:100%;background:rgb(239,239,239);margin-bottom:0.2rem;"></div>
        <div class="tit">分享给朋友</div>
        <div class="imgtatal">
            <div class="mr2 wid" tag='WechatSession' v-show="share.WechatSession==1"  >
                <div class="text-cen"><img src="../../../static/images/share_wechat@3x.png" /></div>
                <div class="weixin_tit">微信好友</div>
            </div>
            <div class="mr2 wid" tag='WechatTimeLine' v-show="share.WechatTimeLine==1" >
                <div class="text-cen"><img src="../../../static/images/share_friends@3x.png" /></div>
                <div class="weixin_tit">微信朋友圈</div>
            </div>
            <div class="mr2 wid" tag='QQ' v-show="share.QQ == 1" > 
                <div class="text-cen"><img src="../../../static/images/share_qq@3x.png" /></div>
                <div class="weixin_tit">QQ好友</div>
            </div>
            <div class="mr2 wid" tag='Sina' v-show="share.Sina == 1" >
                <div class="text-cen"><img src="../../../static/images/share_weibo@3x.png" /></div>
                <div class="weixin_tit">新浪微博</div>
            </div>
            <div class=" wid" tag='copy'>
                <div class="text-cen"><img src="../../../static/images/share_copy@3x.png" /></div>
                <div class="weixin_tit">复制链接</div>
            </div>
        </div>
    </div>
    <!-- <div style='width:300px;height:50px;background-color:red'></div> -->
    <!--底部菜单-->
    <!-- <div class="poi3 foot">
        <div class="foot_t">
            <i class="icoCommodityService fl"></i>
            <i class="icoCommodityCart fl"></i>
            <i class="icoCommodityCollectDefault fl"></i>
            <button class="ljgm fl">立即购买</button>
            <button class="add_cart fl">加入购物车</button>
        </div>
    </div> -->
    <!--底部菜单e-->
</div>
</template>

<script>
import "underscore";
import PinchZoom from "../../../static/js/pinchZoom";
export default {
  name: "",
  data() {
    return {
      good: {},
      share: {
        WechatSession: 1,
        WechatTimeLine: 1,
        QQ: 0,
        Sina: 0
      },
      display: true
    };
  },
  computed: {},
  methods: {
    getGood(goodId) {
      let that = this;
      $.ajax({
        url: `${that.BASE_URL}m2c.scm/goods/app/detail`,
        data: { goodsId: goodId },
        success: function(data) {
          if (data.status != 200) {
            $('.foot_fx').css('position','fixed')
            return;
          }
          that.good = data.content;
          if (that.good && that.good.desc) {
            that.display = false;
          }
          that.$nextTick(() => {
            [].slice
              .call(document.querySelectorAll(".pinch-zoom"))
              .forEach(function(element) {
                new PinchZoom(element, {});
              });
              
              if( that.display ){
                $('.foot_fx').css('position','fixed')
              }
          });
        }
      });
    }
  },
  mounted() {
    let that = this;
    let elements = [].slice.call(document.querySelectorAll("div.wid"));
    this.setupWebViewJavascriptBridge(function(bridge) {
      if (/(Android)/i.test(navigator.userAgent)) {
        //在android下必须初始化这个方法  否则回调失败
        bridge.init(function(message, responseCallback) {});
      }
      var uniqueId = 1;
      function log(message, data) {
        // var log = document.getElementById('log')
        // var el = document.createElement('div')
        // el.className = 'logLine'
        // el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
        // if (log.children.length) { log.insertBefore(el, log.children[0]) }
        // else { log.appendChild(el) }
        // alert(message)
        // document.getElementById('msg').innerHTML = message;
      }
      /* Initialize your app here */
      // 所有与iOS交互的JS代码放这里！
      //js 调用ios方法
      bridge.callHandler("m2cShareGetIsInstallApp", {}, function callback(
        response
      ) {
        if (typeof response == "string") {
          //android 传过来的是字符串格式
          response = JSON.parse(response);
        }
        // log('m2cShareGetIsInstallApp:'+response)
        that.share = response;
      });

      //ios 调用js方法
      bridge.registerHandler("testJavascriptHandler", function(
        data,
        responseCallback
      ) {
        // log('ObjC called testJavascriptHandler with', data)
        // var responseData = { 'Javascript Says':'Right back atcha!' }
        // log('JS responding with', responseData)
        // responseCallback(responseData)
      });

      elements.forEach(function(element) {
        element.onclick = function(e) {
          let tag = element.getAttribute("tag");
          let params = { sharePlatForm: tag };
          // log('传给移动端的参数:'+JSON.stringify(params))
          bridge.callHandler(
            "m2cShareDidClickBtnWithPlatFormName",
            params,
            function callback(response) {
              // log(response)
            }
          );
        };
      });
    });
    let goodId = this.$route.params.id;
    if (!goodId) return;
    // console.log(`商品id：${goodId}`);
    this.getGood(goodId);
  }
};
</script>

<style scoped >
@import url("../../../static/css/good.css");
</style>
<style>
/* 图片缩放 初始状态 图像显示不全 */
.good_bs08 img {
  max-width: 100%;
}
.default_message {
  text-align: center;
  padding-top:2rem;
}
.default_message img {
  width: 100px;
  height: 100px;
  margin: auto;
}
.default_message span {
  font-size: 14px;
}
.foot_fx {
  bottom: 0px;
  left: 0px;
}
</style>

