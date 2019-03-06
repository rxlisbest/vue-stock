export const messages = {
  crumb: {
    list: "列表",
    edit: "编辑",
    add: "新增",
    view: "详情",
    storage: "入库",
  },
  operation: {
    add: "新增",
    edit: "编辑",
    delete: "删除",
    view: "详情",
    storage: "入库",
    back: "返回",
  },
  tab: {
    index: '首页',
    categories: '分类管理',
    goods: '商品管理',
    buyers: '客户管理',
    orders: '订单管理',
  },
  message: {
    delete: {
      cancel: '已取消删除',
      success: '删除成功'
    },
    goods_logs_delete: {
      cancel: '已取消删除',
      success: '删除成功'
    }
  },
  confirm: {
    delete: {
      title: '提示',
      message: '确定删除这条记录?',
      confirmButtonText: '提示',
      cancelButtonText: '取消',
    },
    goods_logs_delete: {
      title: '提示',
      message: '删除入库记录后，商品的库存会减少相应数量！确定删除入库记录?',
      confirmButtonText: '提示',
      cancelButtonText: '取消',
    }
  },
  column: {
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
    }
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
      }
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
      }
    }
  }
}