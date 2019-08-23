<template>
  <div class="card-body">
    <h5 class="card-title">{{ book.title }}</h5>
    <div class="row">
      <img class="col-4" :src="require('../img/' + book.img)" v-bind:alt="book.price"/>
      <div class="col-8">
        <p class="lead">Цена: <span class="font-weight-bold">{{ book.price }}</span> руб.</p>
        <button @click="addBookToCart" class="btn btn-info">В корзину</button>

        <!--todo подумать над кнопками-->
        <div class="btn-group ml-3" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary"> -</button>
          <!--добавить динамическое обновление из корзины-->
          <button type="button" class="btn disabled">{{book.amount ? 1:0}}</button>
          <button type="button" class="btn btn-secondary"> +</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Book",
    props: ["book"],
    methods: {
      addBookToCart(){
        //создеём новый объект для карзины
        const newBook = 'new book';

        //добавляем в карзину
        this.$emit('add-book-to-cart', newBook);
      }
    }
  };

</script>

