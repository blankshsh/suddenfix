import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 存储状态值
  state: {
    orderinfo: ''
  },
  mutations: {
    setData(state, data) {
      state.orderinfo = data
    },
    deleteData(state) {
      state.orderinfo = {}
    }
  },
  // actions用于处理异步事件，最后还是需要提交mutations来改变state
  actions: {
    // 这里使用context来提交mutations
    setData(context, n) {
      context.commit('setData', n)
    },
    deleteData(context) {
      context.commit('deleteData')
    }
  },
  // 在store中定义getters（可以认为是store的计算属性）。Getters接收state作为其第一个函数
  getters: {
    getOrderData(state) {
      return state.orderinfo
    }
  }
})

export default store
