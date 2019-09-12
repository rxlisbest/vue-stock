export const messages = {
  header: {
    title: '后台商品管理系统'
  },
  title: {
    index: {
      month: '年度趋势图',
      day: '日统计',
      order_payment_day: '支付方式',
      user_day: '用户支付统计'
    },
    order_payments: {
      payment: '订单支付',
      goods: '订单商品'
    }
  },
  crumb: {
    list: "列表",
    edit: "编辑",
    add: "新增",
    view: "详情",
    storage: "入库",
    out_of_stock: "出库",
    change_password: "修改密码",
  },
  operation: {
    add: "新增",
    edit: "编辑",
    delete: "删除",
    view: "详情",
    storage: "入库",
    out_of_stock: "出库",
    back: "返回",
    balance: "结算",
    total: "合计",
    print: "打印",
    order: "生成订单",
  },
  tab: {
    index: '首页',
    categories: '分类管理',
    goods: '商品管理',
    buyers: '客户管理',
    orders: '订单管理',
    logout: "退出登录",
    users: "用户管理",
    debts: "欠款管理",
  },
  message: {
    delete: {
      cancel: '已取消删除',
      success: '删除成功'
    },
    goods_logs_delete: {
      cancel: '已取消删除',
      success: '删除成功'
    },
    cart: {
      cancel: '已取消结算',
      success: '结算成功',
      empty: '结算商品数量为0',
      goods_add_already: '已添加'
    },
    payment: {
      total_error: '订单金额与支付金额不相等，请核对',
      cancel: '已取消生成订单',
      success: '生成订单成功',
    },
    orders_delete: {
      cancel: '已取消删除',
      success: '删除成功'
    },
    login: {
      success: '登录成功'
    },
    logout: {
      success: '退出登录成功'
    }
  },
  confirm: {
    delete: {
      title: '提示',
      message: '确定删除这条记录?',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    },
    goods_logs_delete: {
      title: '提示',
      message: '删除入库记录后，商品的库存会减少相应数量！确定删除入库记录?',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    },
    cart: {
      title: '提示',
      message: '确定结算?',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    },
    payment: {
      title: '提示',
      message: '确定生成订单?',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    },
    orders_delete: {
      title: '提示',
      message: '删除订单后，订单商品数量会加回到相应商品的库存！确定删除订单?',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    },
  },
  column: {
    user: {
      name: '用户名称',
    },
    index: {
      goods_name: '商品',
      total: '金额',
      amount: '数量',
    },
    categories: {
      name: "名称",
      operation: "操作",
    },
    goods: {
      name: "名称",
      price: "单价",
      discount_price: "折扣价",
      amount: "库存",
      operation: "操作",
    },
    goods_logs: {
      amount: "入库数量",
      create_time: '入库时间'
    },
    buyers: {
      name: "名称",
      phone: "电话",
      operation: "操作",
    },
    cart: {
      amount: "数量",
      is_discount: "折扣",
      name: "支付方式",
      money: "金额"
    },
    orders: {
      total: "金额",
      buyer: "客户",
      create_time: "下单时间",
      operation: "操作",
    },
    order_goods: {
      total: "小结",
      amount: "数量"
    },
    print: {
      buyer: "客户",
      date: "时间",
      name: "名称",
      price_amount: "单价*数量",
      total: "小结",
    },
    payment: {
      order_total: "订单金额",
      paid_total: "支付金额",
    },
    order_payments: {
      name: '支付方式',
      money: '金额'
    },
    debts: {
      name: '客户',
      money: '欠款总额',
      count: '欠款次数',
      max_create_time: '最近欠款时间',
      operation: "操作",
    }
  },
  search: {
    date: '选择日期',
    today: "今天",
    yesterday: "昨天",
    two_days_ago: "2天前",
    three_days_ago: "3天前",
    four_days_ago: "4天前",
    five_days_ago: "5天前",
    six_days_ago: "6天前",
    a_week_ago: "1周前",
    buyers: {
      keyword: '名称/电话'
    },
    goods: {
      keyword: '名称'
    },
  },
  form: {
    label: {
      categories: {
        name: '分类名称'
      },
      goods: {
        name: '商品名称',
        goods_category_id: '分类',
        goods_category_id_placeholder: '分类',
        price: '单价',
        discount_price: "折扣价",
        amount: '库存',
        unit: '单位',
        unit_description: '（例：千克、个... ...）'
      },
      buyers: {
        name: '客户名称',
        phone: '客户电话'
      },
      change_password: {
        oldPassword: '旧密码',
        password: '新密码',
        confirmPassword: '确认密码',
      },
      login: {
        username: '用户名',
        password: '密码'
      }
    },
    button: {
      submit: '提交',
      cancel: '取消',
      reset: '重置'
    },
    rule: {
      categories: {
        name: {
          required: '请输入分类名称',
          repeat: '分类名称重复',
        }
      },
      goods: {
        name: {
          required: '请输入商品名称',
          repeat: '商品名称重复',
        },
        goods_category_id: {
          required: '请选择分类'
        },
        price: {
          required: '请输入单价'
        },
        discount_price: {
          required: '请输入折扣价'
        },
        amount: {
          required: '请输入库存'
        },
        unit: {
          required: '请输入单位'
        }
      },
      buyers: {
        name: {
          required: '请输入客户名称',
          repeat: '客户名称重复',
        }
      },
      change_password: {
        oldPassword: {
          required: '请输入旧密码',
        },
        password: {
          required: '请输入新密码',
        },
        confirmPassword: {
          required: '请输入确认密码',
          same: '确认密码与新密码不相同'
        }
      },
    }
  }
}