<template>
  <layout index="index">
    <template slot="body">
      <el-row>
        <h3>
          {{$t('messages.title.index.day')}}
          <el-date-picker
            v-model="date"
            align="right"
            type="date"
            :placeholder="$t('messages.search.date')"
            @change="selectDate"
            :picker-options="pickerOptions">
          </el-date-picker>
        </h3>
        <el-col id="myPie" style="min-height: 500px;" :span="24"></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <h3>{{$t('messages.title.index.order_goods_day')}}</h3>
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
        <el-col :span="12">
          <h3>{{$t('messages.title.index.goods_logs_day')}}</h3>
          <el-table
            :data="goodsLogDayData"
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
            :current-page="goodsLogDayDataPagination.page"
            :page-size="goodsLogDayDataPagination.pageSize"
            @current-change="goodsLogDay"
            :total="goodsLogDayDataPagination.count" class="pagination">
          </el-pagination>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-table
            :data="orderPaymentDayData"
            stripe
            style="width: 100%">
            <el-table-column
              type="index">
            </el-table-column>
            <el-table-column
              prop="name"
              :label="$t('messages.column.order_payments.name')">
            </el-table-column>
            <el-table-column
              :label="$t('messages.column.order_payments.money')">
              <template slot-scope="scope">
                ￥{{scope.row.money.toFixed(2)}}
              </template>
            </el-table-column>
            <el-table-column
              width="50"
              :label="$t('messages.column.goods.operation')">
              <template slot-scope="scope">
                <el-button @click="setPaymentId(scope.row.payment_id)" type="primary" icon="el-icon-arrow-right" circle :title="$t('messages.operation.storage')"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12" v-if="payment_id">
          <el-table
            :data="orderPaymentBuyerDayData"
            stripe
            style="width: 100%">
            <el-table-column
              type="index">
            </el-table-column>
            <el-table-column
              prop="buyer_name"
              :label="$t('messages.column.buyers.name')">
            </el-table-column>
            <el-table-column
              prop="name"
              :label="$t('messages.column.order_payments.name')">
            </el-table-column>
            <el-table-column
              :label="$t('messages.column.order_payments.money')">
              <template slot-scope="scope">
                ￥{{scope.row.money.toFixed(2)}}
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="pagination1.page"
            :page-size="pagination1.pageSize"
            @current-change="spreadOrderPaymentDay"
            :total="pagination1.count" class="pagination">
          </el-pagination>
        </el-col>
      </el-row>
      <el-row>
        <!-- <span>{{$t('messages.title.index.user_day')}}</span> -->
        <el-col :span="24">
          <el-table
            :data="userDayData"
            stripe
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              :label="$t('messages.column.user.name')">
            </el-table-column>
            <el-table-column
              v-for="item in payments"
              :label="item.name">
              <template slot-scope="scope">
                ￥{{scope.row[item.id.toString()].toFixed(2)}}
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col id="myChart" style="min-height: 300px;" :span="24"></el-col>
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
  import Layout from '@/components/Layout'
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
        userDayData: [],
        goodsLogDayData: [],
        orderPaymentDayData: [],
        orderPaymentBuyerDayData: [],
        payments: [],
        payment_id: 0,
        pagination: {
          page: 1,
          pageSize: 8,
          pages: 1
        },
        pagination1: {
          page: 1,
          pageSize: 8,
          pages: 1
        },
        goodsLogDayDataPagination: {
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
    watch: {
      payment_id (value) {
        this.pagination1.page = 0
      }
    },
    mounted () {
      this.month()
      this.day()
      this.goodsLogDay()
      this.orderPaymentDay()
      this.date = new Date()
      this.getPayments()
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
      goodsLogDay (page) {
        let _this = this
        let date = dateformat(_this.date, 'isoDate')
        _this.axios.get(_this.api.goods_logs.day, {params: {page: page, date: date}})
        .then(function (response) {
          let _data = response.data
          _this.goodsLogDayData = _data.list
          _this.goodsLogDayDataPagination.pages = _data.pages
          _this.goodsLogDayDataPagination.count = _data.total
          _this.goodsLogDayDataPagination.page = _data.pageNum
          _this.goodsLogDayDataPagination.pageSize = _data.pageSize
        })
        .catch(function (error) {
          _this.$message({
            type: 'error',
            message: error.response.data.message
          })
        })
      },
      orderPaymentDay () {
        let _this = this
        let date = dateformat(_this.date, 'isoDate')
        _this.axios.get(_this.api.order_payments.day, {params: {date: date}})
        .then(function (response) {
          let _data = response.data
          _this.orderPaymentDayData = _data
          let data = new Array();
          for (let i = 0; i < _data.length; i++) {
            data.push({value: _data[i].money, name: _data[i].name})
          }
          _this.initPie(data)
          _this.payment_id = 0
          _this.spreadOrderPaymentDay()
        })
        .catch(function (error) {
          _this.$message({
            type: 'error',
            message: error.response.data.message
          })
        })
      },
      spreadOrderPaymentDay (page) {
        let _this = this
        let date = dateformat(_this.date, 'isoDate')
        _this.axios.get(_this.api.order_payments.index, {params: {page: page, date: date, payment_id: _this.payment_id}})
        .then(function (response) {
          let _data = response.data
          _this.orderPaymentBuyerDayData = _data.list
          _this.pagination1.pages = _data.pages
          _this.pagination1.count = _data.total
          _this.pagination1.page = _data.pageNum
          _this.pagination1.pageSize = _data.pageSize
        })
        .catch(function (error) {
          _this.$message({
            type: 'error',
            message: error.response.data.message
          })
        })
      },
      userOrderPaymentDay () {
        let _this = this
        let date = dateformat(_this.date, 'isoDate')
        _this.axios.get(_this.api.order_payments.user_day, {params: {date: date}})
        .then(function (response) {
          let _data = response.data
          _this.userDayData = _data
        })
        .catch(function (error) {
          _this.$message({
            type: 'error',
            message: error.response.data.message
          })
        })
      },
      initPie (data) {
        // assemble data 
        let legendData = new Array()
        for (let i = 0; i < data.length; i++) {
          legendData.push(data[i].name)
        }
        let _this = this
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myPie'))
        // 绘制图表
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: ￥{c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: legendData
          },
          series: [
            {
              name: _this.$t('messages.title.index.order_payment_day'),
              type:'pie',
              radius: ['40%', '55%'],
              label: {
                normal: {
                  formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}￥{c}  {per|{d}%}  ',
                  backgroundColor: '#eee',
                  borderColor: '#aaa',
                  borderWidth: 1,
                  borderRadius: 4,
                  // shadowBlur:3,
                  // shadowOffsetX: 2,
                  // shadowOffsetY: 2,
                  // shadowColor: '#999',
                  // padding: [0, 7],
                  rich: {
                    a: {
                      color: '#999',
                      lineHeight: 22,
                      align: 'center'
                    },
                    // abg: {
                    //     backgroundColor: '#333',
                    //     width: '100%',
                    //     align: 'right',
                    //     height: 22,
                    //     borderRadius: [4, 4, 0, 0]
                    // },
                    hr: {
                      borderColor: '#aaa',
                      width: '100%',
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {
                      fontSize: 16,
                      lineHeight: 33
                    },
                    per: {
                      color: '#eee',
                      backgroundColor: '#334455',
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                }
              },
              data: data
            }
          ]
        }
        myChart.setOption(option)
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
          _this.userOrderPaymentDay()
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
        this.orderPaymentDay()
        this.userOrderPaymentDay()
      },
      setPaymentId (payment_id) {
        this.payment_id = payment_id
        this.spreadOrderPaymentDay()
      }
    }
  }
</script>

<style>
.el-container {
  padding: 0;
}
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
