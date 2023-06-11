<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :rows-per-page-items="[10, 20, 30]"
    class="elevation-1"
  >
    <template #item.priority="{ item }">
      <v-chip
        :color="getPriorityColor(item.priority)"
        dark
        outlined
      >
        {{ item.priority }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Description', value: 'description' },
        { text: 'Start Date', value: 'startDate' },
        { text: 'End Date', value: 'endDate' },
        { text: 'Priority', value: 'priority' },
        { text: 'State', value: 'state' },
        { text: 'Tags', value: 'tags' },
        { text: 'Notes', value: 'notes' }
      ],
      items: [] // Aquí puedes cargar los datos de tu tabla mediante una llamada a la API utilizando Axios
    }
  },
  methods: {
    getPriorityColor (priority) {
      // Define los colores para cada prioridad
      switch (priority) {
        case 'High':
          return 'red'
        case 'Medium':
          return 'orange'
        case 'Low':
          return 'green'
        default:
          return ''
      }
    }
  }
}
</script>

<style scoped>
/* Estilo de la tabla */
.v-data-table.theme--light {
  background-color: #ffffff;
  color: #000000;
  font-family: 'Oxanium', sans-serif;
}

/* Estilo de los encabezados */
.v-data-table.theme--light .v-data-table-header th {
  background-color: #000000;
  color: #ffffff;
}

/* Estilo de las filas */
.v-data-table.theme--light tbody tr {
  border-bottom: 1px solid #000000;
}

/* Estilo de las celdas */
.v-data-table.theme--light td {
  color: #000000;
}

/* Estilo del chip de prioridad */
.v-data-table.theme--light .v-chip {
  background-color: #000000;
  color: #ffffff;
  font-family: 'Oxanium', sans-serif;
}
</style>
