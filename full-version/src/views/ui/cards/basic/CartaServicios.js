import axios from 'axios'
import toast from 'react-hot-toast'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import DialogTitle from '@mui/material/DialogTitle'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Icon from 'src/@core/components/icon'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Fragment, useState, forwardRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'

import * as yup from 'yup'

const CartaServicios = ({ data }) => {
  const router = useRouter()

  const [Uopen, toggle] = useState(false)

  const [prov_Id, setprovId] = useState('')
  const [open, setOpen] = useState(false)

  const EliminarAction = name => {
    setprovId(name)
    setOpen(true)
  }

  const deleteData = async () => {
    let payload = {
      prov_Id: prov_Id
    }
    console.log(prov_Id)

    axios.post('http://eventcompany.somee.com/api/Proveedores/EliminarProveedores', payload).then(r => {
      if (r.data.messageStatus === 'Registro eliminado exitosamente') {
        toast.success(r.data.messageStatus, {
          duration: 4000
        })
        setOpen(false)
      } else {
        toast.success(r.data.messageStatus, {
          duration: 4000
        })
      }
    })
  }

  //-------------------------------UPDATE-------------------------------//

  const [nombre, setnombre] = useState('')
  const [apellido, setapellido] = useState('')
  const [telefono, settelefono] = useState('')
  const [servicio, setservicio] = useState('')
  const [precio, setPrecio] = useState(0)
  const [NuevoPrecio, setNuevoPrecio] = useState(0)
  const [idProv, setidProv] = useState('')
  const [showErrornombre, setshowErrornombre] = useState(false)
  const [showErrorapellido, setshowErrorapellido] = useState(false)
  const [showErrortelefono, setshowErrortelefono] = useState(false)
  const [showErrorservicio, setshowErrorservicio] = useState(false)
  const [showErrorprecio, setshowErrorprecio] = useState(false)

  const [validationErrors, setValidationErrors] = useState({})

  const EditarAction = IDdata => {
    setidProv(IDdata)

    let payload = {
      prov_Id: idProv
    }
    axios.put('http://eventcompany.somee.com/api/Proveedores/FindProveedores', payload).then(r => {
      console.log(r.data[0])
      setnombre(r.data[0].prov_Nombre)
      setapellido(r.data[0].prov_Apellido)
      settelefono(r.data[0].prov_Telefono)
      setservicio(r.data[0].prov_Servicio)
      setPrecio(r.data[0].prov_Precio)
      setNuevoPrecio(r.data[0].serv_Precio_Nuevo)
      console.log(setnombre)

      toggle(true)
    })
  }

  const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(6),
    justifyContent: 'space-between'
  }))

  const handleClose = () => {
    setnombre('')
    setapellido('')
    settelefono('')
    setservicio('')
    setPrecio('')
    setNuevoPrecio('')

    setshowErrornombre(false)
    setshowErrorapellido(false)
    setshowErrortelefono(false)
    setshowErrorservicio(false)
    setshowErrorprecio(false)

    toggle(false)
  }

  const updateAction = () => {
    if (!nombre) {
      setValidationErrors({ nombre: 'Debe ingresar un valor' })
      setshowErrornombre(true)
    }
    if (!apellido) {
      setValidationErrors({ apellido: 'Debe ingresar un valor' })
      setshowErrorapellido(true)
    }
    if (!telefono) {
      setValidationErrors({ telefono: 'Debe ingresar un valor' })
      setshowErrortelefono(true)
    }
    if (!servicio) {
      setValidationErrors({ servicio: 'Debe ingresar un valor' })
      setshowErrorservicio(true)
    }
    if (!precio) {
      setValidationErrors({ precio: 'Debe ingresar un valor' })
      setshowErrorprecio(true)
    }

    if (!nombre || !apellido || !telefono || !servicio || !precio) {
      console.log('algo salio mal xd')

      return
    }

    let payload = {
      prov_Id: idProv,
      prov_Nombre: nombre,
      prov_Apellido: apellido,
      prov_Telefono: telefono,
      prov_Servicio: servicio,
      prov_Precio: precio,
      serv_Precio_Nuevo: NuevoPrecio
    }

    axios.put('http://eventcompany.somee.com/api/Proveedores/UpdateProveedores', payload).then(r => {
      if (r.data.messageStatus === 'Registro editado exitosamente') {
        toast.success(r.data.messageStatus, {
          duration: 4000
        })
        handleClose()
      } else {
        toast.success(r.data.messageStatus, {
          duration: 4000
        })
      }
    })
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      {data.map(user => (
        <Card key={user.serv_Id} sx={{ width: '100%', maxWidth: 600, my: 3 }}>
          <Box sx={{ borderTop: '1px solid #E0E0E0', borderBottom: '1px solid #E0E0E0', px: 2, pt: 1, pb: 2 }}>
            <Typography variant='h5' sx={{ mb: 1, textAlign: 'center' }}>
              {user.prov_Servicio}
            </Typography>
          </Box>

          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='body1' sx={{ mr: 1 }}>
                  Proveedor:
                </Typography>
                <Typography variant='h6'>{user.proveedor}</Typography>
              </Box>
            }
          />

          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='body2' sx={{ mb: 1 }}>
              Servicio: {user.serv_Id}
            </Typography>
            <Typography variant='body2' sx={{ mb: 1 }}>
              Precio: {user.serv_Precio_Nuevo}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => EditarAction(user.serv_Id)} variant='contained' size='small'>
              Editar
            </Button>

            <Button
              onClick={() => EliminarAction(user.serv_Id)}
              variant='contained'
              color='error'
              sx={{ ml: 1 }}
              size='small'
            >
              Eliminar
            </Button>
          </CardActions>
        </Card>
      ))}
      <form
        onSubmit={e => {
          deleteData(e)
        }}
      >
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby='form-dialog-title' fullWidth maxWidth='sm'>
          <DialogTitle>Eliminar registro</DialogTitle>
          <DialogContent>
            <DialogContentText>¿Está seguro de que desea eliminar este registro?</DialogContentText>
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={deleteData}>Eliminar</Button>
          </DialogActions>
        </Dialog>
      </form>
      <Dialog
        open={Uopen}
        anchor='right'
        variant='temporary'
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      >
        <Header>
          <Typography variant='h6'>Actualizar</Typography>
          <IconButton
            size='small'
            onClick={handleClose}
            sx={{ borderRadius: 1, color: 'text.primary', backgroundColor: 'action.selected' }}
          >
            <Icon icon='tabler:x' fontSize='1.125rem' />
          </IconButton>
        </Header>
        <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
          <form onSubmit={() => updateAction}>
            <Grid container spacing={6}>
              <Grid item sm={6} xs={6}>
                <TextField
                  value={nombre}
                  autoFocus
                  fullWidth
                  type='text'
                  onChange={e => {
                    setnombre(e.target.value)
                    setshowErrornombre(false)
                  }}
                  error={showErrornombre}
                  helperText={showErrornombre && validationErrors.nombre}
                  label='Nombre del Proveedor'
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <TextField
                  value={apellido}
                  autoFocus
                  fullWidth
                  type='text'
                  onChange={e => {
                    setapellido(e.target.value)
                    setshowErrorapellido(false)
                  }}
                  error={showErrorapellido}
                  helperText={showErrorapellido && validationErrors.apellido}
                  label='Apellido del Proveedor'
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <TextField
                  value={telefono}
                  autoFocus
                  fullWidth
                  type='text'
                  onChange={e => {
                    settelefono(e.target.value)
                    setshowErrortelefono(false)
                  }}
                  error={showErrortelefono}
                  helperText={showErrortelefono && validationErrors.telefono}
                  label='Telefono del Proveedor'
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <TextField
                  value={servicio}
                  autoFocus
                  fullWidth
                  type='text'
                  onChange={e => {
                    setservicio(e.target.value)
                    setshowErrorservicio(false)
                  }}
                  error={showErrorservicio}
                  helperText={showErrorservicio && validationErrors.servicio}
                  label='Servicio del proveedor'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Grid item xs={12}>
                    <Grid container spacing={6}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id='provPrecio'
                          name='provPrecio'
                          value={precio}
                          autoFocus
                          fullWidth
                          type='number'
                          onChange={e => {
                            setPrecio(e.target.value)
                            setNuevoPrecio(parseInt(e.target.value) * 0.1 + parseInt(e.target.value))
                            setshowErrorprecio(false)
                          }}
                          error={showErrorprecio}
                          helperText={showErrorprecio && validationErrors.precio}
                          label='Precio del Servicio'
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id='provPrecio'
                          name='provPrecio'
                          value={NuevoPrecio}
                          autoFocus
                          fullWidth
                          type='text'
                          onChange={e => {
                            setNuevoPrecio(e.target.value)
                            setshowErrorprecio(false)
                          }}
                          error={showErrorprecio}
                          disabled
                          helperText={showErrorprecio && validationErrors.precio}
                          label='Precio del Servicio'
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button onClick={updateAction} variant='contained' sx={{ mr: 3 }}>
                    Submit
                  </Button>
                  <Button variant='outlined' color='secondary' onClick={handleClose}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog>
    </Box>
  )
}

export default CartaServicios
