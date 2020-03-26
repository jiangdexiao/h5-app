<template>
  <div class="goodcontainer" style="background:rgb(245,245,245);">
	<div class="goodc_top">
	<!--轮播图-->
		<div class="goodimg">
			<div class="swiper-container">
				<div class="swiper-wrapper">
                    <div :class="'swiper-slide p'+i" v-for="(item,i) in good.goodsMainImages" :key="i" >
                        <!-- <img :src="item"/> -->
                         <div class="slide-image"   :style="{background: `url(${item})50% 50% / cover no-repeat`}"></div>
                    </div>
		<!--		    <div class="swiper-slide p1">1</div>
						<div class="swiper-slide p2">2</div>
						<div class="swiper-slide p3">3</div>
						<div class="swiper-slide p2">4</div>
						<div class="swiper-slide p3">5</div>-->
				</div>

    	<!-- 如果需要分页器 -->
    		<div class="swiper-pagination"></div>

    	<!-- 如果需要滚动条 -->
    	<!--<div class="swiper-scrollbar"></div>-->
			</div>
		</div>
	<div class="goodtit">
		<div class="tit0">
            {{ good.goodsName }}
			<!--自然而蓝 | 藏青天丝提花蝙蝠袖上衣宽松舒适独家自制水洗秋冬新款长款-->
		</div>
		<div class="tit1">
            {{ good.goodsSubTitle }}
			<!--海量新品 | 潮流穿搭 | 玩趣互动-->
		</div>
		<div class="tit2">
            <template v-if="good.goodsSKUs&&good.goodsSKUs.length>0" >
                ￥{{ good.goodsSKUs[0].photographPrice / 100 }}
            </template>
            <template v-else>
                ￥0.00
            </template>
			<!--￥666-->
		</div>
	</div>
	<div class="good_bs02" v-if="good.fullCuts" >
		<div class="youhui">
			<i class="labelPromotion"></i>
			<div class="fl" id = "cuts">
                <template v-for="(item,i) in good.fullCuts" >
                    <template v-for="(opt,j) in item.itemNames">
                        <div class="tit3">
                            <span>满减</span> {{ opt.itemName }}
                        </div>
                    </template>
                </template>
			</div>
			<i class="icoContinue" @click="toDownUrl()"></i>
		</div>
	</div>
	</div>
	<div class="goodc_top">
		<div class="good_bs03">
			<span class="fl tit4">
				已选
			</span>
			<span class="fl tit5" id ="skuName">
                {{ skuName }}
				<!--黑色；M码-->
			</span>
			<i class="icoContinue" @click="toDownUrl()"></i>
		</div>
		<div class="good_bs04">
            <span class="fl" v-for="(item,i) in good.goodsGuarantee" :key="i" >
                <span class="tit6"><i class="iconfont icon-ico_commodity_defaul" style='color:#E1A8A8'></i> {{ item.guaranteeName }} </span>
            </span>
		</div>
	</div>
	<div class="goodc_top" id="comment" v-if="good.goodsComment && good.goodsComment.commentTotal == 0" >
		<div class="evaluate clear">
			<span class="fl">
				评价
			</span>
			<span class="fl" id="commentTotal">
                {{ good.goodsComment.commentTotal }}
			    <!--(999)-->
			</span>
			<i class="icoContinue" @click="toDownUrl()"></i>
			<span class="fr">查看全部</span>
		</div>
		<div class="evaluate_tit">
			<div class="img fl" id="icon">
				<img :src="good.goodsComment.buyerIcon?good.goodsComment.buyerIcon:'../../../static/images/coupon/profile_imag_160.png'"/>
			</div>
			<div class="tit7">
				<div class="">
				<span class="fl" id="userName"><!--g**m-->{{ getName(good.goodsComment.buyerName) }}</span>
				<span class="fr" id="sku"><!--黑色x1-->{{ getSkuName(good) }}</span>
				</div>
			</div>
			<div class="tit8 fr wordsbase" id="content">
                {{ good.goodsComment.commentContent }}
				<!--很有气质的一款，这个价格买到太良心了啊！！！表白表白！你家宝贝真的太好看了，越看越喜欢！！-->
			</div>
			<div class="tit8 fr" id="level">
                <span class="good_e">商品评价</span>
                <i class="xing" v-for="(xing,i) in good.goodsComment.starLevel" :key="i"></i>
			</div>
		</div>
	</div>
	<div class="goodc_top">
		<div class="good_bs05">
			看了该商品的人还买了
		</div>
		<div class="good_bs06 clear">
            <div class="ul" id="guess">
                <div class="imgtit" v-for="(item,i) in alreadyList" :key="i" >
                    <!-- <img :src="item.goodsImageUrl" /> -->
                    <div class="div_img" :style="{background: `url(${item.goodsImageUrl})50% 50% / cover no-repeat`}" ></div>
                    <div class="wordsbase_ib tit9">{{ item.goodsName }}</div>
                    <div class="tit10">￥{{ item.goodsPrice / 100 }}</div>
                </div>
            </div>
		</div>
	</div>
<div class="good_bs07">
	      更多详情
	</div>
	<div class="good_bs08" v-html="good.desc" style="height:auto;width:100%;">
		<!--<img />-->
	</div>
	<div class="clear"></div>
	<div style="height:2px;padding-bottom:10px;"> &nbsp; </div>
<!--底部菜单-->
	<div class="poi3 foot">
		<div class="foot_fx" v-if="type==1" >
			<div class="tit">分享给朋友</div>
			<div class="imgtatal">
				<div class="mr2 wid">
					<div class="text-cen"><img src="../../../static/images/share_wechat@3x.png" /></div>
					<div class="weixin_tit">微信好友</div>
				</div>
				<div class="mr2 wid">
					<div class="text-cen"><img src="../../../static/images/share_friends@3x.png" /></div>
					<div class="weixin_tit">微信好友圈</div>
				</div>
				<div class="mr2 wid">
					<div class="text-cen"><img src="../../../static/images/share_qq@3x.png" /></div>
					<div class="weixin_tit">QQ好友</div>
				</div>
				<div class="mr2 wid">
					<div class="text-cen"><img src="../../../static/images/share_weibo@3x.png" /></div>
					<div class="weixin_tit">新浪微博</div>
				</div>
				<div class=" wid">
					<div class="text-cen"><img src="../../../static/images/share_copy@3x.png" /></div>
					<div class="weixin_tit">复制链接</div>
				</div>
			</div>
		</div>
		<div class="foot_t" v-if="type==0" >
            <i class="icoCommodityService fl" @click="toDownUrl()"></i>
            <i class="icoCommodityCart fl" @click="toDownUrl()"></i>
            <i class="icoCommodityCollectDefault fl" @click="toDownUrl()"></i>
			<button class="ljgm fl" @click="toDownUrl()">立即购买</button>
			<button class="add_cart fl" @click="toDownUrl()">加入购物车</button>
		</div>
	</div>
<!--底部菜单e-->
</div>
</template>
<script>
import '../../../static/js/swiper.min.js'
export default {
  data(){
      return{
          good:{},
          skuName:'',
          type:'',
          alreadyList:[]
      }
  },
  methods:{
     getName(name){
        if (name != '' && name != null && name != undefined) {
            var str = name.split('')
            if (str.length >= 2) {
            str.splice(1, str.length - 2, '***')
            } else {
            str.splice(1, str.length - 1, '***')
            }
            return str.join('')
        }
    },
    getSkuName(good){
        let name = ''
        if( good.goodsComment && good.goodsComment.skuName )
            name += good.goodsComment.skuName
        if( good.goodsComment && good.goodsComment.goodsNum )
            name += 'x' + good.goodsComment.goodsNum
        return name
    },
    toDownUrl(){
        window.location.href = 'http://www.m2c2017.com/appdown.html'
    }
  },
  mounted(){
    let goodsId = this.$route.params.goodsId
    this.skuName = this.$route.params.skuName
    this.type = this.$route.params.type
    if( goodsId ){
        this.api_coupon_getGoodDetail({ data:{goodsId:goodsId} }).then(res=>{
            if( res.status === 200 ){
                this.good = res.content
                
                //看了该商品的人还买了什么
                this.api_coupon_guess({data:{positionType: 3}}).then(result=>{
                    if( result.status === 200 ){
                        this.alreadyList = result.content
                    }
                })
                this.$nextTick(()=>{
                    let imgs = document.querySelectorAll(".good_bs08 img");
                    [].slice.call(imgs).forEach(img=>{
                        img.style.width = "100%"
                    })
                })
                console.log('good',this.good)
            }else{
                if( res.errorMessage ){
                    alert(res.errorMessage)
                }
            }
        }).catch(err=>{
            if( err.errorMessage ){
                alert(err.errorMessage)
            }
        })
    }
    var mySwiper = new Swiper ('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplay: 2500,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true // 修改swiper的父元素时，自动初始化swiper
    })
  }
}
</script>
<style scoped >
@import url("../../../static/css/goodshare.css");
</style>
<style>
@import url("../../../static/css/swiper.min.css");
html, body {
    position: relative;
    height: 100%;
}
.swiper-container { width: 100%; height: 100%;} /*这行设置能实现单层满屏显示*/
.swiper-container .swiper-wrapper .swiper-slide{
    width: 7.5rem!important;
    height: 7.5rem;
    margin-right:initial!important;
    text-align: center;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.slide-image{
    width:7.5rem;
    height:7.5rem;
}
</style>