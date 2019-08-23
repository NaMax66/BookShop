<template>
  <div id="app" class="container">
    <Header />
    <router-view :data="data" v-on:add-book-to-cart="addBookToCart"
                              v-on:change-cart-book-amount="changeAmount"


    />
  </div>
</template>

<script>
  import Header from "./components/layout/Header";
  import data from "./data.json";
  export default {
    name: 'app',
    components: {
      Header
    },
    data() {
      return{
        data: {
          //берем данные из data.json
          books: data,
          booksInCart: []
        }
      }
    },
    methods: {

      changeAmount(numId) {
        const id = numId[0];
        //обнавляем данные в карзине
        console.log(this.data.booksInCart);
        //this.data.booksInCart[id].amount = numId[1];
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
        if (isInCart) return;
        //добавляем книгу и обновляем хранилище
        this.data.booksInCart = [...this.data.booksInCart, newBook];
        console.log(this.booksInCart);
        this.updateLocalStorage();
      },

      updateCart(id, time, amount) {
        const book = this.data.booksInCart[id];
        if (book.amount === 0)
          book.time = time;
        book.amount = amount;
        this.data.booksInCart.push(book);
      },

      deleteBookFromCart(id) {
        //отфильтровываем книгу с переданным id из массива с книгами в корзине
        this.data.booksInCart = this.data.booksInCart.filter(book => book.id !== id);
      },

      clearCart() {
        this.data.booksInCart = [];
        this.updateLocalStorage();
      },

      calcTotalAmount() {
        return this.data.booksInCart.reduce((sum, book) => {
          sum += book.amount;
          return sum ;
        });
      },
      updateLocalStorage() {
        localStorage.BookShopCart = JSON.stringify(this.data.booksInCart);
      }
    },
    created() {
      //получаем данные из локального хранилища
      if (localStorage.BookShopCart) {
        this.data.booksInCart = JSON.parse(localStorage.BookShopCart);

        if (this.data.booksInCart.length === 0) return;
        //превращаем колличество в число
        // this.booksInCart.forEach(el => {
        //   el.amount = parseInt(el.amount, 10);
        // });
      }
      //TODO: Выглядит странно. Спросить!
      // this.books = JSON.parse(JSON.stringify(data));
      // console.log(this.books);
    }

  }
</script>
