import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import App from './components/App.vue'
import Signin from './components/Signin.vue'
import Signup from './components/Signup.vue'
import Confirm from './components/Confirm.vue'
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
import state from './state.js'

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter)
Vue.use(ElementUI)

axios.defaults.withCredentials = true;

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

function check(to, from, next) {
  state.isSignIn(function(isSignIn) {
    if(isSignIn) {
      next({
        path: '/portal'
      })
    } else {
      next()
    }
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
    { path: '/find_pass', component: FindPass },
    {
      path: '/portal', 
      component: Portal, 
      beforeEnter: requireAuth,
      children: [
        { path: '', component: PortalHome, name: "portalhome" },
        { path: 'chat', component: Chat, name: "chat", children: [{path: '/', component: NoChat}, {path: ':uid', component: ChatCard, name: 'chatcard'}] },
        { path: 'visitor', component: Visitor, name: "visitor" },
        { path: 'tickets', component: Tickets, name: "tickets" },
        { path: 'history', component: History, name: "history" },
        { path: 'report', component: Report, name: "report" },
        { path: 'customer', component: Customer, name: "customer" },
        { path: 'setting', component: Setting, name: "setting" }
      ]
    }
  ]
});

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
new Vue({
  router: router,
  el: '#app',
  render: h => h(App)
});
