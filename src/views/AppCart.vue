<template>
  <div class="container pt-5">

    <div class="row">
      <div class="col-10">
        <!--передаем событие родителю-->

        <CartBook v-for="bookInCart in booksInCart"
                  v-bind:bookInCart="bookInCart" v-on:change-cart-book-amount="changeAmount"
                  v-on:delete-book-from-cart="deleteBookFromCart"
                  v-bind:key="bookInCart.id"/>
      </div>
    </div>

    <div class="d-flex justify-content-between mb-4 mt-2">
      <button @click="$emit('clear-cart')" class="btn btn-danger">Удалить всё</button>
      <h3 class="pl-2">Общая сумма заказа: {{totalPrice}}</h3>
    </div>
  </div>
</template>

<script>
  import CartBook from "../components/CartBook";

  export default {
    name: "AppCart",
    components: {
      CartBook
    },

    computed: {

      booksInCart() {
        return this.$store.getters.getBooksInCart;
      },

      totalPrice() {
        let totalSum = 0;
        /*if (!this.data.booksInCart.length)
          totalSum = 0;
        else {
          this.data.booksInCart.forEach(el => {
            totalSum += el.price * el.amount;
          });
        }*/
        //округляем до двух знаков после точки и разделяем разряды
        return (Math.round(totalSum * 100) / 100).toLocaleString("ru") + " руб.";
      }
    },

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




