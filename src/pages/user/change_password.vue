<template>
  <layout index="index">
    <template slot="body">
      <el-row>
        <el-col :span="18">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">{{$t('messages.tab.index')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'users-change_password' }">{{$t('messages.tab.users')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'users-change_password' }">{{$t('messages.crumb.change_password')}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px" class="demo-ruleForm">
        <el-form-item prop="oldPassword" :label="$t('messages.form.label.change_password.oldPassword')">
          <el-col :span="8">
            <el-input type="password" v-model="form.oldPassword"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="password" :label="$t('messages.form.label.change_password.password')">
          <el-col :span="8">
            <el-input type="password" v-model="form.password"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="confirmPassword" :label="$t('messages.form.label.change_password.confirmPassword')">
          <el-col :span="8">
            <el-input type="password" v-model="form.confirmPassword"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{$t('messages.form.button.submit')}}</el-button>
          <el-button @click="onCancle">{{$t('messages.form.button.cancel')}}</el-button>
        </el-form-item>
      </el-form>
    </template>
  </layout>
</template>

<script>
  import {
    Container,
    Header,
    Main,
    Col,
    Row,
    Form,
    FormItem,
    Input,
    Button
  } from 'element-ui'
  import Layout from '../../components/Layout'

  export default {
    name: 'landing-page',
    components: {
      Container,
      Header,
      Main,
      Col,
      Row,
      Form,
      FormItem,
      Input,
      Button,
      Layout
    },
    data () {
      let _this = this
      function same (rule, value, callback) {
        if (value != _this.form.password) {
          callback(new Error())
        } else {
          callback()
        }
      }
      return {
        form: {
          oldPassword: '',
          password: '',
          confirmPassword: ''
        },
        rules: {
          oldPassword: [
            { required: true, message: _this.$t('messages.form.rule.change_password.oldPassword.required'), trigger: 'blur' }
          ],
          password: [
            { required: true, message: _this.$t('messages.form.rule.change_password.password.required'), trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: _this.$t('messages.form.rule.change_password.confirmPassword.required'), trigger: 'blur' },
            { validator: same, message: _this.$t('messages.form.rule.change_password.confirmPassword.same'), trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit () {
        let _this = this
        _this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let access_token = localStorage.getItem('access_token')
            access_token = access_token.split('.')
            let user = JSON.parse(atob(access_token[1]))
            this.user = user

            this.axios.put(this.api.users.change_password + user.id, _this.form)
            .then(function (response) {
              _this.$router.push({name: 'index-index'})
            })
            .catch(function (error) {
              _this.$message({
                type: 'error',
                message: error.response.data.message
              })
            })
          }
        })
      },
      onCancle () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
