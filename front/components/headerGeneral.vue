<template>
  <div class="headerGen" style="background-color: #57C5B6;">
    <a href="/home">
      <img id="logoGen" src="../Images/CDB.png" class="logoGen">
    </a>
    <nav class="nav-linksGen">
      <v-btn class="buttonGen ventas" elevation="0" @click="abrirVentas">
        Ventas
      </v-btn>
      <v-btn class="buttonGen productos" elevation="0" @click="abrirProductos">
        Productos
      </v-btn>
      <v-btn class="buttonGen reportes" elevation="0" @click="abrirReportes">
        Reportes
      </v-btn>
      <v-btn class="buttonGen cerrar-sesion" elevation="0" @click="abrirPopupRectificarEfectivo">
        Cerrar Turno
      </v-btn>
    </nav>

    <v-dialog v-model="popupRectificarEfectivo" max-width="500px" persistent>
      <table class="popup-card no-border">
        <thead>
          <tr>
            <th colspan="2" class="text-h5 text-center tableHead">
              Rectificar Efectivo
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Efectivo esperado en caja:</td>
            <td><strong>{{ efectivoEsperado }}</strong></td>
          </tr>
          <tr>
            <td>Efectivo en caja:</td>
            <td>
              <v-text-field
                v-model="efectivoEnCaja"
                label="Efectivo en caja"
                :style="{ color: '#002B5B' }"
                @keydown.enter="rectificarEfectivo"
              />
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">
              <p :style="{'color': diferenciaColor}">
                Diferencia: <strong>{{ diferencia }}</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="text-center">
              <v-btn color="Danger" @click="cerrarPopupRectificarEfectivo">
                Cerrar turno
              </v-btn>
              <v-btn class="cancelar" @click="cancelarLogout">
                Cancelar
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </v-dialog>
  </div>
</template>

<!-- eslint-disable no-console -->
<script>
export default {
  name: 'HeaderGeneral',
  data () {
    return {
      popupRectificarEfectivo: false,
      efectivoEsperado: '???',
      efectivoEnCaja: '',
      diferencia: 0
    }
  },
  computed: {
    diferenciaColor () {
      if (this.diferencia < 0) {
        return 'red'
      } else if (this.diferencia === 0) {
        return 'blue'
      } else {
        return 'green'
      }
    }
  },
  methods: {
    abrirPopupRectificarEfectivo () {
      this.popupRectificarEfectivo = true
      console.log(this.$auth.loggedIn)
    },
    cerrarPopupRectificarEfectivo () {
      this.popupRectificarEfectivo = false
      this.efectivoEsperado = '???'
      this.efectivoEnCaja = ''
      this.diferencia = 0
      sessionStorage.removeItem('email')
      setTimeout(() => {
        this.$router.push('/')
      }, 1000)
    },
    async rectificarEfectivo () {
      const email = sessionStorage.getItem('email')
      const cantidad = parseFloat(this.efectivoEnCaja)
      try {
        const response = await this.$axios.post('/verdineroefectivo', { email, cantidad })
        if (response.status === 200) {
          this.efectivoEsperado = response.data.ensistema.toFixed(2)
          this.diferencia = response.data.dif.toFixed(2)
        } else {
          console.error('Error al rectificar el efectivo')
        }
      } catch (error) {
        console.error('Error de red:', error)
      }
    },
    abrirVentas () {
      this.$router.push('/home')
    },
    abrirReportes () {
      this.$router.push('/reportes')
    },
    abrirProductos () {
      this.$router.push('/productos')
    },
    cancelarLogout () {
      this.popupRectificarEfectivo = false
      this.efectivoEsperado = '???'
      this.efectivoEnCaja = ''
      this.diferencia = 0
    }
  }
}
</script>

<style>
.logoGen {
  height: 35%;
  width: 35%;
}

.headerGen {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.nav-linksGen {
  display: flex;
  gap: 15px;
}

.buttonGen.ventas,
.buttonGen.reportes,
.buttonGen.productos,
.buttonGen.cerrar-sesion {
  background-color: #002B5B !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: 50px;
  color: #57C5B6 !important;
  font-size: 25px;
  text-transform:capitalize;
}

.buttonGen:hover.ventas,
.buttonGen:hover.reportes,
.buttonGen:hover.productos,
.buttonGen:hover.cerrar-sesion {
  background-color: #FFFFFF !important;
  color: #002B5B !important;
}

.text-box {
  margin-top: 1%;
  background-color: #57C5B6;
}

.popup-card {
  background-color: #57C5B6;
  color: #002B5B;
  margin: 0 auto;
}

.no-border td {
  border: none;
}

.tableHead {
  background-color:#57C5B6;
  color: #002B5B;
}

</style>
