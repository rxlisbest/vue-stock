<template>
  <layout index="orders">
    <template slot="body">
      <el-row>
        <el-col :offset="8" :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-button type="primary" icon="el-icon-back" @click="goBack()" :title="$t('messages.operation.back')"></el-button>
              <el-button type="primary" icon="el-icon-printer" @click="print()" class="button-right" :title="$t('messages.operation.print')"></el-button>
            </div>
            <div @click="showButton(true)" id="printBox">
              <el-row class="el-row-bottom-0">
                <el-col :span="24">
                  {{$t('messages.column.print.buyer')}}：{{buyer.name}}
                </el-col>
              </el-row>
              <el-row class="el-row-bottom-0">
                <el-col :span="24">
                  {{$t('messages.column.print.date')}}：{{Moment(order.create_time * 1000).format("YYYY-MM-DD HH:mm:ss")}}
                </el-col>
              </el-row>
              <el-row class="el-row-bottom-0">
                <el-col :span="10">{{$t('messages.column.print.name')}}</el-col>
                <el-col :span="8">{{$t('messages.column.print.price_amount')}}</el-col>
                <el-col :span="6" class="el-col-price">{{$t('messages.column.print.total')}}</el-col>
              </el-row>
              <el-row v-for="v in list">
                <el-col :span="10">{{v.name}}</el-col>
                <el-col :span="8">{{v.price.toFixed(2)}} * {{v.amount}}</el-col>
                <el-col :span="6" class="el-col-price">{{getRowTotal(v)}}</el-col>
              </el-row>
              <div class="bottom clearfix">
                <el-row>
                  <el-col :offset="18" :span="6" class="el-col-price">{{order.total.toFixed(2)}}</el-col>
                </el-row>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
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
    Aside,
    Menu,
    Submenu,
    MenuItem,
    Input,
    Button,
    Table
  } from 'element-ui'
  import Decimal from 'decimal.js'
  import Moment from 'moment'
  import Layout from '@/components/Layout'
  import printJS from 'print-js'

  export default {
    name: 'cart-index',
    components: {
      Container,
      Header,
      Main,
      Col,
      Row,
      Aside,
      Menu,
      Submenu,
      MenuItem,
      Input,
      Button,
      Table,
      Layout
    },
    created () {
      this.handleCurrentChange()
      this.handleInfo()
    },
    data () {
      return {
        list: [],
        id: 0,
        order: {
          buyer_id: 0,
          total: 0.00,
          create_time: 0
        },
        buyer: {
          name: '',
          phone: ''
        },
        visiable: true
      }
    },
    methods: {
      Moment: Moment,
      handleCurrentChange () {
        let _this = this
        let id = _this.$route.query.id
        _this.axios.get(_this.api.order_goods.all, {params: {order_id: id}})
        .then(function (response) {
          let _data = response.data
          _this.list = _data
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
        _this.axios.get(_this.api.orders.view + id)
        .then(function (response) {
          let _data = response.data
          _this.order = _data
          _this.handleBuyer(_data.buyer_id)
        })
        .catch(function (error) {
          _this.$message({
            type: 'error',
            message: error.response.data.message
          })
        })
      },
      handleBuyer (buyerId) {
        let _this = this
        let id = _this.$route.query.id
        _this.axios.get(_this.api.buyers.view + buyerId)
        .then(function (response) {
          let _data = response.data
          _this.buyer = _data
        })
        .catch(function (error) {
          _this.$message({
            type: 'error',
            message: error.response.data.message
          })
        })
      },
      getTotal () {
        let total = 0.00
        let amount = 0
        for (let v of this.cart) {
          if (v.order_amount === undefined) {
            v.order_amount = 0.00
          }
          let one = new Decimal(v.order_amount).mul(new Decimal(v.price)).toNumber()
          total = new Decimal(total).add(new Decimal(one)).toNumber()
          // 商品总数量
          amount = new Decimal(amount).add(new Decimal(v.order_amount)).toNumber()
        }
        this.order.total = total
        this.amount = amount
      },
      getRowTotal (goods) {
        return new Decimal(goods.amount).mul(new Decimal(goods.price)).toNumber().toFixed(2)
      },
      print () {
        var newstr = document.getElementById('printBox').innerHTML;
        var oldstr = document.body.innerHTML; 
        document.body.innerHTML = newstr; 
        window.print(); 
        window.location.reload()
        return false; 

        // printJS({
        //   printable: 'printBox',
        //   css: "#printBox {width: 1000px}",
        //   width: 1000,
        //   // 继承原来的所有样式
        //   targetStyles: ['*']
        // })
      },
      goBack () {
        this.$router.go(-1)
      },
      showButton (visiable) {
        this.visiable = visiable
      }
    }
  }
</script>

<style scoped>
  .el-col {
    text-align: left;
  }
  .bottom {
    border-top: 1px solid #000000;
  }
  .button-right {
    float: right;
  }
  .el-row-bottom-0 {
    margin-bottom: 0px !importment;
    border-bottom: 1px solid #000000;
  }
  .el-col-price {
    text-align: right;
  }
  .print {
    cursor: pointer;
    font-size: 9px;
  }
  .print-container {
    margin: -8px;
  }
  .print-container .el-row {
    margin-bottom: 0px;
  }
  .print-container .el-main {
    padding: 0px;
  }
</style>
