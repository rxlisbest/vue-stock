<template>
  <el-container style="min-height: 560px;height: 100%;">
    <el-col :span="6">
      <div class="category">
        <el-menu :default-openeds="['1', '2']">
          <el-menu-item v-for="v in categories" :index="v.id.toString()" @click="getGoods(v.id)">{{ v.name }}</el-menu-item>
        </el-menu>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="goods">
        <el-row>
          <el-col :span="8" v-for="(v, k) in goods">
            <div :class="{'grid-content bg-purple': k%2 == 0, 'grid-content bg-purple-light': k%2 != 0}" @click="addCart(v)">{{ v.name }}</div>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="cart">
        <el-table
          :data="cart"
          style="width: 100%">
          <el-table-column
            :label="$t('messages.column.goods.name')" prop="name">
          </el-table-column>
          <el-table-column
            :label="$t('messages.column.goods.price')" width="140">
            <template slot-scope="scope">
              <el-input-number controls-position="right" v-model="scope.row.price" size="mini" :min="0"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('messages.column.goods.amount')" width="60">
            <template slot-scope="scope">
              {{scope.row.amount}} {{scope.row.unit}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('messages.column.cart.amount')"  width="140">
            <template slot-scope="scope">
              <el-input-number controls-position="right" v-model="scope.row.order_amount" size="mini" :min="0" :max="scope.row.amount"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :label="$t('messages.column.goods.operation')" width="60" type=index>
            <template slot-scope="scope">
              <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="delCart(scope.$index)" :title="$t('messages.operation.delete')"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="cart-total">
        <el-row type="flex" class="row-bg" justify="space-between" style="height: 100%;">
          <el-col :span="4" class="cart-total-col">
            {{$t('messages.operation.total')}}
          </el-col>
          <el-col :span="12" class="cart-total-col">
            ￥{{ order.total.toFixed(2) }}
          </el-col>
          <el-col :span="4" class="cart-total-col">
            <el-button type="primary" icon="el-icon-back" @click="goBack()" :title="$t('messages.operation.back')"></el-button>
          </el-col>
          <el-col :span="4" class="cart-total-col">
            <el-button type="danger" @click="addOrder" :title="$t('messages.operation.balance')">{{$t('messages.operation.balance')}}</el-button>
          </el-col>
        </el-row>
      </div>
      </div>
    </el-col>
  </el-container>
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
      Table
    },
    created () {
      this.getCategories()
      this.order.buyer_id = this.$route.query.buyer_id || 0
    },
    data () {
      return {
        categories: [],
        goods: [],
        cart: [],
        order: {
          buyer_id: 0,
          total: 0.00,
          create_time: 0
        },
        amount: 0
      }
    },
    watch: {
      cart: {
        handler: function () {
          this.getTotal()
        },
        deep: true
      }
    },
    methods: {
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
      getGoods (categoryId) {
        let _this = this
        _this.axios.get(_this.api.goods.all, {params: {goods_category_id: categoryId}})
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
      addCart (goods) {
        let _this = this
        goods = JSON.parse(JSON.stringify(goods))
        for (let v of _this.cart) {
          if (v.id === goods.id) {
            _this.$message.warning(_this.$t('messages.message.cart.goods_add_already'))
            return false
          }
        }
        goods.order_amount = 0.00
        this.cart.push(goods)
        this.getTotal()
      },
      delCart (index) {
        this.cart.splice(index, 1)
        this.getTotal()
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
      addOrder () {
        let _this = this
        _this.$confirm(_this.$t('messages.confirm.cart.message'), _this.$t('messages.confirm.cart.title'), {
          confirmButtonText: _this.$t('messages.confirm.cart.confirmButtonText'),
          cancelButtonText: _this.$t('messages.confirm.cart.cancelButtonText'),
          type: 'warning'
        }).then(() => {
          if (_this.amount <= 0) {
            _this.$message({
              type: 'error',
              message: _this.$t('messages.message.cart.empty')
            })
            return false
          }
          _this.axios.post(_this.api.orders.create, {cart: _this.cart, order: _this.order})
          .then(function (response) {
            let orderId = response.data
            _this.$message({
              type: 'success',
              message: _this.$t('messages.message.cart.success'),
              duration: 1000,
              onClose: () => {
                _this.$router.push({name: 'orders-print', query: {id: orderId}})
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
            message: _this.$t('messages.message.cart.cancel')
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
    padding: 10px 10px;
    border-radius: 4px;
    min-height: 36px;
    cursor: pointer;
    height: 60px;
    white-space:normal; 
    word-break:break-all;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-input-number {
    width: 100%;
  }
  .category {
    height: 560px; 
    border: 1px solid #eee; 
    overflow: auto;
  }
  .goods {
    height: 560px; 
    border: 1px solid #eee; 
    overflow: auto;
  }
  .cart {
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
</style>
