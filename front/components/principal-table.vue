<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :rows-per-page-items="[10, 20, 30]"
      class="elevation-1"
    >
      <template #[`item.priority`]="{ item }">
        <v-chip
          :color="getPriorityColor(item.priority)"
          dark
          outlined
        >
          {{ item.priority }}
        </v-chip>
      </template>
      <template #[`header.state`]="{ header }">
        <div class="header-button">
          <v-btn icon>
            <v-icon style="padding-top=0.6em;">
              mdi-plus
            </v-icon>
          </v-btn>
          <span class="header-text">{{ header.text }}</span>
        </div>
      </template>
      <template #[`header.tags`]="{ header }">
        <div class="header-button">
          <v-btn icon>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <span class="header-text">{{ header.text }}</span>
        </div>
      </template>
    </v-data-table>
    <div class="add-task-button">
      <v-btn block @click="NewTaskDialog = true">
        + New Task
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      NewTaskDialog: false,
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
      items: []
    }
  },
  methods: {
    getPriorityColor (priority) {
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

/* Estilo de los botones */
.header-button {
  display: flex;
  align-items: center;
}

.header-text {
  margin-left: 4px;
}

.add-task-button {
  margin-top: 16px;
}

.add-task-button .v-btn {
  background-color: #000000;
  color: #ffffff;
  font-family: 'Oxanium', sans-serif;
}
</style>
