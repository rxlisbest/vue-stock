let mode = 'develop'
let domain = mode == 'develop' ? 'http://localhost:8080' : ''
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
  }
}