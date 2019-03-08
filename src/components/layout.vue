<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
    		<el-col :span="8" class="logo">
          {{$t('messages.header.title')}}
        </el-col>
        <el-col :offset="8" :span="8" style="text-align: right;">
          <el-dropdown :split-button="true">
            <i class="el-icon-setting" style="margin-right: 15px"></i>{{user.name}}
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click="open({name: 'users-change_password'})">{{$t('messages.crumb.change_password')}}</span></el-dropdown-item>
              <el-dropdown-item><span @click="logout()">{{$t('messages.tab.logout')}}</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <span>{{user.name}}</span> -->
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="index" class="el-menu-vertical-demo"  @select="handleSelect" :collapse="false">
          <el-menu-item index="index">{{$t('messages.tab.index')}}</el-menu-item>
          <el-menu-item index="categories">{{$t('messages.tab.categories')}}</el-menu-item>
          <el-menu-item index="goods">{{$t('messages.tab.goods')}}</el-menu-item>
          <el-menu-item index="buyers">{{$t('messages.tab.buyers')}}</el-menu-item>
          <el-menu-item index="orders">{{$t('messages.tab.orders')}}</el-menu-item>
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
    data () {
      return {
        user: {
          name: '',
        }
      }
    },
    props: [
      'index'
    ],
    mounted () {
      let access_token = localStorage.getItem('access_token')
      if (access_token == undefined || access_token.length == 0) {
        this.$router.push({name: 'login'})
      } else {
        access_token = access_token.split('.')
        let user = JSON.parse(atob(access_token[1]))
        this.user = user
      }
    },
    methods: {
      open (link) {
        this.$router.push(link)
      },
      handleSelect (key, keyPath) {
        this.$router.push({name: key + '-index'})
      },
      logout () {
        let _this = this
        localStorage.removeItem('access_token')
        _this.$message({
          type: 'success',
          message: _this.$t('messages.message.logout.success'),
          duration: 1000,
          onClose: () => {
            _this.$router.push({name: 'login'})
          }
        })
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
