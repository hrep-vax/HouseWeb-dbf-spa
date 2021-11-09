import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Register from '../views/Register.vue'
import ResetPassword from '../views/ResetPassword.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Landing from '../views/Landing.vue'
//import Dbf from '../views/DBFview.vue'
//import DbfAdd from '../views/DBFAdd.vue'
import Dbf from '../views/DBFview2.vue'
import DbfAdd from '../views/DBFAdd2.vue'
import Check from '../views/Checkview.vue'
import Home from '../components/Home.vue'
import Profile from '../components/Profile.vue'
import ChangePassword from '../components/ChangePassword.vue'

Vue.use(VueRouter)

const DEFAULT_WINDOW_TITLE = 'Web App Kit'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing,
    meta: { title: 'Welcome!', requiresNoAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: 'Login', requiresNoAuth: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    redirect: { path: 'dashboard/home' },
    meta: { title: 'Dashboard', requiresAuth: true },
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home,
        meta: { title: 'Home', requiresAuth: true },
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile,
        meta: { title: 'Profile', requiresAuth: true },
      },
      {
        path: 'dbf_view',
        name: 'dbf_view',
        component: Dbf,
        meta: { title: 'DBF', requiresAuth: true },
      },
       {
        path: 'dbf_add',
        name: 'dbf_add',
        component: DbfAdd,
        meta: { title: 'DBF-Add', requiresAuth: true },
      },
      {
        path: 'check_view',
        name: 'check_view',
        component: Check,
        meta: { title: 'Check', requiresAuth: true },
      },
      {
        path: 'change-password',
        name: 'change-password',
        component: ChangePassword,
        meta: { title: 'Change Password', requiresAuth: true },
      }
    ]
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
    meta: { title: 'Forgot Password', requiresNoAuth: true }
  },
  {
    path: '/auth/reset-password',
    name: 'reset-password',
    component: ResetPassword,
    meta: { title: 'Reset Password', requiresNoAuth: true }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { title: 'Register', requiresNoAuth: true }
  },
  {
    path: '*',
    name: 'page-not-found',
    component: PageNotFound,
    meta: { title: 'Page Not Found' }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

/* change the window title with the title name of the destination route */
router.afterEach((to) => {
  document.title = to.meta.title || DEFAULT_WINDOW_TITLE
})

router.beforeEach((to, from, next) => {
  const isAuthenticatedUser = !!localStorage.getItem('WEB_APP_KIT_TOKEN')

  // check for protected route
  // if route requires authentication and the user is not authenticated , redirect to the login route
  if (to.meta.requiresAuth && !isAuthenticatedUser) next({ name: 'login' })
  if (to.meta.requiresNoAuth && isAuthenticatedUser)
    next({ name: 'dashboard' })
  else next()
})

export default router
