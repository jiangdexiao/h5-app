<template>
    <div class="app_container txt">
        <div class="content"  v-html="above"></div>
    </div>
</template>
<script>
export default {
  data(){
      return {
          above:''
      }
  },
  mounted(){
      let _this = this
      $.ajax({
        url: `${_this.BASE_URL}m2c.operate/app/activity/html.app?activityId=${_this.$route.params.id}`,
        success: function(data) {
            _this.above = data
        }
      });
  }
}
</script>
