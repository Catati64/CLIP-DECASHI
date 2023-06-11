<template>
  <div>
    <headerTable />
    <v-container>
      <tablaProductos />
    </v-container>
  </div>
</template>

<script>

import tablaProductos from '~/components/principal-table.vue'
import headerTable from '~/components/principal-header.vue'

export default {
  name: 'IndexPage',
  components: {
    tablaProductos,
    headerTable
  }
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
