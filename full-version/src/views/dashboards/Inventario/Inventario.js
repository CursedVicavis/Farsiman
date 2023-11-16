import React, { Fragment, useState, useEffect, useCallback } from 'react'
import FormControl from '@mui/material/FormControl'
import MUIDataTable from 'mui-datatables'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

import DialogActions from '@mui/material/DialogActions'
import InputLabel from '@mui/material/InputLabel'
import Fab from '@mui/material/Fab'
import Global from 'src/pages/acl/Global'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import DialogContentText from '@mui/material/DialogContentText'
import TabContext from '@mui/lab/TabContext'

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
  const [value, setValue] = useState('1')
  const [id, setid] = useState('')
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const [descripcion, setdescripcion] = useState('')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  //Funcion para mostrar los datos con fetch
  const URL = 'http://eventcompany.somee.com/api/Inventario/ListarInventario'

  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    setUsers(data)
  }
  useEffect(() => {
    if (localStorage.getItem('IDUsuario') == null || localStorage.getItem('IDUsuario') == '') {
      

      router.push('/pages/auth/login-v2/')
    }
    showData()
  }, [])

  const updateData = () => {
    console.log('Cambiar El index')
    showData()
  }

  const columns = [
    {
      name: 'inve_Id',
      label: 'Inventario ID',
      field: 'Id'
    },
    {
      name: 'inve_Elemento',
      label: 'Nombre del Elemento',
      field: 'Elemento'
    },
    {
      name: 'inve_Stock',
      label: 'Cantidad Disponible',
      field: 'Stock'
    },
    {
      name: 'inve_Precio',
      label: 'Precio',
      field: 'Precio'
    },
    {
      name: 'Acciones',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowId = tableMeta.rowData[0]

          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Fab color='success' aria-label='edit' size='small' onClick={() => handleEditPermission(rowId)}>
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

  /*----------------------------------------Update----------------------------------------*/

  const [editElemento, seteditElemento] = useState('')
  const [editStock, seteditStock] = useState('')
  const [editPrecio, seteditPrecio] = useState('')
  const [editValue, setEditValue] = useState('')

  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const handleEditPermission = ID => {
    setEditValue(ID)
    setEditDialogOpen(true)

    //setEditDescripcion(ID)
  }
  const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen)

  const closeDialog = () => {
    setEditDialogOpen(false)
  }

  const onSubmit = e => {
    setEditDialogOpen(false)
    e.preventDefault()
  }

  const handleClick = rowId => {
    setValue('2')
    DetallesTabla(rowId)
  }

  const updateAction = () => {
    let payload = {
      inve_Id: editValue,
      inve_Elemento: editElemento,
      inve_Stock: editStock,
      inve_Precio: editPrecio,
      inve_UsuarioModificador: localStorage.getItem('IDUsuario')
    }
    axios
      .post(Global.url + '/api/Inventario/InsertarInventario', payload)
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

  const [ElementoCR, setElementoCR] = useState('')
  const [StockCR, setStockCR] = useState('')
  const [PrecioCR, setPrecioCR] = useState('')
  const [showErrorE, setShowErrorE] = useState(false)
  const [showErrorS, setShowErrorS] = useState(false)
  const [showErrorP, setShowErrorP] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})

  const NombreElemento = e => {
    setElementoCR(e)
  }

  const PrecioElelemento = e => {
    setPrecioCR(e)
  }

  const StockElemento = e => {
    setStockCR(e)
  }

  const handleClickOpen = () => {
    setOpen(true)

    setElementoCR('')
    setStockCR('')
    setPrecioCR('')

    setShowErrorE(false)
    setShowErrorS(false)
    setShowErrorP(false)
  }
  const handleClose = () => setOpen(false)

  const handleCloseU = () => setEditDialogOpen(false)

  const CreateAction = e => {
    setValidationErrors({})
    e.preventDefault()
    setShowErrorE(false)
    setShowErrorS(false)
    setShowErrorP(false)

    console.log(ElementoCR)
    console.log(StockCR)
    console.log(PrecioCR)

    if (ElementoCR === '') {
      setValidationErrors({ editElemento: 'Nombre del Elemento Vacio' })
      setShowErrorE(true)
    } else {
      setShowErrorE(false)
    }

    if (StockCR === '') {
      setValidationErrors({ editElemento: 'Stock Vacio' })
      setShowErrorS(true)
    }
    if (PrecioCR === '') {
      setValidationErrors({ editElemento: 'PrecioVacio' })
      setShowErrorP(true)
    }

    if (ElementoCR === '' || StockCR === '' || PrecioCR === '') {
      return
    }

    let payload = {
      inve_Elemento: ElementoCR,
      inve_Stock: StockCR,
      inve_Precio: PrecioCR,
      inve_UsuarioCreador: localStorage.getItem('IDUsuario')
    }

    axios
      .post('http://eventcompany.somee.com/api/Inventario/InsertarInventario', payload)
      .then(response => {
        console.log(response)

        if (response.data.codeStatus == 2) {
          toast.error('El Elemento ya Existe', {
            duration: 4000
          })
        } else if (response.data.codeStatus == 1) {
          console.log(response.data)
          toast.success('Elemento Ingresado Exitosamente', {
            duration: 4000
          })

          updateData()
          handleClose()
        } else {
          toast.error(response.data.messageStatus, {
            duration: 4000
          })
        }
      })
      .catch(e => console.error(e))
  }

  /*----------------------------------------Delete----------------------------------------*/

  const handleClickDelete = name => {
    setrole_Id(name)
    setOpen(true)
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
              <h1>Inventario</h1>
              <Button variant='outlined' onClick={handleClickOpen}>
                Nuevo Elemento
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
          <Card>
            <CardContent>
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
            </CardContent>
          </Card>
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
              Item
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>Edite el Inventario</DialogContentText>
            <Grid container>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    size='sm'
                    value={ElementoCR}
                    label='Nombre del elemento'
                    sx={{ mb: 3 }}
                    placeholder='Nombre del elemento'
                    onChange={e => {
                      setElementoCR(e.target.value)
                      setShowErrorE(false)
                    }}
                    error={showErrorE}
                    helperText={showErrorE && validationErrors.ElementoCR}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    size='sm'
                    value={StockCR}
                    label='Cantidad Stock'
                    sx={{ width: '100%' }}
                    placeholder='Cantidad Stock'
                    type='number'
                    onChange={e => {
                      setStockCR(e.target.value)
                      setShowErrorS(false)
                    }}
                    error={showErrorS}
                    helperText={showErrorS && validationErrors.StockCR}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    size='sm'
                    value={PrecioCR}
                    label='Precio del Elemento'
                    sx={{ width: '100%' }}
                    placeholder='Precio del Elemento'
                    onChange={e => {
                      setPrecioCR(e.target.value)
                      setShowErrorP(false)
                    }}
                    error={showErrorP}
                    helperText={showErrorP && validationErrors.PrecioCR}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button onClick={handleCloseU}>Cerrar</Button>
            <Button type='button' onClick={updateAction} variant='contained'>
              Actualizar
            </Button>
          </DialogActions>
        </Dialog>
      </form>
      <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle>
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Inventario
          </Typography>
        </DialogTitle>
        <form
          onSubmit={e => {
            CreateAction(e)
          }}
        >
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>Nuevo Elemento</DialogContentText>
            <Grid container>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    size='sm'
                    value={ElementoCR}
                    label='Nombre del elemento'
                    sx={{ mb: 3 }}
                    placeholder='Nombre del elemento'
                    onChange={e => {
                      setElementoCR(e.target.value)
                      setShowErrorE(false)
                    }}
                    error={showErrorE}
                    helperText={showErrorE && validationErrors.ElementoCR}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    size='sm'
                    value={StockCR}
                    label='Cantidad Stock'
                    sx={{ width: '100%' }}
                    placeholder='Cantidad Stock'
                    type='number'
                    onChange={e => {
                      setStockCR(e.target.value)
                      setShowErrorS(false)
                    }}
                    error={showErrorS}
                    helperText={showErrorS && validationErrors.StockCR}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    size='sm'
                    value={PrecioCR}
                    label='Precio del Elemento'
                    sx={{ width: '100%' }}
                    placeholder='Precio del Elemento'
                    onChange={e => {
                      setPrecioCR(e.target.value)
                      setShowErrorP(false)
                    }}
                    error={showErrorP}
                    helperText={showErrorP && validationErrors.PrecioCR}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions className='dialog-actions-dense'>
            <Button onClick={handleClose}>Cerrar</Button>
            <Button type='button' onClick={CreateAction} variant='contained'>
              Agregar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
