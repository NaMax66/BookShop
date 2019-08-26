<template>
  <div id="app" class="container mt-5">
    <Header v-bind:totalAmountBooksInCart="totalAmountBooksInCart()"/>
    <router-view :data="data" v-bind:totalAmountBooksInCart="totalAmountBooksInCart()"
                 v-on:add-book-to-cart="addBookToCart"
                 v-on:change-cart-book-amount="changeAmount"
                 v-on:delete-book-from-cart="deleteBookFromCart"
                 v-on:clear-cart="clearCart"
    />
  </div>
</template>

<script>
  import Header from "./components/layout/Header";
  //import book_database from "./book_database.json";
  import axios from 'axios'

  export default {
    name: "app",
    components: {
      Header
    },
    data() {
      return {
        data: {
          //todo запросы с сервера
          //берем данные из заглушки book_database.json
          books: [],
          booksInCart: []
        }
      };
    },
    methods: {
      //todo сделать нормлаьные аргументы
      changeAmount(dataBook) {
        if (dataBook.amount === 0)
          this.deleteBookFromCart(dataBook.id);

        const id = dataBook.id;
        //обнавляем данные в карзине
        this.data.booksInCart.forEach(el => {
          if (el.id === id) {
            el.amount = dataBook.amount;
          }
        });
        this.updateLocalStorage();
      },
      addBookToCart(newBook) {
        //проверяем есть ли книга
        let isInCart = false;

        this.data.booksInCart.forEach(el => {
          //смотрим все книги, и если есть с существующим id - обновляем кол-во и время добавления, чтобы подвинуть вновь добавленную книгу вверх

          if (el.id === newBook.id) {
            el.amount += 1;
            el.time = newBook.time;
            this.updateLocalStorage();
            isInCart = true;
          }
        });

        //если книги небыло в карзине - добавляем новую
        if (!isInCart)
          this.data.booksInCart = [...this.data.booksInCart, newBook];

        //обновляем хранилище с сортируем книги в карзине
        this.sortCartByTime();
        this.updateLocalStorage();
      },

      deleteBookFromCart(id) {
        this.data.booksInCart = this.data.booksInCart.filter(book => book.id !== id);
        this.updateLocalStorage();
      },

      clearCart() {
        if (confirm("Убрать все книги из карзины?")) {
          this.data.booksInCart = [];
          this.updateLocalStorage();
        }
      },
      totalAmountBooksInCart() {
        return this.data.booksInCart.reduce((sum, bookInCart) => {
          return sum + bookInCart.amount;
        }, 0);
      },

      updateLocalStorage() {
        localStorage.BookShopCart = JSON.stringify(this.data.booksInCart);
      },

      //сортировка списка для отображения вновь добавленных книг в карзину вверху
      sortCartByTime() {
        //todo убрать время нахрен
        this.data.booksInCart.sort((book1, book2) => {
          return book2.time - book1.time;
        });
      }
    },
    created() {
      let proxy = 'https://cors-anywhere.herokuapp.com/';
      //получаем данные с сервера
      axios.get(proxy + 'https://www.book-shop.na4u.ru/book_database')
        .then(res =>  {
          console.log(res.data);
          this.data.books = res.data
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
  @media (max-width: 640px) {
    html {
      font-size: 75%;
    }
  }
</style>

