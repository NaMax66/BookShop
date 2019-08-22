<template>
  <div>
    <div v-bind:key="book.id" v-for="book in books">
      <Book v-bind:book="book" v-on:del-book="$emit('del-book', book.id)"/> <!--passing props into todo item-->
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

<style scoped></style>
