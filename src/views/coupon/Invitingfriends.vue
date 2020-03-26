<template>
  <div class="Invitingcontainer">
	<div class="banner">
		<img src="../../../static/images/coupon/zs_bg_banner.png" data-adaptive-background="1" />
	</div>
	<div class="conten">
        <div class="phonenum">
            <div class="img_logo">
                <img v-if="user.icon.length>0" class="logo" :src="user.icon"  />
				<img v-else class="logo" src="../../../static/images/coupon/user_logo.png"  />
            </div>
            <div class="ticket_txt">
                <span class="yellowcolor">@{{getMobile}}</span>
                <span>亲爱哒~给你送来专属优惠券,<br>一块进入拍获的世界吧~</span>
            </div>
        </div>
        <div class="plat_coupon">
            <div class="Inviting01bg clear mb20"></div>
            <div class="btn" @click="gotoRegister" ></div>
        </div>
	</div>
	<div class="foot mt80">本活动最终解释权归拍获所有</div>
</div>
</template>
<script>
import shareWX from '../../utils/tool/webchat'
export default {
  data(){
	  return{
		  user:{
			  icon:``,//${window.location.href.split('#')[0]}static/images/coupon/user_logo.png
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
			  if(this.tool.validate.mobile(this.user.userName)){
				  return `${this.user.userName.substr(0,3)}****${this.user.userName.substr(7)}`
			  }else{
				  return `${this.user.userName}`
			  }
		  }else{
			  if( this.user.mobile && this.user.mobile.length >0){
				  return `${this.user.mobile.substr(0,3)}****${this.user.mobile.substr(7)}`
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
	  var link = window.location.href;
	  var protocol = window.location.protocol;
	  var host = window.location.host;
	  console.log('link>'+link)
	  console.log('protocol>'+protocol)
	  console.log('host>'+host)
	  document.title = '邀请好友'
	  this.user.userId = this.$route.params.id
	  sessionStorage.setItem('userId',this.user.userId)
	  this.api_coupon_getUserDetail({data:{token:this.$store.state.token,userId:this.user.userId}}).then(res=>{
		  if( res.content ){
			  if( res.content.icon && res.content.icon.length>0 && this.tool.str.isImage(res.content.icon)){
				  this.user.icon = res.content.icon
			  }
			  this.user.mobile = res.content.mobile
			  this.user.userName = res.content.username
			  shareWX({
				title: '邀请有礼！', // 分享标题
				desc: `${res.content.username?res.content.username:res.content.mobile}给你送来专属优惠券，一起进入拍获的世界`, // 分享描述
				link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: protocol+'//'+host+'/m2c-app/static/images/coupon/loginLogo@2x.png', // 自定义图标
				type: 'link', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function () {
					// 用户确认分享后执行的回调函数
					// alert('分享成功')
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
					// alert('取消分享')
				}
			},`${this.BASE_URL}m2c.operate/wechatConfig/jssdk`)
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
		 }).catch(err=>{
			//  alert(err.errorMessage)
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
	height: 100%;
/*    position: absolute;*/
    background-color: rgb(249, 231, 232);
	/* background: url('../../../static/images/coupon/zs_bg.png') no-repeat bottom; 
	background-size:cover;*/
}
.Invitingcontainer .conten{
    width: 7.2rem;
	margin: auto;
	background: url('../../../static/images/coupon/zs_bg.png') no-repeat bottom;
    background-size:cover;
    border-radius: 0% 0% 3% 3%;
}
.Invitingcontainer .banner{
	height: 3.2rem;
	width: 7.5rem;
	position: relative;
}
.Invitingcontainer .banner img{
	width: 100%;
	/* height: 100%; */
}

.Invitingcontainer .phonenum{
	width: 6.7rem;
	min-height: 3.16rem;
	font-size: 0.28rem;
	color: #FFFFFF;
	margin: auto;
	padding-top: 1.18rem;
	padding-right:1.1rem ;
	padding-left:1.1rem;
	margin-top: 0.8rem;
}
.Invitingcontainer .phonenum .img_logo{
    width:30%;
    float:left;
    position: absolute;
    left:15%;
	/* border:2px solid #fff; */
}
.Invitingcontainer .phonenum .img_logo img{
    width:1.3rem;
	height:1.3rem;
    border-radius: 50%;
}

.Invitingcontainer .phonenum .ticket_txt{
    /*width:70%;*/
    float: right;
    position: absolute;
    left:35%;
}
.Invitingcontainer .phonenum .ticket_txt span{
    display: inherit;
}
.Invitingcontainer .plat_coupon{
	width: 6.3rem;
	height: 5.14rem;
	margin: auto;
	padding-left: 0.15rem;
}
.Invitingcontainer .plat_coupon .Inviting01bg{
	width: 5.94rem;
    height: 2.5rem;
	background: url(../../../static/images/coupon/zs_ticket.png) no-repeat;
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
	height: 0.89rem;
	background: url(../../../static/images/coupon/zs_btn.png) no-repeat center;
	background-size:cover ;
	margin: auto;
	margin-top: 0.4rem;
}
.Invitingcontainer .foot{
    font-size:0.1rem;
    margin:auto;
    text-align: center;
    padding-top:0.3rem;
    padding-bottom: 0.3rem;
    color:rgb( 221, 157, 157);
    background-color: rgb(249, 231, 232);
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
