<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-lg-6" :key="book.id" v-for="book in data.books">

        <!--передаем в компонент ShopBook объект из массива books и кол-во данной копии книги в корзине-->
        <ShopBook :book="book"
              :bookInCartAmount="getBookInCartAmount(book.id)"
              @add-book-to-cart="addBookToCart"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import ShopBook from "../components/ShopBook";

  export default {
    name: "Shop",
    components: {
      ShopBook: ShopBook
    },
    props: {
      data: Object
    },
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



