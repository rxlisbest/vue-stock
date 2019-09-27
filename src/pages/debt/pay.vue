<template>
  <layout index="debts">
    <template slot="body">
      <el-row>
        <el-col :span="18">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">{{$t('messages.tab.index')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'debts-index' }">{{$t('messages.tab.debts')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'debts-index' }">{{$t('messages.crumb.list')}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      <div class="payment">
        <el-table
          :data="payments"
          style="width: 100%">
          <el-table-column
            :label="$t('messages.column.cart.name')" prop="name">
          </el-table-column>
          <el-table-column :label="$t('messages.column.cart.money')" width="140">
            <template slot-scope="scope">
              <el-input-number controls-position="right" v-model="scope.row.money" size="mini" :min="0"></el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="cart-total">
        <el-row type="flex" class="row-bg" justify="space-between" style="height: 100%;">
          <el-col :span="2" class="cart-total-col">
            {{$t('messages.column.order_payments.debt_money')}}
          </el-col>
          <el-col :span="8" class="cart-total-col">
            ￥{{ payment.money.toFixed(2) }}
          </el-col>
          <el-col :span="2" class="cart-total-col">
            {{$t('messages.column.order_payments.debt_init_money')}}
          </el-col>
          <el-col :span="8" class="cart-total-col">
            ￥{{ payment.init_money.toFixed(2) }}
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-between" style="height: 100%;">
          <el-col :span="2" class="cart-total-col">
            {{$t('messages.column.order_payments.debt_pay_money')}}
          </el-col>
          <el-col :span="8" class="cart-total-col">
            ￥{{ paid_total.toFixed(2) }}
          </el-col>
          <el-col :span="4" class="cart-total-col">
            <el-button type="danger" @click="payDebt" :title="$t('messages.operation.pay_debt')">{{$t('messages.operation.pay_debt')}}</el-button>
          </el-col>
        </el-row>
      </div>
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
  import Layout from '../../components/Layout'
  import Decimal from 'decimal.js'

  export default {
    name: 'debt-pay',
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
      this.getPayments()
      this.handleInfo()
    },
    data () {
      return {
        payments: [],
        paid_total: 0,
        cart: [],
        order: {
          buyer_id: 0,
          total: 0.00,
          create_time: 0
        },
        payment: {
          id: 0,
          money: 0.00,
          init_money: 0.00,
          create_time: 0
        }
      }
    },
    watch: {
      payments: {
        handler: function () {
          this.getTotal()
        },
        deep: true
      }
    },
    methods: {
      handleInfo () {
        let _this = this
        let id = _this.$route.query.id
        _this.axios.get(_this.api.order_payments.view + id)
        .then(function (response) {
          let _data = response.data
          _this.payment = _data
        })
        .catch(function (error) {
          _this.$message({
            type: 'error',
            message: error.response.data.message
          })
        })
      },
      getPayments () {
        let _this = this
        _this.axios.get(_this.api.payments.all)
        .then(function (response) {
          let _data = response.data
          _this.payments = []
          for (let v of _data) {
            v.money = 0.00
            _this.payments.push(v)
          }
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
        for (let v of this.payments) {
          if (v.money === undefined) {
            v.money = 0.00
          }
          total = new Decimal(total).add(new Decimal(v.money)).toNumber()
          // 商品总数量
        }
        this.paid_total = total
      },
      goBack () {
        this.$router.go(-1)
      },
      payDebt() {
        let _this = this
        _this.$confirm(_this.$t('messages.confirm.order_payments.message'), _this.$t('messages.confirm.order_payments.title'), {
          confirmButtonText: _this.$t('messages.confirm.order_payments.confirmButtonText'),
          cancelButtonText: _this.$t('messages.confirm.order_payments.cancelButtonText'),
          type: 'warning'
        }).then(() => {
          _this.axios.post(_this.api.order_payments.repay, {orderPaymentId: _this.payment.id, payments: _this.payments})
          .then(function (response) {
            _this.$message({
              type: 'success',
              message: _this.$t('messages.message.pay_debt.success'),
              duration: 1000,
              onClose: () => {
                _this.$router.go(-1)
              }
            })
          })
          .catch(function (error) {
            _this.$message({
              type: 'error',
              message: error.response.data.message
            })
          })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: _this.$t('messages.message.pay_debt.cancel')
          })
        })
      }
    }
  }
</script>

<style>
  .payment {
    height: 510px; 
    border: 1px solid #eee; 
    overflow: auto;
    &-total {
      width: 100%; 
      position: relative; 
      height: 48px; 
      border: 1px solid #eee;
      &-col {
        text-align: center;
      }
    }
  }
  .cart-total .el-col{
    text-align: center;
  }
  .cart-total .el-row {
    border: 1px solid #eee;
    margin-bottom: 0px;
  }
</style>
