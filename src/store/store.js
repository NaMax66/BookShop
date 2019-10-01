import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    language: "en",
    books: {
      type: Array,
      default: []
    },
    booksInCart: {
      type: Array,
      default: []
    }
  },
  getters: {
    language(state) {
      return state.language;
    },

    getBooks(state) {
      return state.books;
    },

    getBooksInCart(state) {
      return state.booksInCart;
    },

    totalAmountBooksInCart(state) {
      if (!state.booksInCart.length)
        return 0;

      return state.booksInCart.reduce((sum, bookInCart) => {
        return sum + bookInCart.amount;
      }, 0);
    }

  },
  mutations: {
    changeLang(state, payload) {
      state.language = payload;
    },
    setBooks(state, payload) {
      state.books = payload;
    },
    setBookShopCart(state, payload) {
      state.booksInCart = payload;
    }
  },
  actions: {


  }
});
