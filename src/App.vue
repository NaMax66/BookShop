<template>
  <div id="app" class="container mt-5">
    <AppHeader :totalAmountBooksInCart="totalAmountBooksInCart"/>
    <transition name="component-fade"
                mode="out-in"
    >
      <router-view/>
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

    created() {
      //get user language
      let userLang = navigator.language || navigator.userLanguage;
      if (userLang === "ru-RU")
        this.$store.commit("changeLang", "ru");

      //get books database from a server
      axios.get("/book_database.json")
        .then(res => {
          this.$store.commit("setBooks", res.data);
        })
        // eslint-disable-next-line no-console
        .catch(err => console.log("App.vue 40: " + err));

      //get data from local storage
      if (localStorage.BookShopCart) {
        let parsedData = JSON.parse(localStorage.BookShopCart);
        this.$store.commit("setBookShopCart", parsedData);
      }

      //BooksInCart should be an Array
      if (!Array.isArray(this.$store.getters.getBooksInCart)) {
        this.$store.commit("setBookShopCart", []);
        this.$store.commit("updateLocalStorage");
      }
    }
  };
</script>

<style>
  /*уменьшаем размер шрифта с 16 до 12px для маленьких экранов*/


  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .2s ease;
  }

  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }

</style>

