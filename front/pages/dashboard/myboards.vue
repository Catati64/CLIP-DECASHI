<template>
  <v-container>
    <tablaProductos />
  </v-container>
</template>

<script>

import tablaProductos from '~/components/principal-table.vue'

export default {
  name: 'IndexPage',
  components: {
    tablaProductos
  },
  layout: 'general'
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oxanium:wght@200;300;400;500;600;700;800&display=swap");

html,
body {
  font-family: "Oxanium", sans-serif;
}

#app {
  font-family: "Oxanium", sans-serif;
}
</style>
