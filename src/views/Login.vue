<template>
  <div class="box">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="login-container">
      <h3 class="title">lm系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="submit" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//import NProgress from 'nprogress'
export default {
    data() {
        return {
            logining: false,
            ruleForm: {
                account: 'admin',
                checkPass: '123456'
            },
            rules: {
                account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                checkPass: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            checked: true
        }
    },
    methods: {
        submit() {
            console.log(1232)
            this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  //   background: url("../assets/img/logo.gif") no-repeat 250px 50%;
  background-color: $sideBgc;
  position: relative;
}
.login-container {
  position: absolute;
  top: 50%;
  right: 250px;
  transform: translateY(-50%);
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  //   box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    float: right;
    margin: 0px 0px 35px 0px;
  }
}
</style>