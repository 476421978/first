import Vue from 'vue'
import VueRouter from 'vue-router';

import page1 from '../components/wechat/left/page1/page1.vue';
import page2 from '../components/wechat/left/page2/page2.vue';
import page3 from '../components/wechat/left/page3/page3.vue';

import login from '../components/login/logins2.vue'
import manager from '../components/manager/managers.vue'
import wechat from '../components/wechat/wechats.vue'


Vue.use(VueRouter);

const routes = [
  { path: '/login', component: login, },
  { path: '/manager', component: manager},
  { path: '/wechat', component: wechat,
    children:
      [
        { path: 'page1', component: page1 },
        { path: 'page2', component: page2 },
        { path: 'page3', component: page3 }
      ]
  },
]

const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes
  linkActiveClass: 'active'
});

/*router.push('/login');//指向特定的页面*/

export default router;


