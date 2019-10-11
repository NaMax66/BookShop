<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="review__header__container">
          <button class="back__arrow" @click="closeModal">
            <img src="../img/arrow_back-24px.svg" alt="">
          </button>
          <h3 class="review__header">Оценить</h3>
        </div>

        <div class="review__stars"
             @mouseout="isScoreValid()"
             :class="{'red__border': !isScoreValid && isFormTouched}"
        >
          <span v-for="index in 5"
                class="review__star__container"
                :key="index"
                @mouseover="hoveredStar = index"
                @mouseleave="hoveredStar = -1"
                @click="setRating(index)"
          >
            <svg width="32" height="32" viewBox="-2 -2 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path class="star"

          :class="{'star__hovered': index <= hoveredStar || index <= score }"
          d="M15.0767 1.21993C15.4183 0.398634 16.5817 0.398636 16.9233 1.21993L20.5265 9.883C20.6705 10.2292 20.9961 10.4658 21.3699 10.4958L30.7224 11.2456C31.6091 11.3166 31.9686 12.4232 31.2931 13.0018L24.1674 19.1057C23.8826 19.3496 23.7583 19.7324 23.8453 20.0972L26.0223 29.2236C26.2287 30.0889 25.2874 30.7727 24.5283 30.3091L16.5213 25.4184C16.2012 25.2229 15.7988 25.2229 15.4787 25.4184L7.47169 30.3091C6.71259 30.7727 5.77134 30.0889 5.97773 29.2236L8.15472 20.0972C8.24173 19.7324 8.11736 19.3496 7.83257 19.1057L0.706938 13.0018C0.0314007 12.4232 0.390928 11.3166 1.27758 11.2456L10.6301 10.4958C11.0039 10.4658 11.3295 10.2292 11.4735 9.883L15.0767 1.21993Z"></path>
            </svg>
          </span>
        </div>
        <form action=""
              class="review__form"
        >
          <!--сдлал лэйбл для программ чтения с экрана-->
          <label for="name">Ваше имя</label>
          <input id="name"
                 @blur="nickIsValid()"
                 :class="{'red__border': !isNickValid && isFormTouched}"
                 class="review__form__name"
                 v-model="nickName"
                 type="text"
                 placeholder="Укажите ваш никнейм"
          >
          <label for="text">Расскажите, что можно улучшить?</label>
          <div class="review__form__text__wrapper">
            <textarea id="text"
                      class="review__form__text"
                      v-model="text"
                      type="text"
                      placeholder="Расскажите, что можно улучшить?"
            ></textarea>
            <span class="review__form__text__hint"
                  v-if="text.length < 20"
            >Минимум 20 символов</span>

          </div>

          <button class="review__send__btn"
                  @click.prevent="confirmData"
          >Отправить
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AppReviewForm",
    data() {
      return {
        hoveredStar: 0,
        nickName: "",
        score: 0,
        text: "",
        isNickValid: false,
        isScoreValid: false,
        isTextValid: false,
        isFormTouched: false

      };
    },
    computed: {
      pubDate() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = String(today.getFullYear());

        return dd + "." + mm + "." + yyyy;
      }
    },
    methods: {
      scoreIsValid() {
        this.isFormTouched = true;
        if (this.score < 1) {
          this.isScoreValid = false;
        } else {
          this.isScoreValid = true;
        }

      },

      nickIsValid() {
        //чтобы красный контур не появлялся сразу при открытии
        this.isFormTouched = true;
        if (this.nickName.length >= 2) {
          this.isNickValid = true;
        } else {
          this.isNickValid = false;
        }
      },

      textIsValid() {

      },

      setRating(index) {
        this.score = index;
      },

      closeModal() {
        this.$emit("close");
      },

      confirmData() {
        /*если что-то не заполнено - ничего не добавляем*/
        if (!this.isNickValid || !this.isScoreValid || !this.isScoreValid ) {
          return;
        }

        const review = {
          nickName: this.nickName,
          pubDate: this.pubDate,
          score: this.score,
          text: this.text
        };
        this.$store.dispatch("addReview", review);

        /*очищаем форму*/
        this.nickName = "";
        this.score = 0;
        this.text = "";

        this.closeModal();
        this.$emit("openThanks");
      }
    }
  };
</script>

<style scoped lang="scss">
  .modal-mask {
    margin-top: 3.4rem;

    /*Меню изменяется, нужен другой отступ*/
    @media (min-width: 769px) {
      margin-top: 3.7rem;
    }

    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;

    .modal-wrapper {
      display: table-cell;
      vertical-align: middle;

      .modal-container {
        /*для мобильных показываем форму на весь экран*/
        @media (max-width: 768px) {
          width: 100%;
          height: 100%;
          transform: translateY(0);
        }

        /*остальные настройки для ПК*/
        width: 700px;
        height: 85%;
        transform: translateY(-5%);
        margin: 0 auto;
        padding: 2.25rem 1rem;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Roboto, sans-serif;

        .review__header__container {

          .back__arrow {
            font-size: 100%;
            font-family: inherit;
            border: 0;
            padding: 0;
            background: none;
          }

          .review__header {
            display: inline-block;
            position: absolute;
            left: 50%;
            transform: translate(-50%, 50%);
            /*методом подбора выравниваю заголовок отностительно стрелки*/
            margin-top: -.2rem;
            font-style: normal;
            font-weight: bold;
            font-size: .875rem;
            line-height: 1rem;
            text-align: center;
          }
        }

        .review__stars {
          text-align: center;
          height: 2.25rem;

          .review__star__container {
            margin-left: .25rem;

            .star {
              height: 100%;
              fill: #C4C4C4;
              cursor: pointer;
            }

            .star__hovered {
              fill: #F56A3F;
            }

            &:first-child {
              margin-left: 0;
            }
          }
        }

        .review__form {
          margin-top: 1rem;

          /*Редактор просил label. Я его добавил и скрыл*/
          label {
            display: none;
          }

          .review__form__name {
            display: block;
            width: 100%;
            background: #FFFFFF;
            border: 1px solid #D9D9D9;
            border-radius: 8px;
            height: 3rem;
          }
          .red__border {
            border: 2px solid red;
          }

          .review__form__text__wrapper {
            margin-top: 1rem;

            /*нужно для подсказки. Она находит первого родителя с этим св-вом*/
            position: relative;

            .review__form__text {
              display: block;
              width: 100%;
              background: #FFFFFF;
              border: 1px solid #D9D9D9;
              border-radius: 8px;
              padding-top: 1rem;
              height: 10rem;

              /*убираем уголок*/
              resize: none;
            }

            .review__form__text__hint {
              font-style: normal;
              font-weight: normal;
              position: absolute;
              bottom: 1rem;
              right: 1rem;
              font-size: 0.75rem;
              color: #FF6969;
            }
          }

          .review__send__btn {
            $background_color: #C4C4C4;
            /*очистка настроек button по умолчанию*/
            font-size: 0.875rem;
            font-family: inherit;
            background: none;
            border: 0;
            padding: 0;
            width: 100%;
            height: 3rem;

            margin-top: 1rem;
            background: $background_color;
            border-radius: 8px;
            font-style: normal;
            font-weight: bold;
            line-height: 16px;
            text-align: center;

            color: #FFFFFF;

            &:hover {
              background-color: darken($background_color, 10%);
            }

            &:active {
              transform: translateY(2px);
            }

            &:focus {
              outline: none;
            }
          }
        }


      }
    }
  }


</style>
