import toast from 'react-hot-toast'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Radio from '@mui/material/Radio'
import { useRouter } from 'next/router'
import Global from 'src/pages/acl/Global'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import Table from '@mui/material/Table'
import MuiLink from '@mui/material/Link'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import CardHeader from '@mui/material/CardHeader'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import InputLabel from '@mui/material/InputLabel'
import axios from 'axios'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { parse } from 'date-fns'

const defaultAccountValues = {
  Sucursal: 0,
  Producto: 0,
  Cantidad: 0
}

const accountSchema = yup.object().shape({
  Sucursal: yup.number().required(),
  Producto: yup.number().required(),
  Cantidad: yup.number().required()
})

const Create = () => {
  const [sucursalddl, setSucursalddl] = useState([])
  const [productoddl, setProductoddl] = useState([])

  const showData = async () => {
    try {
      axios.get('https://localhost:7002/api/Sucursales/Listar').then(response => {
        setSucursalddl(response.data.data.map(c => ({ code: c.sucu_Id, name: c.sucu_Nombre })))
      })
      axios.get('https://localhost:7002/api/Productos/ListarDDL').then(response => {
        setProductoddl(response.data.data.map(c => ({ code: c.prod_Id, name: c.prod_Descripcion })))
        console.log(response.data.data)
      })
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    showData()
  }, [])

  const {
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors }
  } = useForm({
    defaultValues: defaultAccountValues,
    resolver: yupResolver(accountSchema)
  })

  const router = useRouter()

  const onSubmit = data => {
    console.log(data)
    CreateAction(data)
  }

  const [id, setId] = useState('')

  const CreateAction = e => {
    setCantidad(e.Cantidad)
    if (!id) {
      const UsuarioID = localStorage.getItem('IDUsuario')

      let payload = {
        sucu_Id: e.Sucursal,
        usua_UsuarioCreacion: parseInt(UsuarioID)
      }
      console.log(payload)

      axios
        .post('https://localhost:7002/api/Salidas/Insertar', payload)
        .then(r => {
          console.log(r.data)
          setId(r.data.data.messageStatus)
          localStorage.setItem('IDHeader', r.data.data.messageStatus)
          console.log(r.data.data.messageStatus)
          if (r.data.message === 'Operación completada exitosamente.') {
            console.log('hola')

            let payloadDetalle = {
              prod_Id: e.Producto,
              sade_Cantidad: e.Cantidad,
              sali_Id: r.data.data.messageStatus
            }
            axios.post('https://localhost:7002/api/Salidas/InsertarDetalle', payloadDetalle).then(t => {
              console.log(t.data.data.messageStatus)
              if (t.data.data.messageStatus == 1) {
                toast.success('Registro Agregado Exitosamente', {
                  duration: 4000
                })
                agregarProducto()
              }
              if (t.data.data.messageStatus == 'Esta sucursal no puede realizar mas salidas') {
                toast.error('Esta sucursal no puede realizar mas salidas', {
                  duration: 4000
                })
              }
              if (t.data.data.messageStatus == 'No hay stock Suficiente') {
                toast.error('No hay stock Suficiente', {
                  duration: 4000
                })
              }
            })
          } else {
            toast.error('Algo esta fallando', {
              duration: 4000
            })
          }
        })
        .catch(t => console.error(t))
    } else {
      let payloadDetalle = {
        prod_Id: e.Producto,
        sade_Cantidad: e.Cantidad,
        sali_Id: localStorage.getItem('IDHeader')
      }
      console.log(e)
      agregarProducto()
      axios.post('https://localhost:7002/api/Salidas/InsertarDetalle', payloadDetalle).then(t => {
        console.log(t.data.data.messageStatus)
        if (t.data.data.messageStatus == 1) {
          toast.success('Registro Agregado Exitosamente', {
            duration: 4000
          })
          agregarProducto()
        }
        if (t.data.data.messageStatus == 'Esta sucursal no puede realizar mas salidas') {
          toast.error('Esta sucursal no puede realizar mas salidas', {
            duration: 4000
          })
        }
        if (t.data.data.messageStatus == 'No hay stock Suficiente') {
          toast.error('No hay stock Suficiente', {
            duration: 4000
          })
        }
      })
    }
  }

  const [productos, setProductos] = useState([])
  const [nuevoProducto, setNuevoProducto] = useState('')
  const [cantidad, setCantidad] = useState('')

  const agregarProducto = () => {
    console.log(nuevoProducto)
    console.log(cantidad)
    if (nuevoProducto && cantidad) {
      // Busca si el producto ya está en la lista
      const productoExistente = productos.find(producto => producto.producto === nuevoProducto)

      if (productoExistente) {
        // Si el producto ya está en la lista, actualiza la cantidad
        const nuevosProductos = productos.map(producto =>
          producto.producto === nuevoProducto
            ? { ...producto, cantidad: parseInt(producto.cantidad) + parseInt(cantidad) }
            : producto
        )

        setProductos(nuevosProductos)
      } else {
        // Si el producto no está en la lista, agrégalo
        setProductos([...productos, { producto: nuevoProducto, cantidad }])
      }
    }
  }

  return (
    <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel
                  id='validation-basic-Sucursal'
                  error={Boolean(accountErrors.Sucursal)}
                  htmlFor='validation-basic-Sucursal'
                >
                  Sucursal
                </InputLabel>
                <Controller
                  name='Sucursal'
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Sucursal'
                      onChange={onChange}
                      error={Boolean(accountErrors.Sucursal)}
                      labelId='validation-basic-Sucursal'
                      aria-describedby='validation-basic-Sucursal'
                    >
                      {sucursalddl.map(dept => (
                        <MenuItem key={dept.code} value={dept.code}>
                          {dept.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {accountErrors.Sucursal && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-Sucursal'>
                    Seleccione una sucursal
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel
                  id='validation-basic-Producto'
                  error={Boolean(accountErrors.Producto)}
                  htmlFor='validation-basic-Producto'
                >
                  Producto
                </InputLabel>
                <Controller
                  name='Producto'
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Producto'
                      onClick={e => {
                        setNuevoProducto(e.target.outerText)
                      }}
                      onChange={onChange}
                      error={Boolean(accountErrors.Producto)}
                      labelId='validation-basic-Producto'
                      aria-describedby='validation-basic-Producto'
                    >
                      {productoddl.map(dept => (
                        <MenuItem key={dept.code} value={dept.code}>
                          {dept.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {accountErrors.Producto && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-Sucursal'>
                    Seleccione un producto
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='Cantidad'
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Cantidad'
                      onBlur={setCantidad(value)}
                      onChange={onChange}
                      placeholder='Ingrese la cantidad de los productos'
                      error={Boolean(accountErrors.Cantidad)}
                      aria-describedby='stepper-linear-account-username'
                    />
                  )}
                />
                {accountErrors.Cantidad && (
                  <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                    Ingrese la cantidad
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button size='large' type='submit' variant='contained'>
                Agregar Producto
              </Button>
              <Button size='large' type='button' variant='contained' href='/dashboards/Salidas/'>
                Terminas Salida
              </Button>
              <Button size='large' type='button' variant='contained' href='/dashboards/Salidas/'>
                Cancelar
              </Button>
            </Grid>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell>Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productos.map((producto, index) => (
                    <TableRow key={index}>
                      <TableCell>{producto.producto}</TableCell>
                      <TableCell>{producto.cantidad}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </CardContent>
      </Card>
    </form>
  )
}

export default Create
