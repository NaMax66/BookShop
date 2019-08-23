<template>
  <div class="container">
    <div class="row">
      <!--todo Максимальная ширина-->
      <div class="col-lg-6" v-bind:key="book.id" v-for="book in data.books">
        <Book v-bind:book="book" v-on:add-book-to-cart="addBookToCart"/>
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
      }
    }

  };
</script>
