<template>
  <div class="container pt-5">

    <div v-if="books.length !== 0" class="row">

      <!--sending book object to ShopBook.vue component-->
      <ShopBook v-for="book in books"
                :key="book.id"
                :book="book"
      />
    </div>
    <div v-else>
      <h2>Подождите, идет загрузка...</h2>
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

    computed: {
      books() {
        return this.$store.getters.getBooks;
      }
    }
  };
</script>



