<template>
  <div class="container pt-5">

    <div class="row">
      <div class="col-10">
        <CartBook v-for="bookInCart in booksInCart"
                  :bookInCart="bookInCart"
                  :key="bookInCart.id"
        />
      </div>
    </div>

    <!--footer menu-->
    <div class="d-flex justify-content-between mb-4 mt-2">
      <button @click="clearCart" class="btn btn-danger">Удалить всё</button>
      <h3 class="pl-2">Общая сумма заказа: {{totalPrice | getNicePrice}}</h3>
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
        return this.$store.getters.totalPrice;
      }
    },

    filters: {
      getNicePrice(value) {
        return (Math.round(value * 100) / 100).toLocaleString("ru") + " руб.";
      }
    },

    methods: {
      clearCart(){
        this.$store.dispatch('clearCart');
      }
    }
  };
</script>




