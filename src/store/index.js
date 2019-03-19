import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
let state = {
  access_token: '',
  order: {}
}
let getter = {
  getAccessToken: state => {
    return state.access_token
  },
  getOrder: state => {
    return state.order
  }
}
let actions = {

}
let mutations = {
  setAccessToken (state, access_token) {
    state.access_token = access_token
  },
  setOrder (state, order) {
    state.order = order
  }
}
const store = new Vuex.Store({
  state: state,
  getter: getter,
  actions: actions,
  mutations: mutations,
});
 
export default store;
