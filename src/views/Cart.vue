<template>
  <div class="container">
    <div>
      <div class="col-lg-6" v-bind:key="book.id" v-for="book in books">
        <Book v-bind:book="book" />
      </div>
    </div>
    <span>Total amount</span>
    <button class="btn btn-danger">Удалить всё</button>
  </div>
</template>

<script>
  import BooksList from "../components/BooksList";
  export default {
    name: 'Cart',
    components: {
      BooksList
    }

  }
</script>

