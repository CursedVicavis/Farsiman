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

const DialogForm = ({ updateData, id }) => {
  // ** State
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const [Direccion, setDireccion] = useState('')
  const [validationErrors, setvalidationErrors] = useState({})
  const [showError, setshowError] = useState(false)
  const [municipioEnabled, setMunicipioEnabled] = useState(false)
  const [DepartaemntoDDL, setDepartamentoDDL] = useState([]) //ddl Departemento
  const [Deparatemento, setDepartamento] = useState('') //almacena el valor seleccionado del ddl

  const [MunicipioDDL, setMunicipioDDL] = useState([]) //ddl Municipios
  const [Municipio, setMunicipio] = useState('') // alamcena el valor del ddl
  const [MunicipioActivated, setMunicipioActivated] = useState(true) // almacena si el ddl esta activado

  const handleClose = () => {
    setOpen(false)
    clearDialog()
    setshowError(false)
  }

  useEffect(() => {
    axios
      .get('http://eventcompany.somee.com/api/Departamentos/ListarDepartamentos')
      .then(response => response.data)
      .then(data => setDepartamentoDDL(data.map(c => ({ code: c.dept_Id, name: c.dept_Descripcion }))))
      .catch(error => console.error(error))
  }, [])

  //cargar
  const AsiganrlevalorMunicipioDDL = (dept_Id, datos) => {
    let payload2 = {
      dept_Id: dept_Id,
      dept_Descripcion: ''
    }
    setMunicipioActivated(false)
    axios
      .post('http://eventcompany.somee.com/api/Direcciones/ListarMunicipiosPorDepto', payload2)
      .then(response => response.data)
      .then(data => setMunicipioDDL(data.map(c => ({ code: c.muni_Id, name: c.muni_Descripcion }))))
      .catch(error => console.error(error))
  }

  //onchange
  const ActivarMunicipioDDl = dept_Id => {
    let payload2 = {
      dept_Id: dept_Id,
      dept_Descripcion: ''
    }
    setMunicipioActivated(true)
    axios
      .post('http://eventcompany.somee.com/api/Direcciones/ListarMunicipiosPorDepto', payload2)
      .then(response => response.data)
      .then(data => setMunicipioDDL(data.map(c => ({ code: c.muni_Id, name: c.muni_Descripcion }))))
      .then(() => setMunicipioEnabled(true)) // habilita el campo de selección de municipios después de cargar los datos
      .catch(error => console.error(error))
  }

  const clearDialog = () => {
    setDireccion('')
    setvalidationErrors({})
  }

  const handleCancel = () => {
    setDepartamento(null)
    setMunicipio(null)
    setMunicipioEnabled(false)
    setOpen(false)
    clearDialog()
  }

  const DireccionesAction = e => {
    setvalidationErrors({})
    e.preventDefault()
    setshowError(false)

    if (!Direccion) {
      setvalidationErrors({ Direccion: 'Debe ingresar una direccion' })
      setshowError(true)
      console.log('1')

      return
    }

    if (!Municipio) {
      setvalidationErrors({ Municipio: 'Debe escoger un municipio' })
      setshowError(true)
      console.log('1')

      return
    }

    if (!Deparatemento) {
      setvalidationErrors({ Deparatemento: 'Debe escoger un departamento' })
      setshowError(true)
      console.log('1')

      return
    }

    let payload2 = {
      muni_Id: Municipio,
      dire_Descripcion: Direccion,
      dire_UsuarioCreador: id
    }

    axios.post('http://eventcompany.somee.com/api/Direcciones/InsertarDirecciones', payload2).then(r => {
      if (r.data.data.codeStatus == 2) {
        toast.error('El registro ya existe', {
          duration: 4000
        })
      } else {
        if (r.data.data.codeStatus == 3) {
          toast.error('Error con el servidor', {
            duration: 4000
          })
        } else {
          if (r.data.data.codeStatus == 1) {
            toast.success('Dirección agregado con exito!', {
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
      <Button variant='contained' onClick={handleClickOpen} endIcon={<Icon icon='tabler:plus' />}>
        Agregar dirección evento
      </Button>
      <form
        onSubmit={e => {
          DireccionesAction(e)
        }}
      >
        {Object.keys(validationErrors).length !== 0}
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='sm'>
          <DialogTitle id='form-dialog-title'>Agrega la dirección exacta del evento</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>Proveenos los siguientes datos</DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id='departamento-label'>Departamento</InputLabel>
                  <Select
                    labelId='departamento-label'
                    id='departamento'
                    value={Deparatemento}
                    onChange={e => {
                      setDepartamento(e.target.value)
                      setMunicipio(null) // resetea el valor del campo de selección de municipios
                      ActivarMunicipioDDl(e.target.value)
                      setMunicipioEnabled(false)
                      setshowError(false)
                    }}
                    label='Departamento'
                    error={showError}
                  >
                    {DepartaemntoDDL.map(dept => (
                      <MenuItem key={dept.code} value={dept.code}>
                        {dept.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{showError && validationErrors.Deparatemento}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                {MunicipioActivated && (
                  <FormControl fullWidth>
                    <InputLabel id='municipio-label'>Municipio</InputLabel>
                    <Select
                      labelId='municipio-label'
                      id='municipio-select'
                      value={Municipio}
                      onChange={e => {
                        setMunicipio(e.target.value)
                        setshowError(false)
                      }}
                      disabled={!municipioEnabled}
                      label='Municipio'
                      error={showError}
                    >
                      {MunicipioDDL.map((option, index) => (
                        <MenuItem key={index} value={option.code}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{showError && validationErrors.Municipio}</FormHelperText>
                  </FormControl>
                )}
              </Grid>
            </Grid>
            <br></br>
            <br></br>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id='id'
                  fullWidth
                  type='text'
                  label='Direccion'
                  value={Direccion}
                  onChange={e => {
                    setDireccion(e.target.value)
                    setshowError(false)
                  }}
                  error={showError}
                  helperText={showError && validationErrors.Direccion}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button onClick={handleCancel}>Cancelar</Button>
            <Button onClick={e => DireccionesAction(e)}>Agregar</Button>
          </DialogActions>
        </Dialog>
      </form>
    </Fragment>
  )
}

export default DialogForm
