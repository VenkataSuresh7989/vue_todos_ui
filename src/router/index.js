import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '../components/MainLayout.vue'
import HomeView from '../views/HomeView.vue'
import ForgotPassword from '../components/ForgotPassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout
  },
  {
    path: '/forgotpwd',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/dashboard',
    name: 'HomeView',
    component: HomeView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  let getAuthKey = sessionStorage.getItem("auth_token");
  let token = "";
  if((getAuthKey != undefined) && (getAuthKey != null))
  {
    let getAuthToken = localStorage.getItem('auth_token' + getAuthKey.toString());
    if((getAuthToken != undefined) && (getAuthToken != null))
    {
      token = getAuthToken;
    }
    else
    {
      token = "";
    }
  }
  else
  {
    token = "";
  }

  if(token == "") {
    (to.path === '/' || to.path === '/forgotpwd') ? next() : next("/");
  }
  else {
    (to.path === '/' || to.path === '/forgotpwd' || to.path === null) ? next('/dashboard') : next();    
  }
})

export default router
