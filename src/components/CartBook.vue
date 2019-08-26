<template>
  <div class="card-body">

    <div class="row">
      <div class="col-2 p-0">
        <img class="w-100" :src="require('../img/' + bookInCart.img)" v-bind:alt="bookInCart.price"/>
      </div>
      <p class="card-title col-6">{{bookInCart.title}}</p>
      <div class="col-4 text-right">
        <div class="btn-group mr-2 mt-2" role="group" aria-label="Basic example">
          <button @click="changeAmount(-1)" type="button" class="btn btn-secondary"> -</button>
          <!--добавить динамическое обновление из корзины-->
          <span class="btn disabled">  {{bookInCart.amount}}  </span>
          <button @click="changeAmount(1)" type="button" class="btn btn-secondary"> +</button>
        </div>
        <!--передаем событие для удаления книги из карзины вместе с id в App.vue-->
        <button @click="$emit('delete-book-from-cart', bookInCart.id)" class="btn btn-warning mt-2 mr-1">Убрать</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CartBook",
    props: ["bookInCart"],
    methods: {
      /*если 0 - убираем*/
      changeAmount(addAmount) {
        //отправляем данные в App. Вся работа с данными происходит там
        this.$emit("change-cart-book-amount", {
          amount: this.bookInCart.amount + addAmount,
          id: this.bookInCart.id
        });
      }
    }
  };
</script>

