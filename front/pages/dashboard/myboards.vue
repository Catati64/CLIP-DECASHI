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
