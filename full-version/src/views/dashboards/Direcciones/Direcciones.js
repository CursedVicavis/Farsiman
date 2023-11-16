import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import Icon from 'src/@core/components/icon'
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box'
import DialogForm from 'src/views/components/dialogs/DialogDireccionesCreate'
//import DialogFormEdit from 'src/views/components/dialogs/DialogDireccionesEdit'
import axios from 'axios'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import toast from 'react-hot-toast'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import { FormHelperText } from '@mui/material'
import { useRouter } from 'next/router'

// ** MUI Imports

import { Grid } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

//ya todo lo demas

export default function Content() {
  //Configurar los hooks
  const [users, setUsers] = useState([])
  const [dire_Id, setdire_Id] = useState('')
  const [descripcion, setdescripcion] = useState('')
  const [muni_Descripcion, setmuni_Descripcion] = useState('')
  const [dept_Descripcion, setdept_Descripcion] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [open1, setOpen1] = useState(false)

  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const [showError, setshowError] = useState(false)
  const router = useRouter()
  const [selectedRow, setSelectedRow] = useState(null)

  const [direId_Edit, setdireId_Edit] = useState('')
  const [direccion_des, setdireccion_des] = useState('')
  const [DprtSelected, setDprtSelected] = useState('')
  const [MuniSelected, setMuniSelected] = useState('')

  const [DepartaemntoDDL, setDepartamentoDDL] = useState([]) //ddl Departemento
  const [Deparatemento, setDeparatemento] = useState('') //almacena el valor seleccionado del ddl

  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const [Direccion, setDireccion] = useState('')
  const [validationErrors, setvalidationErrors] = useState({})

  const [municipioEnabled, setMunicipioEnabled] = useState(false)

  const [MunicipioDDL, setMunicipioDDL] = useState([]) //ddl Municipios
  const [Municipio, setMunicipio] = useState('') // alamcena el valor del ddl
  const [MunicipioActivated, setMunicipioActivated] = useState(true) // almacena si el ddl esta activado
  //Funcion para mostrar los datos con fetch
  const URL = 'http://eventcompany.somee.com/api/Direcciones/ListarDirecciones'

  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    console.log(data)
    setUsers(data)
  }

  useEffect(() => {
    if (localStorage.getItem('IDUsuario') == null || localStorage.getItem('IDUsuario') == '') {
      

      router.push('/pages/auth/login-v2/')
    }
    showData()
  }, [])

  const updateData = () => {
    showData()
  }

  const handleCancel = () => {
    setshowError(true)
    setEditDialogOpen(false)
    clearDialog()
  }

  const deleteData = async () => {
    let payload2 = {
      dire_Id: selectedId,
      dire_Descripcion: ''
    }
    axios.post('http://eventcompany.somee.com/api/Direcciones/EliminarDirecciones', payload2).then(r => {
      console.log(r.data)
      if (r.data.data.codeStatus == 1) {
        toast.success('Dirección eliminada con exito!', {
          duration: 4000
        })
        updateData()
        setOpen1(false)
      } else {
        toast.success('Ha ocurrido un error', {
          duration: 4000
        })
      }
    })
  }

  const DetallesTabla = async rowId => {
    let detalles = {
      dire_Id: rowId,
      dire_Descripcion: ''
    }
    try {
      const response = await axios.post('http://eventcompany.somee.com/api/Direcciones/ListarDetallesDirecciones', detalles)
      const data = response.data
      console.log(data)
      // Save data in local storage
      localStorage.setItem('muni_Descripcion', data[0].muni_Descripcion)
      localStorage.setItem('dept_Descripcion', data[0].dept_Descripcion)
      localStorage.setItem('dire_Descripcion', data[0].dire_Descripcion)
      localStorage.setItem('dire_Id', data[0].dire_Id)
      setdire_Id(() => localStorage.getItem('dire_Id'))
      setdescripcion(() => localStorage.getItem('dire_Descripcion'))
      setmuni_Descripcion(() => localStorage.getItem('muni_Descripcion'))
      setdept_Descripcion(() => localStorage.getItem('dept_Descripcion'))
      localStorage.setItem('dire_usercrea', data[0].usuaCrea)
      localStorage.setItem('dire_FechaCreacion', data[0].dire_FechaCreacion)
      localStorage.setItem('dire_usermod', data[0].usuaMod)
      localStorage.setItem('dire_FechaModificacion', data[0].dire_FechaModificacion)
      // Update table rows with data from local storage
      const tableRows = document.querySelectorAll('#detallesTabla tbody tr')
      tableRows[0].cells[1].textContent = localStorage.getItem('dire_usercrea')
      tableRows[0].cells[2].textContent = localStorage.getItem('dire_FechaCreacion')
      tableRows[1].cells[1].textContent = localStorage.getItem('dire_usermod')
      tableRows[1].cells[2].textContent = localStorage.getItem('dire_FechaModificacion')
    } catch (error) {
      console.error(error)
    }
  }

  const columns = [
    {
      name: 'dire_Id',
      label: 'Dirección id'
    },
    {
      name: 'dept_Descripcion',
      label: 'Departamento'
    },
    {
      name: 'muni_Descripcion',
      label: 'Municipio'
    },
    {
      name: 'dire_Descripcion',
      label: 'Dirección'
    },
    {
      name: 'Acciones',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowId = tableMeta.rowData[0]

          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Fab color='success' aria-label='edit' size='small' onClick={() => handleClickEdit(rowId)}>
                <Icon icon='tabler:pencil' />
              </Fab>
              <Box sx={{ mx: 1 }}></Box>
              <Fab color='info' aria-label='details' size='small' onClick={() => handleClick(rowId)}>
                <Icon icon='tabler:list' />
              </Fab>
              <Box sx={{ mx: 1 }}></Box>
              <Fab color='error' aria-label='delete' size='small' onClick={() => handleClickDelete(rowId)}>
                <Icon icon='tabler:trash' />
              </Fab>
            </Box>
          )
        }
      }
    }
  ]

  const handleClickEdit = id => {
    setSelectedRow(id)
    setdireId_Edit == id
    const selectedUser = users.find(user => user.dire_Id === id)
    console.log(selectedUser)
    if (selectedUser) {
      axios
        .get('http://eventcompany.somee.com/api/Departamentos/ListarDepartamentos')
        .then(response => response.data)
        .then(data => {
          setDepartamentoDDL(data.map(c => ({ code: c.dept_Id, name: c.dept_Descripcion })))
          const selectedDepartment = data.find(d => d.dept_Descripcion === selectedUser.dept_Descripcion)
          console.log(selectedDepartment)
          setDeparatemento(selectedDepartment.dept_Id)

          // Actualizar el valor seleccionado del select de municipios
          AsiganrlevalorMunicipioDDL(selectedDepartment.dept_Id).then(data => {
            setMunicipioDDL(data.map(c => ({ code: c.muni_Id, name: c.muni_Descripcion })))
            const selectedMunicipio = data.find(m => m.muni_Descripcion === selectedUser.muni_Descripcion)
            console.log(selectedMunicipio)
            setMunicipio(selectedMunicipio.muni_Id)
          })
        })
        .catch(error => console.error(error))

      setDireccion(selectedUser.dire_Descripcion)
      setdireId_Edit(selectedUser.dire_Id)
      setMuniSelected(selectedUser.muni_Descripcion)

      handleDialogToggle()
    } else {
      console.warn(`User with id ${id} not found.`)
    }
  }

  const clearDialog = () => {
    setshowError(true)
    setDireccion('')
    setvalidationErrors({})
  }

  const AsiganrlevalorMunicipioDDL = async dept_Id => {
    let payload2 = {
      dept_Id: dept_Id,
      dept_Descripcion: ''
    }
    try {
      const response = await axios.post('http://eventcompany.somee.com/api/Direcciones/ListarMunicipiosPorDepto', payload2)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  const handleDialogToggle = () => {
    if (editDialogOpen) {
      setdireId_Edit('')
      setdireccion_des('')
      setDprtSelected('')
      setMuniSelected('')
      setSelectedRow(null)
    } else {
    }
    setEditDialogOpen(!editDialogOpen)
  }

  const onSubmit = e => {
    setEditDialogOpen(false)
    e.preventDefault()
  }

  const handleClickDelete = rowId => {
    console.log(`Button clicked for row with ID ${rowId}`)
    setSelectedId(() => rowId)
    console.log(selectedId)
    setOpen1(true)
  }

  const handleClick = rowId => {
    console.log(`Button clicked for row with ID ${rowId}`)
    setValue('2')
    DetallesTabla(rowId)
  }

  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const Regresar = () => {
    setValue('1')
  }

  const DireccionesEditar = e => {
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
      dire_Id: direId_Edit,
      muni_Id: Municipio,
      dire_Descripcion: Direccion,
      dire_UsuarioModificador: localStorage.getItem('IDUsuario')
    }

    axios.post('http://eventcompany.somee.com/api/Direcciones/ActualizarDirecciones', payload2).then(r => {
      if (r.data.data.codeStatus == 1) {
        toast.error('El registro ya existe', {
          duration: 4000
        })
      } else {
        if (r.data.data.codeStatus == 3) {
          toast.error('Error con el servidor', {
            duration: 4000
          })
        } else {
          if (r.data.data.codeStatus == 2) {
            toast.success('Registro actualizado con exito!', {
              duration: 4000
            })
            updateData()

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

  return (
    <div className='content'>
      <div className='container-fluid'>
        <TabContext value={value}>
          <TabList centered onChange={handleChange} aria-label='centered tabs example' style={{ display: 'none' }}>
            <Tab value='1' label='Tab 1' />
            <Tab value='2' label='Tab 2' />
          </TabList>
          <TabPanel value='1'>
            <div className='card'>
              <div className='card-header'>
                <h1>Direcciones</h1>
              </div>
              <br></br>
              <DialogForm updateData={updateData} id={localStorage.getItem('IDUsuario')} />
              <br></br>
              <div className='card-body'>
                <MUIDataTable
                  data={users}
                  columns={columns}
                  options={{
                    selectableRows: false
                  }}
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel value='2'>
            <div className='card'>
              <div className='card-header'>
                <h2>Detalles de Direcciones</h2>
                <div className='card-body'>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ flex: 1 }}>
                      <InputLabel htmlFor='id'>
                        <Typography sx={{ fontWeight: 'bold' }}>Dirección Id:</Typography>
                        <Typography>{dire_Id}</Typography>
                      </InputLabel>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <InputLabel htmlFor='descripcion'>
                        <Typography sx={{ fontWeight: 'bold' }}>Dirección:</Typography>
                        <Typography>{descripcion}</Typography>
                      </InputLabel>
                    </Box>
                  </Box>
                  <br></br>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ flex: 1 }}>
                      <InputLabel htmlFor='id'>
                        <Typography sx={{ fontWeight: 'bold' }}>Departamento:</Typography>
                        <Typography>{dept_Descripcion}</Typography>
                      </InputLabel>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <InputLabel htmlFor='descripcion'>
                        <Typography sx={{ fontWeight: 'bold' }}>Municipio:</Typography>
                        <Typography>{muni_Descripcion}</Typography>
                      </InputLabel>
                    </Box>
                  </Box>
                  <br></br>
                  <div className='card'>
                    <div className='card-header'>
                      <h3>Auditoria</h3>
                      <div className='card-body'>
                        <table id='detallesTabla'>
                          <thead>
                            <tr>
                              <th>Accion</th>
                              <th>Usuario</th>
                              <th>Fecha</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Creación</td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Modificación</td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
                <div className='card-footer'>
                  <Button variant='contained' onClick={Regresar} endIcon={<Icon icon='tabler:back' />}>
                    Regresar
                  </Button>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabContext>

        <form
          onSubmit={e => {
            deleteData(e)
          }}
        >
          <Dialog
            open={open1}
            onClose={() => setOpen1(false)}
            aria-labelledby='form-dialog-title'
            fullWidth
            maxWidth='sm'
          >
            <DialogTitle>Eliminar registro</DialogTitle>
            <DialogContent>
              <DialogContentText>¿Está seguro de que desea eliminar este registro?</DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={() => setOpen1(false)}>Cancelar</Button>
              <Button onClick={deleteData}>Eliminar</Button>
            </DialogActions>
          </Dialog>
        </form>

        <form
          onSubmit={e => {
            updateAction(e)
          }}
        >
          {Object.keys(validationErrors).length !== 0}
          <Dialog open={editDialogOpen} onClose={handleDialogToggle} fullWidth maxWidth='sm'>
            <form onSubmit={onSubmit}>
              <DialogTitle id='form-dialog-title'>Editar Registro</DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ mb: 3 }}>Digite los siguientes datos</DialogContentText>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <Select
                        labelId='departamento-label'
                        id='departamento'
                        value={Deparatemento}
                        onChange={e => {
                          setshowError(false)
                        }}
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
                        <Select
                          labelId='municipio-label'
                          id='municipio-select'
                          value={Municipio}
                          onChange={e => {
                            setMunicipio(e.target.value)
                            setshowError(false)
                          }}
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
                <Button onClick={e => DireccionesEditar(e)}>Actualizar</Button>
              </DialogActions>
            </form>
          </Dialog>
        </form>
      </div>
    </div>
  )
}
