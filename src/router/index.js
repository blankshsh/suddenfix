import Vue from 'vue'
import Router from 'vue-router'

import Fix from 'components/fix/fix'
import ToOrder from 'components/toOrder/toOrder'
import User from 'components/user/user'
import Order from 'components/order/order'
import Coupon from 'components/coupon/coupon'

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
