import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    language: "en",
    books: [],
    booksInCart: [],
    reviews: [
      {
        nickName: 'Пётр',
        pubDate: '24.10.2019',
        score: 4,
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis debitis molestias nostrum odio reprehenderit.'
      },
      {
        nickName: 'Анна Павловна',
        pubDate: '24.09.2019',
        score: 5,
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis debitis molestias nostrum odio reprehenderit consectetur adipisicing.'
      },
      {
        nickName: 'SomeFunnyNick',
        pubDate: '14.09.2019',
        score: 3,
        text: 'Lorem ipsum dolor sit amet, elit. Blanditiis debitis molestias nostrum odio reprehenderit.'
      }
    ]
  },
  getters: {
    getReviews(state) {
      return state.reviews;
    },

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
    },

    bookInCartAmount(state) {
      return function(id) {
        let amount = 0;

        if (!state.booksInCart.length)
          return 0;

        else {
          state.booksInCart.forEach(el => {
            if (el.id === id)
              amount = el.amount;
          });
        }
        return amount;
      };
    },

    totalPrice(state) {
      let totalSum = 0;
      if (!state.booksInCart.length)
        return 0;

      else {
        state.booksInCart.forEach(el => {
          totalSum += el.price * el.amount;
        });
        return totalSum;
      }
    },

  },
  mutations: {
    addReview(state, payload) {
      state.reviews = [payload, ...state.reviews];
    },

    changeLang(state, payload) {
      state.language = payload;
    },
    setBooks(state, payload) {
      state.books = payload;
    },
    setBookShopCart(state, payload) {
      state.booksInCart = payload;
    },
    updateLocalStorage(state) {
      localStorage.BookShopCart = JSON.stringify(state.booksInCart);
    },

    addBookToCart(state, book) {
      const cartBook = Object.assign({}, book);
      cartBook.amount = 1;
      state.booksInCart = [cartBook, ...state.booksInCart];
    }

  },
  actions: {
    addReview({commit}, payload) {
      commit('addReview', payload);
    },

    clearCart({ state, commit }) {
      if (confirm("Убрать все книги из корзины?")) {
        state.booksInCart = [];
        commit("updateLocalStorage");
      }
    },

    changeAmount({ commit, dispatch, state }, payload) {
      if (payload.amount === 0) {
        dispatch("deleteBookFromCart", payload.id);
        return;
      }
      //renew data in the cart
      let bookInCart = state.booksInCart.find(book => book.id === payload.id);

      bookInCart.amount = payload.amount;
      commit("updateLocalStorage");
    },

    deleteBookFromCart({ commit, state }, id) {
      if (state.booksInCart.length === 0)
        return;

      state.booksInCart = state.booksInCart.filter(book => book.id !== id);
      commit("updateLocalStorage");
    },

    addBookToCart({ commit, state }, bookFromShop) {
      if (!state.booksInCart)
        state.booksInCart = [];

      const bookInCart = state.booksInCart.find(book => book.id === bookFromShop.id);
      if (!bookInCart)
        commit("addBookToCart", bookFromShop);
      else
        bookInCart.amount += 1;

      commit("updateLocalStorage");
    }
  }
});
