<template>
    <div class="app_container txt">
    <div class="content"  v-html="html"></div>
  </div>
</template>
<script>
export default {
  data(){
      return {
          html:''
      }
  },
  mounted(){
      this.api_user_topline({ data:{token:this.$store.state.token,topLineId:this.$route.params.id}  }).then(res=>{
          this.html = res.content
      })
  }
}
</script>
