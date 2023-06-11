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
        <v-card-text>
          Look at me, i'm the tags dialog :D
        </v-card-text>
        <v-card-actions>
          <v-btn color="warning" @click="$event => tagsDialog=false">
            Cerrar
          </v-btn>
          <v-btn>
            Guardar
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
        <v-card-text>
          Look at me, i'm the states dialog :D
        </v-card-text>
        <v-card-actions>
          <v-btn color="warning" @click="$event => statesDialog=false">
            Cerrar
          </v-btn>
          <v-btn>
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'HeaderMainTable',
  data () {
    return {
      tagsDialog: false,
      statesDialog: false
    }
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
