// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/routers'
import './router/index'
import iView from 'iview'
import store from './store'
import 'iview/dist/styles/iview.css'
// 文件上传组件
import Uploader from 'vue-simple-uploader'
import VueCropper from 'vue-cropper'
import './style/common.css'

Vue.config.productionTip = false
Vue.use(Uploader)
Vue.use(iView)
Vue.use(VueCropper)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
