<template>
  <div class="header" style="background-color: #fff;">
    <a href="/">
      <img id="logo" src="../images/CDB-cut.png" class="logoLogin">
    </a>
    <nav class="nav-links">
      <v-btn color="#002B5B" class="button-50" @click="$event => tagsDialog=true">
        <v-icon style="padding-right: 0.2em;">
          mdi-tag
        </v-icon>
        Tags
      </v-btn>
      <v-btn color="#002B5B" class="button-50" @click="$event => statesDialog=true">
        <v-icon style="padding-right: 0.2em;">
          mdi-atom-variant
        </v-icon>
        States
      </v-btn>
      <v-btn color="#002B5B" class="button-50" @click="logOut">
        <v-icon style="padding-right: 0.2em;">
          mdi-logout-variant
        </v-icon>
        Logout
      </v-btn>
    </nav>
    <v-dialog
      v-model="tagsDialog"
      max-width="500"
      persistent
    >
      <v-card>
        <v-card-title>Tags</v-card-title>
        <v-data-table
          :headers="HeadTags"
          :items="ItemTags"
          class="elevation-1"
        >
          <template #[`item.actions`]="{ item }">
            <v-btn @click="deleteTag(item)">
              <v-icon color="red">
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-btn color="warning" @click="$event => tagsDialog=false">
            Cerrar
          </v-btn>
          <v-btn style="margin-left: 0.5em;" @click=" Newtag ">
            Guardar
          </v-btn>
          <v-btn style="margin-left: 17em;" @click=" Addtag ">
            <v-icon>
              mdi-note-plus
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="statesDialog"
      max-width="500"
      persistent
    >
      <v-card>
        <v-card-title>States</v-card-title>
        <v-data-table
          :headers="HeadStates"
          :items="ItemStates"
          class="elevation-1"
        >
          <template #[`item.actions`]="{ item }">
            <v-btn @click="deleteState(item)">
              <v-icon color="red">
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-btn color="warning" @click="$event => statesDialog=false">
            Cerrar
          </v-btn>
          <v-btn style="margin-left: 0.5em;" @click="NewState ">
            Guardar
          </v-btn>
          <v-btn style="margin-left: 17em;" @click="AddState">
            <v-icon>
              mdi-note-plus
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<!-- eslint-disable no-console -->
<script>
export default {
  name: 'HeaderMainTable',
  data () {
    return {
      HeadTags: [
        { text: 'Tag', value: 'Tag' },
        { text: 'Delete', value: 'actions' }
      ],
      ItemTags: [],
      HeadStates: [
        { text: 'State', value: 'State' },
        { text: 'Delete', value: 'actions' }
      ],
      ItemStates: [],
      tagsDialog: false,
      statesDialog: false
    }
  },
  created () {
    this.BringAllsTags()
    this.BringAllsStates()
  },
  methods: {
    tagsMethod () {
      this.$router.push('/')
    },
    statesMethod () {
      this.$router.push('/auth/register')
    },
    logOut () {
      this.$router.push('/auth/signout')
    },
    async BringAllsStates () {
      const userid = this.$fire.auth.currentUser.uid
      try {
        await this.$axios.post('/AllStates', { userid }).then((res) => {
          this.ItemStates = res.data.States
        })
          .catch((err) => {
            console.log(err)
          })
      } catch (error) {
        console.error('Error al traer etiquetas', error)
      }
    },
    async BringAllsTags () {
      const userid = this.$fire.auth.currentUser.uid
      try {
        await this.$axios.post('/AllTags', { userid }).then((res) => {
          this.ItemTags = res.data.Tags
        })
          .catch((err) => {
            console.log(err)
          })
      } catch (error) {
        console.error('Error al traer etiquetas', error)
      }
    },
    async NewState () {
      const userid = this.$fire.auth.currentUser.uid
      const States = this.ItemStates
      await this.$axios.post('/NewState', { userid, States }).then((res) => {
      })
        .catch((err) => {
          console.log(err)
        })
      this.statesDialog = false
    },
    async Newtag () {
      const userid = this.$fire.auth.currentUser.uid
      const Tags = this.ItemTags
      await this.$axios.post('/NewTag', { userid, Tags }).then((res) => {
      })
        .catch((err) => {
          console.log(err)
        })
      this.tagsDialog = false
    },

    AddState () {
      const State = prompt('New State Name:')
      const data = { State }
      this.ItemStates.push(data)
    },
    Addtag () {
      const Tag = prompt('New Tag Name:')
      const data = { Tag }
      this.ItemTags.push(data)
    },
    deleteTag (item) {
      const index = this.ItemTags.indexOf(item)
      this.ItemTags.splice(index, 1)
    },
    deleteState (item) {
      const index = this.ItemStates.indexOf(item)
      this.ItemStates.splice(index, 1)
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oxanium:wght@200;300;400;500;600;700;800&display=swap");
html, body {
    font-family: "Oxanium"
}

#app {
    font-family: "Oxanium"
}

.logoLogin {
    max-width: 35%;
    align-content: center;
    display: flex;
    flex-direction: row;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0%;
}

.nav-links {
    display: flex;
    gap: 40px;
    padding-right: 2em;
}

.button-50 {
    appearance: button;
    background-color: #000 !important;
    background-image: none;
    border: 1px solid #000;
    border-radius: 4px;
    box-shadow: #fff 4px 4px 0 0, #000 4px 4px 0 1px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: "Oxanium";
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin: 0 5px 10px 0;
    overflow: visible;
    padding: 12px 40px;
    text-align: center;
    text-transform: none;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
    white-space: nowrap;
}

.button-50:focus {
    text-decoration: none;
}

.button-50:hover {
    text-decoration: none;
}

.button-50:active {
    box-shadow: rgba(0, 0, 0, .125) 0 3px 5px inset;
    outline: 0;
}

.button-50:not([disabled]):active {
    box-shadow: #fff 2px 2px 0 0, #000 2px 2px 0 1px;
    transform: translate(2px, 2px);
}

@media (min-width: 768px) {
    .button-50 {
        padding: 12px 50px;
    }
}
</style>
