<template>
  <div>
    <v-row class="justify-center">
      <v-col cols="8">
        <h1>Tabla de Productos</h1>
        <div>
          <v-text-field
            v-model="searchQuery"
            append-icon="mdi-magnify"
            label="Buscar"
            @keydown.enter="traerproductos"
          />
          <table>
            <thead style="background-color: white; color: #002B5B;">
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Precio de Compra</th>
                <th>Precio de Venta</th>
                <th>Existencias</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="producto in productos" :key="producto.idproducto" style="background-color: white; color: #002B5B;">
                <td>{{ producto.idproducto }}</td>
                <td>{{ producto.nombreproducto }}</td>
                <td>{{ producto.importeproducto }}</td>
                <td>{{ producto.precioproducto }}</td>
                <td>{{ producto.existenciasproducto }}</td>
                <td>{{ producto.unidadesproducto }}</td>
                <td>
                  <v-btn icon color="#002B5B" @click="abrirEditarProducto(producto)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon color="#002B5B" @click="eliminarProducto(producto.idproducto)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <p>Dinero en caja: ${{ dineroEnCaja }}</p>
          </div>
        </div>
      </v-col>
      <v-col cols="4">
        <v-row class="justify-center" style="padding:2%;">
          <div style="margin: auto;">
            <v-col cols="12" class="mb-2">
              <v-btn color="#57C5B6" block @click="abrirAgregarProducto">
                Agregar Producto
              </v-btn>
            </v-col>
            <v-col cols="12" class="mb-2">
              <v-btn color="#57C5B6" block @click="abrirAgregarInventario">
                Agregar Inventario
              </v-btn>
            </v-col>
            <v-col cols="12" class="mb-2">
              <v-btn color="#57C5B6" block @click="sacarDineroCaja">
                Sacar Dinero a Caja
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn color="#57C5B6" block @click="meterDineroCaja">
                Meter Dinero a Caja
              </v-btn>
            </v-col>
          </div>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="agregarProducto" max-width="400" persistent>
      <div>
        <h2>Producto Nuevo</h2>
        <v-form ref="frmCreate">
          <table class="popup-card no-border">
            <tbody style="background-color: #57C5B6; color: #002B5B;">
              <tr>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <label for="codigo">Código:</label>
                </td>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <v-text-field id="codigo" v-model="nuevoProducto.idproducto" class="letranice" placeholder="Código" :style="{ color:'#002B5B !important' }" />
                </td>
              </tr>
              <tr>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <label for="descripcion">Descripción:</label>
                </td>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <v-text-field id="descripcion" v-model="nuevoProducto.nombreproducto" class="letranice" placeholder="Descripción" :style="{ color:'#002B5B !important' }" />
                </td>
              </tr>
              <tr>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <label for="precioCosto">Precio de Costo:</label>
                </td>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <v-text-field id="precioCosto" v-model="nuevoProducto.importeproducto" class="letranice" placeholder="Precio de Costo" :style="{ color:'#002B5B !important' }" />
                </td>
              </tr>
              <tr>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <label for="precioVenta">Precio de Venta:</label>
                </td>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <v-text-field id="precioVenta" v-model="nuevoProducto.precioproducto" class="letranice" placeholder="Precio de Venta" :style="{ color:'#002B5B !important' }" />
                </td>
              </tr>
              <tr>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <label for="cantidad">Cantidad:</label>
                </td>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <v-text-field id="cantidad" v-model="nuevoProducto.existenciasproducto" class="letranice" placeholder="Cantidad" :style="{ color:'#002B5B !important' }" />
                </td>
              </tr>
              <tr>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <label for="cantidad">Tipo:</label>
                </td>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <v-text-field id="cantidad" v-model="nuevoProducto.unidadesproducto" class="letranice" placeholder="Cantidad" :style="{ color:'#002B5B !important' }" />
                </td>
              </tr>
            </tbody>
          </table>
        </v-form>
      </div>
      <div style="display: flex; justify-content: flex-end;">
        <v-btn color="warning" @click="cancelarAgregarProducto">
          Cancelar
        </v-btn>
        <v-btn color="primary" @click="guardarProducto">
          Guardar
        </v-btn>
      </div>
    </v-dialog>

    <v-dialog v-model="agregarInventario" max-width="400" persistent>
      <div>
        <h2>Agregar Inventario</h2>
        <v-form ref="frmAddInventory">
          <table class="popup-card no-border">
            <tbody style="background-color: #57C5B6; color: #002B5B;">
              <tr>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <label for="idProducto">ID Producto:</label>
                </td>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <v-text-field id="idProducto" v-model="nuevoInventario.idproducto" class="letranice" placeholder="ID Producto" :style="{ color:'#002B5B !important' }" />
                </td>
              </tr>
              <tr>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <label for="cantidad">Cantidad:</label>
                </td>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <v-text-field id="cantidad" v-model="nuevoInventario.cantidad" class="letranice" placeholder="Cantidad" :style="{ color:'#002B5B !important' }" />
                </td>
              </tr>
            </tbody>
          </table>
        </v-form>
      </div>
      <div style="display: flex; justify-content: flex-end;">
        <v-btn color="primary" @click="cancelarAgregarInventario">
          Cancelar
        </v-btn>
        <v-btn color="green" @click="agregaraInventario">
          Añadir
        </v-btn>
      </div>
    </v-dialog>

    <v-dialog v-model="editarProducto" max-width="400" persistent>
      <div>
        <h2>Modificar Nuevo</h2>
        <v-form ref="frmUpdate">
          <table class="popup-card no-border">
            <tbody>
              <tr>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <label for="codigo">Código:</label>
                </td>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <v-text-field id="codigo" v-model="editProducto.idproducto" class="letranice" placeholder="Código" />
                </td>
              </tr>
              <tr>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <label for="descripcion">Descripción:</label>
                </td>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <v-text-field id="descripcion" v-model="editProducto.nombreproducto" class="letranice" placeholder="Descripción" />
                </td>
              </tr>
              <tr>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <label for="precioCosto">Precio de Costo:</label>
                </td>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <v-text-field id="precioCosto" v-model="editProducto.importeproducto" class="letranice" placeholder="Precio de Costo" />
                </td>
              </tr>
              <tr>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <label for="precioVenta">Precio de Venta:</label>
                </td>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <v-text-field id="precioVenta" v-model="editProducto.precioproducto" class="letranice" placeholder="Precio de Venta" />
                </td>
              </tr>
              <tr>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <label for="cantidad">Cantidad:</label>
                </td>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <v-text-field id="cantidad" v-model="editProducto.existenciasproducto" class="letranice" placeholder="Cantidad" />
                </td>
              </tr>
              <tr>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <label for="tipo">Tipo:</label>
                </td>
                <td style="background-color: #57C5B6; color: #002B5B;">
                  <v-text-field id="tipo" v-model="editProducto.unidadesproducto" class="letranice" placeholder="Cantidad" />
                </td>
              </tr>
            </tbody>
          </table>
        </v-form>
        <div>
          <v-btn color="warning" @click="cancelareditarProducto">
            Cancelar
          </v-btn>
          <v-btn color="green" @click="guardarCambios">
            Guardar Cambios
          </v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<!-- eslint-disable no-console -->
<script>

export default {
  data () {
    return {
      searchQuery: '',
      productos: [],
      nuevoProducto: {
        idproducto: '',
        nombreproducto: '',
        importeproducto: '',
        precioproducto: '',
        existenciasproducto: '',
        unidadesproducto: ''
      },
      nuevoInventario: {
        idproducto: '',
        cantidad: ''
      },
      editProducto: {
        idproducto: '',
        nombreproducto: '',
        importeproducto: '',
        precioproducto: '',
        existenciasproducto: '',
        unidadesproducto: ''
      },
      agregarProducto: false,
      agregarInventario: false,
      editarProducto: false,
      dineroEnCaja: 0
    }
  },
  created () {
    this.traerTodosLosProductos()
    this.verDineroEnCaja()
  },
  methods: {

    async traerproductos () {
      const email = sessionStorage.getItem('email')
      const consulta = this.searchQuery
      try {
        const response = await this.$axios.post('/buscarproducto', { email, consulta })
        console.log(response.statusText)
        if (response.status === 200) {
          const data = response.data
          // Agregar el producto a la tabla con cantidad inicial 1
          this.productos = data
        } else {
          console.error('Error al obtener los productos')
        }
      } catch (error) {
        Error(error)
      }
    },

    async traerTodosLosProductos () {
      const email = sessionStorage.getItem('email')
      try {
        const response = await this.$axios.post('/todoslosproductos', { email })
        if (response.status === 200) {
          console.log(response.data)
          this.productos = response.data
        } else {
          console.error('Error al traer productos')
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error)
      }
    },

    async verDineroEnCaja () {
      const email = sessionStorage.getItem('email')
      try {
        const response = await this.$axios.post('/verdineroencaja', { email })
        if (response.status === 200) {
          this.dineroEnCaja = response.data.ensistema
        } else {
          console.error('Error al traer dinero en caja')
        }
      } catch (error) {
        console.error('Error al obtener el dinero en caja:', error)
      }
    },

    async guardarProducto () {
      const email = sessionStorage.getItem('email')
      const idproducto = this.nuevoProducto.idproducto
      const nombreproducto = this.nuevoProducto.nombreproducto
      const precioproducto = parseFloat(this.nuevoProducto.precioproducto)
      const unidadesproducto = this.nuevoProducto.unidadesproducto
      const importeproducto = parseFloat(this.nuevoProducto.importeproducto)
      const existenciasproducto = parseFloat(this.nuevoProducto.existenciasproducto)
      await this.$axios.post('/nuevoproducto', {
        email,
        idproducto,
        nombreproducto,
        precioproducto,
        unidadesproducto,
        importeproducto,
        existenciasproducto
      })
      this.agregarProducto = false
      this.resetNuevoProducto()
      this.traerproductos()
    },

    async agregaraInventario () {
      const email = sessionStorage.getItem('email')
      const idproducto = this.nuevoInventario.idproducto
      const cantidad = parseFloat(this.nuevoInventario.cantidad)
      await this.$axios.post('/anadirinv', {
        email,
        idproducto,
        cantidad
      })
      this.agregarInventario = false
      this.resetNuevoInventario()
      this.traerTodosLosProductos()
    },

    async sacarDineroCaja () {
      const email = sessionStorage.getItem('email')
      let cantidad = parseFloat(prompt('Ingrese la cantidad a sacar:'))
      if (cantidad >= 0) {
        let response = await this.$axios.post('/salidaefectivo', {
          email,
          cantidad
        })
        while (!(response.data.mensaje === 'Salida de efectivo exitosa')) {
          cantidad = parseFloat(prompt('intenta de nuevo'))
          if (cantidad >= 0) {
            response = await this.$axios.post('/salidaefectivo', {
              email,
              cantidad
            })
          }
        }
      }
      this.verDineroEnCaja()
    },

    async meterDineroCaja () {
      const email = sessionStorage.getItem('email')
      const cantidad = parseFloat(prompt('Ingrese la cantidad a ingresar:'))
      if (cantidad >= 0) {
        await this.$axios.post('/entradaefectivo', {
          email,
          cantidad
        })
      }
      this.verDineroEnCaja()
    },

    async guardarCambios () {
      const email = sessionStorage.getItem('email')
      const idproducto = this.editProducto.idproducto
      const nombreproducto = this.editProducto.nombreproducto
      const precioproducto = parseFloat(this.editProducto.precioproducto)
      const unidadesproducto = this.editProducto.unidadesproducto
      const importeproducto = parseFloat(this.editProducto.importeproducto)
      const existenciasproducto = parseFloat(this.editProducto.existenciasproducto)
      await this.$axios.post('/editarproducto', { email, idproducto, nombreproducto, precioproducto, unidadesproducto, importeproducto, existenciasproducto })
      this.traerTodosLosProductos()
      this.cancelareditarProducto()
    },

    async eliminarProducto (idproducto) {
      const email = sessionStorage.getItem('email')
      await this.$axios.post('/borrarproducto', { email, idproducto })
      this.traerTodosLosProductos()
    },

    resetNuevoProducto () {
      this.nuevoProducto = {
        idproducto: '',
        nombreproducto: '',
        importeproducto: '',
        precioproducto: '',
        existenciasproducto: '',
        unidadesproducto: ''
      }
    },

    resetNuevoInventario () {
      this.nuevoInventario = {
        idproducto: '',
        cantidad: ''
      }
    },

    abrirAgregarInventario () {
      this.agregarInventario = true
    },
    cancelarAgregarInventario () {
      this.agregarInventario = false
      this.resetNuevoInventario()
    },

    abrirAgregarProducto () {
      this.agregarProducto = true
    },
    cancelarAgregarProducto () {
      this.agregarProducto = false
      this.resetNuevoProducto()
    },

    abrirEditarProducto (producto) {
      this.editarProducto = true
      this.editProducto = {
        idproducto: producto.idproducto,
        nombreproducto: producto.nombreproducto,
        importeproducto: producto.importeproducto,
        precioproducto: producto.precioproducto,
        existenciasproducto: producto.existenciasproducto,
        unidadesproducto: producto.unidadesproducto
      }
    },
    cancelareditarProducto () {
      this.editarProducto = false
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tbody {
  background-color: #57C5B6;
}

tr {
  background-color: #57C5B6;
  color: #002B5B;
}

v-btn {
  margin-top: 10px;
}

input {
  color:white;
}

.addProduct {
  float: right;
  margin-bottom: 5%;
}

.text-box {
  margin-top: 1%;
  background-color: #57C5B6;
}

.popup-card {
  background-color: #57C5B6;
  margin: 0 auto;
}

.no-border td {
  border: none;
}

.tableHead {
  background-color:#57C5B6;
  color: white;
}

v-text-field input {
  color: black !important; /* Color de texto azul */
}

</style>
