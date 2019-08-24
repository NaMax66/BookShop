<template>
  <div id="app" class="container">
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
  import book_database from "./book_database.json";

  export default {
    name: "app",
    components: {
      Header
    },
    data() {
      return {
        data: {
          //берем данные из book_database.json
          books: book_database,
          booksInCart: []
        }
      };
    },
    methods: {
      //todo сделать нормлаьные аргументы
      changeAmount(numId) {
        const id = numId[1];
        //обнавляем данные в карзине
        this.data.booksInCart.forEach(el => {
          if (el.id === id) {
            el.amount = numId[0];

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
        if (!isInCart) this.data.booksInCart = [...this.data.booksInCart, newBook];

        //обновляем хранилище с сортируем книги в карзине
        this.sortCartByTime();
        this.updateLocalStorage();
      },

      deleteBookFromCart(id) {
        //отфильтровываем книгу с переданным id из массива с книгами в корзине
        this.data.booksInCart = this.data.booksInCart.filter(book => book.id !== id);
      },

      clearCart() {
        if (confirm("Убрать все книги из карзины?")) {
          this.data.booksInCart = [];
          this.updateLocalStorage();
        }
      },
      totalAmountBooksInCart(){
        return this.data.booksInCart.reduce((sum, bookInCart) => {
          return sum + bookInCart.amount;
        }, 0)
      },

      updateLocalStorage() {
        localStorage.BookShopCart = JSON.stringify(this.data.booksInCart);
      },

      //сортировка списка для отображения вновь добавленных книг в карзину вверху
      sortCartByTime() {
        this.data.booksInCart.sort((book1, book2) => {
          return book2.time - book1.time;
        });
      }
    },
    created() {
      //получаем данные из локального хранилища
      if (localStorage.BookShopCart) {
        this.data.booksInCart = JSON.parse(localStorage.BookShopCart);
      }
    }
  };
</script>

