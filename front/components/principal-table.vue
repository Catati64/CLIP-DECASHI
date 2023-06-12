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
      <template #[`item.actions`]="{ item }">
        <v-row>
          <v-col cols="6">
            <v-btn text color="primary" @click="$event => editItem(item)">
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn text color="error" @click="$event => deleteItem(item)">
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
    <div class="add-task-button">
      <v-btn block @click="NewTaskOpen">
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
          <v-select v-model="newTask.state" label="State" :items="states" />
          <v-select v-model="newTask.tags" label="Tag" :items="tags" />
          <v-textarea v-model="newTask.notes" label="Notes" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="saveTask">
            Add
          </v-btn>
          <v-btn color="secondary" text style="margin-left: 0.5em;" @click="closeNewTask">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit task dialog -->
    <v-dialog v-model="EditTaskDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Task</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editTask.description" label="Description" />
          <v-row>
            <v-col cols="6">
              <v-menu offset-y>
                <template #activator="{ on }">
                  <v-text-field v-model="editTask.startDate" label="Start Date" readonly v-on="on" />
                </template>
                <v-date-picker v-model="editTask.startDate" no-title />
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-menu offset-y>
                <template #activator="{ on }">
                  <v-text-field v-model="editTask.endDate" label="End Date" readonly v-on="on" />
                </template>
                <v-date-picker v-model="editTask.endDate" no-title />
              </v-menu>
            </v-col>
          </v-row>
          <v-select v-model="editTask.priority" label="Priority" :items="['High', 'Medium', 'Low']" />
          <v-select v-model="editTask.state" label="State" :items="states" />
          <v-select v-model="editTask.tags" label="Tags" :items="tags" />
          <v-textarea v-model="editTask.notes" label="Notes" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="saveEditTask">
            Save
          </v-btn>
          <v-btn color="secondary" text style="margin-left: 0.5em;" @click="$event => EditTaskDialog=false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteTaskDialog"
      max-width="290"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5">
          Delete Task
        </v-card-title>
        <v-card-text>
          Do you really want to delete this task?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="$event => deleteTaskDialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            text
            @click="$event => deleteThisTask()"
          >
            Aceptar
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
        { text: 'Notes', value: 'notes' },
        { text: 'Actions', value: 'actions' }
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
      editTask: {
        description: '',
        startDate: null,
        endDate: null,
        priority: null,
        state: null,
        tags: '',
        notes: ''
      },
      deleteTask: '',
      NewTaskDialog: false,
      EditTaskDialog: false,
      deleteTaskDialog: false,
      states: [],
      tags: [],
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
      const description = this.newTask.description
      const startDate = this.newTask.startDate
      const endDate = this.newTask.endDate
      const priority = this.newTask.priority
      const state = this.newTask.state
      const tags = this.newTask.tags
      const notes = this.newTask.notes

      // Obtener el último ID existente en la tabla principal
      const lastId = this.items.reduce((maxId, item) => {
        return item.idtask > maxId ? item.idtask : maxId
      }, -1)
      const idnumber = parseFloat(lastId) + 1
      console.log(idnumber)
      // Incrementar el ID para la nueva tarea
      const idtask = idnumber.toString()
      console.log(idtask)
      try {
        await this.$axios.post('/NewTask', { userid, idtask, description, startDate, endDate, priority, state, tags, notes }).then((res) => {
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
    NewTaskOpen () {
      this.NewTaskDialog = true
      this.BringAllsTags()
      this.BringAllsStates()
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
    async BringAllsStates () {
      const userid = this.$fire.auth.currentUser.uid
      try {
        await this.$axios.post('/AllStates', { userid }).then((res) => {
          for (let i = 0; i < res.data.States.length; i++) { this.states.push(res.data.States[i].State) }
        })
          .catch((err) => {
            console.log(err)
          })
      } catch (error) {
        console.error('Error al traer estado', error)
      }
    },
    async BringAllsTags () {
      const userid = this.$fire.auth.currentUser.uid
      try {
        await this.$axios.post('/AllTags', { userid }).then((res) => {
          for (let i = 0; i < res.data.Tags.length; i++) { this.tags.push(res.data.Tags[i].Tag) }
        })
          .catch((err) => {
            console.log(err)
          })
      } catch (error) {
        console.error('Error al traer etiquetas', error)
      }
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
    },
    editItem (item) {
      this.editTask = item
      this.BringAllsTags()
      this.BringAllsStates()
      this.EditTaskDialog = true
    },
    async saveEditTask () {
      const config = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      }
      const taskUpdate = {
        userid: this.$fire.auth.currentUser.uid,
        idtask: this.editTask.idtask,
        description: this.editTask.description,
        startDate: this.editTask.startDate,
        endDate: this.editTask.endDate,
        priority: this.editTask.priority,
        state: this.editTask.state,
        tags: this.editTask.tags,
        notes: this.editTask.notes
      }
      await this.$axios.post('/EditTask',
        taskUpdate,
        config).then((res) => {
        console.log(res)
        this.EditTaskDialog = false
        this.BringAllsTasks()
      }).catch((e) => {
        console.log(e)
      })
    },
    deleteItem (item) {
      this.deleteTask = item
      this.deleteTaskDialog = true
    },
    async deleteThisTask () {
      const config = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      }
      const sendData = {
        userid: this.$fire.auth.currentUser.uid,
        idtask: this.deleteTask.idtask
      }
      await this.$axios.post('/DeleteTask', sendData, config)
        .then((res) => {
          console.log(res)
          this.deleteTaskDialog = false
          this.BringAllsTasks()
        })
        .catch((e) => {
          console.log(e)
        })
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
