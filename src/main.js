// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Cell,CellBox,Group,Grid, GridItem,XHeader,XInput,XButton,Swiper,SwiperItem,Tabbar,TabbarItem,Rater,Tab, TabItem }  from 'vux'
import './util/axios'
import util from './util/utils'
import store from './store/index'

Vue.prototype.util = util
Vue.prototype.store = store
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component('cell-box', CellBox)
Vue.component('group', Group)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('x-header', XHeader)
Vue.component('x-input', XInput)
Vue.component('x-button', XButton)
Vue.component('cell', Cell)
Vue.component('swiper', Swiper)
Vue.component('swiper-item', SwiperItem)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('rater', Rater)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
// Vue.component('icon ', Icon)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
