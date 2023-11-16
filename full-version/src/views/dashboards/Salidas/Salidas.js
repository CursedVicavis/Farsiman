import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Grid'
import { useForm, Controller } from 'react-hook-form'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import axios from 'axios'
import InputLabel from '@mui/material/InputLabel'
import { useTheme } from '@mui/material/styles'
import DialogContentText from '@mui/material/DialogContentText'
import CustomInput from 'src/views/dashboards/Registro/PickersCustomInput'
import 'react-datepicker/dist/react-datepicker.css'
import { yupResolver } from '@hookform/resolvers/yup'

// ** MUI Imports
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import FormHelperText from '@mui/material/FormHelperText'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Fab from '@mui/material/Fab'
import * as yup from 'yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const defaultAccountValues = {
  FechaInicio: '',
  FechaFinal: '',
  Sucursal: 1
}

const accountSchema = yup.object().shape({
  FechaInicio: yup.string(),
  FechaFinal: yup.string(),
  Sucursal: yup.number()
})

export default function Content() {
  const Row = ({ row }) => {
    // ** State
    const [open, setOpen] = useState(false)
    const [modal, setModal] = useState(false)
    const [saliID, setSaliID] = useState('')
    const somer = JSON.parse(row.detalles)

    // ** Function to fetch screens for a given role
    const handleClickActivar = name => {
      console.log(row.sali_Id)
      setSaliID(row.sali_Id)
      setModal(true)
    }

    const recibir = async () => {
      let payload = {
        sali_Id: saliID,
        usua_UsuarioModificacion: localStorage.getItem('IDUsuario')
      }

      axios.put('https://localhost:7002/api/Salidas/AceptarSalida', payload).then(r => {
        console.log(r.data)
        if (r.data.data.messageStatus === 'Recibido con exito') {
          toast.success('Recibido con exito', {
            duration: 4000
          })
          setModal(false)
          showData()
        } else {
          toast.success(r.data.messageStatus, {
            duration: 4000
          })
        }
      })
    }

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
              <Icon icon={open ? 'tabler:chevron-up' : 'tabler:chevron-down'} />
            </IconButton>
          </TableCell>
          <TableCell>{row.sali_Id}</TableCell>
          <TableCell>{row.sucu_Nombre}</TableCell>
          <TableCell>{row.sali_Fecha}</TableCell>
          <TableCell>{row.usua_Nombre}</TableCell>
          <TableCell>{row.sade_Total}</TableCell>
          <TableCell>
            {row.sali_Estado === 1 ? (
              <Chip label='Enviado a Sucursal' variant='outlined' color='warning' />
            ) : row.sali_Estado === 2 ? (
              <Chip label='Recibido en Sucursal' variant='outlined' color='success' />
            ) : (
              <p>El número no es ni 1 ni 2</p>
            )}
          </TableCell>
          <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Fab color='info' aria-label='details' size='small' onClick={e => handleClickActivar(e)}>
                <Icon icon='tabler:list' />
              </Fab>
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant='h6' gutterBottom component='div'>
                  Detalles
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Producto</TableCell>
                      <TableCell>Precio</TableCell>
                      <TableCell align='right'>Cantidad</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {somer.map(historyRow => (
                      <TableRow key={historyRow.sade_Id}>
                        <TableCell component='th' scope='row'>
                          {historyRow.prod_Descripcion}
                        </TableCell>
                        <TableCell>{historyRow.prod_PrecioReal}</TableCell>
                        <TableCell align='right'>{historyRow.sade_Cantidad}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>

        <form
          onSubmit={e => {
            deleteData(e)
          }}
        >
          <Dialog
            open={modal}
            onClose={() => setOpen(false)}
            aria-labelledby='form-dialog-title'
            fullWidth
            maxWidth='sm'
          >
            <DialogTitle>Aceptar Salida</DialogTitle>
            <DialogContent>
              <DialogContentText>¿Desea Recibir Esta Salida?</DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={() => setModal(false)}>Cancelar</Button>
              <Button onClick={recibir}>Recibir</Button>
            </DialogActions>
          </Dialog>
        </form>
      </React.Fragment>
    )
  }
  const router = useRouter()

  //Configurar los hooks

  const [detalles, setDetalles] = useState([])
  const [users, setUsers] = useState([])
  const [usua_Id, setusua_Id] = useState('')
  const [usua_Usuario, setusua_Usuario] = useState('')
  const [role_Descripcion, setrole_Descripcion] = useState('')
  const [selectedId, setselectedId] = useState('')
  const [open1, setopen1] = useState(false)
  const [showError, setshowError] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [Usuario_Edit, setusuaid_Edit] = useState('')

  const [RoleDDL, setRoleDDL] = useState([]) //ddl Departemento
  const [Role, setRole] = useState('') //almacena el valor seleccionado del ddl

  const [Empleado, setEmpleado] = useState('') // almacena si el ddl esta activado

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [validationErrors, setvalidationErrors] = useState({})
  const [dateinicio, setDateinicio] = useState(new Date())
  const [datefinal, setDatefinal] = useState(new Date())
  const [sucursalddl, setSucursalddl] = useState([])

  //Funcion para mostrar los datos con fetch
  const URL = 'https://localhost:7002/api/Salidas/Listar'

  const showData = async () => {
    try {
      axios.get('https://localhost:7002/api/Sucursales/Listar').then(response => {
        setSucursalddl(response.data.data.map(c => ({ code: c.sucu_Id, name: c.sucu_Nombre })))
      })

      const response = await fetch(URL)
      const data = await response.json()
      setUsers(data.data)
      console.log(data.data)
    } catch (e) {
      console.log(e)
    }
  }

  const {
    reset: accountReset,
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors }
  } = useForm({
    defaultValues: defaultAccountValues,
    resolver: yupResolver(accountSchema)
  })

  useEffect(() => {
    if (localStorage.getItem('IDUsuario') == null || localStorage.getItem('IDUsuario') == '') {
      router.push('/pages/auth/login-v2/')
    }

    showData()
  }, [])

  const theme = useTheme()
  const { direction } = theme
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const onSubmit = data => {
    console.log(data)
    filtrado(data)
  }

  //el filtrado tiene que ser AÑO MES DIA

  const filtrado = async diti => {
    const fechaObj = new Date(diti.FechaInicio)

    // Extrae los componentes de la fecha (año, mes y día)
    const año = fechaObj.getFullYear()
    const mes = fechaObj.getMonth() + 1 // Meses en JavaScript son de 0 a 11
    const día = fechaObj.getDate()

    // Formatea la fecha en el formato 'yyyy/mm/dd'
    const fechaFormateada = `${año}/${mes < 10 ? '0' : ''}${mes}/${día < 10 ? '0' : ''}${día}`

    const fechaOb = new Date(diti.FechaFinal)

    // Extrae los componentes de la fecha (año, mes y día)
    const año2 = fechaOb.getFullYear()
    const mes2 = fechaOb.getMonth() + 1 // Meses en JavaScript son de 0 a 11
    const día2 = fechaOb.getDate()

    // Formatea la fecha en el formato 'yyyy/mm/dd'
    const fechaFormateada2 = `${año2}/${mes < 10 ? '0' : ''}${mes2}/${día2 < 10 ? '0' : ''}${día2}`

    const URLL =
      'https://localhost:7002/api/Salidas/ListadoFiltrado?fechaInicio=' +
      fechaFormateada +
      '&FechaFinal= ' +
      fechaFormateada2 +
      '&Sucursal=' +
      diti.Sucursal

    const response = await fetch(URLL)
    const data = await response.json()
    setUsers(data.data)
    console.log(data)
  }

  return (
    <div>
      <Button href='/dashboards/Salidas/Create'>Crear</Button>
      <TabContext value={value}>
        <TabList centered onChange={handleChange} aria-label='centered tabs example' style={{ display: 'none' }}>
          <Tab value='1' label='Tab 1' />
          <Tab value='2' label='Tab 2' />
        </TabList>
        <TabPanel value='1'>
          <h1>Salidas</h1>
          <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
            <Card>
              <CardContent>
                <Grid container spacing={12}>
                  <Grid item xs={2} sm={2}>
                    <Controller
                      name='FechaInicio'
                      control={accountControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          placeholderText='Selecciona una fecha inicio'
                          selected={dateinicio}
                          id='basic-input'
                          popperPlacement={popperPlacement}
                          dateFormat='yyyy/MM/dd/'
                          onChange={e => onChange(e)}
                          customInput={
                            <CustomInput
                              value={value}
                              onChange={onChange}
                              label='Fecha Inicio'
                              error={Boolean(accountErrors.FechaInicio)}
                              aria-describedby='validation-basic-FechaInicio'
                            />
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2}>
                    <Controller
                      name='FechaFinal'
                      control={accountControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          placeholderText='Selecciona una fecha final'
                          selected={datefinal}
                          id='basic-input'
                          popperPlacement={popperPlacement}
                          dateFormat='yyyy/MM/dd/'
                          onChange={e => onChange(e)}
                          customInput={
                            <CustomInput
                              value={value}
                              onChange={onChange}
                              label='Fech Final'
                              error={Boolean(accountErrors.FechaFinal)}
                              aria-describedby='validation-basic-FechaFinal'
                            />
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2}>
                    <FormControl fullWidth>
                      <InputLabel
                        id='validation-basic-Sucursal'
                        error={Boolean(accountErrors.Sucursal)}
                        htmlFor='validation-basic-Sucursal'
                      >
                        Sucursal
                      </InputLabel>
                      <Controller
                        name='Sucursal'
                        control={accountControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <Select
                            value={value}
                            label='Sucursal'
                            onChange={onChange}
                            error={Boolean(accountErrors.Sucursal)}
                            labelId='validation-basic-Sucursal'
                            aria-describedby='validation-basic-Sucursal'
                          >
                            {sucursalddl.map(dept => (
                              <MenuItem key={dept.code} value={dept.code}>
                                {dept.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                      {accountErrors.Sucursal && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-Sucursal'>
                          Seleccione una sucursal
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} sm={3}>
                    <Button size='large' type='submit' variant='contained'>
                      Filtrar
                    </Button>
                  </Grid>
                  <Grid item xs={3} sm={3}>
                    <Button size='large' type='button' variant='contained' onClick={showData()}>
                      Eliminar Filtro
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </form>

          <br></br>
          <TableContainer component={Paper}>
            <Table aria-label='collapsible table'>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Numero de salida</TableCell>
                  <TableCell>Nombre de sucursal</TableCell>
                  <TableCell>Fecha de salida</TableCell>
                  <TableCell>Usuario que realizo la salida</TableCell>
                  <TableCell>Total a pagar de la salida</TableCell>
                  <TableCell>Estado de la salida</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(sali => (
                  <Row key={sali.sali_Id} row={sali} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </TabContext>
    </div>
  )
}
