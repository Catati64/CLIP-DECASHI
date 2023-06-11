<template>
  <v-container>
    <tablaProductos />
  </v-container>
</template>

<script>

import tablaProductos from '~/components/PrincipalTable.vue.js'

export default {
  name: 'IndexPage',
  components: {
    tablaProductos
  },
  layout: 'general',
  mounted () {
    const datoEmail = sessionStorage.getItem('email')
    if (!datoEmail) {
      this.$router.push('/')
    }
  }
}
</script>
