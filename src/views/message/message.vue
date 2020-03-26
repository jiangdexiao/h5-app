<template>
	<div class="app_container">
		<div class="content"  v-html="message"></div>
	</div>
</template>
<script>
export default {
  data(){
		return {
			message:'',
			title: ''
		}
  },
  beforeCreate () {
    document.title = '消息通知'
  },
  mounted(){
		// console.log('ID', this.$route.params.id)
		let pushEntityId = this.$route.params.id
		this.api_coupon_getMsgContent ({ 
			data: {
				pushEntityId: pushEntityId
			}
		}).then(res => {
			this.message = res.content.content
			this.title = res.title
		})
  }
}
</script>
	