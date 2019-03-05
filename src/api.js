let mode = 'develop'
let domain = mode == 'develop' ? 'http://localhost:8080' : ''
export default {
  login: {
    index: domain + '/login/index'
  },
  goods_categories: {
  	index: domain + '/goods_categories/index'
  }
}