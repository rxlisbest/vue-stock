export const messages = {
  header: {
    title: '测试'
  },
  title: {
    index: {
      month: '年度趋势图',
      day: '今日成交'
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
  },
  tab: {
    index: '首页',
    categories: '分类管理',
    goods: '商品管理',
    buyers: '客户管理',
    orders: '订单管理',
    logout: "退出登录",
    users: "用户管理",
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
    orders_delete: {
      title: '提示',
      message: '删除订单后，订单商品数量会加回到相应商品的库存！确定删除订单?',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    },
  },
  column: {
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
      amount: "库存",
      operation: "操作",
    },
    goods_logs: {
      amount: "入库数量"
    },
    buyers: {
      name: "名称",
      operation: "操作",
    },
    cart: {
      amount: "数量"
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
        amount: '库存',
        unit: '单位',
        unit_description: '（例：千克、个... ...）'
      },
      buyers: {
        name: '客户名称'
      },
      change_password: {
        oldPassword: '旧密码',
        password: '新密码',
        confirmPassword: '确认密码',
      },
    },
    button: {
      submit: '提交',
      cancel: '取消'
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