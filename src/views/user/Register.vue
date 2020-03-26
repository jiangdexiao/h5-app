<template>
  <div class="registercontainer">
	<div class="register_logo"></div>
	<div class="register_content">
		<div class="register_input poi1">
			<i class="bg01 bg poi2"></i>
			<input type="number" @keyup="mobileKeyup(1)" placeholder="手机号码" oninput="if(value.length>11)value=value.slice(0,11)" v-model="mobile" />
		</div>
		<div class="register_input poi1">
			<i class="bg02 bg poi2"></i>
			<input placeholder="手机验证码" @keyup="mobileKeyup(2)" maxlength="4" v-model="code" />
			<span :class="[codeDisabled===true?'getcode poi2 disabled':'getcode poi2 enabled']" @click="sendsms">{{codeText}}</span>
		</div>
		<div class="register_input poi1">
			<i class="bg03 bg poi2"></i>
			<input type="password" @keyup="mobileKeyup(3)" placeholder="密码6-16位" maxlength="16" v-model="password" />
		</div>
		
		<button :class="[saveDisabled===true?'no_complete':'complete']" @click="onSave">完成</button>
		<div class="title">注册拍获代表您已阅读并同意  <a @click="Agreement" style="color:gray;text-decoration:underline;" >用户协议</a></div>
		<div class="poi3 alert_conten" :style="{display:success?'block':'none'}"></div>
		<div class="alert poi2" :style="{display:success?'block':'none'}">
			<span>注册成功，还差最后一步就完成啦</span>
			<div class="mt80">
				<a class="download" @click="gotoApp">下载App</a>
				<a class="nodown" @click="goBack" >暂不下载</a>
			</div>
		</div>
	</div>
</div>

</template>

<script>
import md5 from 'md5'
import MobileDetect from 'mobile-detect'
Array.prototype.contains = function(needle) {  
        for (var i in this) {  
            if (this[i].indexOf(needle) > 0)  
                return i;  
        }  
        return -1;  
    }  
export default {
  data(){
	  return {
		  mobile:'',
		  code:'',
		  password:'',
		  saveDisabled:true,
		  codeDisabled:true,
		  codeText:'获取验证码',
			// 再次发送短信剩余时间
			phoneModel:'',
		  time: 60,
		  userId:'',
		  ruleId:'',
		  couponId:'',
		  faceValue:'',
		  success:false,//是否注册成功
	  }
  },
  methods:{
	  gotoApp(){
		  this.success = false
		  window.location.href = this.$store.state.appdown
	  },
	  goBack(){
		  this.success = false
		  this.userId = sessionStorage.getItem('userId')
		  this.$router.push({path:`/Invitingfriends/${this.userId}`})
	  },
	  mobileKeyup(flag){
		  if( flag == 1){
			  if( this.mobile && this.mobile.trim().length > 0){
				  this.codeDisabled = false
			  }else{
				  this.codeDisabled = true
			  }
		  }

		  if( (this.mobile && this.mobile.trim().length > 0) &&
			this.code && this.code.trim().length>0 &&
			this.password && this.password.trim().length>0 ){
				this.saveDisabled = false
		 }else{
			 this.saveDisabled = true
		 }
	  },
	  sendsms(){

		  if( this.codeDisabled ){//禁用
			  return
		  }
		  if( !this.mobile){
			  return
		  }
		  else if( !this.tool.validate.mobile(this.mobile)){
			  alert('请输入正确的手机号码')
			  return
		  }else{
			  //判断手机号是否被注册
			  this.api_user_isregistered({ data:{ mobile:this.mobile } }).then(res=>{
				  //未注册  发送短信获取验证码
					this.codeDisabled= true
					this.codeText = this.time +'秒'
					let timer = setInterval(()=> {
						this.codeText = this.time +'秒'
						this.time -- 
						if (this.time < 0 ) {
							this.codeText = '重新发送'
							this.time = 60
							this.codeDisabled = false
							clearInterval(timer)
						}
					},1000)

				  this.api_user_sendSms({ data:{ token:this.$store.state.token,codeType:1,mobile:this.mobile} }).then(res=>{
					  this.time = 60
					  this.codeDisabled = true
				  }).catch(err=>{
					  alert(err.errorMessage)
				  })
			  }).catch(err=>{
				  alert(err.errorMessage)
			  })
		  }
	  },
	  Agreement(){
		  this.$router.push({path:'/agreement'})
	  },
	  onSave(){
		  if( this.saveDisabled === true)return
		  if( !this.mobile ){
			  alert('请输入手机号码')
			  return
		  }
		  else if( !this.tool.validate.mobile(this.mobile)){
			  alert('请输入正确的手机号码')
			  return
		  }

		  if( !this.password ){
			  alert('请输入密码')
			  return
		  }else if( this.password.trim().length < 6 || this.password.trim().length >16){
			  alert('请输入6-16位密码')
			  return
		  }else if( !this.tool.validate.password(this.password)){
			  alert('密码只能输入英文,数字和特殊字符！@#￥%.&*')
			  return
		  }

		  if( !this.code || this.code.trim().length < 4 ){
			  alert('请输入4位验证码')
			  return
		  }
		  var md = new MobileDetect(window.navigator.userAgent);
		  var device_type = window.navigator.userAgent;//获取userAgent信息  
		  var os = md.os();//获取系统  
		 var model = "";  
		if (os == "iOS") {//ios系统的处理  
			model = md.mobile();  
		} else if (os == "AndroidOS") {//Android系统的处理  
			var sss = device_type.split(";");  
			var i = sss.contains("Build/");  
			if (i > -1) {  
				model = sss[i].substring(0, sss[i].indexOf("Build/"));  
			}  
		}  
		console.log('model',model)
		// more typically we would instantiate with 'window.navigator.userAgent'
		// as user-agent; this string literal is only for better understanding
		// console.log( md.mobile() );          // 'Sony'
		// console.log( md.phone() );           // 'Sony'
		// console.log( md.tablet() );          // null
		// console.log( md.userAgent() );       // 'Safari'
		// console.log( md.os() );              // 'AndroidOS'
		// console.log( md.is('iPhone') );      // false
		// console.log( md.is('bot') );         // false
		// console.log( md.version('Webkit') );         // 534.3
		// console.log( md.versionStr('Build') );       // '4.1.A.0.562'
		// console.log( md.match('playstation|xbox') ); // false
		  this.api_user_sourceRegister({ data:{ 
			  mobile:this.mobile,
			  password:md5(this.password),
			  phoneModel:model,//机型信息
			  groupType:1,//普通用户
			  verifyCode:this.code,
			  businessType:1,// 推荐好友领取优惠券注册
			  source:2,//h5
			  incidental:JSON.stringify({ruleId:this.ruleId,couponId:this.couponId,faceValue:this.faceValue,referrerUserId:this.userId,recommendedMobile:this.mobile})
		   } }).then(res=>{
			   this.success = true
			   this.mobile = ''
			   this.password = ''
			   this.code = ''
		   }).catch(err=>{
			   this.code = ''
			   alert(err.errorMessage)
		   })
		},
	//获取手机型号函数
//  getPhoneType(){ 
// 		//正则,忽略大小写
// 		let pattern_phone = new RegExp("iphone","i");
// 		let pattern_android = new RegExp("android","i");
// 		var userAgent = navigator.userAgent.toLowerCase();
// 		var isAndroid = pattern_android.test(userAgent);
// 		var isIphone = pattern_phone.test(userAgent);
// 		var phoneType="phoneType";
// 		if(isAndroid){ 
// 				var zh_cnIndex = userAgent.indexOf("-");
// 				var spaceIndex = userAgent.indexOf("build",zh_cnIndex+4);
// 				var fullResult = userAgent.substring(zh_cnIndex,spaceIndex);
// 				phoneType=fullResult.split(";")[2];
// 			}else if(isIphone){ 
// 				//6   w=375    6plus w=414   5s w=320     5 w=320
// 				var wigth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
// 				if(wigth>400){ 
// 				phoneType = "iphone6 plus";
// 			}else if(wigth>370){ 
// 				phoneType = "iphone6";
// 			}else if(wigth>315){ 
// 				phoneType = "iphone5 or iphone5s";
// 			}else{ 
// 				phoneType = "iphone 4s";
// 			}
// 			}else{ 
// 				phoneType = "";
// 			}
// 	console.log("phoneType",phoneType)
// 		// return phoneType;
// 		this.phoneModel = phoneType
// }
  },
  mounted(){
	  document.title = '注册-拍获'
	  this.ruleId = this.$route.query.ruleId
	  this.userId = this.$route.query.userId
	  this.couponId = this.$route.query.couponId
		this.faceValue = this.$route.query.faceValue
		// this.getPhoneType()
	  // console.log('navigator.userAgent',navigator.userAgent);
  }
}
</script>


<style  scoped >
.mt80{
	margin-top: 0.8rem;
}
.registercontainer{
	
}
.alert_conten{
	width: 100%;
	height: 100%;
	top: 0px;
	left: 0px;
	background: #000;
	opacity: 0.5;
}
.download{
	width: 2.7rem;
	height: 0.72rem;
	background: rgb(253,50,66);
	display: inline-block;
	line-height: 0.72rem;
	border-radius:5px;
	text-align: center;
	color: #fff;
	margin-right: 0.1rem;
}
.nodown{
	width: 2.7rem;
	height: 0.72rem;
	background: rgb(204,204,204);
	display: inline-block;
	line-height: 0.72rem;
	border-radius:5px;
	text-align: center;
	color: #fff;
}
.alert{
	width: 6.3rem;
	height: 4rem;
	left: 50%;
	top: 50%;
	margin-left: -3.15rem;
	margin-top: -2rem;
	background: #FFFFFF;
	padding: 0.3rem;
	font-size: 0.32rem;
	color: #444;
	border-radius:10px ;
	text-align: center;
	padding-top: 1.3rem;
}
.registercontainer .register_logo{
	width: 1.6rem;
	height: 1.6rem;
	background: url(../../../static/images/coupon/loginLogo@2x.png);
	background-size:cover;
	margin: auto;
	margin-top: 0.6rem;
}
.registercontainer .register_content{
	margin-top: 0.6rem;
	padding-left: 0.3rem;
	padding-right: 0.3rem;
	font-size: 1rem;
}
.registercontainer .register_input input{
	border: none;
	width: 100%;
	height: 0.8rem;
	border-bottom: 1px solid rgb(240,240,240);
	padding-left: 0.5rem;
}
.complete{
	width: 100%;
	height: 0.72rem;
	line-height: 0.72rem;
	background: #fd3242;
	color: #FFFFFF;
	font-size: 0.28rem;
	text-align: center;
	margin-top: 0.2rem;
	border: none;
}
.no_complete{
	width: 100%;
	height: 0.72rem;
	line-height: 0.72rem;
	background: rgb(204,204,204);
	color: #FFFFFF;
	font-size: 0.28rem;
	text-align: center;
	margin-top: 0.2rem;
	border: none;
}
.registercontainer .title{
	margin-top: 0.3rem;
	text-align: center;
	color: rgb(102,102,102);
	font-size: 0.24rem;
}
.registercontainer .bg{
	width: 0.32rem;
	height: 0.32rem;
	display: inline-block;
	top: 0.8rem;
}
.registercontainer .bg01{
	background: url(../../../static/images/coupon/loginIcoPhone.png) no-repeat center;
	background-size:cover ;
}
.registercontainer .bg02{
	background: url(../../../static/images/coupon/icoLoginCode.png) no-repeat center;;
	background-size:cover ;
}
.registercontainer .bg03{
	background: url(../../../static/images/coupon/loginIcoPassword.png)no-repeat center;;
	background-size:cover ;
}
.registercontainer .getcode{
	padding:0.01rem 0.2rem;
	display: inline-block;
	border: 1px solid rgb(255,225,227);
	line-height: 0.5rem;
	font-size: 0.24rem;
	color: rgb(255,225,227);
	text-align: center;
	right: 0.3rem;
	top: 0.4rem;
	border-radius: 8%;
	width:1.7rem;
}
.enabled{
	border-color:#fd3242 !important;
	color:#fd3242 !important;
}
.disabled{
	border: 1px solid #ccc !important;
    color: #ccc !important;
}
</style>