<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-10" v-bind:key="bookInCart.id" v-for="bookInCart in data.booksInCart">
        <!--передаем событие родителю-->
        <CartBook v-bind:bookInCart="bookInCart" v-on:change-cart-book-amount="changeAmount"
                  v-on:delete-book-from-cart="deleteBookFromCart"/>
      </div>
    </div>
    <div class="d-flex justify-content-between mb-4 mt-2">
      <button @click="$emit('clear-cart')" class="btn btn-danger">Удалить всё</button>
      <h3>Итого книг: {{totalAmountBooksInCart}} шт</h3>
    </div>
  </div>
</template>

<script>
  import CartBook from "../components/CartBook";

  export default {
    name: "Cart",
    components: {
      CartBook
    },
    props: ["data", "totalAmountBooksInCart"],

    methods: {
      changeAmount(numId) {
        this.$emit("change-cart-book-amount", numId);
      },

      deleteBookFromCart(id) {
        this.$emit("delete-book-from-cart", id);
      }
    }
  };
</script>

<style>

</style>


