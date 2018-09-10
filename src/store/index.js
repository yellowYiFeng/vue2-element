import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex);
const state = {
    imgBaseUrl:'//elm.cangdu.org/img/'

}
export default new Vuex.Store ({
    state,
    mutations
})