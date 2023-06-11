<template>
  <div class="header" style="background-color: #002B5B;">
    <a href="/">
      <img id="logo" src="../Images/CDB.png" class="logoLogin">
    </a>
    <nav class="nav-links">
      <v-btn color="#002B5B" class="h4log" @click="abrirAboutUs">
        About-Us
      </v-btn>
      <v-btn color="#002B5B" class="h4log" @click="abrirRegistro">
        Register
      </v-btn>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HeaderLogin',
  methods: {
    abrirAboutUs () {
      this.$router.push('/about-us')
    },
    abrirRegistro () {
      this.$router.push('/registro')
    }
  }
}
</script>

<style>

.logoLogin {
  height: 35%;
  width: 35%;
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
}

.h4log {
  color: #57C5B6;
  text-decoration: none;
  font-size: 30px;
  font-weight: bold;
}

.h4log:hover {
  background-color: #FFFFFF !important;
  color: #002B5B !important;
  border-radius: 15%;
}
</style>
