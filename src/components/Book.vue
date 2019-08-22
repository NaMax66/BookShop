<template>
  <div class="book" v-bind:class="{ 'is-complete': book.completed }">
    <!--todo: add bootstrap-->
    <p>
      <input type="checkbox" v-on:change="markComplete" />
      {{ book.title }}
      <button @click="$emit('del-book', book.id)" class="btn btn-warning del">x</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "Book",
  props: ["book"],
  methods: {
    markComplete() {
      this.book.completed = !this.book.completed;
    }
  }
};
</script>

<style scoped>
.book {
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
}
.is-complete {
  text-decoration: line-through;
}
.del {

  float: right;
}
</style>
