import { Fragment, useState, useEffect } from 'react'

import MUIDataTable from 'mui-datatables'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Create from 'src/views/dashboards/Municipios/muni_Create'
import IconButton from '@mui/material/IconButton'
import toast from 'react-hot-toast'

import Fab from '@mui/material/Fab'
import DialogContentText from '@mui/material/DialogContentText'
import Global from 'src/pages/acl/Global'

//modal

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import DialogActions from '@mui/material/DialogActions'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import MenuItem from '@mui/material/MenuItem'

//Modal//
//Actions

//
import Icon from 'src/@core/components/icon'
import Box from '@mui/material/Box'
import axios from 'axios'

export default function Content() {
  //Configurar los hooks
  const [value, setValue] = useState('1')
  const [id, setid] = useState('')
  const [descripcion, setdescripcion] = useState('')

  const Regresar = () => {
    setValue('1')
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  /*----------------------------------------VIEW----------------------------------------*/

  const [users, setUsers] = useState([])
  const [showError, setShowError] = useState(false)

  const URL = 'http://eventcompany.somee.com/api/Municipios/ListarMunicipios'

  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    console.log(data)
    setUsers(data)
  }

  useEffect(() => {
    showData()
  }, [])

  const handleClick = rowId => {
    setValue('2')
    DetallesTabla(rowId)
  }

  const DetallesTabla = async rowId => {
    console.log(rowId)

    let detalles = {
      muni_Id: rowId[0],
      muni_Descripcion: ''
    }
    console.log(detalles)
    try {
      const response = await axios.put('http://eventcompany.somee.com/api/Municipios/ListarDetallesMunicipios', detalles)
      const data = response.data

      // Save data in local storage

      localStorage.setItem('muni_Id', data[0].muni_Id)
      localStorage.setItem('muni_Descripcion', data[0].muni_Descripcion)
      setid(() => localStorage.getItem('muni_Id'))
      setdescripcion(() => localStorage.getItem('muni_Descripcion'))
      localStorage.setItem('muni_UsuarioCreador', data[0].usuaCrea)
      localStorage.setItem('muni_FechaCreacion', data[0].muni_FechaCreacion)
      localStorage.setItem('muni_UsuarioModificador', data[0].usuaMod)
      localStorage.setItem('dept_FechaModificacion', data[0].dept_FechaModificacion)

      // Update table rows with data from local storage
      const tableRows = document.querySelectorAll('#detallesTabla tbody tr')
      tableRows[0].cells[1].textContent = localStorage.getItem('muni_UsuarioCreador')
      tableRows[0].cells[2].textContent = localStorage.getItem('muni_FechaCreacion')
      tableRows[1].cells[1].textContent = localStorage.getItem('muni_UsuarioModificador')
      tableRows[1].cells[2].textContent = localStorage.getItem('dept_FechaModificacion')
    } catch (error) {
      console.error(error)
    }
  }

  const columns = [
    {
      name: 'muni_Id',
      label: ' Municipio id'
    },
    {
      name: 'muni_Descripcion',
      label: 'Municipio'
    },
    {
      name: 'dept_Descripcion',
      label: 'Departamento'
    },
    {
      name: 'Acciones',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowId = tableMeta.rowData

          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Fab color='success' aria-label='edit' size='small' onClick={() => handleEditPermission(rowId)}>
                <Icon icon='tabler:pencil' />
              </Fab>
              <Box sx={{ mx: 1 }}></Box>
              <Fab color='info' aria-label='details' size='small' onClick={() => handleClick(rowId)}>
                <Icon icon='tabler:list' />
              </Fab>
            </Box>
          )
        }
      }
    }
  ]

  /*----------------------------------------Update----------------------------------------*/

  const [MuniID, setMuniID] = useState('')
  const [MuniDesc, setMuniDesc] = useState('')
  const [DeptID, setDeptID] = useState('')

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen)

  const onSubmit = e => {
    setEditDialogOpen(false)
    e.preventDefault()
  }

  const handleClickU = () => setEditDialogOpen(false)

  const URLDDL = 'http://eventcompany.somee.com/api/Departamentos/ListarDepartamentos'
  const [depto, usedepto] = useState([])

  const DDLDepto = async () => {
    const response = await fetch(URLDDL)
    const data = await response.json()
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

  const updateData = () => {
    showData()
  }

  const handleEditPermission = name => {
    console.log(name)

    setMuniID(name[0])
    setMuniDesc(name[1])
    setDeptID(name[0].substring(0, 2))

    setEditDialogOpen(true)
  }

  const updateAction = e => {
    let payload = {
      muni_Id: MuniID,
      muni_Descripcion: MuniDesc,
      dept_Id: DeptID
    }
    if (!MuniDesc) {
      setValidationErrors({ Departamento: 'Debe ingresar un valor' })
      setShowError(true)
    }
    if (!DeptID) {
      setValidationErrors({ Departamento: 'Debe ingresar un valor' })
      setShowError(true)
    }

    if (!MuniDesc || !DeptID) {
      return
    }
    console.log(payload)
    axios
      .put(Global.url + '/api/Municipios/UpdateMunicipio', payload)
      .then(r => {
        if (r.data.messageStatus === 'Registro editado exitosamente') {
          toast.success(r.data.messageStatus, {
            duration: 4000
          })
          handleClickU()
          updateData()
        } else {
          toast.error(r.data.messageStatus, {
            duration: 4000
          })
        }
      })
      .catch(e => console.error(e))
  }

  /*----------------------------------------Create----------------------------------------*/

  const [Municipio, setMunicipio] = useState('')
  const [Departamento, setDepartamento] = useState('')
  const [open, setOpen] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})

  const handleClickOpen = () => {
    setOpen(true)
    setMunicipio('')
    setDepartamento('')
    setShowError(false)
  }
  const handleClose = () => setOpen(false)

  const CreateAction = e => {
    setValidationErrors({})
    e.preventDefault()
    setShowError(false)
    if (!Departamento) {
      setValidationErrors({ Departamento: 'Debe ingresar un valor' })
      setShowError(true)
    }
    if (!Municipio) {
      setValidationErrors({ Municipio: 'Debe ingresar un valor' })
      setShowError(true)
    }

    if (!Municipio || !Departamento) {
      return
    }

    let payload = {
      muni_Descripcion: Municipio,
      dept_Id: Departamento
    }

    console.log(payload)

    axios
      .post(Global.url + '/api/Municipios/InsertMunicipios', payload)
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
          updateData()
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
    <>
      <TabContext value={value}>
        <TabList centered onChange={handleChange} aria-label='centered tabs example' style={{ display: 'none' }}>
          <Tab value='1' label='Tab 1' />
          <Tab value='2' label='Tab 2' />
        </TabList>
        <TabPanel value='1'>
          <Card>
            <CardContent>
              <h1>Municipios</h1>

              <Button variant='outlined' onClick={handleClickOpen}>
                Nuevo Municipio
              </Button>
              <br></br>
              <br></br>
              <MUIDataTable
                data={users}
                columns={columns}
                options={{
                  selectableRows: false
                }}
              />
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value='2'>
          <div className='card'>
            <div className='card-header'>
              <h2>Detalles de tipo de pago</h2>
              <div className='card-body'>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor='id'>
                      <Typography sx={{ fontWeight: 'bold' }}>Municipio Id:</Typography>
                      <Typography>{id}</Typography>
                    </InputLabel>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor='descripcion'>
                      <Typography sx={{ fontWeight: 'bold' }}>Municipio descripcion:</Typography>
                      <Typography>{descripcion}</Typography>
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
          updateAction(e)
        }}
      >
        <Fragment>
          <Dialog maxWidth='sm' fullWidth onClose={handleDialogToggle} open={editDialogOpen}>
            <DialogTitle>
              <Typography variant='h5' component='span' sx={{ mb: 2 }}>
                Municipio
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>Actualizar Departamento</DialogContentText>
              <br></br>
              <Grid container spacing={12}>
                <Grid item sm={6} xs={6}>
                  <TextField
                    id='Departamento'
                    name='Departamento'
                    value={MuniDesc}
                    autoFocus
                    fullWidth
                    type='text'
                    onChange={e => {
                      setMuniDesc(e.target.value)
                      setShowError(false)
                    }}
                    error={showError}
                    helperText={showError && validationErrors.Departamento}
                    label='Nombre del Municipio'
                  />
                </Grid>
                <Grid item sm={6} xs={6}>
                  <FormControl sx={{ mr: 6 }}>
                    <InputLabel id='demo-dialog-select-label'>Selecciona el D epartamento</InputLabel>
                    <Select
                      id='demo-simple-select-helper'
                      value={DeptID}
                      onChange={e => {
                        setDeptID(e.target.value)
                        setShowError(false)
                      }}
                      error={showError}
                      helperText={showError && validationErrors.Municipio}
                      label='Selecciona el Departamento'
                    >
                      {listadepartamento}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={handleClickU}>Cerrar</Button>
              <Button onClick={updateAction}>Actualizar</Button>
            </DialogActions>
          </Dialog>

          <Dialog maxWidth='sm' fullWidth open={open} onClose={handleClose}>
            <DialogTitle id='form-dialog-title'>
              <Typography variant='h5' component='span' sx={{ mb: 2 }}>
                Municipio
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
      </form>
    </>
  )
}
