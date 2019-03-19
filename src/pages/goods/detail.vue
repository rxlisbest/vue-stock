<template>
  <layout index="goods">
    <template slot="body">
      <el-row>
        <el-col :span="18">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">{{$t('messages.tab.index')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'goods-index' }">{{$t('messages.tab.goods')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'goods-index' }">{{$t('messages.crumb.view')}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="6" class="el-col-button">
          <el-button type="primary" icon="el-icon-back" @click="goBack()" :title="$t('messages.operation.back')"></el-button>
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
          :label="$t('messages.column.goods.name')">
          <template slot-scope="scope">
            {{goods.name}}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('messages.column.goods.price')">
          <template slot-scope="scope">
            ￥{{scope.row.price.toFixed(2)}} / {{goods.unit}}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('messages.column.goods.discount_price')">
          <template slot-scope="scope">
            ￥{{scope.row.discount_price.toFixed(2)}} / {{goods.unit}}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('messages.column.goods_logs.amount')">
          <template slot-scope="scope">
            {{scope.row.amount}} {{scope.row.unit}}
          </template>
        </el-table-column>
        <el-table-column
          width="60"
          :label="$t('messages.column.goods.operation')">
          <template slot-scope="scope">
            <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" circle :title="$t('messages.operation.delete')"></el-button>
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
  import Layout from '../../components/Layout'

  export default {
    name: 'goods-detail',
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
        goods: {},
        tableData: [],
        pagination: {
          page: 1,
          pageSize: 8,
          pages: 1
        }
      }
    },
    created () {
      this.handleInfo()
      this.handleCurrentChange()
    },
    methods: {
      open (link) {
        this.$router.push(link)
      },
      del (id) {
        let _this = this
        _this.$confirm(_this.$t('messages.confirm.goods_logs_delete.message'), _this.$t('messages.confirm.goods_logs_delete.title'), {
          confirmButtonText: _this.$t('messages.confirm.goods_logs_delete.confirmButtonText'),
          cancelButtonText: _this.$t('messages.confirm.goods_logs_delete.cancelButtonText'),
          type: 'warning'
        }).then(() => {
          _this.axios.delete(_this.api.goods_logs.delete + id)
          .then(function (response) {
            _this.$message({
              type: 'success',
              message: _this.$t('messages.message.goods_logs_delete.success')
            })
            _this.handleCurrentChange ()
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
            message: _this.$t('messages.message.goods_logs_delete.cancel')
          })
        })
      },
      handleInfo () {
        let _this = this
        let id = _this.$route.query.id
        _this.axios.get(_this.api.goods.view + id)
        .then(function (response) {
          let _data = response.data
          _this.goods = _data
        })
        .catch(function (error) {
          _this.$message({
            type: 'error',
            message: error.response.data.message
          })
        })
      },
      handleCurrentChange (page) {
        let _this = this
        let id = _this.$route.query.id
        _this.axios.get(_this.api.goods_logs.index, {params: {page: page, goods_id: id}})
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
      goBack () {
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
  .pagination{
    margin: 10px auto;
    text-align: center;
  }
  .el-col-button {
    text-align: right;
  }
</style>
