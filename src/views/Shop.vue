<template>
  <div id="app" class="container">
    <AddBook v-on:add-book="addBook"/>
    <BooksList v-bind:books="books" v-on:del-book="deleteBook"/>
  </div>
</template>

<script>
  import AddBook from "../components/AddBook";
  import BooksList from "../components/BooksList";
  import axios from "axios";

  export default {
    name: "Shop",
    components: {
      BooksList,
      AddBook
    },
    data() {
      return {
        /*TODO: take data about books from the server*/
        books: []
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
      addBook(newBook) {
        const { title, completed } = newBook;

        axios.post("https://jsonplaceholder.typicode.com/todos", {
          title,
          completed
        })
        //add new book to array
          .then(res => this.books = [...this.books, res.data]) //return back todo with the id
          .catch(err => console.log(err));
      }
    },
    created() {
      // axios.get("https://jsonplaceholder.typicode.com/todos?_limit=7")
      //   .then(res => this.books = res.data)
      //   .catch(err => console.log(err));
    }
  };
</script>
