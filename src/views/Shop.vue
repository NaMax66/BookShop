<template>
  <div class="container">
    <div class="row">
      <!--todo Максимальная ширина-->
      <div class="col-lg-6" v-bind:key="book.id" v-for="book in data.books">
        <!--передаем в компонент Book объект из массива books и кол-во данной копии книги в карзине-->
        <Book v-bind:book="book"
              v-bind:bookInCAmount="getBookInCAmount(book.id)"
              v-on:add-book-to-cart="addBookToCart"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Book from "../components/Book";

  export default {
    name: "Shop",
    components: {
      Book
    },
    props: ["data"],
    methods: {
      addBookToCart(newBook) {
        //TODO: узнать - есть ли способ короче?
        this.$emit("add-book-to-cart", newBook);
      },
      getBookInCAmount(id) {
        let amount = 0;
        this.data.booksInCart.forEach(el => {

          if (el.id === id) {
            amount = el.amount;
          }
        });
        return amount;
      }
    }
  };
</script>
