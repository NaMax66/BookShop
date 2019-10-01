<template>
  <div id="app" class="container mt-5">
    <AppHeader :totalAmountBooksInCart="totalAmountBooksInCart"/>
    <transition name="component-fade" mode="out-in">
      <router-view
                   @add-book-to-cart="addBookToCart"
                   @change-cart-book-amount="changeAmount"
                   @delete-book-from-cart="deleteBookFromCart"
                   @clear-cart="clearCart"
      />
    </transition>
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

    computed: {
      totalAmountBooksInCart() {
        return this.$store.getters.totalAmountBooksInCart;
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

        } else {
          //проверяем есть ли книга в корзине
          this.data.booksInCart.forEach(el => {

            //смотрим все книги в корзине и если есть с существующим id - обновляем кол-во
            if (el.id === newBook.id) {
              newBook.amount = el.amount + 1;
            }
          });
        }
        //удаляем книгу со старым кол-вом
        this.deleteBookFromCart(newBook.id);

        //Добавляем новую книгу в корзину
        this.data.booksInCart = [newBook, ...this.data.booksInCart];

        //обновляем хранилище с сортируем книги в корзине
        this.updateLocalStorage();
      },

      deleteBookFromCart(id) {
        if (this.data.booksInCart.length === 0)
          return;

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
        if (this.data.booksInCart.length === 0)
          return;

        localStorage.BookShopCart = JSON.stringify(this.data.booksInCart);
      }
    },

    created() {
      //get user language
      let userLang = navigator.language || navigator.userLanguage;
      if (userLang === "ru-RU")
        this.$store.commit("changeLang", "ru");

      //получаем базу данных книг с сервера
      axios.get("https://cors-anywhere.herokuapp.com/https://www.book-shop.na4u.ru/book_database")
        .then(res => {
          this.$store.commit("setBooks", res.data);
        })
        // eslint-disable-next-line
        .catch(err => console.log("App.created(): " + err));

      //получаем данные из локального хранилища
      if (localStorage.BookShopCart) {
        let parsedData = [];

        try {
          parsedData = JSON.parse(localStorage.BookShopCart);
        } catch (e) {
          console.log("App.vue. line 128: " + e);
        }
        this.$store.commit("setBookShopCart", parsedData);
      }

      //Для корректной работы BookShopCart должен быть массивом. Если это не массив - мы очищаем корзину
      if (!Array.isArray(this.$store.getters.getBooksInCart)) {
        this.$store.commit("booksInCart", []);
        this.updateLocalStorage();
      }
    }
  }
</script>

<style>
  /*уменьшаем размер шрифта с 16 до 12px для маленьких экранов*/
  @media (max-width: 768px) {
    html {
      font-size: 75%;
    }
  }

  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .2s ease;
  }

  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }

</style>

