<template>
  <div class="app_container txt">
    <div class="content" v-html="content"></div>
  </div>
</template>
<script>
export default {
  data(){
      return {
          content:''
      }
  },
  methods:{
      goBack(){
          this.$router.push({path:'/register'})
      }
  },
  mounted(){
      this.api_user_getAgreenment({ data:{show:1, code:110106} }).then(res=>{
          this.content = res.content
      })
  }
}
</script>
<style  scoped >

</style>
