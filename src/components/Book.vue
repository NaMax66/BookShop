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
        const checkLocalStorage = () => {
          console.log(localStorage);
          return true
        };
        let cartBook = this.book;
        cartBook.date = new Date().getTime();
        if (checkLocalStorage(cartBook)){
          localStorage.setItem(cartBook.id, JSON.stringify(cartBook))
          //если книги нет - добавить
        } else {
          //обновить данные
        }
        console.log(cartBook);
      }
    }
  };

</script>

