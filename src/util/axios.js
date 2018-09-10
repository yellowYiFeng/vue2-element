import Vue from 'vue'
import axios from 'axios';
import router from '../router';
var instance = axios.create({
  baseURL : '//elm.cangdu.org',
  headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8','Accept':'application/json'}
})
instance.defaults.timeout = 6000;

//请求拦截器
instance.interceptors.request.use(config => {
  config.headers.Accept = 'application/json';
    //发起请求时，取消掉当前正在进行的相同请求
      return config
}, error => {
    return Promise.reject(error)
})
//响应拦截器
instance.interceptors.response.use(response => {
    return response
}, err => {
    message.err(err.message)
    return Promise.resolve(err.response)
})
Vue.prototype.$axios = instance