import Vue from 'vue'
import Router from 'vue-router'
import AppShop from './views/AppShop.vue'
import AppCart from "./views/AppCart"
import AppLogIn from "./components/AppLogIn";
const AppReviews = () => import('./views/AppReviews');
const AppAdmin = () => import('./views/AppAdmin');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shop',
      component: AppShop, props: true
    },
    {
      path: '/cart',
      name: 'cart',
      component: AppCart, props: true
    },
    {
      path: '/login',
      name: 'login',
      component: AppLogIn
    },
    {
      path: '/review',
      name: 'review',
      component: AppReviews
    },
    {
      path: '/admin',
      name: 'admin',
      component: AppAdmin
    }
  ],
  mode: 'history'
})
