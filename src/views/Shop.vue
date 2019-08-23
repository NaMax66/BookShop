<template>
  <div id="app" class="container">
    <BooksList v-bind:books="books" v-on:del-book="deleteBook"/>
  </div>
</template>

<script>
  import AddBook from "../components/AddBook";
  import BooksList from "../components/BooksList";
  import data from '../data.json'

  export default {
    name: "Shop",
    components: {
      BooksList,
      AddBook
    },
    data() {
      return {
        //берем данные из src/data.json
        books: data,
        booksInCart: []
      };
    },
    methods: {
      addBookToCart(newBook) {
        //добавляем книгу и обновляем хранилище
        this.booksInCart.push(newBook);
        this.updateLocalStorage();
      },

      updateCart(id, time, amount) {
        const book = this.booksInCart[id];
        if (book.amount === 0)
        book.time = time;
        book.amount = amount;
        this.booksInCart.push(book);
      },

      deleteBookFromCart(id) {
        //отфильтровываем книгу с переданным id из массива с книгами в корзине
        this.booksInCart = this.booksInCart.filter(book => book.id !== id);
      },

      clearCart() {
        this.booksInCart = [];
        this.updateLocalStorage();
      },

      calcTotalAmount() {
        return this.booksInCart.reduce((sum, book) =>{
          return sum += book.amount;
        })
      },
      updateLocalStorage(){
        localStorage.BookShopCart = this.booksInCart;
      }
    },
    created() {
      //получаем данные из локального хранилища
      if (localStorage.BookShopCart) this.booksInCart = localStorage.BookShopCart;
      //превращаем колличество в число
      this.booksInCart.forEach(el =>{
        el.amount = parseInt(el.amount, 10);
      })

      //TODO: Выглядит странно. Спросить!
      // this.books = JSON.parse(JSON.stringify(data));
      // console.log(this.books);
    }
  };
</script>
