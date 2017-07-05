// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import VueRouter from 'vue-router'
import Layout from './components/layout'
import IndexPage from './pages/index'
import DetailPage from './pages/detail'
import DetailAnaPage from './pages/detail/analysis'
import DetailCouPage from './pages/detail/count'
import DetailForPage from './pages/detail/forecast'
import DetailPubPage from './pages/detail/publish'
import OrderListPage from './pages/orderlist'
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.prototype.$http = axios
/* eslint-disable no-new */

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/orderlist',
      component: OrderListPage
    },
    {
      path: '/detail',
      component: DetailPage,
      redirect: '/detail/analysis',
      children: [
        {
          path: '/detail/analysis',
          component: DetailAnaPage
        },
        {
          path: '/detail/count',
          component: DetailCouPage
        },
        {
          path: '/detail/forecast',
          component: DetailForPage
        },
        {
          path: '/detail/publish',
          component: DetailPubPage
        }
      ]
    }
  ]
})
new Vue({
  el: '#app',
  router: router,
  template: '<Layout/>',
  components: { Layout }
})
