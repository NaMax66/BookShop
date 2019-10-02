<template>
  <header id="nav" class="navbar fixed-top">
    <div class="container">
      <router-link to="/">
        <h1 class="navbar-brand text-white">BookShop</h1>
      </router-link>
      <div class="navbar">
        <router-link class="nav-item nav-link text-white font-weight-bold"
                     to="/"
        >{{strings.SHOP[language]}}</router-link>
        <router-link class="nav-item nav-link text-white font-weight-bold"
                     to="/login"
        >{{strings.LOGIN[language]}}</router-link>

        <!--If we have some books in our cart we add a border around the button-->
        <router-link class="nav-item nav-link text-white font-weight-bold btn"
                     :class="{'border-light':totalAmountBooksInCart}" to="cart"
        >
          {{strings.CART[language]}} <span class=" badge badge-light">{{totalAmountBooksInCart}}</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
  import {strings} from '../../strings'
  export default {
    name: "AppHeader",

    //todo: make btn on the main screen - change language
    computed: {
      strings() {
        return strings;
      },
      language() {
        return this.$store.getters.language;
      },
      totalAmountBooksInCart() {
        return this.$store.getters.totalAmountBooksInCart;
      }
    }
  };
</script>

<style>
  .navbar {
    background-color: #333;
    color: #fff;
  }
</style>
