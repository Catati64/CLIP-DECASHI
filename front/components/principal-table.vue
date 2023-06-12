<template>
  <div data-app>
    <v-data-table
      :headers="headers"
      :items="items"
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
    </v-data-table>
    <div class="add-task-button">
      <v-btn block @click="NewTaskDialog = true">
        + New Task
      </v-btn>
    </div>
    <v-dialog v-model="NewTaskDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Add New Task</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="newTask.description" label="Description" />
          <v-row>
            <v-col cols="6">
              <v-menu offset-y>
                <template #activator="{ on }">
                  <v-text-field v-model="newTask.startDate" label="Start Date" readonly v-on="on" />
                </template>
                <v-date-picker v-model="newTask.startDate" no-title />
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-menu offset-y>
                <template #activator="{ on }">
                  <v-text-field v-model="newTask.endDate" label="End Date" readonly v-on="on" />
                </template>
                <v-date-picker v-model="newTask.endDate" no-title />
              </v-menu>
            </v-col>
          </v-row>
          <v-select v-model="newTask.priority" label="Priority" :items="['High', 'Medium', 'Low']" />
          <v-select v-model="newTask.state" label="State" :items="['Todo', 'In Progress', 'Done']" />
          <v-text-field v-model="newTask.tags" label="Tags" />
          <v-textarea v-model="newTask.notes" label="Notes" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="saveTask">
            Add
          </v-btn>
          <v-btn color="secondary" text @click="closeNewTask">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<!-- eslint-disable no-console -->
<script>
export default {
  data () {
    return {
      headers: [
        { text: 'ID', value: 'idtask' },
        { text: 'Description', value: 'description' },
        { text: 'Start Date', value: 'startDate' },
        { text: 'End Date', value: 'endDate' },
        { text: 'Priority', value: 'priority' },
        { text: 'State', value: 'state' },
        { text: 'Tags', value: 'tags' },
        { text: 'Notes', value: 'notes' }
      ],
      newTask: {
        description: '',
        startDate: null,
        endDate: null,
        priority: null,
        state: null,
        tags: '',
        notes: ''
      },
      NewTaskDialog: false,
      items: []
    }
  },

  created () {
    this.BringAllsTasks()
  },

  methods: {
    async BringAllsTasks () {
      const userid = this.$fire.auth.currentUser.uid
      try {
        const response = await this.$axios.post('/AllsTasks', { userid })
        if (response.status === 200) {
          console.log(response.data)
          this.items = response.data
        } else {
          console.error('Error bringing all tasks')
        }
      } catch (error) {
        console.error('error getting  all tasks', error)
      }
    },

    async saveTask () {
      const userid = this.$fire.auth.currentUser.uid
      console.log(userid)
      const idtask = this.newTask.description
      const description = this.newTask.description
      const startDate = this.newTask.startDate
      const endDate = this.newTask.endDate
      const priority = this.newTask.priority
      const state = this.newTask.state
      const tags = this.newTask.tags
      const notes = this.newTask.notes
      try {
        await this.$axios.post('/NewTask', { userid, idtask, description, startDate, endDate, priority, state, tags, notes }).then((res) => {
          console.log(res)
        })
          .catch((err) => {
            console.log(err)
          })
      } catch (error) {
        console.error('Error al crear tarea', error)
      }
      this.BringAllsTasks()
      this.closeNewTask()
    },
    clearNewTask () {
      this.newTask = {
        description: '',
        startDate: null,
        endDate: null,
        priority: null,
        state: null,
        tags: '',
        notes: ''
      }
    },
    closeNewTask () {
      this.NewTaskDialog = false
      this.clearNewTask()
    },
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
  background-color: #ffffff !important;
  color: #000000 !important;
  font-family: 'Oxanium', sans-serif !important;
}

/* Estilo de las filas */
.v-data-table.theme--light tbody tr {
  border-bottom: 1px solid #000000 !important;
}

/* Estilo de las celdas */
.v-data-table.theme--light td {
  color: #000000 !important;
}

/* Estilo del chip de prioridad */
.v-data-table.theme--light .v-chip {
  background-color: #000000 !important;
  color: #ffffff !important;
  font-family: 'Oxanium', sans-serif !important;
}

/* Estilo de los botones */
.header-button {
  display: flex !important;
  align-items: center !important;
}

.header-text {
  margin-left: 4px !important;
}

.add-task-button {
  margin-top: 16px !important;
}

.add-task-button .v-btn {
  background-color: #000000 !important;
  color: #ffffff !important;
  font-family: 'Oxanium', sans-serif !important;
}

.v-dialog.theme--dark .v-card {
  background-color: #333333;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
  padding: 16px;
}

.v-dialog.theme--dark .v-card-title {
  color: #ffffff;
}

.v-dialog.theme--dark .v-card-actions {
  justify-content: flex-end;
}

.v-text-field.theme--dark .v-label {
  color: #ffffff;
}

.v-text-field.theme--dark .v-input__control,
.v-text-field.theme--dark .v-input__slot {
  background-color: none;
  color: #ffffff;
}

.v-text-field.theme--dark .v-input__control::after {
  border-bottom-color: #ffffff;
}

.v-text-field.theme--dark .v-input__control::before {
  border-bottom-color: #ffffff;
}

</style>
