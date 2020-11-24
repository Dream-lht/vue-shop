<template>
  <div class="login">
   <div class="login-box">
     <!-- 这里是头部 -->
     <div class="login-head">
       <img src="~assets/logo.png">
     </div>
     <!-- 这里是表单 -->
     <el-form class="demo-form-inline" :model="loginfrom" :rules="loginrules" ref="loginfromRef">
       <!-- 用户名 -->
        <el-form-item class="uname"  prop="username">
          <el-input placeholder="用户名" prefix-icon="iconfont icon-user" v-model="loginfrom.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item class="password"  prop="password">
          <el-input placeholder="密码" prefix-icon="iconfont icon-password" v-model="loginfrom.password" type="password"></el-input>
        </el-form-item>
        <!-- 这里是按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
     </el-form>   
   </div>
  </div>
</template>

<script>

// 导入网络请求封装函数
export default {
  name:'login',
  data(){
    return{
      // 这是登录表单的数据绑定对象
      loginfrom:{
        username:'admin',
        password:'123456'
      },
      // 表单验证规则
      loginrules:{
        username:[
          // required: true 必填  message 错误提示信息 trigger 触发条件
            { required: true, message: '请输入用户名', trigger: 'blur' },
            // min 最少字符 max 最多字符
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ]
      }
    }
  },
  methods:{
    // 实现表单的重置效果
    resetForm(){
      // 通过ref获取组件
      // this指向的是整个组件，所有的ref都会定义在一个$refs对象当中，我们可以通过$refs对象来获取
      this.$refs.loginfromRef.resetFields()
    },
    login(){
      // 点击登录按钮进行表单预验证
      this.$refs.loginfromRef.validate( (vali) => {
        if(!vali){
          this.$message.error("登录失败");
        }else{
           this.$http('post','/login',this.loginfrom)
            .then(res => {
              if(res.data.meta.status == 200){
                this.$message.success("登录成功!")
                //把后台传过来的token值保存到sessionStorage当中
                window.sessionStorage.setItem('token',res.data.data.token)
                // 然后跳转到home页面
                this.$router.push('/home')
              }else{
                this.$message.error("登录失败!")
              }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login{
    position: relative;
    height: 100%;
    background-color: #2b4b6b;
  }
  .login-box{
    height: 300px;
    width: 450px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
  }
  .login-head{
    position: absolute;
    // top: -25%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 130px;
    height: 130px;
    padding: 6px;
    border-radius: 50%;
    border: 5px solid #eeeeee;
    background-color: rgba(155, 125, 125, 0.8);
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .demo-form-inline{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    .btns{
      // 弹性布局，居右对齐
      display: flex;
      justify-content: center;
    }
  }
  
</style>