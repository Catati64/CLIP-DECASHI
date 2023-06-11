<template>
  <v-app style="background-color: #fff;">
    <HeaderLogin />
    <v-row class="centrado">
      <Nuxt />
    </v-row>
    <FooterVue />
  </v-app>
</template>

<script>
import HeaderLogin from '~/components/auth/auth-header.vue'
export default {
  name: 'Login',
  components: {
    HeaderLogin
  }
}
</script>

<style scoped>
.centrado {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

</style>
