// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import toast from 'react-hot-toast'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addUser } from 'src/store/apps/user'
import axios from 'axios'
import Global from 'src/pages/acl/Global'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  proveedorNombre: yup.string().required(),
  proveedorApellido: yup.string().required(),
  proveedorTelefono: yup.string().required(),
  proveedorServicio: yup.string().required()
})

const defaultValues = {
  proveedorNombre: '',
  proveedorApellido: '',
  proveedorTelefono: '',
  proveedorServicio: ''
}

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [precio, setPrecio] = useState(0)
  const [NuevoPrecio, setNuevoPrecio] = useState(0)
  const [validationErrors, setvalidationErrors] = useState({})
  const [showError, setshowError] = useState(false)

  const [nombre, setnombre] = useState('')
  const [Apellido, setApellido] = useState('')
  const [Telefono, setTelefono] = useState('')
  const [Servicio, setServicio] = useState('')

  // ** Hooks
  const dispatch = useDispatch()

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues
  })

  const onSubmit = data => {
    console.log(data)
    setnombre(data.proveedorNombre)
    setApellido(data.proveedorApellido)
    setTelefono(data.proveedorTelefono)
    setServicio(data.proveedorServicio)

    CreateAction(data)
  }

  const handleClose = () => {
    setPrecio(0)
    setNuevoPrecio(0)
    setshowError(false)
    toggle()
    reset()
  }

  const CreateAction = e => {
    if (!precio) {
      setvalidationErrors({ UserName: 'Debe ingresar una nombre de usuario' })
      setshowError(true)
    } else {
      let prov = {
        prov_Id: 0,
        prov_Nombre: nombre,
        prov_Apellido: Apellido,
        prov_Telefono: Telefono,
        prov_Servicio: Servicio,
        prov_Precio: precio,
        serv_Precio_Nuevo: NuevoPrecio.toString()
      }
      console.log(prov)
      axios
        .post(Global.url + '/api/Proveedores/InsertProveedores', prov)
        .then(r => {
          console.log(r.data)
          if (r.data.messageStatus === 'Este Proveedor ya existe') {
            toast.error(r.data.messageStatus, {
              duration: 4000
            })
          } else if (r.data.messageStatus === 'Registro Agregado Exitosamente') {
            handleClose()
            setPrecio(0)
            setNuevoPrecio(0)
          } else {
            console.log('Cago')

            toast.error(r.data.messageStatus, {
              duration: 4000,
              position: 'top-mid'
            })
          }
        })
        .catch(e => console.error(e))
    }
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Nuevo Servicio</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{ borderRadius: 1, color: 'text.primary', backgroundColor: 'action.selected' }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='proveedorNombre'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  autoFocus
                  fullWidth
                  type='text'
                  onChange={onChange}
                  error={Boolean(errors.proveedorNombre)}
                  label='Nombre del Proveedor'
                />
              )}
            />
            {errors.proveedorNombre && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='proveedorApellido'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  autoFocus
                  fullWidth
                  type='text'
                  onChange={onChange}
                  error={Boolean(errors.proveedorApellido)}
                  label='Apellido del proveedor'
                />
              )}
            />
            {errors.proveedorApellido && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='proveedorTelefono'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  autoFocus
                  fullWidth
                  type='text'
                  onChange={onChange}
                  error={Boolean(errors.proveedorTelefono)}
                  label='Telefono del Proveedor'
                />
              )}
            />
            {errors.proveedorTelefono && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='proveedorServicio'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  autoFocus
                  fullWidth
                  type='text'
                  onChange={onChange}
                  error={Boolean(errors.proveedorServicio)}
                  label='Servicio del Proveedor'
                />
              )}
            />
            {errors.proveedorServicio && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id='provPrecio'
                    name='provPrecio'
                    value={precio}
                    autoFocus
                    fullWidth
                    type='text'
                    onChange={e => {
                      setPrecio(e.target.value)
                      setNuevoPrecio(parseInt(e.target.value) * 0.1 + parseInt(e.target.value))
                      setshowError(false)
                    }}
                    error={showError}
                    helperText={showError && validationErrors.precio}
                    label='Precio del Servicio'
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id='provPrecio'
                    name='provPrecio'
                    value={NuevoPrecio}
                    autoFocus
                    fullWidth
                    type='text'
                    onChange={e => {
                      setNuevoPrecio(e.target.value)
                      setshowError(false)
                    }}
                    error={showError}
                    disabled
                    helperText={showError && validationErrors.precio}
                    label='Precio del Servicio'
                  />
                </Grid>
              </Grid>
            </Grid>
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
