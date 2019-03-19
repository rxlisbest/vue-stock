<template>
  <layout index="goods">
    <template slot="body">
      <el-row>
        <el-col :span="18">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">{{$t('messages.tab.index')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'goods-index' }">{{$t('messages.tab.goods')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'goods-edit' }">{{$t('messages.crumb.edit')}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px" class="demo-ruleForm">
        <el-form-item prop="name" :label="$t('messages.form.label.goods.name')">
          <el-col :span="8">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="goods_category_id" :label="$t('messages.form.label.goods.goods_category_id')">
          <el-select v-model="form.goods_category_id" :placeholder="$t('messages.form.label.goods.goods_category_id_placeholder')">
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="price" :label="$t('messages.form.label.goods.price')">
          <el-input-number v-model="form.price" :precision="2" :step="1" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item prop="discount_price" :label="$t('messages.form.label.goods.discount_price')">
          <el-input-number v-model="form.discount_price" :precision="2" :step="1" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item prop="amount" :label="$t('messages.form.label.goods.amount')">
          <el-input-number v-model="form.amount" :precision="2" :step="1" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item prop="unit" :label="$t('messages.form.label.goods.unit')">
          <el-col :span="3">
            <el-input v-model="form.unit"></el-input>
          </el-col>{{$t('messages.form.label.goods.unit_description')}}
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
      this.getCategories()
    },
    data () {
      let _this = this
      function repeatName (rule, value, callback) {
        _this.axios.get(_this.api.goods.repeat, {params: {name: value, id: _this.$route.query.id}})
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
          goods_category_id: '',
          amount: 0.00,
          price: 0.00,
          discount_price: 0.00,
          unit: ''
        },
        categories: [],
        rules: {
          name: [
            { required: true, message: _this.$t('messages.form.rule.goods.name.required'), trigger: 'blur' },
            { validator: repeatName, message: _this.$t('messages.form.rule.goods.name.repeat'), trigger: 'blur' }
          ],
          goods_category_id: [
            { required: true, message: _this.$t('messages.form.rule.goods.goods_category_id.required'), trigger: 'change' }
          ],
          price: [
            { required: true, message: _this.$t('messages.form.rule.goods.price.required'), trigger: 'blur' }
          ],
          discount_price: [
            { required: true, message: _this.$t('messages.form.rule.goods.discount_price.required'), trigger: 'blur' }
          ],
          amount: [
            { required: true, message: _this.$t('messages.form.rule.goods.amount.required'), trigger: 'blur' }
          ],
          unit: [
            { required: true, message: _this.$t('messages.form.rule.goods.unit.required'), trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit () {
        let _this = this
        _this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.axios.put(this.api.goods.update + _this.form.id, _this.form)
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
      getCategories () {
        let _this = this
        _this.axios.get(_this.api.goods_categories.all)
        .then(function (response) {
          let _data = response.data
          _this.categories = _data
        })
        .catch(function (error) {
          _this.$message({
            type: 'error',
            message: error.response.data.message
          })
        })
      },
      handleInfo () {
        let _this = this
        let id = _this.$route.query.id
        _this.axios.get(_this.api.goods.view + id)
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
