<template>
  <layout index="buyers">
    <template slot="body">
      <el-row>
        <el-col :span="18">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">{{$t('messages.tab.index')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'buyers-index' }">{{$t('messages.tab.buyers')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'buyers-add' }">{{$t('messages.crumb.edit')}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px" class="demo-ruleForm">
        <el-form-item prop="name" :label="$t('messages.form.label.buyers.name')">
          <el-col :span="8">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="phone" :label="$t('messages.form.label.buyers.phone')">
          <el-col :span="8">
            <el-input v-model="form.phone"></el-input>
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
  import Layout from '@/components/Layout'

  export default {
    name: 'buyers-edit',
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
    created () {
      this.handleInfo()
    },
    data () {
      let _this = this
      function repeatName (rule, value, callback) {
        _this.axios.get(_this.api.buyers.repeat, {params: {name: value, id: _this.$route.query.id}})
        .then(function (response) {
          let _data = response.data
          if (_data.length > 0) {
            callback(new Error())
          } else {
            callback()
          }
        })
        .catch(function (error) {
          _this.$message({
            type: 'error',
            message: error.response.data.message
          })
        })
      }
      return {
        form: {
          name: '',
          create_time: 0
        },
        rules: {
          name: [
            { required: true, message: _this.$t('messages.form.rule.buyers.name.required'), trigger: 'blur' },
            { validator: repeatName, message: _this.$t('messages.form.rule.buyers.name.repeat'), trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit () {
        let _this = this
        _this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.axios.put(this.api.buyers.update + _this.form.id, _this.form)
            .then(function (response) {
              _this.$router.push({name: 'buyers-index'})
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
      },
      handleInfo () {
        let _this = this
        let id = _this.$route.query.id
        _this.axios.get(_this.api.buyers.view + id)
        .then(function (response) {
          let _data = response.data
          _this.form = _data
        })
        .catch(function (error) {
          _this.$message({
            type: 'error',
            message: error.response.data.message
          })
        })
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
