// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import md5 from 'blueimp-md5'

import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

Vue.prototype.axios = axios

Vue.prototype.getSign = function(call, timestamp) {
  // let ua = store.state.common.common_params.ua
  // let signKey = store.state.common.common_params.signKey
  let ua = 'KHW_H5_SIGN'
  let signKey = '68352e6b616875616e77616e672e636f6d'
  return md5(ua + '&' + call + '&' + timestamp + '&' + signKey)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
