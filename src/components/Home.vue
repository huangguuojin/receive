<template>
  <div>
    <el-container>
      <el-aside width="200px" class="slide-box">
        <div class="logo-box">
          <i class="iconfont icon-logo"></i>
        </div>
        <el-menu
          :default-active="navDefaultActive"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="overflow: hidden;width: 200px;background: #545c64;"
        >
                    <span v-for="(item,key) in menu"  :key="key">
                        <el-menu-item v-if="item.child.length ==0"    :index="''+key"  @click="navActive(item,key)" >
                             <i :class="item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                        <el-submenu :index="''+key"  v-if="item.child.length >0" >
                            <template slot="title">
                               <i :class="item.icon"></i>
                                <span>{{item.name}}</span>
                            </template>
                                <el-menu-item :index="key+'-'+key1" v-for="(item1,key1) in item.child" @click="navActive1(key,item1,key1)" :key="key1">{{item1.name}}</el-menu-item>
                        </el-submenu>
                    </span>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header-box" >
          <div class="system-box">回收系统</div>

          <div class="system-mech">
            <div style="float: right">
              <el-button type="danger" plain size="mini" @click="outLogin">注销登录</el-button>
            </div>
          </div>
        </el-header>
        <el-main style="background: #f0f2f5;height: 100%;overflow: hidden"  >
          <div class="main" style="min-height: 100%" >
            <router-view v-if="isRouterActive"></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>



  </div>
</template>

<script>
  import Vue from 'vue'
    export default {
      name: "Home",
      data() {
        return {
          menu: '',
          isRouterActive: true,
          navDefaultActive: '0'
        }
      },
      created: function() {
        let Authorization = localStorage.getItem('Authorization')
        let _this = this
        Vue.axios.post('/api/common/roleMenu',[], {headers: {Authorization: Authorization}}).then(function (res) {
          console.log(res)
          _this.menu = res.data.data
        }).catch(function (error) {
          console.log(error)
        })
      },
      methods: {
        //事件层
        //一级菜单选中事件
        navActive(item,key) {
          console.log(item)
          this.navDefaultActive = ''+key
          this.$router.push(item.path)
        },
        //二级菜单选中事件
        navActive1(key,item1,key1) {
          this.navDefaultActive = key+'-'+key1
          this.$router.push(item1.path)
        },
        outLogin(){
          localStorage.setItem('Authorization', '')
          localStorage.setItem('user', '')
          this.$router.push('/login')
        }
      }
    }
</script>

<style scoped>
  #app{
    margin-top: 0;
  }
  .main{
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .slide-box {
    width: 100px;
    background: #545c64;
    min-height: 100vh;
    overflow: hidden;
    text-align: left;
  }

  .logo-box {
    width: 200px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 40px;
    color: #fff;
  }

  .logo-box i {
    width: 200px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    font-size: 40px;

  }

  .header-box {
    background: #545c64;
    font-size: 1.8rem;
    line-height: 60px;
    color: #fff;
  }

  .icon-box {
    display: block;
    float: left;
    width: 1.5rem;
    height: 56px;
    margin-right: 10px;
    font-size: 1.5rem;
  }
  .el-menu .el-submenu__title {
    height: 45px;
    line-height: 45px;
    padding: 0 40px 0 20px;
    font-size: 16px;
    color: #999;
  }
  .system-box {
    float: left;
    width: 250px;
    height: 60px;
    letter-spacing: 5px;
    font-weight: 600;
    text-align: center;
  }
  .menu-wrap .el-menu .el-submenu__title {
    height: 45px;
    line-height: 45px;
    padding: 0 40px 0 20px;
    font-size: 16px;
    color: #999;
  }
  .system-mech {
    position: relative;
    width: auto;
    height: 60px;
    margin-left: 250px;
    letter-spacing: 5px;
    font-weight: 600;
    text-align: center;

  }

  .system-center {
    position: absolute;
    width: 300px;
    height: 60px;
    left: 50%;
    margin-left: -250px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .system-right {
    position: absolute;
    right: 100px;
    cursor: pointer;
  }

  .system-right span {
    color: #fff;
    border: 1px solid #ddd;
    background: rgba(255, 255, 255, .3);
  }
  .el-menu-item{
    width: 10%;
  }
</style>
