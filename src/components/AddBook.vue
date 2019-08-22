<template>
  <div>
    <form class="row m-1" @submit="addBook">
      <input class="col-10" type="text" v-model="title" name="title" placeholder="Add Book..." required>
      <input class="col-2 btn btn-dark" type="submit" value="Add">
    </form>
  </div>
</template>

<script>
  export default {
    name: "AddBook",
    data() {
      return {
        title: ''
      }
    },
    methods: {
      addBook(e) {
        e.preventDefault();
        const newBook = {

          title: this.title,
          completed: false
        };
        this.$emit('add-book', newBook);
        this.title = '';
      }
    }
  }
</script>

<style>

</style>
