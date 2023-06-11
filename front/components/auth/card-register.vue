<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4" align="center">
      <v-card width="500" color="#112031" class="registerCard">
        <v-card-title class="justify-center">
          Register to CLIP-DECASHI
        </v-card-title>
        <v-card-text>
          <v-form ref="frmRegister">
            <v-text-field
              v-model="auth.email"
              label="Email"
              placeholder="Escribe tu correo"
              :rules="ValidateEmail"
            />
            <v-text-field
              v-model="auth.password"
              label="Password"
              placeholder="Escribe tu contraseña"
              type="password"
              :rules="validatePassword"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn block class="colorBtn" @click="registrarSistema">
            <v-icon dense style="padding-right: 2%;">
              mdi-account-key
            </v-icon>
            Register
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar
        v-model="snackbar"
        absolute
        bottom
        center
        :timeout="4000"
      >
        {{ snackbarText }}
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<!-- eslint-disable no-console -->
<script>
export default {
  data () {
    return {
      snackbar: false,
      snackbarText: 'No error message',
      auth: {
        email: '',
        password: ''
      },
      ValidateEmail: [
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      validatePassword: [
        v => !v || v.length >= 6 || 'Password must have min 6 chars'
      ]
    }
  },
  methods: {
    async registrarSistema () {
      const that = this
      const userAdd = {
        email: this.auth.email,
        password: this.auth.password
      }
      await this.$axios.post('/SignUp', userAdd)
        .then((res) => {
          console.log(res)
          that.snackbarText = 'Ahora puede iniciar sesión :D'
          that.snackbar = true
          setTimeout(() => {
            that.snackbar = false
            this.$router.push('/')
          }, 4000)
        }).catch((err) => {
          console.log(err)
          that.snackbarText = err.message
          that.snackbar = true
        })
    }
  }
}
</script>

<style>
.registerCard {
  background-color: #000 !important;
}
.colorBtn {
  background-color: #fff !important;
  color: #000 !important;
}
</style>
