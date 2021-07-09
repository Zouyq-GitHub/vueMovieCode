<template>
  <div class="siteWrapper">
    <buyUser></buyUser>
    <buyShop></buyShop>
  </div>
</template>


<script>
import buyUser from "../components/buyUser.vue";
import buyShop from "../components/buyShop.vue";
export default {
  components: {
    buyUser,
    buyShop
  }
}
</script>


<style>
@import "../../static/css/buy.css";
</style>