<template>
  <layout index="goods">
    <template slot="body">
      <el-row>
        <el-col :span="18">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">{{$t('messages.tab.index')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'goods-index' }">{{$t('messages.tab.goods')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'goods-amount' }">{{$t('messages.crumb.storage')}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px" class="demo-ruleForm">
        <el-form-item prop="name" :label="$t('messages.form.label.goods.name')">
          <el-col :span="8">
            <el-input v-model="form.name" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="amount" :label="$t('messages.form.label.goods.amount')">
          <el-input-number v-model="form.amount" :precision="2" :step="1" :min="0"></el-input-number>
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
    created () {
      this.handleInfo()
    },
    data () {
      let _this = this
      return {
        form: {
          id: 0,
          name: '',
          amount: 0.00,
        },
        categories: [],
        rules: {
          price: [
            { required: true, message: _this.$t('messages.form.rule.goods.price.required'), trigger: 'blur' }
          ],
          discount_price: [
            { required: true, message: _this.$t('messages.form.rule.goods.discount_price.required'), trigger: 'blur' }
          ],
          amount: [
            { required: true, message: _this.$t('messages.form.rule.goods.amount.required'), trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      onSubmit () {
        let _this = this
        _this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.axios.post(this.api.goods_logs.create, _this.form)
            .then(function (response) {
              _this.$router.push({name: 'goods-index'})
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
        _this.axios.get(_this.api.goods.view + id)
        .then(function (response) {
          let _data = response.data
          _this.form.name = _data.name
          _this.form.goods_id = id
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

<style scoped>
  .el-input-number {
    width: 200px;
  }
</style>
