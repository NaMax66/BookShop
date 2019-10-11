<template>
  <div class="review__container">
    <h2 class="review__header">Отзывы магазина</h2>
    <button
        class="new__review__button"
        @click="showForm = true"
    >Написать отзыв
    </button>
    <!--модальное окно - форма отзва-->
    <transition name="modal">
      <keep-alive>
        <AppReviewForm v-if="showForm"
                       @close="showForm = !showForm"
                       @openThanks="showThanks = !showThanks"
        />
      </keep-alive>
    </transition>
    <transition name="modal">
      <AppThanksModal v-if="showThanks"

                      @closeThanks="showThanks = !showThanks"
      />
    </transition>

    <div class="review__list">
      <div v-for="(review, index) in reviews"
           :key="index"
           class="review__item">
        <h3 class="review__nickname">{{review.nickName}}</h3>
        <time
            class="time"
            :datetime="review.pubDate">{{review.pubDate}}
        </time>
        <div class="review__stars">
          <img src="../img/painted_star.svg"
               class="star"
               :key="'painted_star' + star"
               v-for="star in review.score"
               alt="painted star">
          <img src="../img/empty_star.svg"
               class="star"
               :key="'empty_star' + star"
               v-for="star in 5 - review.score"
               alt="empty star">
        </div>
        <p class="review__text">{{ review.text }}</p>
      </div>
    </div>

  </div>
</template>

<script>
  import AppReviewForm from "./AppReviewForm";
  import AppThanksModal from "../components/AppThanksModal";

  export default {
    name: "AppReviews",

    data() {
      return {
        showForm: false,
        showThanks: false
      };
    },

    components: {
      AppReviewForm,
      AppThanksModal
    },

    computed: {
      reviews() {
        return this.$store.getters.getReviews;
      }
    }
  };
</script>

<style scoped lang="scss">

  .review__container {
    margin-top: 3.4rem;

    /*чтобы не схолпывался margin */
    padding-top: 1px;

    /*выставляю отступы с учетом контейнера приложения. В мобильной версии он составляем 15px*/
    /*во всех элементах в макете отступ левый 16px.*/
    margin-left: 1px;
    margin-right: 1px;


    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }

    .modal-enter {
      opacity: 0;
    }

    .modal-leave-active {
      opacity: 0;
    }


    .review__header {
      margin-top: 2rem;
      margin-bottom: 0;

      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 0.875rem;
      line-height: 1rem;
      color: #F56A3F;
    }

    .new__review__button {
      $bg_color: #fff;

      margin-top: 1.6875rem; /*27px*/
      margin-bottom: .5rem;

      background: $bg_color;
      border: 1px solid #D9D9D9;
      border-radius: 8px;
      height: 3rem;
      width: 100%;

      /*на большом экране кнопка на всю ширину - не красиво. Уменьшаем размер*/
      @media (min-width: 768px) {
        width: 75%;
      }

      @media (min-width: 992px) {
        width: 50%;
      }

      &:hover {
        background-color: darken($bg_color, 10%);
      }

      &:active {
        transform: translateY(2px);
      }

      &:focus {
        outline: none;
      }
    }

    .review__list {
      /*чтобы было видно нижний бордер при некоторых условиях*/
      padding-bottom: 1rem;

      .review__item {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #D9D9D9;

        /*добавляем бордер внизу*/
        &:last-child {
          border-bottom: 1px solid #D9D9D9;
        }


        .review__nickname {
          display: inline-block;

          font-family: Roboto, sans-serif;
          font-style: normal;
          font-weight: bold;
          font-size: 0.875rem;
          line-height: 1rem;
          margin-bottom: 0;
        }

        .time {
          margin-left: auto;
          margin-right: 1rem;
          margin-top: 1rem;
          float: right;

          font-family: Roboto, sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: .6875rem; /*11px*/
          line-height: .92857rem; /*13px*/
          text-align: right;
          color: #A79595;
        }

        .review__stars {
          /*примерно 1rem от никнейма до верхушки звезды*/
          margin-top: 0.6rem;

          .star {
            margin-left: 0.4rem;
          }

          .star:first-child {
            margin-left: 0;
          }
        }

        .review__text {
          margin-top: .5rem;
          font-family: Roboto, sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: .6875rem; /*11px*/
          line-height: .92857rem; /*13px*/
          margin-right: 1rem;
        }
      }
    }
  }


</style>
