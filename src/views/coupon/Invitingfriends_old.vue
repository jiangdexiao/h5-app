<template>
  <div class="Invitingcontainer">
	<div class="banner">
		<img class="logo" :src="user.icon" />
		<img src="../../../static/images/coupon/zs_bg_banner.png" data-adaptive-background="1" />
	</div>
	<div class="conten">
		<div class="phonenum">
			<span class="yellowcolor">{{getMobile}}</span>
			 给你送来专属优惠券邀请你一块进入拍获的世界~
		</div>
		<div class="plat_coupon">
			<div class="Inviting01bg clear mb20">
				<div class="Invitingleft fl">
					<div class="tit01">
						<span>￥</span>
						<span class="bigsize">{{ coupon.faceValue }}</span>
					</div>
					<div class="tit02">{{ coupon.content }}</div>
				</div>
				<div class="Invitingright fl">
					<div class="tit01">{{ coupon.couponName }}</div>
					<div class="tit02">{{ coupon.rangeContent }}</div>
					<div class="tit02">{{ getDateTime }}</div>
				</div>		
			</div>
			<div class="btn" @click="gotoRegister" ></div>
		</div>
	</div>
	<div class="foot mt80">本活动最终解释权归拍获所有</div>
</div>
</template>
<script>
export default {
  data(){
	  return{
		  user:{
			  icon:'../../../static/images/coupon/user_logo.png',
			  mobile:'',
			  userName:'',
			  userId:''
		  },
		  coupon:{
			  ruleId:'',
			  couponId:'',
			  faceValue:'',
			  content:'',
			  couponName:'',
			  rangeContent:'',
			  expirationTimeStart:'',
			  expirationTimeEnd:''
		  }
	  }
  },
  computed:{
	  getDateTime(){
		  if( this.coupon.expirationTimeStart && this.coupon.expirationTimeEnd){
			  return this.coupon.expirationTimeStart +'-'+this.coupon.expirationTimeEnd
		  }else{
			  return ''
		  }
	  },
	  getMobile(){
		  if( this.user.userName && this.user.userName.trim().length >0){
			  return `@${this.user.userName}`
		  }else{
			  if( this.user.mobile && this.user.mobile.length >0){
				  return `@${this.user.mobile.substr(0,3)}****${this.user.mobile.substr(7)}`
			  }
		  }
		  return ''
	  }
  },
  methods:{
	  gotoRegister(){
		  this.$router.push({path:`/register`,query:{
			  userId:this.user.userId,
			  ruleId:this.coupon.ruleId,
			  couponId:this.coupon.couponId,
			  faceValue:this.coupon.faceValue}})
	  }
  },
  mounted(){
	  this.user.userId = this.$route.params.id
	  sessionStorage.setItem('userId',this.user.userId)
	  this.api_coupon_getUserDetail({data:{token:this.$store.state.token,userId:this.user.userId}}).then(res=>{
		  if( res.content ){
			  if( res.content.icon && res.content.icon.length>0){
				  this.user.icon = res.content.icon
			  }
			  this.user.mobile = res.content.mobile
			  this.user.userName = res.content.userName
		  }
		  this.api_coupon_getCouponDetail().then(res=>{
			  if( res.content ){
				  this.coupon.ruleId = res.content.ruleId
				  this.coupon.couponId = res.content.couponId
				  this.coupon.content = res.content.content
				  this.coupon.faceValue = res.content.faceValue
				  this.coupon.couponName = res.content.couponName
				  this.coupon.rangeContent = res.content.rangeContent
				  this.coupon.expirationTimeStart = res.content.expirationTimeStart
				  this.coupon.expirationTimeEnd = res.content.expirationTimeEnd
			  }
		 })
	  })
  }
}
</script>

<style scoped>
/*邀请好友*/
.Invitingcontainer{
	width: 7.5rem;
	margin: auto;
	margin-bottom: 0.2rem;
	height: 100%;
	position: absolute;
	background: url('../../../static/images/coupon/zs_bg_xia.png') no-repeat bottom;
	background-size:cover;
}
.Invitingcontainer .banner{
	height: 3.2rem;
	width: 7.5rem;
	position: relative;
}
.Invitingcontainer .banner img{
	width: 100%;
	height: 100%;
}
.Invitingcontainer .banner .logo{
	width:1.6rem;
	height:1.6rem;
	float: left;
	position: absolute;
	top:58%;
	left:50%;
	transform:translate(-50%,-50%);
	border-radius: 50%;
	/* border:2px solid #fff; */
}
.Invitingcontainer .phonenum{
	width: 6.7rem;
	min-height: 1.16rem;
	background: rgb(89,51,76);
	font-size: 0.28rem;
	color: #FFFFFF;
	margin: auto;
	padding-top: 0.18rem;
	padding-right:1.1rem ;
	padding-left:1.1rem;
	text-align: center;
	margin-top: 0.8rem;
}
.Invitingcontainer .plat_coupon{
	width: 6.3rem;
	height: 4.14rem;
	margin: auto;
	background: url(../../../static/images/coupon/zs_quan.png) no-repeat center;
	background-size:cover ;
	margin-top: 0.8rem;
	padding-top: 0.84rem;
	padding-left: 0.15rem;
}
.Invitingcontainer .plat_coupon .Inviting01bg{
	width: 5.94rem;
    height: 1.8rem;
	background: url(../../../static/images/coupon/zs_youhuiquan.png) no-repeat;
	background-size:cover ;
}
.Invitingcontainer .Invitingleft{
	width:2rem;
	height: 100%;
	padding-top: 0.36rem;
}
.Invitingcontainer .Invitingleft .tit01{
	font-size: 0.26rem;
	color: rgb(253,50,66);
	text-align: center;
}
.Invitingcontainer .Invitingleft .tit02{
	font-size: 0.2rem;
	color: rgb(125,85,15);
	text-align: center;
}
.Invitingcontainer .Invitingright{
	width:3.94rem;
	height: 100%;
	padding-top: 0.3rem;
	padding-left: 0.2rem;
}
.Invitingcontainer .Invitingright .tit01{
	font-size: 0.28rem;
	color: rgb(51,51,51);
	margin-bottom: 0.3rem;
}
.Invitingcontainer .Invitingright .tit02{
	font-size: 0.2rem;
	color: rgb(102,102,102);
}
.Invitingcontainer .btn{
	width: 3.7rem;
	height: 0.8rem;
	background: url(../../../static/images/coupon/zs_anniu.png) no-repeat center;
	background-size:cover ;
	margin: auto;
	margin-top: 0.4rem;
}
.Invitingcontainer .foot{
    font-size:0.1rem;
    margin:auto;
    text-align: center;
    margin-top:0.8rem;
}
.bigsize{
	font-size: 0.6rem;
	font-weight: 600;
}
.yellowcolor{
	color: rgb(255,247,29);
}

.mt80{
	margin-top: 0.8rem;
}
.mb10{
	margin-bottom: 0.1rem;
}
.mb20{
	margin-bottom: 0.2rem;
}
.mt20{
	margin-top: 0.2rem;
}
</style>
