import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import Icon from 'src/@core/components/icon'
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box'
import DialogForm from 'src/views/components/dialogs/DialogTipoPagoCreate'
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
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router'

export default function Content() {
  //Configurar los hooks
  const [users, setUsers] = useState([])
  const router = useRouter()

  //Funcion para mostrar los datos con fetch
  const URL = 'http://eventcompany.somee.com/api/TipoDePago/ListarTipoDePago'
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [Detalles, setDetalles] = useState([])
  const [value1, setValue1] = useState('')
  const [id, setid] = useState('')
  const [descripcion, setdescripcion] = useState('')
  const [editValue, setEditValue] = useState(null)
  const [editDescripcion, setEditDescripcion] = useState('')
  const [descripcionEdit, setdescripcionEdit] = useState('')
  const [idEdit, setidEdit] = useState('')
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [validationErrors, setValidationErrors] = useState({})
  const [showError, setShowError] = useState(false)

  const handleClickEdit = (id, descripcion) => {
    setSelectedRow(id)
    const selectedUser = users.find(user => user.pago_id === id)
    if (selectedUser) {
      setdescripcionEdit(selectedUser.pago_Descripcion)
      setidEdit(selectedUser.pago_id)
      handleDialogToggle()
    } else {
      console.warn(`User with id ${id} not found.`)
    }
  }

  const handleDialogToggle = () => {
    if (editDialogOpen) {
      setShowError(false)
      setdescripcionEdit('')
      setSelectedRow(null)
    } else {
    }
    setEditDialogOpen(!editDialogOpen)
  }

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

  let payload2 = {
    pago_id: selectedId,
    pago_Descripcion: '',
    pago_Estado: true,
    pago_UsuarioCreador: 0
  }

  const deleteData = async () => {
    console.log(setSelectedId)
    axios.post('http://eventcompany.somee.com/api/TipoDePago/EliminarTipoPago', payload2).then(r => {
      console.log(r.data.data)
      console.log(r.data.code)
      if (r.data.code != 1) {
        toast.success('Tipo de pago eliminado con exito!', {
          duration: 4000
        })
        updateData()
        setOpen1(false)
      } else {
        console.log(r.data.code)
        toast.success('Ha ocurrido un error', {
          duration: 4000
        })
      }
    })
  }

  const DetallesTabla = async rowId => {
    let detalles = {
      pago_id: rowId,
      pago_Descripcion: '',
      pago_Estado: true,
      pago_UsuarioCreador: 0
    }
    try {
      const response = await axios.post('http://eventcompany.somee.com/api/TipoDePago/ListarDetallesTipoPago', detalles)
      const data = response.data

      // Save data in local storage

      localStorage.setItem('pago_Descripcion', data[0].pago_Descripcion)
      localStorage.setItem('pago_id', data[0].pago_id)
      setid(() => localStorage.getItem('pago_id'))
      setdescripcion(() => localStorage.getItem('pago_Descripcion'))
      localStorage.setItem('pago_usercrea', data[0].usuaCrea)
      localStorage.setItem('pago_fechacrea', data[0].pago_FechaCreacion)
      localStorage.setItem('pago_usermod', data[0].usuaMod)
      localStorage.setItem('pago_fechamod', data[0].pago_FechaModificacion)

      // Update table rows with data from local storage
      const tableRows = document.querySelectorAll('#detallesTabla tbody tr')
      tableRows[0].cells[1].textContent = localStorage.getItem('pago_usercrea')
      tableRows[0].cells[2].textContent = localStorage.getItem('pago_fechacrea')
      tableRows[1].cells[1].textContent = localStorage.getItem('pago_usermod')
      tableRows[1].cells[2].textContent = localStorage.getItem('pago_fechamod')
    } catch (error) {
      console.error(error)
    }
  }

  const updateAction = e => {
    setValidationErrors({})
    e.preventDefault()
    setShowError(false)

    if (!descripcionEdit) {
      setValidationErrors({ descripcionEdit: 'Debe ingresar un valor' })
      setShowError(true)

      return
    }

    let payload = {
      pago_id: idEdit,
      pago_Descripcion: descripcionEdit,
      pago_UsuarioModificador: localStorage.getItem('IDUsuario')
    }
    console.log(payload)
    axios
      .post('http://eventcompany.somee.com/api/TipoDePago/ActualizarTipoPago', payload)
      .then(r => {
        if (r.data.data.codeStatus == 3) {
          toast.error('El dato que desea ingresar ya existe', {
            duration: 4000
          })
        } else {
          if (r.data.data.codeStatus == 1) {
            toast.success('Tipo de pago actualizado con exito', {
              duration: 4000
            })
            setEditDialogOpen(false)
            updateData()
          } else {
            toast.error('Error con la API', {
              duration: 4000
            })
          }
        }
      })
      .catch(e => console.error(e))
  }

  const columns = [
    {
      name: 'pago_id',
      label: 'Tipo de pago id'
    },
    {
      name: 'pago_Descripcion',
      label: 'Descripción'
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

  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
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

  const Regresar = () => {
    setValue('1')
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
                <h1>Tipos de pago</h1>
              </div>
              <br></br>
              <DialogForm updateData={updateData} />
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
                <h2>Detalles de tipo de pago</h2>
                <div className='card-body'>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ flex: 1 }}>
                      <InputLabel htmlFor='id'>
                        <Typography sx={{ fontWeight: 'bold' }}>Tipo de pago Id:</Typography>
                        <Typography>{id}</Typography>
                      </InputLabel>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <InputLabel htmlFor='descripcion'>
                        <Typography sx={{ fontWeight: 'bold' }}>Tipo de pago descripcion:</Typography>
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
      </div>

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
        <Dialog
          open={editDialogOpen}
          onClose={handleDialogToggle}
          aria-labelledby='form-dialog-title'
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>Editar Tipo de Pago</DialogTitle>
          <DialogContent>
            <DialogContentText>Por favor, edite la descripción del tipo de pago:</DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='descripcion'
              label='Descripción'
              type='text'
              fullWidth
              value={descripcionEdit}
              onChange={e => {
                setdescripcionEdit(e.target.value)
                setShowError(false)
              }}
              error={showError}
              helperText={showError && validationErrors.descripcionEdit}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogToggle}>Cancelar</Button>
            <Button onClick={updateAction}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  )
}
