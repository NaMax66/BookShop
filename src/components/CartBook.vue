<template>
  <div class="card-body">

    <div class="row">
      <!--todo сделать чтобы картинки не плющело-->
      <img class="col-2" :src="require('../img/' + bookInC.img)" v-bind:alt="bookInC.price"/>
      <p class="card-title col-6">{{bookInC.title}}</p>
      <div class="col-4 text-right">
        <div class="btn-group mr-2 mt-2" role="group" aria-label="Basic example">
          <button @click="changeAmount('minus')" type="button" class="btn btn-secondary"> -</button>
          <!--добавить динамическое обновление из корзины-->
          <span class="btn disabled">  {{bookInC.amount}}  </span>
          <button @click="changeAmount('plus')" type="button" class="btn btn-secondary"> +</button>
        </div>
        <!--передаем событие для удаления книги из карзины вместе с id в App.vue-->
        <button @click="$emit('delete-book-from-cart', bookInC.id)" class="btn btn-warning mt-2 mr-1">Убрать</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CartBook",
    props: ["bookInC"],
    methods: {
      changeAmount(plusMinus) {
        let num = this.bookInC.amount;
        //колл-во книг в карзине не должно быть отрицательным
        //если уменьшаем кол - во
        if (plusMinus === "minus") {
          if (num === 0) return;
          num -= 1;
        } else num += 1;
        //отправляем данные в App. Вся работа с данными происходит там
        this.$emit("change-cart-book-amount", [num, this.bookInC.id]);
      }
    }
  };
</script>
