import DashboardLayout from 'src/pages/Layout/DashboardLayout.vue';
import AuthLayout from 'src/pages/Pages/AuthLayout.vue';
// GeneralViews
import NotFound from 'src/pages/GeneralViews/NotFoundPage.vue';



// Dashboard pages
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Dashboard.vue');
import Widgets from 'src/pages/Widgets.vue';





//Pages
// const User = () =>
//   import(/* webpackChunkName: "pages" */ 'src/pages/Pages/UserProfile.vue');
const User = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/CheckViewForm.vue');


const TimeLine = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/TimeLinePage.vue');
const Login = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Login.vue');
const Register = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Register.vue');
const RTL = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/RTLPage.vue');

let pagesMenu = {
  path: '/pages',
  component: DashboardLayout,
  name: 'Pages',
  redirect: '/pages/user',
  children: [
    {
      path: 'user',
      name: 'User Page',
      components: { default: User }
    },
    {
      path: 'timeline',
      name: 'Timeline Page',
      components: { default: TimeLine }
    },
    {
      path: 'rtl',
      name: 'RTL Page',
      components: { default: RTL }
    }
  ]
};

let authPages = {
  path: '/',
  component: AuthLayout,
  name: 'Authentication',
  children: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },

  ]
};

const routes = [
  {
    path: '/',
    redirect: '/login',
    name: 'Login'
  },
  pagesMenu,
  authPages,
  {
    path: '/pages',
    component: pagesMenu,
    redirect: '/pages/user',
    name: 'Pages',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        components: { default: Dashboard }
      },
   
     
      {
        path: 'widgets',
        name: 'Widgets',
        components: { default: Widgets }
      }
    ]
  },
  { path: '*', component: NotFound }
];

export default routes;
