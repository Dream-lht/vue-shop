<template>
  <el-button type="info" @click="quit">退出</el-button>
</template>

<script>
export default {
  name:'Home',
  methods:{
  // 退出登录
    quit(){
      // 清除sessionStorage当中的token
      window.sessionStorage.clear()
      // 清除完毕以后，强制退出到首页
      this.$router.replace('/login')
      
    }
  }
}
</script>

<style scoped>

</style>