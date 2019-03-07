<template>
  <layout index="orders">
    <template slot="body">
      <el-row>
        <el-col :span="18">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">{{$t('messages.tab.index')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'orders-index' }">{{$t('messages.tab.orders')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'orders-detail' }">{{$t('messages.crumb.view')}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="6" class="el-col-button">
          <el-button type="primary" icon="el-icon-back" @click="goBack()" :title="$t('messages.operation.back')"></el-button>
          <el-button type="primary" icon="el-icon-printer" @click="open({name: 'orders-print', query: {id: id}})" :title="$t('messages.operation.print')"></el-button>
        </el-col>
      </el-row>

      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          width="80">
        </el-table-column>
        <el-table-column
          :label="$t('messages.column.goods.price')">
          <template slot-scope="scope">
            ￥{{scope.row.price.toFixed(2)}} / {{scope.row.unit}}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('messages.column.order_goods.amount')">
          <template slot-scope="scope">
            {{scope.row.amount}} {{scope.row.unit}}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          :label="$t('messages.column.order_goods.total')">
          <template slot-scope="scope">
             ￥{{getRowTotal(scope.row)}}
          </template>
        </el-table-column>
      </el-table>
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
    Table,
    TableColumn,
    Pagination
  } from 'element-ui'
  import Layout from '../../components/Layout'
  import Decimal from 'decimal.js'

  export default {
    name: 'landing-page',
    components: {
      Container,
      Header,
      Main,
      Col,
      Row,
      Table,
      TableColumn,
      Pagination,
      Layout
    },
    data () {
      return {
        tableData: [],
        id: 0
      }
    },
    created () {
      this.handleCurrentChange()
      this.id = this.$route.query.id
    },
    methods: {
      open (link) {
        this.$router.push(link)
      },
      handleCurrentChange (page) {
        let _this = this
        let id = _this.$route.query.id
        _this.axios.get(_this.api.order_goods.all, {params: {order_id: id}})
        .then(function (response) {
          let _data = response.data
          _this.tableData = _data
        })
        .catch(function (error) {
          _this.$message({
            type: 'error',
            message: error.response.data.message
          })
        })
      },
      goBack () {
        this.$router.go(-1)
      },
      getRowTotal (goods) {
        return new Decimal(goods.amount).mul(new Decimal(goods.price)).toNumber().toFixed(2)
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
  .pagination{
    margin: 10px auto;
    text-align: center;
  }
  .el-col-button {
    text-align: right;
  }
</style>
