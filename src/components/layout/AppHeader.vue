<template>
  <div class="nav-toolbox-wrapper fixed-top">

    <router-link to="/"
                 class="logo"
                 tag="a"
                 aria-disabled="true"
                 :class="{'logo-hover': getCurrentRoute !== '/', 'text-white': getCurrentRoute === '/'}"
    >
      <span class="logo__short">BS</span>
      <span class="logo__long">BookShop</span>

    </router-link>

    <nav>
      <ul class="navigation">
        <router-link tag="li"
                     :class="{'border-light': getCurrentRoute === '/', 'text-white': getCurrentRoute === '/'}"
                     to="/"
        >
          {{strings.SHOP[language]}}
        </router-link>

        <!--If we have some books in our cart we add a border around the button-->
        <router-link tag="li"
                     :class="{'border-light': getCurrentRoute === '/cart', 'text-white': getCurrentRoute === '/cart'}"
                     to="cart"
        >
          {{strings.CART[language]}} <span class=" badge badge-light">{{totalAmountBooksInCart}}</span>
        </router-link>

        <router-link tag="li"
                     :class="{'border-light': getCurrentRoute === '/review', 'text-white': getCurrentRoute === '/review'}"
                     to="review"
        >
          Отзывы
        </router-link>

        <!--<router-link class="nav-item nav-link text-white font-weight-bold"
                     to="/login"
        >{{strings.LOGIN[language]}}</router-link>-->
      </ul>
    </nav>
  </div>
</template>

<script>
  import { strings } from "../../strings";

  export default {
    name: "AppHeader",

    //todo: make btn on the main screen - change language
    computed: {
      strings() {
        return strings;
      },

      getCurrentRoute() {
        return this.$route.path
      },

      language() {
        return this.$store.getters.language;
      },
      totalAmountBooksInCart() {
        return this.$store.getters.totalAmountBooksInCart;
      }
    },

  };
</script>

<style scoped lang="scss">

  $link-color: #E0E0E0;

  .nav-toolbox-wrapper {
    background-color: #333;
    color: $link-color;
    width: 100%;
    font-weight: bold;

    @media (min-width: 768px) {

      padding-right: 10%;
      padding-left: 10%;

    }

    @media (max-width: 768px) {
        font-size: 75%;
    }

  }



  nav {

    /*Clearfix*/
    &::after {
      content: "";
      clear: both;
      display: table;
    }
  }

  .logo {
    font-weight: normal;
    display: inline-block;
    float: left;
    color: $link-color;
    text-decoration: none;
    font-size: 2rem;
    padding: .3rem;
    cursor: default;
    margin-left: .5rem;

    .logo__short {
      display: none;
    }

    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-top: .3rem;

      .logo__short {
        display: inline-block;
      }

      .logo__long {
        display: none;
      }
    }

  }

  .logo-hover {
      cursor: pointer;

    &:hover {
      color: #FF372F;
    }
  }

  .text-white {
    color: white;
  }

  .navigation {
    list-style: none;
    float: right;
    margin-bottom: .5rem;
    margin-top: 1rem;
    margin-right: 1rem;


    /*same as router-link*/
    li {
      display: inline-block;
      margin-right: 1rem;
      border: 1px solid #333;
      padding: .3rem;
      border-radius: 3px;
      /*remove padding from the right element*/
      &:last-child {
        margin: 0;

      }

      &:hover {
        cursor: pointer;
        border: 1px solid white;
        padding: .3rem;
        background-color: red;
      }
    }

  }
</style>
