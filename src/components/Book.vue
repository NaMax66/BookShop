<template>
  <div class="card-body">
    <h5 class="card-title">{{ book.title }}</h5>
    <div class="row">
      <img class="col-4" :src="require('../img/' + book.img)" v-bind:alt="book.price"/>
      <div class="col-8">
        <p class="lead">Цена: <span class="font-weight-bold">{{ book.price }}</span> руб.</p>
        <button @click="addBookToCart" class="btn btn-info">В корзину</button>

        <!--todo подумать над кнопками-->

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Book",
    props: ["book"],
    methods: {
      addBookToCart() {
        //создеём новый объект для карзины
        const newBook = JSON.parse(JSON.stringify(this.book));
        newBook.time = new Date().getTime();
        //проверка на колличество в карзине делается в методе addBookToCart в корневом элементе
        newBook.amount = 1;
        //добавляем в карзину
        this.$emit("add-book-to-cart", newBook);
      }
    }
  };

</script>

