<template>
  <header id="nav" class="navbar rounded-bottom">
    <h1 class="navbar-brand ml-4">BookShop</h1>
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link text-white font-weight-bold" to="/">Магазин</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link text-white font-weight-bold" to="cart">Корзина</router-link>
      </li>
      <li class="badge-light rounded p-1 pt-2 font-weight-bold">{{totalAmountBooksInCart}} шт</li>
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
  /*todo: прикрутить бутстрап и убрать CSS*/
  .navbar {
    background-color: #333;
    color: #fff;
  }
</style>
