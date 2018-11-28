<template>
  <div>
    <el-carousel :interval="3000" arrow="always" height="200px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <h1 class="title--4x">
      数据管理平台
    </h1>
    <h2 class="subtitle">
      数据校对/管理/显示
    </h2>
    <div class="login-form" v-if="!$store.state.authUser" >
      <el-form :model="form" ref="dynamicValidateForm">
        <el-form-item
          label="名字"
          :label-width="formLabelWidth"
          prop="username"
          :rules="[{required: true, message:'名字不能为空',trigger: 'blur'}]">
          <el-input v-model="form.username" autocomplete="off" type="username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
          :rules="[{required: true, message:'密码不能为空',trigger: 'blur'}]">
          <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-button @click="dialogFormVisible = false" class="button--orange">取 消</el-button>
        <el-button type="submit" @click="login('dynamicValidateForm')" class="button--orange">确 定</el-button>
        <el-form-item class="el-form-item__error" prop="error">
          <small type="error">{{form.error}}</small>
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <el-button class="button--orange" @click="logout()">登出</el-button>
    </div>
  </div>
</template>

<script>
  import axios from "../.nuxt/axios";

  export default {
    head: {
      title: "HOME|首页"
    },
    data() {
      return {
        form: {
          username: '',
          password: '',
          error:''
        },
        formLabelWidth: '50px',
      };
    },
    methods: {
      async logout() {
        await this.$store.dispatch('logout').then(()=>{
          this.$message({
            type: 'success',
            message: '已退出登录!',
            duration: 1200
          });
        })
      },
      async login(formName){
        let valid_status = true;
        this.$refs[formName].validate((valid) => {
          if (!valid)  {
            console.log('error submit!!');
            valid_status = false;
            return false;
          }
        });
        if(valid_status === false) {
          return;
        }
        try {
          await this.$store.dispatch('login', {
            username: this.form.username,
            password: this.form.password
          });
          console.log('login success');
            this.$message({
              type: 'success',
              message: '登录成功!',
              duration: 800
           });
            this.form.username = "";
            this.form.password = "";
            this.form.error = "";
        } catch (e) {
          console.log('login error');
          this.form.error = "登录失败！用户名或密码错误！";
          this.form.username = "";
          this.form.password = "";
        }
      }
    }
  }
</script>
<style>
  .login-form {
    width: 30%;
    height: 100%;
    box-sizing: padding-box;
    padding: 20px;
    margin: auto auto;
    border-radius: 10px;
    box-shadow: 1px 0px 3px lightgrey;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel {
    margin: 5px;
  }
  .el-carousel__item:nth-child(odd) {
    background-image: url("../assets/img/slides/orange-background-03.jpg");
    background-clip: border-box;
  }
  .el-carousel__item:nth-child(even) {
    background-image: url("../assets/img/slides/orange-background-02.jpg");
    background-clip: border-box;
  }
  @media screen and (max-width: 600px) {
    .login-form {
      width: 80%;
      height: 100%;
    }
  }
  @media screen and (max-width: 900px) {
    .login-form {
      width: 60%;
      height: 100%;
    }
  }
</style>
