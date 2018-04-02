import Vue from 'vue'
import Router from 'vue-router'

const Fix = () =>
  import ('components/fix/fix')
const ToOrder = () =>
  import ('components/toOrder/toOrder')
const User = () =>
  import ('components/user/user')
const Order = () =>
  import ('components/order/order')
const Coupon = () =>
  import ('components/coupon/coupon')

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/fix'
  }, {
    path: '/fix',
    component: Fix,
    children: [{
      path: 'toOrder',
      component: ToOrder
    }]
  }, {
    path: '/user',
    component: User,
    children: [{
      path: 'order',
      component: Order
    }, {
      path: 'coupon',
      component: Coupon
    }]
  }]
})
