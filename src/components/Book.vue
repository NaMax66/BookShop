<template>
  <div class="card-body pt-3">
    <h5 class="card-title">{{ book.title }}</h5>
    <div class="row">
      <div class="p-0 col-4">
        <img class="w-100" :src="require('../img/' + book.img)" v-bind:alt="book.price"/>
      </div>
      <div class="col-8">
        <p class="lead">Цена: <span class="font-weight-bold">{{ book.price }}</span> руб.</p>
        <!--todo информатор снизу-->

        <!--todo сделать добавить плюс минус и кнопку сделать в корзину-->
        <button @click="addBookToCart" class="btn btn-info">{{checkBtnTxt()}}</button>
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
        //проверяем - есть ли эта книга в карзине
        this.checkBtnTxt();

        //создеём новый объект для карзины
        const newBook = Object.assign({}, this.book);

        //проверка на колличество в карзине делается в методе addBookToCart в корневом элементе
        newBook.amount = 1;
        //добавляем в карзину
        this.$emit("add-book-to-cart", newBook);

      },
      checkBtnTxt() {
        //TODO сделать уведомление о добавлении новой книги
        if (this.bookInCartAmount > 0) return "Добавить + 1";
        else return "В корзину";
      }
    }
  };

</script>
