<template>
  <div id="app" class="container mt-5">
    <Header :totalAmountBooksInCart="totalAmountBooksInCart"/>
    <router-view :data="data" :totalAmountBooksInCart="totalAmountBooksInCart"
                 @add-book-to-cart="addBookToCart"
                 @change-cart-book-amount="changeAmount"
                 @delete-book-from-cart="deleteBookFromCart"
                 @clear-cart="clearCart"
    />
  </div>
</template>

<script>
  import Header from "./components/layout/Header";
  import axios from "axios";

  export default {
    name: "app",

    components: {
      Header
    },

    data() {
      return {
        data: {
          books: [],
          booksInCart: []
        }
      };
    },

    computed: {
      totalAmountBooksInCart() {
        return this.data.booksInCart.reduce((sum, bookInCart) => {
          return sum + bookInCart.amount;
        }, 0);
      }
    },

    methods: {
      changeAmount(dataBook) {
        if (dataBook.amount === 0)
          this.deleteBookFromCart(dataBook.id);

        const id = dataBook.id;
        //обновляем данные в корзине
        this.data.booksInCart.forEach(el => {
          if (el.id === id) {
            el.amount = dataBook.amount;
          }
        });
        this.updateLocalStorage();
      },

      addBookToCart(newBook) {
        //проверяем есть ли книга в корзине
        this.data.booksInCart.forEach(el => {

          //смотрим все книги в корзине и если есть с существующим id - обновляем кол-во
          if (el.id === newBook.id) {
            newBook.amount = el.amount + 1;

            //удаляем книгу со старым кол-вом
            this.deleteBookFromCart(newBook.id);
            this.updateLocalStorage();
          }
        });

        //Добавляем новую книгу в корзину
        this.data.booksInCart = [newBook, ...this.data.booksInCart];

        //обновляем хранилище с сортируем книги в корзине
        this.updateLocalStorage();
      },

      deleteBookFromCart(id) {
        this.data.booksInCart = this.data.booksInCart.filter(book => book.id !== id);
        this.updateLocalStorage();
      },

      clearCart() {
        if (confirm("Убрать все книги из корзины?")) {
          this.data.booksInCart = [];
          this.updateLocalStorage();
        }
      },

      updateLocalStorage() {
        localStorage.BookShopCart = JSON.stringify(this.data.booksInCart);
      },
    },

    created() {
      //получаем данные с сервера
      axios.get("/book_database")
        .then(res => {
          this.data.books = res.data;
        })
        .catch(err => console.log(err));

      //получаем данные из локального хранилища
      if (localStorage.BookShopCart) {
        this.data.booksInCart = JSON.parse(localStorage.BookShopCart);
      }
    }
  };
</script>

<style>
  /*уменьшаем размер шрифта с 16 до 12px для маленьких экранов*/
  @media (max-width: 768px) {
    html {
      font-size: 75%;
    }
  }
</style>

