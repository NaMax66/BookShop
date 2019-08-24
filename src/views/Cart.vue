<template>
  <div class="container">
    <div>
      <ul>
      </ul>
    </div>
    <div class="row">
      <div class="col-10" v-bind:key="bookInC.id" v-for="bookInC in data.booksInCart">
        <!--передаем событие родителю-->
        <CartBook v-bind:bookInC="bookInC" v-on:change-cart-book-amount="changeAmount"
                  v-on:delete-book-from-cart="deleteBookFromCart"/>
      </div>
    </div>
    <div class="d-flex justify-content-between mb-4 mt-2">
      <button @click="$emit('clear-cart')" class="btn btn-danger ml-4">Удалить всё</button>
      <!--todo: сделать тчтобы общее кол-во оставалось на экране всегда-->
      <h3>Итого книг: {{totalAmountBooksInCart}} шт.</h3>
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
    //TODO: сделать данные в компонентах только для чтения
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

