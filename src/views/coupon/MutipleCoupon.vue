<template>
	<div class="app_container">
		<!-- <div class="header">
			<span>{{ getTitle }}</span>
		</div> -->
		<div class="couponcontainer" >
			<div class="banner">
				<img v-if="coupon.pageBannerUrl.length>0" :src="coupon.pageBannerUrl"  data-adaptive-background="1"  />
				<img v-else src="../../../static/images/coupon/banner.png" data-adaptive-background="1" />
			</div>
			<div class="center">
				<!--如果优惠券被领完的情况 不显示优惠券-->
				<div class="mb20">
					<div class="poi1">
						<div class="poi2 opacitybg"></div>
						<div class="coupon01 poi1 clear" style="z-index: 999;">
							<!--如果优惠券被领完的情况 不显示输入框 显示优惠券都被领完文字-->
							<div class="nocoupon" v-if="setStyle(2)">真是遗憾，优惠券都被领完了~</div>
							<!--领取成功情况显示立即使用和优惠券-->
							<div class="nocoupon" v-if="setStyle(1)">
								<span>领取成功，立即去使用吧~</span>
								<span v-if="coupon.couponNum - coupon.couponReceived>0">[剩余{{ coupon.couponNum - coupon.couponReceived }}张已被领完]</span>
							</div>
							<div class="nocoupon" v-if="setStyle(3)">您已经领取过这个优惠券了</div>
							<!-- <div class="coupon01bg clear mb20" v-for="(item,index) in coupon.list" :key="index" v-if="setStyle(0)">
								<div class="couponleft fl">
									<div class="tit01">
										<span class="bigsize">{{ item.faceValue }}</span>
										<span>{{ item.couponForm===1?'元':'折' }}</span>
									</div>
									<div class="tit02">{{ item.content }}</div>
								</div>
								<div class="couponright fl">
									<div class="tit01">{{ item.couponName }}</div>
									<div class="tit02">{{ item.rangeContent }}</div>
									<div class="tit02">{{ getDateTime(item) }}</div>
								</div>
							</div> -->
							<div class="coupon01bg clear mb20" v-for="(item,index) in coupon.successList" :key="index" v-if="setStyle(1)">
								<div class="couponleft fl">
									<div class="tit01">
										<span class="bigsize">{{ item.faceValue }}</span>
										<span>{{ item.couponForm===1?'元':'折' }}</span>
									</div>
									<div class="tit02">{{ item.content }}</div>
								</div>
								<div class="couponright fl">
									<div class="tit01" style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'>{{ item.couponName }}</div>
									<div class="tit02" style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'>{{ item.rangeContent }}</div>
									<div class="tit02" style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'>{{ getDateTime(item) }}</div>
									<a class="tocoupon2" @click="useCoupon" v-if="coupon.successList.length>1" >立即使用</a>
								</div>
							</div>
							<input class="couponinput mb20" v-if="setStyle(0)" type="number" v-model="mobile"  placeholder="输入手机号领取优惠券" />
							<div class="tocoupon" @click="getCoupon" v-if="setStyle(0)" >领取优惠券</div>
							<div class="tocoupon" @click="useCoupon"  v-if="setStyle(1)&&coupon.successList.length==1">立即使用</div>
							<div class="tocoupon" @click="viewCoupon" v-if="setStyle(2) || setStyle(3)">查看其它优惠</div>
						</div>
					</div>
				</div>
				<div class="">
					<div class="line"></div>
				</div>
				<div class="" style="height:3.3rem;">
					<div class="active_rlue" v-show="coupon.activityRule.length>0">
						<div class="rluetop">— 活动细则 —</div>
						<div class="rluebtm">
							<div v-for="(item,index) in coupon.activityRule" :key="index" class="mb10">
								<span class="crl">{{ index+1 }}</span>
								<span>{{ item }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="poi1 foot">本活动最终解释权归拍获所有</div>
			</div>
		</div>
	</div>
</template>

<script>
import '../../../static/js/jquery.adaptive-backgrounds.js'
export default {
  data(){
      return{
		  coupon:{
			  title:'',
			  activityRule:[],
			  pageBannerUrl:``,//${window.location.href.split('#')[0]}static/images/coupon/banner.png
			  list:[],
			  //领取成功后的数据
			  couponNum:0,
			  couponReceived:0,
			  successList:[]
		  },
		  orderId:'',
          mobile:'',
		  coupon_state:0 // 领取优惠券状态 0=未领取 1=领取成功  2=已领取完
      }
  },
  computed:{
	  getTitle(){
		  if(this.coupon.title && this.coupon.title.length >0){
			  return this.tool.str.textLength(this.coupon.title,10)
		  }else{
			  return ''
		  }
	  }
  },
  methods:{
	  getDateTime(item){
		  if( item.expirationTimeStart && item.expirationTimeEnd){
			  return item.expirationTimeStart +'-'+ item.expirationTimeEnd
		  }else{
			  return ''
		  }
	  },
	  setStyle(state){
		  let display = false
		  switch(state){
			  case 0:if( this.coupon_state === 0) display =  true; else display = false;break;//未领取
			  case 1:if( this.coupon_state === 1) display =  true; else display = false;break;//领取成功
			  case 2:if( this.coupon_state === 2) display =  true; else display = false;break;//已领取完	
			  case 3:if( this.coupon_state === 3) display =  true; else display = false;break;//已领取过	
		  }
		  return display
	  },
	  //领取优惠券
	  getCoupon(){

		  if( !this.mobile || !this.tool.validate.mobile(this.mobile)){
			  alert('请输入正确的手机号码才可以领取哟！')
			  return
		  }

		  if( this.coupon && this.coupon.list.length >0 && this.orderId ){
			  let list = this.coupon.list.map(p=>{
				  return { couponId:p.couponId,ruleId:p.ruleId,value:p.faceValue,couponForm:p.couponForm}
			  })
			  this.api_coupon_receiveManyCoupon({ 
				  headers:{'Content-Type':'application/json'},
				  data:{ orderId:this.orderId,mobile:this.mobile,list:list } 
			  }).then(res=>{
				  if( res.content ){
					  this.coupon.couponNum = res.content.couponNum
					  this.coupon.couponReceived = res.content.couponReceived
					  if( res.content.list && res.content.list.length >0){
						  this.coupon.successList = res.content.list
					  }else{
						  this.coupon.successList = []
					  }
				  }
				  this.coupon_state = 1
			  }).catch(err=>{
				if( err.status === 456 ){
					this.coupon_state = 3
				}else{
					this.coupon_state = 2
				}
			  })
		  }else{
			  this.coupon_state = 2
		  }
	  },
	  //立即使用
	  useCoupon(){
		  window.location.href = this.$store.state.appdown
	  },
	  //查看其它优惠券
	  viewCoupon(){
		  window.location.href = this.$store.state.appdown
	  },
	  setAdaptiveBackground(){
		  this.$nextTick(()=>{
			$.adaptiveBackground.run({
				success: function($img, data) {
					// console.log('Success!', $img, data);
				}
			});
			$('.banner>img').on('ab-color-found', function(ev,payload){
				$('.couponcontainer').css('background',payload.color)
				// console.log("payload.color>"+payload.color);   // The dominant color in the image.
				// console.log(payload.palette); // The color palette found in the image.
				// console.log(ev);   // The jQuery.Event object
			});
		})
	  }
  },
  mounted(){
	  //获取优惠券
	  document.title = '领取优惠券'
	  this.orderId = this.$route.params.orderId
	  if( this.orderId ){
		  this.api_coupon_getManyCoupon({ pathParams:`/${this.orderId}` ,data:{ orderId:this.orderId }}).then(res=>{
			if( res.content ){
				this.coupon.title = res.content.pageTitle

				if( res.content.exist === true){
					if( res.content.activityRule && res.content.activityRule.length >0){
						if( res.content.activityRule.indexOf('；')!=-1){
							this.coupon.activityRule = res.content.activityRule.split('；')
						}else if( res.content.activityRule.indexOf(';')!=-1){
							this.coupon.activityRule = res.content.activityRule.split(';')
						}else{
							this.coupon.activityRule = res.content.activityRule.split(';')
						}
					}else{
						this.coupon.activityRule = []
					}
					if( res.content.pageBannerUrl && res.content.pageBannerUrl.length > 0 && this.tool.str.isImage(res.content.pageBannerUrl)){
						this.coupon.pageBannerUrl = res.content.pageBannerUrl
					}
				}
				if( res.content.list && res.content.list.length > 0){
					this.coupon.list = res.content.list
				}else{
					//没有优惠券
					this.coupon_state = 2
				}
				this.setAdaptiveBackground()
			}else{
				this.coupon_state = 2
			}
		  }).catch(err=>{
			  this.coupon_state = 2
			  this.setAdaptiveBackground()
		  })
	  }
  }
}
</script>


<style scoped >
@import url('../../../static/css/coupon.css');
</style>
