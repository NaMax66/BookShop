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
          <p class="lead">Цена: <span class="font-weight-bold">{{ Math.round(book.price * 100) / 100 }}</span> руб.
          </p>
          <b-button @click="addBookToCart" class="btn btn-info">В корзину</b-button>

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
  export default {
    name: "ShopBook",

    props: {
      book: {
        type: Object,
        default() {
          return {};
        }
      },
      bookInCartAmount: {
        type: Number,
        default: 0
      }
    },
    computed: {
      getImgPath() {
        return require("../img/" + this.book.img);
      }
    },

    methods: {
      addBookToCart() {
        //создаем новый объект для корзины
        const newBook = Object.assign({}, this.book);

        //проверка на количество в корзине делается в методе addBookToCart в корневом элементе
        newBook.amount = 1;
        //добавляем в корзину
        this.$emit("add-book-to-cart", newBook);
        //показываем сообщение о добавлении книги в корзину
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
