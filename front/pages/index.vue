<template>
  <cardLogin />
</template>

<script>
import cardLogin from '~/components/auth/card-login.vue'
export default {
  name: 'IndexPage',
  components: {
    cardLogin
  },
  layout: 'signin'
}
</script>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Oxanium:wght@200;300;400;500;600;700;800&display=swap");
  html, body {
    font-family: "Oxanium"
  }

  #app {
      font-family: "Oxanium"
  }
</style>
