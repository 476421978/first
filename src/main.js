// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import  store  from './vuex/store'

import router from './router/index'


import VueParticles from 'vue-particles'
Vue.use(VueParticles)

Vue.use(ElementUI);


/*----------------------环信--------------------------*/
require('../static/JS/webim.config');
let WebIM = require('easemob-websdk')
Vue.prototype.$webim = WebIM

/*创建连接*/
const conn = new WebIM.connection({
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
  url: WebIM.config.xmppURL,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  apiUrl: WebIM.config.apiURL,
  isAutoLogin: true
})

const options = {
  apiUrl: WebIM.config.apiURL,
  user: '123',
  pwd: '123',
  appKey: WebIM.config.appkey,
  success:function (re) {
    console.log('链接服务器正常')
  },
  error:function (err) {
    alert(err)
  }
}
Vue.prototype.$imconn = conn
Vue.prototype.$imoption = options

/*------------------------------------------------*/


Vue.prototype.axios = axios//在Vue原型下面添加，axios不是插件，无法使用vue.use()
Vue.prototype.HOST='/api'

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
