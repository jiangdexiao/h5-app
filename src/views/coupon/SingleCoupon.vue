<template>
	<div class="app_container">
		<div class="couponcontainer" >
			<div class="banner">
				<img v-if="coupon.pageBannerUrl.length>0" :src="coupon.pageBannerUrl"  data-adaptive-background="1"  />
				<img v-else src="../../../static/images/coupon/banner.png" data-adaptive-background="1" />
			</div>
			<div class="center">
				<div class="mb20">
					<div class="poi1">
						<div class="poi2 opacitybg"></div>
						<div class="coupon01 poi1 clear" style="z-index: 999;">
							<!--如果优惠券被领完的情况 不显示输入框 显示优惠券都被领完文字-->
							<div class="nocoupon" v-if="setStyle(2)">真是遗憾，优惠券都被领完了~</div>
							<!--领取成功情况显示立即使用和优惠券-->
							<div class="nocoupon" v-if="setStyle(1)">领取成功，立即去使用吧~</div>
							<div class="nocoupon" v-if="setStyle(3)">您已经领取过这个优惠券了</div>
							<div class="coupon01bg clear mb20" v-if="setStyle(1)">
								<div class="couponleft fl">
									<div class="tit01">
										<span class="bigsize">{{ receiveCoupon.faceValue }}</span>
										<span>{{ receiveCoupon.couponForm===1?'元':'折' }}</span>
									</div>
									<div class="tit02">{{ receiveCoupon.content }}</div>
								</div>
								<div class="couponright fl">
									<div class="tit01">{{ receiveCoupon.couponName }}</div>
									<div class="tit02">{{ receiveCoupon.rangeContent }}</div>
									<div class="tit02">{{ getDateTime }}</div>
								</div>
							</div>
							<input class="couponinput mb20" v-if="setStyle(0)" type="number" v-model="mobile"  placeholder="输入手机号领取优惠券" />
							<div class="tocoupon" @click="revieveCoupon" v-if="setStyle(0)" >领取优惠券</div>
							<div class="tocoupon" @click="useCoupon"  v-if="setStyle(1)">立即使用</div>
							<div class="tocoupon" @click="viewCoupon" v-if="setStyle(2) || setStyle(3)">查看其它优惠</div>
						</div>
					</div>
				</div>
				<div class="">
					<div class="line"></div>
				</div>
				<div class="" style="height:3.3rem;"  >
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
			  couponId:'',
			  activityRule:[],
			  pageBannerUrl:``,//${window.location.href.split('#')[0]}static/images/coupon/banner.png
			  content:'',
			  couponName:'',
			  exist:'',
			  expirationTimeEnd:'',
			  expirationTimeStart:'',
			  faceValue:'',
			  rangeContent:'',
			  couponForm:''
		  },
		  //领取后的优惠券
		  receiveCoupon:{},
		  mobile:'',
		  coupon_state:0 // 领取优惠券状态 0=未领取 1=领取成功  2=已领取完
      }
  },
  computed:{
	  getTitle(){
		  if( this.receiveCoupon.couponName && this.receiveCoupon.couponName.length >0){
			  return this.tool.str.textLength(this.receiveCoupon.couponName,10)
		  }else{
			  return ''
		  }
	  },
	  getDateTime(){
		  if( this.receiveCoupon.expirationTimeStart && this.receiveCoupon.expirationTimeEnd){
			  return this.receiveCoupon.expirationTimeStart +'-'+this.receiveCoupon.expirationTimeEnd
		  }else{
			  return ''
		  }
	  },
  },
  methods:{
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
	  revieveCoupon(){
		  if( !this.mobile || !this.tool.validate.mobile(this.mobile)){
			  alert('请输入正确的手机号码才可以领取哟！')
			  return
		  }
		  if( this.coupon && this.coupon.couponId ){
			  this.api_coupon_receiveSingleCoupon({ 
				  headers:{'Content-Type':'application/json'},
				  data:{ coupon_id:this.coupon.couponId,mobile:this.mobile,value:this.coupon.faceValue,coupon_form:this.coupon.couponForm } 
			  }).then(res=>{
				  this.coupon_state = 1
				  this.receiveCoupon = res.content
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
	  let couponId = this.$route.params.couponId
	  if( couponId ){
		  this.api_coupon_getSingleCoupon({ pathParams:`/${couponId}` ,data:{ coupon_id:couponId }}).then(res=>{
			if( res.content ){
				this.coupon.exist= res.content.exist
				if( this.coupon.exist === true){
					if( res.content.activityRule && res.content.activityRule.length >0){
						if( res.content.activityRule.indexOf('；')!=-1){
							this.coupon.activityRule = res.content.activityRule.split('；')
						}
						else if( res.content.activityRule.indexOf(';')!=-1){
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
				if( res.content.couponId ){
					this.coupon.couponId = res.content.couponId
					this.coupon.couponName = res.content.couponName
					this.coupon.expirationTimeEnd = res.content.expirationTimeEnd
					this.coupon.expirationTimeStart = res.content.expirationTimeStart
					this.coupon.faceValue = res.content.faceValue
					this.coupon.rangeContent= res.content.rangeContent
					this.coupon.couponForm = res.content.couponForm
					this.coupon.content = res.content.content
				}else{
					//没有优惠券
					this.coupon_state = 2
				}
				this.setAdaptiveBackground()
			}else{
				//没有优惠券
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
