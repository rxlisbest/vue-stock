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

      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          width="80">
        </el-table-column>
        <el-table-column
          prop="buyer_name"
          :label="$t('messages.column.debt_detail.buyer_name')">
        </el-table-column>
        <el-table-column
          prop="payment_name"
          :label="$t('messages.column.debt_detail.payment_name')">
        </el-table-column>
        <el-table-column
          :label="$t('messages.column.debt_detail.money')">
          <template slot-scope="scope">
            ￥{{scope.row.money.toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('messages.column.debt_detail.create_time')">
          <template slot-scope="scope">
            {{Moment(scope.row.create_time * 1000).format("YYYY-MM-DD HH:mm:ss")}}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          :label="$t('messages.column.debt_detail.operation')">
          <template slot-scope="scope">
            <el-button @click="open({name: 'debts-pay', query: {id: scope.row.id}})" type="primary" icon="el-icon-tickets" circle :title="$t('messages.operation.view')"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="pagination.page"
        :page-size="pagination.pageSize"
        @current-change="handleCurrentChange"
        :total="pagination.count" class="pagination">
      </el-pagination>
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
  import Layout from '@/components/Layout'
  import Moment from 'moment'
  import dateformat from 'dateformat'

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
        pagination: {
          page: 1,
          pageSize: 8,
          pages: 1
        },
        buyer: {},
        searchForm: {
          buyer_id: 0
        }
      }
    },
    created () {
      this.searchForm.buyer_id = this.$route.query.buyer_id
      this.handleCurrentChange()
      this.handleBuyer()
    },
    mounted () {
      this.date = new Date()
    },
    methods: {
      Moment: Moment,
      open (link) {
        this.$router.push(link)
      },
      handleCurrentChange (page) {
        let _this = this
        _this.axios.get(_this.api.order_payments.buyer_debt_detail, {params: {page: page, buyer_id: _this.searchForm.buyer_id}})
        .then(function (response) {
          let _data = response.data
          _this.tableData = _data.list
          _this.pagination.pages = _data.pages
          _this.pagination.count = _data.total
          _this.pagination.page = _data.pageNum
          _this.pagination.pageSize = _data.pageSize
        })
        .catch(function (error) {
          _this.$message({
            type: 'error',
            message: error.response.data.message
          })
        })
      },
      handleBuyer () {
        let _this = this
        _this.axios.get(_this.api.buyers.all)
        .then(function (response) {
          let _data = response.data
          let d = {}
          for (let k in _data) {
            d[_data[k].id] = _data[k].name
          }
          _this.buyer = d
        })
        .catch(function (error) {
          _this.$message({
            type: 'error',
            message: error.response.data.message
          })
        })
      },
      onSearch () {
        this.handleCurrentChange()
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
