<template>
  <el-row>
    <el-col :span="8">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card">
        <img src="../assets/logo.png">
        <div class="grid-content bg-purple-light">
          <el-input
            placeholder="请输入手机号"
            prefix-icon="el-icon-mobile-phone"
            v-model="username">
          </el-input>
        </div>
        <div class="grid-content bg-purple-light pwd">
          <el-input
            placeholder="请输入密码"
            type="password"
            prefix-icon="el-icon-mobile-phone"
            v-model="password">
          </el-input>
        </div>
        <div>
          <el-button type="primary" size="medium" class="btn" v-on:click="login">登录</el-button>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>

</template>

<script>
  import Vue from 'vue'
  import md5 from 'js-md5'
  import {mapMutations} from 'vuex'

  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        user: null
      }
    },
    methods: {
      ...mapMutations(['changeLogin', 'setUser']),
      login: function (event) {
        let username = this.username;
        let password = this.password;
        let _this = this;
        if (!(/^1[34578]\d{9}$/.test(username))) {
          this.$message({
            message: '手机号错误',
            type: 'warning'
          });
          return
        }
        if (password == null || password.length === 0) {
          this.$message({
            message: '密码不能为空',
            type: 'warning'
          });
          return
        }
        password = md5(password);
        Vue.axios.post('/api/account/login', {
          username: username,
          password: password
        }).then(function (res) {
          console.log(res);
          let data = res.data.data;
          let userToken = data.token;
          _this.user = {
            name: res.data.data.name,
            uid: data.uid,
            address: data.address,
            sex: data.sex,
            area: data.area,
            mobile: data.mobile,
            role: data.role,
            createTime: data.createTime,
            status: data.status,
            remark: data.remark,
            auth: data.auth,
            updateTime: data.updateTime
          };
          _this.changeLogin({Authorization: userToken});
          _this.setUser({user: _this.user});
          _this.$router.push('/home')
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>

<style>
  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  /*.bg-purple-dark {*/
  /*  background: #99a9bf;*/
  /*}*/
  /*.bg-purple {*/
  /*  background: #d3dce6;*/
  /*}*/
  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 0 18px;
  }

  .box-card {
    width: 450px;
    height: 450px;
    margin: 150px 50px;
    background-color: white;
  }

  .pwd {
    margin-top: 20px;
  }

  .btn {
    margin-top: 10%;
    width: 100%;
  }
</style>
