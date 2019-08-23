import Vue from 'vue'
import Router from 'vue-router'
import Shop from './views/Shop.vue'
import Cart from "./views/Cart";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shop',
      component: Shop, props: true
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart, props: true
    }
  ]
})
