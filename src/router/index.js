// create by huangyf 2018-08-09
import App from '../App'
import Vue from 'vue'
import Router from 'vue-router'
import login from '../page/login.vue'
import home from '../page/home.vue'
import city from '../page/city.vue'
import msite from '../page/msite.vue'
import shop from '../page/shop.vue'
import food from '../page/food.vue'

Vue.use(Router)
const routes = [
    {
      path: '/',
      component:App,
      children:[
        {
          path:'',
          redirect : '/home'
        },
        {
          path: '/home',
          component: home
        },
        // 当前城市选择页
        {
          path : '/city/:cityid',
          component : city
        },
        //点餐首页
        {
          path : '/msite',
          component : msite
        },
        {
          path : '/shop',
          component : shop
        },
        {
          path : '/food',
          component : food
        },

      ]
    },
]

export default new Router({
  routes
})
