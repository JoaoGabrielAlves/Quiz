import Vue from 'vue'
import {BootstrapVue} from 'bootstrap-vue'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'

Vue.prototype.$lodash = lodash;
Vue.use(BootstrapVue, VueLodash, { name: 'custom' , lodash: lodash})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
