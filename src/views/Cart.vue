<template>
  <div class="container row">
    <div class="col-8">
      <div class="col-lg-6" v-bind:key="bookInC.id" v-for="bookInC in data.booksInCart">
        <CartBook v-bind:bookInC="bookInC" v-on:change-cart-book-amount="changeAmount"/>
      </div>
    </div>
    <div class="col-4">
      <ul>
        <li>Total amount:</li>
        <li>Еще функция</li>
      </ul>
      <button class="btn btn-danger">Удалить всё</button>
    </div>
  </div>
</template>

<script>

  /**
   * Не стал удалять книгу с колличеством 0 из карзины на случай - если пользователь случайно нажал на минус
   * Иначе придется возвращаться в магазин и снова искать эту книгу
   */

  import CartBook from "../components/CartBook";

  export default {
    name: "Cart",
    components: {
      CartBook
    },
    //TODO: получить данные
    props: ["data"],

    methods: {
      changeAmount(numId) {
        this.$emit("change-cart-book-amount", numId);
      }
    }

  };
</script>

