import React, { Fragment, useState, useEffect, useCallback } from 'react'

import MUIDataTable from 'mui-datatables'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import toast from 'react-hot-toast'

import DialogActions from '@mui/material/DialogActions'
import InputLabel from '@mui/material/InputLabel'
import Fab from '@mui/material/Fab'
import Global from 'src/pages/acl/Global'
import Tab from '@mui/material/Tab'
import DialogContentText from '@mui/material/DialogContentText'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useRouter } from 'next/router'
//modal

import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { DataGrid } from '@mui/x-data-grid'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useForm, Controller } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'

//Modal//
//Actions

//
import Icon from 'src/@core/components/icon'
import Box from '@mui/material/Box'
import { id } from 'date-fns/locale'
import axios from 'axios'

export default function Content() {
  //Configurar los hooks
  const [users, setUsers] = useState([])
  const router = useRouter()
  const [editValue, setEditValue] = useState(null)
  const [editDescripcion, setEditDescripcion] = useState('')
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [value, setValue] = useState('1')
  const [id, setid] = useState('')
  const [open, setOpen] = useState(false)

  const [descripcion, setdescripcion] = useState('')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const dispatch = useDispatch()
  const store = useSelector(state => state.permissions)

  useEffect(() => {
    if (localStorage.getItem('IDUsuario') == null || localStorage.getItem('IDUsuario') == '') {
      

      router.push('/pages/auth/login-v2/')
    }

  })

  const handleEditPermission = name => {
    setEditValue(name[0])
    setEditDialogOpen(true)
    setEditDescripcion(name[1])
  }
  const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen)

  const closeDialog = () => {
    setEditDialogOpen(false)
  }

  const onSubmit = e => {
    setEditDialogOpen(false)
    e.preventDefault()
  }

  //Funcion para mostrar los datos con fetch
  const URL = 'http://eventcompany.somee.com/api/Departamentos/ListarDepartamentos'

  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    setUsers(data)
  }
  useEffect(() => {
    showData()
  }, [])

  const updateData = () => {
    console.log('Cambiar El index')
    showData()
  }

  const DetallesTabla = async rowId => {
    console.log(rowId)

    let detalles = {
      dept_Id: rowId[0],
      dept_Descripcion: ''
    }
    console.log(detalles)
    try {
      const response = await axios.put(
        'http://eventcompany.somee.com/api/Departamentos/ListarDetallesDepartamentos',
        detalles
      )
      const data = response.data

      // Save data in local storage

      localStorage.setItem('dept_Descripcion', data[0].dept_Descripcion)
      localStorage.setItem('dept_Id', data[0].dept_Id)
      setid(() => localStorage.getItem('pago_id'))
      setdescripcion(() => localStorage.getItem('dept_Descripcion'))
      localStorage.setItem('dept_UsuarioCreador', data[0].usuaCrea)
      localStorage.setItem('dept_FechaCreacion', data[0].dept_FechaCreacion)
      localStorage.setItem('dept_UsuarioModificador', data[0].usuaMod)
      localStorage.setItem('dept_FechaModificacion', data[0].dept_FechaModificacion)

      // Update table rows with data from local storage
      const tableRows = document.querySelectorAll('#detallesTabla tbody tr')
      tableRows[0].cells[1].textContent = localStorage.getItem('dept_UsuarioCreador')
      tableRows[0].cells[2].textContent = localStorage.getItem('dept_FechaCreacion')
      tableRows[1].cells[1].textContent = localStorage.getItem('dept_UsuarioModificador')
      tableRows[1].cells[2].textContent = localStorage.getItem('dept_FechaModificacion')
    } catch (error) {
      console.error(error)
    }
  }

  const columns = [
    {
      name: 'dept_Id',
      label: 'Departamento Id',
      field: 'Id'
    },
    {
      name: 'dept_Descripcion',
      label: 'Departamento Descripcion',
      field: 'Nombre'
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

  const handleClick = rowId => {
    setValue('2')
    DetallesTabla(rowId)
  }

  const updateAction = e => {
    let payload = {
      dept_Id: editValue,
      dept_Descripcion: editDescripcion
    }
    axios
      .put(Global.url + '/api/Departamentos/UpdateDepartamento', payload)
      .then(r => {
        if (r.data.messageStatus === 'Registro editado exitosamente') {
          toast.success(r.data.messageStatus, {
            duration: 4000
          })
          updateData()
          closeDialog()
        } else {
          toast.error(r.data.messageStatus, {
            duration: 4000
          })
        }
      })
      .catch(e => console.error(e))
  }

  /*----------------------------------------Insert----------------------------------------*/

  const [DepartamentoCR, setDepartamentoCR] = useState('')
  const [showErroCR, setShowErrorCR] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})

  const handleClickOpen = () => {
    setOpen(true)
    setDepartamentoCR('')
    setShowErrorCR(false)
  }
  const handleClose = () => setOpen(false)

  const handleCloseU = () => setEditDialogOpen(false)

  const CreateAction = e => {
    setValidationErrors({})
    e.preventDefault()
    setShowErrorCR(false)
    if (!DepartamentoCR) {
      setValidationErrors({ DepartamentoCR: 'Debe ingresar un valor' })
      setShowErrorCR(true)

      return
    }

    let payload = {
      dept_Descripcion: DepartamentoCR
    }

    console.log('hola')

    axios
      .post(Global.url + '/api/Departamentos/InsertarDdepartamento', payload)
      .then(r => {
        console.log('Entro then')

        if (r.data.messageStatus === 'Este Departamento ya existe') {
          console.log(r.data)
          toast.error(r.data.messageStatus, {
            duration: 4000
          })
        } else if (r.data.messageStatus === 'Registro Agregado Exitosamente') {
          console.log(r.data)
          toast.success(r.data.messageStatus, {
            duration: 4000
          })
          console.log('inserta bien')
          updateData()
          handleClose()
          setDepartamentoCR('')
        } else {
          toast.error(r.data.messageStatus, {
            duration: 4000
          })
        }
      })
      .catch(e => console.error(e))
  }

  const Regresar = () => {
    setValue('1')
  }

  return (
    <div>
      <TabContext value={value}>
        <TabList centered onChange={handleChange} aria-label='centered tabs example' style={{ display: 'none' }}>
          <Tab value='1' label='Tab 1' />
          <Tab value='2' label='Tab 2' />
        </TabList>
        <TabPanel value='1'>
          <Card>
            <CardContent>
              <h1>Departamentos</h1>
              <Button variant='outlined' onClick={handleClickOpen}>
                Nuevo Departamento
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
                      <Typography sx={{ fontWeight: 'bold' }}>Departamento Id:</Typography>
                      <Typography>{id}</Typography>
                    </InputLabel>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor='descripcion'>
                      <Typography sx={{ fontWeight: 'bold' }}>Departamento descripcion:</Typography>
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
        <Dialog fullWidth onClose={handleDialogToggle} open={editDialogOpen}>
          <DialogTitle>
            <Typography variant='h5' component='span' sx={{ mb: 2 }}>
              Departamento
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>Edite el nuevo Departamento</DialogContentText>
            <FormGroup sx={{ mb: 2, alignItems: 'center', flexDirection: 'row', flexWrap: ['wrap', 'nowrap'] }}>
              <TextField
                fullWidth
                size='small'
                value={editDescripcion}
                label='Nombre del departamento'
                sx={{ mr: [0, 4], mb: [3, 0] }}
                placeholder='Nombre del departamento'
                onChange={e => setEditDescripcion(e.target.value)}
              />
            </FormGroup>
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button onClick={handleCloseU}>Cerrar</Button>
            <Button type='button' onClick={updateAction} variant='contained'>
              Actualizar
            </Button>
          </DialogActions>
        </Dialog>
      </form>{' '}
      <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle>
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Departamento
          </Typography>
        </DialogTitle>
        <form
          onSubmit={e => {
            CreateAction(e)
          }}
        >
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>Ingrese el nuevo Departamento</DialogContentText>
            <TextField
              id='DepartamentoCR'
              size='small'
              name='DepartamentoCR'
              value={DepartamentoCR}
              autoFocus
              fullWidth
              type='email'
              onChange={e => {
                setDepartamentoCR(e.target.value)
                setShowErrorCR(false)
              }}
              error={showErroCR}
              helperText={showErroCR && validationErrors.DepartamentoCR}
              label='Nombre del Departamento'
            />
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button onClick={handleClose}>Cerrar</Button>
            <Button onClick={CreateAction}>Agregar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
