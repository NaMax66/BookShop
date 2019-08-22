<template>
  <div id="app" class="container">
    <BooksList v-bind:books="books" v-on:del-book="deleteBook"/>
  </div>
</template>

<script>
  import AddBook from "../components/AddBook";
  import BooksList from "../components/BooksList";
  import axios from "axios";
  import data from '../data.json'

  export default {
    name: "Shop",
    components: {
      BooksList,
      AddBook
    },
    data() {
      return {
        books: data
      };
    },
    methods: {
      deleteBook(id) {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
          .then(res => {
            this.books = this.books.filter(book => book.id !== id);
            console.log(res);
          })
          .catch(err => console.log(err))

      },
      addBookToCart(newBook) {
        const { title, completed } = newBook;

      }
    },
    created() {
      //TODO: Выглядит странно. Спросить!
      // this.books = JSON.parse(JSON.stringify(data));
      // console.log(this.books);
    }
  };
</script>
