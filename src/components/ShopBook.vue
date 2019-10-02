<template>
  <div class="col-lg-6">
    <div class="card-body pt-3">
      <h5 class="card-title">{{ book.title }}</h5>
      <div class="row">
        <div class="p-0 col-4">
          <img class="w-100" :src="getImgPath" :alt="book.title"/>
        </div>
        <div class="col-8">
          <!--округляем представление стоимости книги-->
          <p class="lead">Цена: <span class="font-weight-bold">{{ book.price | getNicePriceLook  }}</span> руб.
          </p>
          <b-button @click="addBookToCart" class="btn btn-info">{{strings.ADD_TO_CART[language]}}</b-button>

          <!--добавляем всплывающее сообщение рядом с кнопкой "В корзину"-->
          <b-toast class="mt-3" :id="'toast' + this.book.id"
                   :title="`В корзине ${bookInCartAmount} шт.` " auto-hide-delay="5000" static>{{this.book.title}}
          </b-toast>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { strings } from "../strings";

  export default {
    name: "ShopBook",

    props: ['book'],
    computed: {

      bookInCartAmount() {
        return this.$store.getters.bookInCartAmount(this.book.id);
      },

      getImgPath() {
        if (this.book.img) {
          return  require("../img/" + this.book.img);
        }
      },

      strings() {
        return strings;
      },
      language() {
        return this.$store.getters.language;
      }

    },

    filters: {
      getNicePriceLook(price){
        return Math.round(price * 100) / 100
      }
    },

    methods: {
      addBookToCart() {
        //add to cart
        this.$store.dispatch("addBookToCart", this.book);
        //show info message
        this.makeToast();
      },

      makeToast() {
        this.$bvToast.show(`toast${this.book.id}`);
      }
    }
  };
</script>

<style>

</style>
