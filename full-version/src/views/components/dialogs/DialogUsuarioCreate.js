// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box'

// ** MUI Imports
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { Input } from '@mui/material'
import toast from 'react-hot-toast'
import { Grid } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { FormHelperText } from '@mui/material'

const DialogForm = ({ updateData }) => {
  // ** State
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    axios
      .get('http://eventcompany.somee.com/api/Usuarios/ListarEmpleadoNoTieneUser')
      .then(response => response.data)
      .then(data => setEmmpleadoDDL(data.map(c => ({ code: c.empl_Id, name: c.empleados }))))
      .catch(error => console.error(error))
  }

  const [UserName, setUserName] = useState('')
  const [Password, setPassword] = useState('')
  const [validationErrors, setvalidationErrors] = useState({})
  const [showError, setshowError] = useState(false)

  const [RoleDDL, setRoleDDL] = useState([]) //ddl Departemento
  const [Role, setRole] = useState('') //almacena el valor seleccionado del ddl

  const [EmmpleadoDDL, setEmmpleadoDDL] = useState([]) // alamcena el valor del ddl
  const [Empleado, setEmpleado] = useState('') // almacena si el ddl esta activado

  const handleClose = () => {
    setOpen(false)
    clearDialog()
    setshowError(false)
  }

  useEffect(() => {
    axios
      .get('http://eventcompany.somee.com/api/Roles/ListarRoles')
      .then(response => response.data)
      .then(data => setRoleDDL(data.map(c => ({ code: c.role_Id, name: c.role_Descripcion }))))
      .catch(error => console.error(error))
  }, [])

  const clearDialog = () => {
    setEmpleado('')
    setPassword('')
    setUserName('')
    setRole('')
    setvalidationErrors({})
  }

  const handleCancel = () => {
    setOpen(false)
    clearDialog()
    setshowError(false)
  }

  const UsuariosInsertAction = e => {
    setvalidationErrors({})
    e.preventDefault()
    setshowError(false)

    if (!UserName) {
      setvalidationErrors({ UserName: 'Debe ingresar una nombre de usuario' })
      setshowError(true)

      return
    }

    if (!Password) {
      setvalidationErrors({ Password: 'Debe ingresar una contraseña' })
      setshowError(true)

      return
    }

    if (!Role) {
      setvalidationErrors({ Role: 'Debe escoger un rol' })
      setshowError(true)

      return
    }

    if (!Empleado) {
      setvalidationErrors({ Empleado: 'Debe escoger un empleado' })
      setshowError(true)

      return
    }

    let payload2 = {
      usua_Usuario: UserName,
      usua_Clave: Password,
      empl_Id: Empleado,
      role_Id: Role,
      usua_UsuarioCreador: localStorage.getItem('IDUsuario')
    }

    axios.post('http://eventcompany.somee.com/api/Usuarios/InsertarUsuario', payload2).then(r => {
      if (r.data.data.codeStatus == 1) {
        toast.error('El nombre de usuario ya existe', {
          duration: 4000
        })
      } else {
        if (r.data.data.codeStatus == 3) {
          toast.error('Error con el servidor', {
            duration: 4000
          })
        } else {
          if (r.data.data.codeStatus == 2) {
            toast.success('Usuario ingresado con exito!', {
              duration: 4000
            })
            updateData()
            handleClose()
            handleCancel()
          } else {
            toast.error('A saber usted JAJA XD', {
              duration: 4000
            })
          }
        }
      }
    })
  }

  return (
    <Fragment>
      <form
        onSubmit={e => {
          UsuariosInsertAction(e)
        }}
      >
        {Object.keys(validationErrors).length !== 0}
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='sm'>
          <DialogTitle id='form-dialog-title'>Nuevo registro</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>Digite los siguientes datos</DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id='Username'
                  fullWidth
                  type='text'
                  label='Nombre de usuario'
                  value={UserName}
                  onChange={e => {
                    setUserName(e.target.value)
                    setshowError(false)
                  }}
                  error={showError}
                  helperText={showError && validationErrors.UserName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='password'
                  fullWidth
                  type='password'
                  label='Contraseña'
                  value={Password}
                  onChange={e => {
                    setPassword(e.target.value)
                    setshowError(false)
                  }}
                  error={showError}
                  helperText={showError && validationErrors.Password}
                />
              </Grid>
            </Grid>
            <br></br>
            <br></br>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id='Role-label'>Rol</InputLabel>
                  <Select
                    labelId='Role-label'
                    id='role_Descripcion'
                    value={Role}
                    onChange={e => {
                      setRole(e.target.value)
                      setshowError(false)
                    }}
                    label='Rol'
                    error={showError}
                  >
                    {RoleDDL.map(rol => (
                      <MenuItem key={rol.code} value={rol.code}>
                        {rol.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{showError && validationErrors.Role}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id='Empleados-label'>Empleados</InputLabel>
                  <Select
                    labelId='Empleados-label'
                    id='Empleados'
                    value={Empleado}
                    onChange={e => {
                      setEmpleado(e.target.value)
                      setshowError(false)
                    }}
                    label='Empleados'
                    error={showError}
                  >
                    {EmmpleadoDDL.map(empl => (
                      <MenuItem key={empl.code} value={empl.code}>
                        {empl.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{showError && validationErrors.Empleado}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button onClick={handleCancel}>Cancelar</Button>
            <Button onClick={e => UsuariosInsertAction(e)}>Agregar</Button>
          </DialogActions>
        </Dialog>
      </form>
    </Fragment>
  )
}

export default DialogForm
