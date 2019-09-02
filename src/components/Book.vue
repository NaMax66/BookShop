<template>
  <div class="card-body pt-3">
    <h5 class="card-title">{{ book.title }}</h5>
    <div class="row">
      <div class="p-0 col-4">
        <img class="w-100" :src="require('../img/' + book.img)" :alt="book.price"/>
      </div>
      <div class="col-8">
        <p class="lead">Цена: <span class="font-weight-bold">{{ book.price }}</span> руб.</p>
        <b-button @click="addBookToCart" class="btn btn-info">В корзину</b-button>

        <!--добавляем всплывающее сообщение рядом с кнопкой "В корзину"-->
        <b-toast class="mt-3" :id="'toast' + this.book.id"
                 :title="`В корзине ${bookInCartAmount} шт.` " auto-hide-delay="5000" static>{{this.book.title}}</b-toast>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Book",

    props: ["book", "bookInCartAmount"],

    methods: {
      addBookToCart() {
        //создаем новый объект для корзины
        const newBook = Object.assign({}, this.book);

        //проверка на количество в корзине делается в методе addBookToCart в корневом элементе
        newBook.amount = 1;
        //добавляем в корзину
        this.$emit("add-book-to-cart", newBook);
        //делаем сообщение видимым
        this.makeToast()
      },

      makeToast() {
        this.$bvToast.show(`toast${this.book.id}`)
      }
    }
  };
</script>
