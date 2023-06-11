<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4" align="center">
      <v-card shaped elevation="5" width="500" color="#112031">
        <v-card-title class="text-center">
          Login to CLIP-DECASHI
        </v-card-title>
        <v-card-text>
          <v-form ref="frmLogin">
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
          <v-btn block class="colorBtn" @click="ingresarSistema">
            <v-icon dense style="padding-right: 2%;">
              mdi-account-key
            </v-icon>
            Ingresar
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
    ingresarSistema () {
      const that = this
      this.$fire.auth.signInWithEmailAndPassword(this.auth.email, this.auth.password)
        .catch(function (error) {
          that.snackbarText = error.message
          that.snackbar = true
        }).then((user) => {
          // hope this works as a sign in
          this.$router.push('/dashboard/myboards')
        })
    }
  }
}
</script>
