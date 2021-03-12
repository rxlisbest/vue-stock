let domain = process.env.VUE_APP_API_DOMAIN
export default {
  login: {
    index: domain + '/login/index'
  },
  goods_categories: {
    all: domain + '/goods_categories/all',
    index: domain + '/goods_categories/index',
    view: domain + '/goods_categories/view/',
    create: domain + '/goods_categories/create',
    update: domain + '/goods_categories/update/',
    delete: domain + '/goods_categories/delete/',
    repeat: domain + '/goods_categories/repeat',
  },
  goods: {
    index: domain + '/goods/index',
    view: domain + '/goods/view/',
    create: domain + '/goods/create',
    update: domain + '/goods/update/',
    delete: domain + '/goods/delete/',
    repeat: domain + '/goods/repeat',
    all: domain + '/goods/all',
  },
  goods_logs: {
    index: domain + '/goods_logs/index',
    create: domain + '/goods_logs/create',
    delete: domain + '/goods_logs/delete/',
    day: domain + '/goods_logs/day',
  },
  buyers: {
    all: domain + '/buyers/all',
    index: domain + '/buyers/index',
    view: domain + '/buyers/view/',
    create: domain + '/buyers/create',
    update: domain + '/buyers/update/',
    delete: domain + '/buyers/delete/',
    repeat: domain + '/buyers/repeat',
  },
  orders: {
    index: domain + '/orders/index',
    view: domain + '/orders/view/',
    create: domain + '/orders/create',
    delete: domain + '/orders/delete/',
    month: domain + '/orders/month',
  },
  order_goods: {
    all: domain + '/order_goods/all',
    day: domain + '/order_goods/day',
    create: domain + '/order_goods/create',
  },
  users: {
    change_password: domain + '/users/change_password/',
  },
  order_payments: {
    day: domain + '/order_payments/day',
    user_day: domain + '/order_payments/user_day',
    index: domain + '/order_payments/index',
    view: domain + '/order_payments/view/',
    all: domain + '/order_payments/all',
    buyer_debt: domain + '/order_payments/buyer_debt',
    buyer_debt_detail: domain + '/order_payments/buyer_debt_detail',
    repay: domain + '/order_payments/repay',
  },
  payments: {
    all: domain + '/payments/all',
  },
}