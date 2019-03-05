<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HttpStatus from "http-status"
export default {
  name: 'app',
  created () {
    let _this = this
    let access_token = localStorage.getItem('access_token')
    if (access_token != undefined && access_token.length > 0) {
      // 添加请求拦截器
      this.axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        config.headers.Authorization = "Bearer " + localStorage.getItem('access_token')
        return config;
      }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      });

      // 添加响应拦截器
      this.axios.interceptors.response.use(function (response) {
        if (response.status == HttpStatus.UNAUTHORIZED) {
          localStorage.removeItem('access_token')
          this.$router.push({name: 'login'})
        }
        return response
      }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error)
      });
    }
  }
}
</script>

<style>
  html, body {
    height: 100%;
  }
  #app{
    height: 100%;
  }
</style>
