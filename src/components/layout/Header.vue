<template>
  <header id="nav" class="navbar rounded-bottom fixed-top">
    <router-link to="/">
      <h1 class="navbar-brand ml-4 text-white">BookShop</h1>
    </router-link>
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link text-white font-weight-bold" to="/">Магазин</router-link>
      </li>
      <li class="nav-item">
        <!--todo сдвинуть все к центру-->
        <router-link class="nav-link text-white font-weight-bold" to="cart">
          Корзина <span class=" badge badge-light">{{totalAmountBooksInCart}}</span>
        </router-link>
      </li>
    </ul>
  </header>
</template>

<script>
  export default {
    name: "Header",
    props: ["totalAmountBooksInCart"]
  };

</script>

<style>
  .navbar {
    background-color: #333;
    color: #fff;
  }
</style>
