import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import moment from 'moment'
import axios from 'axios'
import App from './components/App.vue'
import Signin from './components/Signin.vue'
import Signup from './components/Signup.vue'
import Confirm from './components/Confirm.vue'
import EmailActive from './components/EmailActive.vue'
import Portal from './components/Portal.vue'
import PortalHome from './components/PortalHome.vue'
import FindPass from './components/FindPass.vue'
import Chat from './components/Chat.vue'
import ChatCard from './components/ChatCard.vue'
import NoChat from './components/NoChat.vue'
import Visitor from './components/Visitor.vue'
import Tickets from './components/Tickets.vue'
import History from './components/History.vue'
import Report from './components/Report.vue'
import Customer from './components/Customer.vue'
import Setting from './components/Setting.vue'
import ResetPass from './components/ResetPass.vue'
import ErrorResetPass from './components/ErrorResetPass.vue'
import state from './state.js'

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components

Vue.use(VueRouter)
Vue.use(ElementUI)

moment.locale("zh-cn");
Vue.filter('moment_fromnow', function (value) {
  return moment(value, "YYYY-MM-DD").fromNow();
});
Vue.filter('msgtime', function (value) {
  return moment(value*1000).format("AHH:mm");
  //return moment(value, "YYYY-MM-DD").fromNow();
});

axios.defaults.withCredentials = true;
Vue.prototype.$http = axios

// 负责防止未登陆进入登陆界面
function requireAuth (to, from, next) {
  axios.get(window.HORN_API+"/state/check").then(function(res) {
    console.log(res);
    if(res.data.code == 0) {
      next();
    } else {
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      });
    }
  }).catch(function(error) {
    console.log(error);
    next({
      path: '/signin',
      query: { redirect: to.fullPath }
    });
  });
}

// 负责防止已登陆进入注册登录这些不需登录的界面
function check(to, from, next) {
  axios.get(window.HORN_API+"/state/check").then(function(res) {
    console.log(res);
    if(res.data.code == 0) {
      console.log(from);
      if(from.path.substr(0, 7) == '/portal') {
        next(false);
      } else {
        next({
          path: "/portal"
        });
      }
    } else {
      next();
    }
  }).catch(function(error) {
    console.log(error);
    next();
  });
}

// 3. Create the router
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', redirect: '/signin' },
    { path: '/signup', component: Signup, beforeEnter: check },
    { path: '/signin', component: Signin, beforeEnter: check },
    { path: '/confirm', component: Confirm },
    { path: '/email_active', component: EmailActive },
    { path: '/find_pass', component: FindPass },
    { path: '/reset_pass', component: ResetPass },
    { path: '/error/reset_pass', component: ErrorResetPass },
    {
      path: '/portal', 
      component: Portal, 
      beforeEnter: requireAuth,
      children: [
        { path: '', component: PortalHome, name: "portalhome", redirect: "/portal/chat" },
        { 
          path: 'chat', 
          component: Chat, 
          name: "chat", 
          children: [
            {path: ':uid', component: ChatCard, name: 'chatcard'},
            {path: '', component: NoChat, name: 'nochat'}
          ] 
        },
        { path: 'visitor', component: Visitor, name: "visitor" },
        { path: 'tickets', component: Tickets, name: "tickets" },
        { path: 'history', component: History, name: "history" },
        { path: 'report', component: Report, name: "report" },
        { path: 'customer', component: Customer, name: "customer" },
        { path: 'setting/:name?', component: Setting, name: "setting" }
      ]
    }
  ]
});

import store from './store.js'
sync(store, router)

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
new Vue({
  router: router,
  el: '#app',
  store,
  render: h => h(App)
});
