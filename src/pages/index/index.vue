<template>
  <layout index="index">
    <template slot="body">
      <el-row>
        <el-col id="myChart" style="min-height: 500px;" :span="17"></el-col>
        <el-col :span="7">
          <h3>{{$t('messages.title.index.day')}}</h3>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              type="index">
            </el-table-column>
            <el-table-column
              prop="goods_name"
              :label="$t('messages.column.index.goods_name')">
            </el-table-column>
            <el-table-column
              :label="$t('messages.column.index.total')">
              <template slot-scope="scope">
                ￥{{scope.row.total.toFixed(2)}}
              </template>
            </el-table-column>
            <el-table-column
              prop="amount"
              :label="$t('messages.column.index.amount')">
            </el-table-column>
          </el-table>

          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="pagination.page"
            :page-size="pagination.pageSize"
            @current-change="day"
            :total="pagination.count" class="pagination">
          </el-pagination>
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
    Table,
    TableColumn,
    Pagination
  } from 'element-ui'
  import Layout from '../../components/Layout'
  import echarts from 'echarts'

  export default {
    name: 'index-index',
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
        }
      }
    },
    mounted () {
      this.month()
      this.day()
    },
    methods: {
      month(){
        let _this = this
        _this.axios.get(_this.api.orders.month)
        .then(function (response) {
          let _data = response.data
          let xAxisData = new Array();
          let seriesData = new Array();
          for (let i = 0; i < _data.length; i++) {
            xAxisData.push(_data[i].month)
            seriesData.push(_data[i].total)
          }
          _this.initLine(xAxisData, seriesData)
        })
        .catch(function (error) {
          _this.$message({
            type: 'error',
            message: error.response.data.message
          })
        })
      },
      initLine (xAxisData, seriesData) {
        let _this = this
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        let option = {
          title: {
            text: _this.$t('messages.title.index.month')
          },
          xAxis: {
            type: 'category',
            data: xAxisData
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: seriesData,
            type: 'line'
          }]
        }
        myChart.setOption(option)
      },
      day (page) {
        let _this = this
        _this.axios.get(_this.api.order_goods.day, {params: {page: page}})
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
