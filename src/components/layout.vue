<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
    		<el-col :span="8" class="logo">
          测试后台管理系统
        </el-col>
        <el-col :offset="8" :span="8" style="text-align: right;">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="index" class="el-menu-vertical-demo"  @select="handleSelect" :collapse="false">
          <el-menu-item index="index">首页</el-menu-item>
          <el-menu-item index="categories">分类管理</el-menu-item>
          <el-menu-item index="goods">商品管理</el-menu-item>
          <el-menu-item index="users">客户管理</el-menu-item>
          <el-menu-item index="orders">订单管理</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <slot name="body"></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {
    Container,
    Header,
    Main,
    Aside,
    Menu,
    MenuItem
  } from 'element-ui'
  export default {
    name: 'layout',
    components: {
      Container,
      Header,
      Aside,
      Main,
      Menu,
      MenuItem
    },
    props: [
      'index'
    ],
    mounted () {
      let access_token = localStorage.getItem('access_token')
      if (access_token == undefined || access.length == 0) {
        this.$router.push({name: 'login'})
      }
      // 添加请求拦截器
      this.axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        console.log(config)
        return config;
      }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      });

      // 添加响应拦截器
      this.axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        console.log(error.response.status)
        // 对响应错误做点什么
        return Promise.reject(error)
      });
    },
    data () {
      return {
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        this.$router.push({name: key + '-index'})
      }
    }
  }
</script>

<style>
  body {
    margin: 0;
  }
  .el-menu,.el-main {
    overflow: auto;
  }
  .el-container, .el-aside, .el-menu {
    height: 100%;
  }
  .el-container {
    padding: 8px;
  }
  .logo {
    font-size: 30px;
  }
  .el-header-row {
    height: 100%;
    display: flex;
    align-items: center;
  }
</style>
