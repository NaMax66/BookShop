<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-lg-6" v-bind:key="book.id" v-for="book in data.books">
        <!--передаем в компонент Book объект из массива books и кол-во данной копии книги в карзине-->
        <Book v-bind:book="book"
              v-bind:bookInCartAmount="getBookInCartAmount(book.id)"
              v-on:add-book-to-cart="addBookToCart"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Book from "../components/Book";

  export default {
    name: "Shop",
    components: {
      Book
    },
    props: ["data"],
    methods: {
      addBookToCart(newBook) {
        this.$emit("add-book-to-cart", newBook);
      },
      getBookInCartAmount(id) {
        let amount = 0;
        this.data.booksInCart.forEach(el => {

          if (el.id === id) {
            amount = el.amount;
          }
        });
        return amount;
      }
    }
  };
</script>



