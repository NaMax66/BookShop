<template>
  <div class="container pt-5">
    <!--если не вставить проверку на наличие книг - возникает ошибка проверки типов в компоненте ShopBook-->
    <div v-if="data.books.length !== 0" class="row">

      <!--передаем в компонент ShopBook объект из массива books и кол-во данной копии книги в корзине-->
      <ShopBook :key="book.id"
                v-for="book in data.books"
                :book="book"
                :bookInCartAmount="getBookInCartAmount(book.id)"
                @add-book-to-cart="addBookToCart"/>
    </div>
  </div>
</template>

<script>
  import ShopBook from "../components/ShopBook";

  export default {
    name: "AppShop",
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

        if (!this.data.booksInCart.length)
          return 0;

        else {
          this.data.booksInCart.forEach(el => {
            if (el.id === id) {
              amount = el.amount;
            }
          });
        }
        return amount;
      }
    }
  };
</script>



