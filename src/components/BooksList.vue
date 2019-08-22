<template>
  <div class="row">
    <!--todo Максимальная ширина-->
    <div class="col-lg-6" v-bind:key="book.id" v-for="book in books">
      <Book v-bind:book="book" v-on:del-book="$emit('del-book', book.id)"/>
    </div>
  </div>
</template>

<script>
  import Book from "./Book";

  export default {
    name: 'BookList',
    components: {
      Book
    },
    props: ['books'] /*excepting books as props*/
  };
</script>
