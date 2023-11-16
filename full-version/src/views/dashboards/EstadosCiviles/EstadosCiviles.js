import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box'
import Icon from 'src/@core/components/icon'
import DialogForm from 'src/views/components/dialogs/DialogEstadoCivilesCreate'
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
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'

export default function Content() {
  const router = useRouter()
  //Configurar los hooks
  const [users, setUsers] = useState([])
  const [id, setid] = useState('')
  const [descripcion, setdescripcion] = useState('')
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [showError, setShowError] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [disableACTU, setdisableACTU] = useState(true)
  //Funcion para mostrar los datos con fetch
  const URL = 'https://localhost:44393/api/EstadosCiviles/ListarEstadosCiviles'

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

  const DetallesTabla = async rowId => {
    let detalles = {
      esci_Id: rowId,
      esci_Descripcion: ''
    }
    try {
      const response = await axios.post(
        'https://localhost:44393/api/EstadosCiviles/ListarDetallesEstadosCiviles',
        detalles
      )
      const data = response.data
      console.log(data)
      // Save data in local storage
      localStorage.setItem('esci_Descripcion', data[0].esci_Descripcion)
      localStorage.setItem('esci_Id', data[0].esci_Id)
      setid(() => localStorage.getItem('esci_Id'))
      setdescripcion(() => localStorage.getItem('esci_Descripcion'))
      localStorage.setItem('esci_usercrea', data[0].usuaCrea)
      localStorage.setItem('esci_fechacrea', data[0].esci_FechaCreacion)
      localStorage.setItem('esci_usermod', data[0].usuaMod)
      localStorage.setItem('esci_fechamod', data[0].esci_FechaModificacion)
      // Update table rows with data from local storage
      const tableRows = document.querySelectorAll('#detallesTabla tbody tr')
      tableRows[0].cells[1].textContent = localStorage.getItem('esci_usercrea')
      tableRows[0].cells[2].textContent = localStorage.getItem('esci_fechacrea')
      tableRows[1].cells[1].textContent = localStorage.getItem('esci_usermod')
      tableRows[1].cells[2].textContent = localStorage.getItem('esci_fechamod')
    } catch (error) {
      console.error(error)
    }
  }

  const updateAction = e => {
    setValidationErrors({})
    e.preventDefault()
    setShowError(false)

    if (!id) {
      setValidationErrors({ id: 'Debe ingresar un valor' })
      setShowError(true)

      return
    }

    if (!descripcion) {
      setValidationErrors({ descripcion: 'Debe ingresar un valor' })
      setShowError(true)

      return
    }

    let payload = {
      esci_Id: id,
      esci_Descripcion: descripcion,
      esci_UsuarioModificador: localStorage.getItem('IDUsuario')
    }
    console.log(payload)
    axios
      .post('https://localhost:44393/api/EstadosCiviles/ActualizarEstadoCivil', payload)
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
      name: 'esci_Id',
      label: 'Estado Civil id'
    },
    {
      name: 'esci_Descripcion',
      label: 'Estado Civil'
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
            </Box>
          )
        }
      }
    }
  ]

  const handleClickEdit = (id, descripcion) => {
    setSelectedRow(id)
    const selectedUser = users.find(user => user.esci_Id === id)
    if (selectedUser) {
      setdescripcion(selectedUser.esci_Descripcion)
      setid(selectedUser.esci_Id)
      handleDialogToggle()
    } else {
      console.warn(`User with id ${id} not found.`)
    }
  }

  const handleDialogToggle = () => {
    if (editDialogOpen) {
      setShowError(false)
      setdescripcion('')
      setid('')
      setSelectedRow(null)
    } else {
    }
    setEditDialogOpen(!editDialogOpen)
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
                <h1>Estados Civiles</h1>
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
                <h2>Detalles de Estados Civiles</h2>
                <div className='card-body'>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ flex: 1 }}>
                      <InputLabel htmlFor='id'>
                        <Typography sx={{ fontWeight: 'bold' }}>Estado Civil Id:</Typography>
                        <Typography>{id}</Typography>
                      </InputLabel>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <InputLabel htmlFor='descripcion'>
                        <Typography sx={{ fontWeight: 'bold' }}>Estado civil descripcion:</Typography>
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
          updateAction(e)
        }}
      >
        <Dialog open={editDialogOpen} onClose={handleDialogToggle}>
          <DialogTitle>Editar Estado civil</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>Digite los siguientes datos</DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id='id'
                  autoFocus
                  fullWidth
                  type='text'
                  label='Tipo de pago id'
                  value={id}
                  disabled={disableACTU}
                  onChange={e => {
                    setid(e.target.value)
                    setShowError(false)
                  }}
                  error={showError}
                  helperText={showError && validationErrors.id}
                  inputProps={{ maxLength: 1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='name'
                  autoFocus
                  fullWidth
                  type='text'
                  label='Tipo de pago'
                  value={descripcion}
                  onChange={e => {
                    setdescripcion(e.target.value)
                    setShowError(false)
                  }}
                  error={showError}
                  helperText={showError && validationErrors.descripcion}
                />
              </Grid>
            </Grid>
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
