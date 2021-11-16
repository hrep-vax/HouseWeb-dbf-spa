import DashboardLayout from 'src/pages/Layout/DashboardLayout.vue';
import AuthLayout from 'src/pages/Pages/AuthLayout.vue';
// GeneralViews
import NotFound from 'src/pages/GeneralViews/NotFoundPage.vue';

// Calendar
const Calendar = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Calendar/CalendarRoute.vue');
// Charts
const Charts = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Charts.vue');



// Dashboard pages
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Dashboard.vue');
import Widgets from 'src/pages/Widgets.vue';

// Forms pages
const RegularForms = () => import('src/pages/Forms/RegularForms.vue');
const ExtendedForms = () => import('src/pages/Forms/ExtendedForms.vue');
const ValidationForms = () => import('src/pages/Forms/ValidationForms.vue');
const Wizard = () => import('src/pages/Forms/Wizard.vue');

// Maps pages
const GoogleMaps = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Maps/GoogleMaps.vue');
const FullScreenMap = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Maps/FullScreenMap.vue');
const VectorMaps = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Maps/VectorMaps.vue');

//Pages
// const User = () =>
//   import(/* webpackChunkName: "pages" */ 'src/pages/Pages/UserProfile.vue');
const User = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/CheckViewForm.vue');

const Pricing = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Pricing.vue');
const TimeLine = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/TimeLinePage.vue');
const Login = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Login.vue');
const Register = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Register.vue');
const RTL = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/RTLPage.vue');
const Lock = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Lock.vue');

// TableList pages
const RegularTables = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/Tables/RegularTables.vue');
const ExtendedTables = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/Tables/ExtendedTables.vue');
const PaginatedTables = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/Tables/PaginatedTables.vue');


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
        path: 'calendar',
        name: 'Calendar',
        components: { default: Calendar }
      },
      {
        path: 'charts',
        name: 'Charts',
        components: { default: Charts }
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
