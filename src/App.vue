<template>
  <div id="app" class="container mt-5">
    <AppHeader :totalAmountBooksInCart="totalAmountBooksInCart"/>
    <router-view :data="data"
                 @add-book-to-cart="addBookToCart"
                 @change-cart-book-amount="changeAmount"
                 @delete-book-from-cart="deleteBookFromCart"
                 @clear-cart="clearCart"
    />
  </div>
</template>

<script>
  import AppHeader from "./components/layout/AppHeader";
  import axios from "axios";

  export default {
    name: "app",

    components: {
      AppHeader
    },

    data() {
      return {
        data: {
          books: {
            type: Array,
            default: []
          },
          booksInCart: {
            type: Array,
            default: []
          }
        }
      };
    },

    computed: {
      totalAmountBooksInCart() {
        if (!this.data.booksInCart.length)
          return 0;

        return this.data.booksInCart.reduce((sum, bookInCart) => {
          return sum + bookInCart.amount;
        }, 0);
      }
    },

    methods: {
      changeAmount(dataBook) {
        if (dataBook.amount === 0) {
          this.deleteBookFromCart(dataBook.id);
          return;
        }
        //обновляем данные в корзине
        let bookInCart = this.data.booksInCart.find(book => book.id === dataBook.id);
        bookInCart.amount = dataBook.amount;
        this.updateLocalStorage();
      },

      addBookToCart(newBook) {
        //если корзина пуста - добавляем новую книгу сразу
        if (this.data.booksInCart.length === 0) {
          this.data.booksInCart[0] = newBook;
          return;
        }

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
      }
    },

    created() {
      //получаем базу данных книг с сервера
      axios.get("https://cors-anywhere.herokuapp.com/https://www.book-shop.na4u.ru/book_database")
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

