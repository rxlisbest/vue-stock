<template>
  <layout index="index">
    <template slot="body">
      <el-row>
        <el-col id="myChart" style="min-height: 500px;" :span="17"></el-col>
        <el-col :span="7">
          <h3>{{$t('messages.title.index.day')}}</h3>
          <el-date-picker
            v-model="date"
            align="right"
            type="date"
            :placeholder="$t('messages.search.date')"
            @change="selectDate"
            :picker-options="pickerOptions">
          </el-date-picker>
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
  import dateformat from 'dateformat'

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
      let _this = this
      return {
        tableData: [],
        pagination: {
          page: 1,
          pageSize: 8,
          pages: 1
        },
        date: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: _this.$t('messages.search.today'),
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: _this.$t('messages.search.yesterday'),
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: _this.$t('messages.search.two_days_ago'),
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit('pick', date);
            }
          }, {
            text: _this.$t('messages.search.three_days_ago'),
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', date);
            }
          }, {
            text: _this.$t('messages.search.four_days_ago'),
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 4);
              picker.$emit('pick', date);
            }
          }, {
            text: _this.$t('messages.search.five_days_ago'),
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 5);
              picker.$emit('pick', date);
            }
          }, {
            text: _this.$t('messages.search.six_days_ago'),
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 6);
              picker.$emit('pick', date);
            }
          }, {
            text: _this.$t('messages.search.a_week_ago'),
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }
      }
    },
    mounted () {
      this.month()
      this.day()
      this.date = new Date()
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
        let date = dateformat(_this.date, 'isoDate')
        _this.axios.get(_this.api.order_goods.day, {params: {page: page, date: date}})
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
      selectDate () {
        this.day()
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
