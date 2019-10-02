<template>
  <transition name="shop-book-fade">
    <div class="card-body" v-if="show">
      <div class="row">
        <div class="col-2 p-0">
          <img class="w-100" :src="require('../img/' + bookInCart.img)" :alt="bookInCart.title"/>
        </div>
        <p class="card-title col-6">{{bookInCart.title}}</p>
        <div class="col-4 text-right">
          <div class="btn-group mr-2 mt-2" role="group" aria-label="Basic example">
            <button @click="changeAmount(-1)" type="button" class="btn btn-secondary"> -</button>
            <span class="btn disabled">  {{bookInCart.amount}}  </span>
            <button @click="changeAmount(1)" type="button" class="btn btn-secondary"> +</button>
          </div>
          <button @click="deleteBookFromCart"
                  class="btn btn-warning mt-2 mr-1">Убрать
          </button>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
  export default {
    name: "CartBook",
    data() {
      return {
        show: true
      };
    },
    props: ['bookInCart'],

    methods: {
      changeAmount(addAmount) {
        this.$store.dispatch("changeAmount", {
          amount: this.bookInCart.amount + addAmount,
          id: this.bookInCart.id
        });
      },
      deleteBookFromCart() {
        this.$store.dispatch("deleteBookFromCart", this.bookInCart.id);
        this.show = !this.show;
      }
    }
  };
</script>

<style>
  .shop-book-fade-enter-active, .shop-book-fade-leave-active {
    transition: opacity .2s ease;
  }

  .shop-book-fade-enter, .shop-book-fade-leave-to {
    opacity: 0;
  }
</style>
