<template>
  <header id="nav" class="navbar fixed-top">
    <div class="container">
      <router-link to="/">
        <h1 class="navbar-brand text-white">BookShop</h1>
      </router-link>
      <div class="navbar">
        <router-link class="nav-item nav-link text-white font-weight-bold" to="/">Магазин</router-link>

        <!--Добавляем бордер на кнопку Корзина, если общее кол-во не 0-->
        <router-link class="nav-item nav-link text-white font-weight-bold btn"
                     :class="{'border-light':totalAmountBooksInCart}" to="cart">
          Корзина <span class=" badge badge-light">{{totalAmountBooksInCart}}</span>
        </router-link>
      </div>
    </div>

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
