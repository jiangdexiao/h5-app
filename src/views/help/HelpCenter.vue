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
      this.api_user_helpcenter({ data:{token:this.$store.state.token,columnId:this.$route.params.id}  }).then(res=>{
          this.html = res.content
      })
  }
}
</script>
