<template>
  <li class="list-group-item">
    {{bookInC.title}}
    <div class="btn-group ml-3" role="group" aria-label="Basic example">
      <button @click="changeAmount('dec')" type="button" class="btn btn-secondary"> -</button>
      <!--добавить динамическое обновление из корзины-->
      <span class="btn disabled">  {{bookInC.amount}}  </span>
      <button @click="changeAmount('inc')" type="button" class="btn btn-secondary"> +</button>
    </div>
  </li>
</template>

<script>
  export default {
    name: "CartBook",
    props: ["bookInC"],
    methods: {
      changeAmount(plusMinus) {
        let num = this.bookInC.amount;
        //колл-во книг в карзине не должно быть отрицательным
        if (num === 0) return;
        //если уменьшаем кол - во
        if (plusMinus === "dec") num -= 1;
        else num += 1;
        //отправляем данные в App. Вся работа с данными происходит там
        this.$emit("change-cart-book-amount", [num, this.bookInC.id]);
      }
    }
  };
</script>
