<template>
  <layout index="buyers">
    <template slot="body">
      <el-row>
        <el-col :span="18">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">{{$t('messages.tab.index')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'buyers-index' }">{{$t('messages.tab.buyers')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'buyers-index' }">{{$t('messages.crumb.list')}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="6" class="el-col-button">
          <el-button type="primary" @click="open({name: 'buyers-add'})" icon="el-icon-plus"></el-button>
        </el-col>
      </el-row>
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item :label="$t('messages.search.buyers.keyword')">
          <el-input v-model="searchForm.name" :placeholder="$t('messages.search.buyers.keyword')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="el-icon-search"></el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('messages.column.buyers.name')">
        </el-table-column>
        <el-table-column
          prop="phone"
          :label="$t('messages.column.buyers.phone')">
        </el-table-column>
        <el-table-column
          width="160"
          :label="$t('messages.column.buyers.operation')">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row.id)" type="primary" icon="el-icon-edit" circle :title="$t('messages.operation.edit')"></el-button>
            <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" circle :title="$t('messages.operation.delete')"></el-button>
            <el-button @click="open({name: 'cart-index', query: {buyer_id: scope.row.id}})" type="success" icon="el-icon-sold-out" circle :title="$t('messages.operation.out_of_stock')"></el-button>
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

  export default {
    name: 'buyers-index',
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
          pageSize: 7,
          pages: 1
        },
        searchForm: {
          name: ''
        }
      }
    },
    created () {
      this.handleCurrentChange()
    },
    methods: {
      open (link) {
        this.$router.push(link)
      },
      del (id) {
        var _this = this
        _this.$confirm(_this.$t('messages.confirm.delete.message'), _this.$t('messages.confirm.delete.title'), {
          confirmButtonText: _this.$t('messages.confirm.delete.confirmButtonText'),
          cancelButtonText: _this.$t('messages.confirm.delete.cancelButtonText'),
          type: 'warning'
        }).then(() => {
          _this.axios.delete(_this.api.buyers.delete + id)
          .then(function (response) {
            _this.$message({
              type: 'success',
              message: _this.$t('messages.message.delete.success')
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
            message: _this.$t('messages.message.delete.cancel')
          })
        })
      },
      edit (id) {
        this.$router.push({name: 'buyers-edit', query: {id: id}})
      },
      handleCurrentChange (page) {
        let _this = this
        _this.axios.get(_this.api.buyers.index, {params: {page: page, name: _this.searchForm.name}})
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
      onSearch () {
        this.handleCurrentChange()
      }
    }
  }
</script>

<style scope>
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
