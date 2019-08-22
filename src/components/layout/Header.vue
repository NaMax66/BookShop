<template>
  <header class="header">
    <h1>BookShop</h1>
    <div id="nav">
      <router-link to="/">Shop</router-link> |
      <router-link to="cart">Cart</router-link>
    </div>

  </header>
</template>

<script>
  export default {
    name: "Header"
  };
</script>

<style>
  .header {
    background: #333;
    color: #fff;
    text-align: center;
    padding: 10px;
  }

  .header a {
    color: #fff;
    padding-right: 5px;
    text-decoration: none;
  }

</style>
