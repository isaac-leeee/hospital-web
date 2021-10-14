<template>
  <div id="login">
    <div class="loginout">
      <div class="logintit">welcome Use</div>
      <el-form ref="form" :rules="loginRules" :model="loginForm" size="small" label-width="80px">
        <el-form-item prop="username" label="账 户：">
          <el-input v-model="loginForm.username" placeholder="请输入账户">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="密 码：">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <div class="btnout">
          <el-button type="success" @click="loginFn" size="small">立 即 登 陆</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {pwdLogin} from '../../api/mainApi'
export default{
  name: "Login",
  data(){
    return{
      loginForm:{
        username:'isaac',
        password:'123123'
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
    }
  },
  methods:{
    async loginFn(){
      const data = await pwdLogin({
        username:this.loginForm.username,
        password:this.loginForm.password
      })
      if (data.data.code == 200){
        // this.$router.push({path:"/main"});
        localStorage.setItem('token', data.data.result.token);
      }else{
        this.$message.error(data.data.msg);
      }
    }
  }
}
</script>

<style lang="scss">
  #login{
    width: 100%;
    height: 100vh;
    background-image: url("../../assets/img/loginbg.jpeg");
    background-position: center;
    background-size: 100%;
    position: relative;
    .el-form-item__label{color: #ffffff!important;}
    .loginout{
      position: absolute;
      left: calc(50% - 250px);
      top:10vh;
      width: 500px;
      min-height: 250px;
      border-radius: 20px;
      background:rgba(0,0,0,.5);
      padding: 20px;
      .logintit{
        color: #ffffff;
        font-size: 24px;
        text-align: center;
        padding-bottom: 20px;
        font-weight: bold;
      }
      .btnout{
        padding-top: 20px;
        text-align: center;
      }
    }
  }
</style>