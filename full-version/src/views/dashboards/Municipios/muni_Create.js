// ** React Imports
import { Fragment, useState, useEffect } from 'react'

import Global from 'src/pages/acl/Global'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import toast from 'react-hot-toast'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import axios from 'axios'
import { object } from 'yup'

const DialogForm = () => {
  // ** State
  const [Municipio, setMunicipio] = useState('')
  const [Departamento, setDepartamento] = useState('')
  const [open, setOpen] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [showError, setShowError] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    setMunicipio('')
    setDepartamento('')
    setShowError(false)
  }
  const handleClose = () => setOpen(false)

  const URL = 'http://eventcompany.somee.com/api/Departamentos/ListarDepartamentos'
  const [depto, usedepto] = useState([])

  const DDLDepto = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    console.log(data)
    usedepto(data)
  }

  useEffect(() => {
    DDLDepto()
  }, [])

  const listadepartamento = depto.map(opcion => (
    <MenuItem key={opcion.dept_Id} value={opcion.dept_Id}>
      {opcion.dept_Descripcion}
    </MenuItem>
  ))

  const CreateAction = e => {
    setValidationErrors({})
    e.preventDefault()
    setShowError(false)
    if (!Departamento) {
      setValidationErrors({ Departamento: 'Debe ingresar un valor' })
      setShowError(true)

      return
    }

    let payload = {
      muni_Descripcion: Municipio,
      dept_Id: Departamento
    }

    console.log(payload)

    axios
      .post(Global.url + '/api/Municipios/InsertarMunicipios', payload)
      .then(r => {
        console.log('Entro then')

        if (r.data.messageStatus === 'Este Municipio ya existe') {
          console.log(r.data)
          toast.error(r.data.messageStatus, {
            duration: 4000
          })
        } else if (r.data.messageStatus === 'Registro Agregado Exitosamente') {
          console.log(r.data)
          toast.success(r.data.messageStatus, {
            duration: 4000
          })
          handleClose()
          setDepartamento('')
        } else {
          toast.error(r.data.messageStatus, {
            duration: 4000
          })
        }
      })
      .catch(e => console.error(e))
  }

  return (
    <Fragment>
      <Button variant='outlined' onClick={handleClickOpen}>
        Nuevo Municipio
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Insert Municipio
          </Typography>
        </DialogTitle>
        <form
          onSubmit={e => {
            CreateAction(e)
          }}
        >
          <DialogContent>
            <DialogContentText>Ingrese el nuevo Departamento</DialogContentText>
            <br></br>
            <Grid container spacing={12}>
              <Grid item sm={6} xs={12}>
                <TextField
                  id='Departamento'
                  name='Departamento'
                  value={Municipio}
                  autoFocus
                  fullWidth
                  type='email'
                  onChange={e => {
                    setMunicipio(e.target.value)
                    setShowError(false)
                  }}
                  error={showError}
                  helperText={showError && validationErrors.Departamento}
                  label='Nombre del Municipio'
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl sx={{ mr: 4 }}>
                  <InputLabel id='demo-dialog-select-label'>Departamento</InputLabel>
                  <Select
                    value={Departamento}
                    onChange={e => {
                      setDepartamento(e.target.value)
                      setShowError(false)
                    }}
                    error={showError}
                    helperText={showError && validationErrors.Municipio}
                    label='Departamento'
                  >
                    {listadepartamento}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button onClick={handleClose}>Cerrar</Button>
            <Button onClick={CreateAction}>Agregar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default DialogForm
