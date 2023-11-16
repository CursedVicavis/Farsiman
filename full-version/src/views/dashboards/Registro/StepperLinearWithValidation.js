// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'

import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
// ** MUI Imports
import MUIDataTable from 'mui-datatables'
import { Stack } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { styled, useTheme } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Fab from '@mui/material/Fab'
import { useRouter } from 'next/router'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import CustomInput from './PickersCustomInput'
import CustomChip from 'src/@core/components/mui/chip'
import CustomRadioIcons from 'src/@core/components/custom-radio/icons'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import DialogForm from 'src/views/components/dialogs/DialogFormDireccionesCreateRegistro'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import CartaPaquetes from 'src/views/ui/cards/basic/CartaPaquetesRegistro'
import Dialog from '@mui/material/Dialog'
import ReportePedido from 'src/views/dashboards/Facturas/ReportePedido'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { startOfToday } from 'date-fns'
import { differenceInMinutes } from 'date-fns'
import { format } from 'date-fns'
import moment from 'moment'

axios.defaults.baseURL = process.env.REACT_APP_API_URL
const data = [
  {
    isSelected: true,
    value: '1',
    title: 'Paquete Básico',
    content: 'Paquete básico para una reunión informal con amigos o familia'
  },
  {
    value: '2',
    title: 'Paquete Estándar',
    content: 'Paquete estándar para un concierto'
  },
  {
    value: '3',
    title: 'Paquete Premium',
    content: 'Paquete premium un evento muy grande con una capacidad de 300 personas'
  }
]

const Servicios = [
  {
    name: 'serv_Id',
    label: 'Servicio ID'
  },
  {
    name: 'prov_Servicio',
    label: 'Nombre Servicio'
  },
  {
    name: 'Eliminar',
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        const rowId = tableMeta.rowData[0]

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mx: 1 }}></Box>
            <Fab color='error' aria-label='delete' size='small' onClick={() => handleClickDelete2(rowId)}>
              <Icon icon='tabler:trash' />
            </Fab>
          </Box>
        )
      }
    }
  }
]

const ImgWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 4, 0, 4)
  },
  [theme.breakpoints.up('sm')]: {
    height: 250,
    padding: theme.spacing(5, 5, 0, 5)
  },
  '& img': {
    height: 'auto',
    maxWidth: '100%'
  }
}))

const steps = [
  {
    title: 'Cliente',
    subtitle: 'Datos del cliente'
  },
  {
    title: 'Evento',
    subtitle: 'Informacion del evento'
  },
  {
    title: 'Paquete',
    subtitle: 'Paquetes para eventos'
  },
  {
    title: 'Servicios/Inventario',
    subtitle: 'Servicios o cosas del inventario'
  },
  {
    title: 'Factura',
    subtitle: 'Generar factura'
  }
]

const defaultAccountValues = {
  Nombre: '',
  Apellidos: '',
  DNI: '',
  Telefono: '',
  Sexo: ''
}

const defaultPersonalValues = {
  Evento: '',
  FechaInicio: new Date(),
  FechaFin: new Date(),
  Direccion: ''
}

const accountSchema = yup.object().shape({
  Nombre: yup.string().required(),
  Apellidos: yup.string().required(),
  DNI: yup.string().min(13).required(),
  Telefono: yup.string().min(8).required(),
  Sexo: yup.string().required()
})

const personalSchema = yup.object().shape({
  Evento: yup.string().required('Debe ingresar el nombre del evento'),
  FechaInicio: yup.date().required('Debe ingresar la fecha de inicio'),
  FechaFin: yup
    .date()
    .required('Debe ingresar la fecha de fin')
    .test('notEqual', 'Las fechas no pueden ser iguales', function (value) {
      const fechaInicio = this.parent.FechaInicio
      const fechaFin = value
      return fechaInicio !== fechaFin
    }),
  Direccion: yup.string().required('Debe elegir una dirección')
})

const StepperLinearWithValidation = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0)
  const [time, setTime] = useState(new Date())
  const [dateTime, setDateTime] = useState(new Date())

  const [ClienteDdl, setClienteDdl] = useState([]) //ddl Departemento
  const [Cliente, setCliente] = useState('')

  const [DireccionesDdL, setDireccionesDdL] = useState([]) //ddl Departemento
  const [Direcciones, setDirecciones] = useState('')

  const [ImportantId, setImportantId] = useState([])

  const [selectedDireccion, setSelectedDireccion] = useState(null)
  const [FechaInicio, setFechaInicio] = useState(new Date())
  const [FechaFin, setFechaFin] = useState(new Date())

  const handleNombrePaqueteChange = event => {
    setNombrePaquete(event.target.value)
  }

  const [NombrePaquete, setNombrePaquete] = useState('')

  const [disabled, setDisabled] = useState(false)

  const [value, setValue] = useState('checked')

  const theme = useTheme()

  const [sexo, setSexo] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  const [Checked, setChecked] = useState(false)
  const [showCheckbox, setShowCheckbox] = useState(false)
  const [disabledEdit, setdisabledEdit] = useState(false)

  const [listServicios, setServicios] = useState([])
  const [listElementos, setElementos] = useState([])

  const [disabledbtn, setdisabledbtn] = useState(true)
  const [showbtnConfirmar, setshowbtnConfirmar] = useState(true)
  const [PedidoId, setPedidoId] = useState('')
  const [evnt_Id, setevnt_Id] = useState('')

  const [disabledTab2, setdisabledTab2] = useState(false)

  const [Inventario, setInventario] = useState('')
  const [InventarioDdl, setInventarioDdl] = useState([])
  const [cantidadInve, setcantidadInve] = useState('')

  const [disabledRadios, setdisabledRadios] = useState(false)
  const [paquetes, setPaquetes] = useState([])
  const URL = 'https://localhost:44393/api/PaqueteDetalles/ListarPaquetesDetalles'

  const [disableCantidad, setdisableCantidad] = useState(true)

  const [PaqueteSeleccionado, setPaqueteSeleccionado] = useState('')

  const [Servicio, setServicio] = useState('')
  const [ServicioDdl, setServicioDdl] = useState([])

  const [CantidadInvSel, setCantidadInvSel] = useState('')

  const [disabledAll, setdisabledAll] = useState(true)
  const [Subt, setSubt] = useState('')
  const [ISV, setISV] = useState('')
  const [Total, setTotal] = useState('')

  const [disableb, setdisableb] = useState(true)

  const [CheckedT3, setCheckedT3] = useState(false)
  const [showCheckboxT3, setshowCheckboxT3] = useState(false)

  const [MetodosDePagoDdl, setMetodosDePagoDdl] = useState([]) //ddl Departemento
  const [MetodosDePago, setMetodosDePago] = useState('')
  const [factura_Id, setfactura_Id] = useState('')

  const handleDateChange = newValue => {
    setStartDate(newValue)
  }

  const InventarioCol = [
    {
      name: 'inve_Id',
      label: 'Elemento ID'
    },
    {
      name: 'inve_Elemento',
      label: 'Nombre Elemento'
    },
    {
      name: 'inve_Precio',
      label: 'Precio del elemento'
    },
    {
      name: 'pede_Cantidad',
      label: 'Cantidad'
    },
    {
      name: 'total',
      label: 'Total'
    },
    {
      name: 'Eliminar',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowId = tableMeta.rowData[0]
          const cantidad = tableMeta.rowData[3]
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mx: 1 }}></Box>
              <Fab color='error' aria-label='delete' size='small' onClick={() => handleClickDelete(rowId, cantidad)}>
                <Icon icon='tabler:trash' />
              </Fab>
            </Box>
          )
        }
      }
    }
  ]

  const Servicios = [
    {
      name: 'serv_Id',
      label: 'Servicio ID'
    },
    {
      name: 'prov_Servicio',
      label: 'Nombre Servicio'
    },
    {
      name: 'Eliminar',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowId = tableMeta.rowData[0]
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mx: 1 }}></Box>
              <Fab color='error' aria-label='delete' size='small' onClick={() => handleClickDelete2(rowId)}>
                <Icon icon='tabler:trash' />
              </Fab>
            </Box>
          )
        }
      }
    }
  ]

  const handleClickDelete = (rowId, cantidad) => {
    let payload = {
      pedi_Id: PedidoId,
      pede_IPS: rowId
    }
    axios.post('https://localhost:44393/api/Pedidos_Detalles/EliminarElementoInventario', payload).then(response => {
      if (response.data.data.codeStatus == 1) {
        toast.success('Elemente eliminado correctamente', {
          duration: 4000
        })
        let datos = {
          pede_IPS: rowId,
          pede_Cantidad: cantidad
        }
        axios.post('https://localhost:44393/api/Pedidos_Detalles/ListarPrecioInventario', datos).then(r => {
          console.log(r.data.data.inve_Precio_Nuevo)
          setSubt(Subt => +Subt - parseFloat(r.data.data.inve_Precio_Nuevo))
        })
        ActualizarTablaInventario()
      } else {
        toast.error('Error al eliminar el elemento del inventario', {
          duration: 4000
        })
      }
    })
  }

  const handleClickDelete2 = rowId => {
    let payload = {
      pedi_Id: PedidoId,
      pede_IPS: rowId
    }
    axios.post('https://localhost:44393/api/Pedidos_Detalles/EliminarServicioPedido', payload).then(response => {
      if (response.data.data.codeStatus == 1) {
        toast.success('Elemento eliminado correctamente', {
          duration: 4000
        })
        let datos = {
          pede_IPS: rowId
        }
        axios.post('https://localhost:44393/api/Pedidos_Detalles/ListarPrecioServicio', datos).then(r => {
          console.log(r.data.data.serv_Precio_Nuevo)
          setSubt(Subt => +Subt - parseFloat(r.data.data.serv_Precio_Nuevo))
        })
        ActualizarTablaServicio()
        CargarDdlServicio()
      } else {
        toast.error('Error al eliminar el servicio', {
          duration: 4000
        })
      }
    })
  }

  const handleSubmit = () => {
    let payload2 = {
      paqt_Nombre: NombrePaquete,
      paqt_UsuarioCreador: localStorage.getItem('IDUsuario')
    }
    axios
      .post('https://localhost:44393/api/PaquetesEncabezado/InsertarNombrePaquete', JSON.stringify(payload2))
      .then(S => {
        console.log(S)
        if (S.data.data.resultado === 'Existe') {
          toast.error('Ya existe un Paquete con ese Nombre', {
            duration: 4000
          })
        }
      })
  }

  const [CheckedT2, setCheckedT2] = useState(false)
  const [showCheckboxT2, setShowCheckboxT2] = useState(false)

  const {
    reset: accountReset,
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors }
  } = useForm({
    defaultValues: defaultAccountValues,
    resolver: yupResolver(accountSchema)
  })

  const {
    reset: personalReset,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema)
  })

  const {
    reset: socialReset,
    control: socialControl,
    handleSubmit: handleSocialSubmit,
    formState: { errors: socialErrors }
  } = useForm({})

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    accountReset({ Nombre: '', Apellidos: '', DNI: '', Telefono: '', Sexo: '' })
    defaultPersonalValues.FechaInicio = new Date()
    defaultPersonalValues.FechaFin = new Date()
  }

  const onSubmit1 = data => {
    let payload2 = {
      clie_Nombres: data.Nombre,
      clie_ApellIdos: data.Apellidos,
      clie_Sexo: data.Sexo,
      clie_Telefono: data.Telefono,
      clie_DNI: data.DNI,
      clie_UsuarioCreador: localStorage.getItem('IDUsuario')
    }
    let payload3 = {
      clie_Id: ImportantId,
      clie_Nombres: data.Nombre,
      clie_ApellIdos: data.Apellidos,
      clie_Sexo: data.Sexo,
      clie_Telefono: data.Telefono,
      clie_DNI: data.DNI,
      clie_UsuarioModificador: localStorage.getItem('IDUsuario')
    }

    if (Checked) {
      axios.post('https://localhost:44393/api/Registro/EditarClienteRegistro', payload3).then(r2 => {
        if (r2.data.data.clie_DNI == 'Editado') {
          setDisabled(true)
          setChecked(false)
          setActiveStep(activeStep + 1)
          toast.success('Cliente editado con exito', {
            duration: 4000
          })
        } else {
          setDisabled(true)
          setChecked(false)
          setActiveStep(activeStep + 1)
        }
      })
    } else {
      axios.post('https://localhost:44393/api/Clientes/InsertarClientesRegistro', payload2).then(r => {
        if (r.data.data.clie_DNI == 'Existe' && isChecked && !disabled && disabledEdit) {
          toast.error('Ya existe un cliente con ese DNI', {
            duration: 4000
          })
        } else {
          if (r.data.data.clie_DNI == 'Existe' && isChecked && disabled) {
            setImportantId(r.data.data.clie_Id)
            setActiveStep(activeStep + 1)
            setShowCheckbox(true)
          } else {
            if (r.data.data.clie_DNI == 'Existe' && !isChecked) {
              setImportantId(r.data.data.clie_Id)
              setDisabled(true)
              setShowCheckbox(true)
              setActiveStep(activeStep + 1)
            } else {
              if (r.data.data.clie_DNI == 'Creado') {
                setImportantId(r.data.data.clie_Id)
                setShowCheckbox(true)
                setActiveStep(activeStep + 1)
                toast.success('Cliente agregado con exito', {
                  duration: 4000
                })
                setDisabled(true)
              } else {
                toast.error('Ya existe un cliente con ese id', {
                  duration: 4000
                })
              }
            }
          }
        }
      })
    }
  }

  const onSubmit2 = data => {
    if (CheckedT2) {
      const fechaInicio = moment(data.FechaInicio, 'DD/MM/YYYY hh:mm A').format('YYYY-MM-DDTHH:mm:ss')
      const fechaFin = moment(data.FechaFin, 'DD/MM/YYYY hh:mm A').format('YYYY-MM-DDTHH:mm:ss')
      let payload5 = {
        PedidoId: PedidoId,
        evnt_Id: evnt_Id,
        evnt_Descri: data.Evento,
        evnt_UsuarioModificador: localStorage.getItem('IDUsuario'),
        clie_Id: ImportantId,
        dire_Id: data.Direccion,
        pedi_Inicio: fechaInicio,
        pedi_Final: fechaFin
      }
      axios.post('https://localhost:44393/api/Registro/EditarEventoPedido', payload5).then(r => {
        if (r.data.data.clie_Nombres == 'Editado') {
          toast.success('Información del evento editada correctamente', {
            duration: 4000
          })
          setActiveStep(activeStep + 1)
          setdisabledTab2(true)
          setCheckedT2(false)
          CargarDdlServicio()
        } else {
          if (r.data.data.clie_Nombres == 'SameData') {
            setActiveStep(activeStep + 1)
            setdisabledTab2(true)
            setCheckedT2(false)
          } else {
            toast.error('Error al editar los datos', {
              duration: 4000
            })
          }
        }
      })
    } else {
      const fechaInicio = moment(data.FechaInicio, 'DD/MM/YYYY hh:mm A').format('YYYY-MM-DDTHH:mm:ss')
      const fechaFin = moment(data.FechaFin, 'DD/MM/YYYY hh:mm A').format('YYYY-MM-DDTHH:mm:ss')
      if (fechaInicio === fechaFin) {
        toast.error('La fecha de fin debe ser posterior a la fecha de inicio', {
          duration: 4000
        })
      } else {
        let payload = {
          evnt_Descri: data.Evento,
          evnt_UsuarioCreador: localStorage.getItem('IDUsuario'),
          clie_Id: ImportantId,
          dire_Id: data.Direccion,
          pedi_Inicio: fechaInicio,
          pedi_Final: fechaFin
        }
        axios.post('https://localhost:44393/api/Registro/InsertarEventoPedido', payload).then(r => {
          if (r.data.data.clie_Nombres == 'SameData') {
            setActiveStep(activeStep + 1)
            setdisabledTab2(true)
            setShowCheckboxT2(true)
          } else {
            if (r.data.data.dire_Id == 0) {
              toast.error('Error al insertar los datos', {
                duration: 4000
              })
            } else {
              setPedidoId(r.data.data.dire_Id)
              setevnt_Id(r.data.data.evnt_Id)
              setActiveStep(activeStep + 1)
              setdisabledTab2(true)
              setShowCheckboxT2(true)
              CargarDdlServicio()
              toast.success('Eventos creado exitosamente!', {
                duration: 4000
              })
            }
          }
        })
      }
    }
  }

  const updateData = () => {
    axios
      .get('https://localhost:44393/api/Direcciones/ListarDirecciones')
      .then(response => response.data)
      .then(data => {
        const mappedData = data.map(c => ({
          code: c.dire_Id,
          name: c.dire_Descripcion,
          Depa: c.dept_Descripcion,
          Muni: c.muni_Descripcion
        }))

        setDireccionesDdL(mappedData)
        setSelectedDireccion(mappedData[mappedData.length - 1].code)
      })
      .catch(error => console.error(error))
  }

  const CargarDdlMetodoDePago = () => {
    axios
      .get('https://localhost:44393/api/TipoDePago/ListarTipoDePago')
      .then(response => response.data)
      .then(data => setMetodosDePagoDdl(data.map(c => ({ code: c.pago_id, name: c.pago_Descripcion }))))
      .catch(error => console.error(error))
  }

  const onSubmit3 = () => {
    if (selectedRadio != null) {
      if (PaqueteSeleccionado != '') {
        let payload = {
          pedi_Id: PedidoId,
          pede_UsuarioCreador: localStorage.getItem('IDUsuario'),
          pede_IPS: PaqueteSeleccionado
        }
        axios.post('https://localhost:44393/api/Pedidos_Detalles/InsertarPaquetePedido', payload).then(r => {
          if ((r.data.data.codeStatus = 1)) {
            toast.success('Paquete agregado exitosamente a su pedido!', {
              duration: 4000
            })
            console.log('llego al submit')
            CargarDdlMetodoDePago()
            setRadioButtonsDisabled(true)
            setCheckedT3(false)
            setdisabledRadios(true)
            setActiveStep(activeStep + 1)
            ActualizarTablaInventario()
            setshowCheckboxT3(true)
            CargarDdlServicio()
          } else {
            console.log('else del insertar')
            CargarDdlMetodoDePago()
            setActiveStep(activeStep + 1)
            setdisabledRadios(true)
            setCheckedT3(false)
            setshowCheckboxT3(true)
            ActualizarTablaInventario()
            CargarDdlServicio()
          }
        })
      } else {
        console.log('else del paquete seleccionado')
        CargarDdlMetodoDePago()
        setActiveStep(activeStep + 1)
        setdisabledRadios(true)
        setCheckedT3(false)
        setshowCheckboxT3(true)
        ActualizarTablaInventario()
        CargarDdlServicio()
      }
    } else {
      console.log('else del paquete selectedradio')
      CargarDdlMetodoDePago()
      setRadioButtonsDisabled(true)
      setCheckedT3(false)
      setdisabledRadios(true)
      setActiveStep(activeStep + 1)
      ActualizarTablaInventario()
      setshowCheckboxT3(true)
      CargarDdlServicio()
    }
  }

  const ActualizarTablaInventario = async () => {
    let payload = {
      pedi_Id: PedidoId
    }
    axios.post('https://localhost:44393/api/Pedidos_Detalles/ListarElementosInventario', payload).then(r => {
      setElementos(r.data)
    })
  }

  const ActualizarTablaServicio = async () => {
    let payload = {
      pedi_Id: PedidoId
    }
    axios.post('https://localhost:44393/api/Pedidos_Detalles/ListarServiciosTabla', payload).then(r => {
      setServicios(r.data)
    })
  }

  const initialIconSelected = data.filter(item => item.isSelected)[data.filter(item => item.isSelected).length - 1]
    .value

  const icons = [
    {
      icon: 'tabler:discount-check',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:credit-card',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:diamond',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:award-filled',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:bottle',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:brand-apple-arcade',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:brand-my-oppo',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:brightness-up',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:packages',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:discount-check',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:credit-card',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:diamond',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:award-filled',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:bottle',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:brand-apple-arcade',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:brand-my-oppo',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:brightness-up',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:packages',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:discount-check',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:credit-card',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:diamond',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:award-filled',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:bottle',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:brand-apple-arcade',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:brand-my-oppo',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:brightness-up',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:packages',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:discount-check',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:credit-card',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:diamond',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:award-filled',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:bottle',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:brand-apple-arcade',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:brand-my-oppo',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:brightness-up',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:packages',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:discount-check',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:credit-card',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:diamond',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:award-filled',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:bottle',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:brand-apple-arcade',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:brand-my-oppo',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:brightness-up',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:packages',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    }
  ]
  const [selectedRadio, setSelectedRadio] = useState(initialIconSelected)

  const handleRadioChange = event => {
    if (!event || !event.target || radioButtonsDisabled) {
      return
    }
    setSelectedRadio(event.target.value)
    console.log(event.target.value)
    setPaqueteSeleccionado(event.target.value)
    let datos = {
      pede_IPS: event.target.value
    }
    axios.post('https://localhost:44393/api/Pedidos_Detalles/ListarPrecioPaquete', datos).then(r => {
      console.log(r.data.data.paqt_Precio)
      setSubt(Subt => +Subt + +r.data.data.paqt_Precio)
      console.log('handle radio change')
    })
  }

  const columns = [
    {
      name: 'muni_Id',
      label: 'Servicios'
    },
    {
      name: 'muni_Descripcion',
      label: 'Elementos del inventario'
    }
  ]

  const handleCheckboxChange = event => {
    setIsChecked(event.target.checked)
    if (!isChecked) {
      setCliente('')
      accountReset(defaultAccountValues)
    } else {
      accountReset(defaultAccountValues)
    }
  }

  const [selectedClient, setSelectedClient] = useState(null)
  const AsignarValoresClientes = clie_Id => {
    axios
      .post('https://localhost:44393/api/Clientes/ListarClientesId', { clie_Id })
      .then(response => {
        localStorage.getItem('IDUsuario')
        setSelectedClient(response.data)
        console.log(response.data)
      })
      .catch(error => console.error(error))
  }
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('IDUsuario') == null || localStorage.getItem('IDUsuario') == '') {
      router.push('/pages/auth/login-v2/')
    }
    setSubt(0)
    axios
      .get('https://localhost:44393/api/Inventario/ListarInventario')
      .then(response => response.data)
      .then(data =>
        setInventarioDdl(data.map(c => ({ code: c.inve_Id, name: c.inve_Elemento, precio: c.inve_Precio })))
      )
      .catch(error => console.error(error))

    axios
      .get('https://localhost:44393/api/Clientes/ListarClientes')
      .then(response => response.data)
      .then(data => setClienteDdl(data.map(c => ({ code: c.clie_Id, name: c.clie_Nombres, DNI: c.clie_DNI }))))
      .catch(error => console.error(error))

    axios
      .get('https://localhost:44393/api/Direcciones/ListarDirecciones')
      .then(response => response.data)
      .then(data =>
        setDireccionesDdL(
          data.map(c => ({
            code: c.dire_Id,
            name: c.dire_Descripcion,
            Depa: c.dept_Descripcion,
            Muni: c.muni_Descripcion
          }))
        )
      )
      .catch(error => console.error(error))

    setIsChecked(false)

    const fetchData = async () => {
      const response = await fetch(URL)
      const data = await response.json()
      // Agrupar paquetes por paqt_Id y recopilar todos los servicios y elementos

      const paquetesAgrupados = data.reduce((result, paquete) => {
        if (!result[paquete.paqt_Id]) {
          // si este paquete aún no existe, crearlo con información básica
          result[paquete.paqt_Id] = {
            paqt_Id: paquete.paqt_Id,
            paqt_Nombre: paquete.paqt_Nombre,
            paqt_Precio: paquete.paqt_Precio,
            servicios: paquete.prov_Servicio ? [paquete.prov_Servicio] : [],
            elementos: paquete.inve_Elemento ? [{ nombre: paquete.inve_Elemento, cantidad: paquete.pqsv_Cantidad }] : []
          }
        }
        if (paquete.inve_Elemento) {
          // si hay elemento, agregarlo a la lista de elementos del paquete con su cantidad
          result[paquete.paqt_Id].elementos.push({ nombre: paquete.inve_Elemento, cantidad: paquete.pqsv_Cantidad })
        }
        return result
      }, {})
      // Convertir los paquetes agrupados en una matriz y establecerla en el estado
      const paquetesArray = Object.values(paquetesAgrupados)
      setPaquetes(paquetesArray)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (selectedClient) {
      const { clie_Nombres, clie_ApellIdos, clie_DNI, clie_Telefono, clie_Sexo } = selectedClient[0]
      accountReset({
        Nombre: clie_Nombres,
        Apellidos: clie_ApellIdos,
        DNI: clie_DNI,
        Telefono: clie_Telefono,
        Sexo: clie_Sexo
      })
    } else {
      accountReset(defaultAccountValues)
    }
  }, [selectedClient, accountControl, accountReset, defaultAccountValues])

  const actuFecha = FechaInicio => {
    setFechaInicio(FechaInicio)
  }

  const actuFecha2 = FechaFin => {
    setFechaFin(FechaFin)
  }

  const handleAction = event => {
    setChecked(event.target.checked)

    if (Checked) {
      setIsChecked(false)
    } else {
      setdisabledEdit(true)
      setDisabled(false)
      setIsChecked(true)
    }
  }

  const handleActionTab2 = event => {
    setCheckedT2(event.target.checked)

    if (!CheckedT2) {
      setdisabledTab2(false)
    } else {
      setdisabledTab2(true)
    }
  }

  const data1 = paquetes.map(paquete => ({
    isSelected: true,
    value: paquete.paqt_Id,
    title: paquete.paqt_Nombre,
    content: (
      <>
        <Typography variant='body1'>Precio: {paquete.paqt_Precio}</Typography>
        <Typography variant='body1'>Servicios: {paquete.servicios.join(', ')}</Typography>
        <Typography variant='body1'>Elementos añadidos:</Typography>
        <ul>
          {paquete.elementos.map(e => (
            <li key={e.nombre}>
              {e.nombre} ({e.cantidad})
            </li>
          ))}
        </ul>
      </>
    )
  }))

  const [value2, setValue2] = useState('1')

  const handleChange2 = (event, newValue) => {
    setValue2(newValue)
  }

  const AgregarInve = () => {
    if (cantidadInve == '') {
      toast.error('Debe ingresar una cantidad de inventario', {
        duration: 4000
      })
    } else {
      if (cantidadInve <= 0) {
        toast.error('la cantidad no puede ser menor o igual a cero', {
          duration: 4000
        })
        ActualizarTablaInventario()
        setdisableCantidad(true)
        setcantidadInve('')
        setInventario('')
        setdisableb(true)
      } else {
        let payload = {
          pedi_Id: PedidoId,
          pede_IPS: Inventario,
          pede_Prefijo: 'I',
          pede_Cantidad: cantidadInve,
          pede_UsuarioCreador: localStorage.getItem('IDUsuario')
        }
        axios.post('https://localhost:44393/api/Pedidos_Detalles/AgregarElementoPedido', payload).then(r => {
          if (r.data.data.codeStatus == 1) {
            let datos = {
              pede_IPS: Inventario,
              pede_Cantidad: cantidadInve
            }
            axios.post('https://localhost:44393/api/Pedidos_Detalles/ListarPrecioInventario', datos).then(r => {
              console.log(r.data.data.inve_Precio_Nuevo)
              setSubt(Subt => +Subt + parseInt(r.data.data.inve_Precio_Nuevo))
            })
            toast.success('Elemento agregado exitosamente a su pedido!', {
              duration: 4000
            })
            ActualizarTablaInventario()
            setdisableCantidad(true)
            setcantidadInve('')
            setInventario('')
            setdisableb(true)
          } else {
            if (r.data.data.codeStatus == 3) {
              toast.error('La cantidad digitada es mayor al stock de nuestro inventario', {
                duration: 4000
              })
              setdisableCantidad(true)
              setcantidadInve('')
              setInventario('')
            } else {
              toast.error('Error al agregar el elemento', {
                duration: 4000
              })
              setdisableCantidad(true)
              setcantidadInve('')
              setInventario('')
            }
          }
        })
      }
    }
  }

  useEffect(() => {
    setISV(Subt * 0.15)
    setTotal(Subt + Subt * 0.15)
  }, [Subt])

  const AgregarServicioPedido = () => {
    if (Servicio == '') {
      toast.error('Debe seleccionar un servicio', {
        duration: 4000
      })
    } else {
      let payload = {
        pedi_Id: PedidoId,
        pede_IPS: Servicio,
        pede_UsuarioCreador: localStorage.getItem('IDUsuario')
      }
      axios.post('https://localhost:44393/api/Pedidos_Detalles/AgregarSerivicioPedidos', payload).then(r => {
        if (r.data.data.codeStatus == 1) {
          let datos = {
            pede_IPS: Servicio
          }
          axios.post('https://localhost:44393/api/Pedidos_Detalles/ListarPrecioServicio', datos).then(r => {
            console.log(r.data.data.serv_Precio_Nuevo)
            setSubt(Subt => +Subt + +r.data.data.serv_Precio_Nuevo)
            setISV(ISV => Subt * 0.15)
            setTotal(Total => ISV + Subt)
          })
          toast.success('Servicio agregado exitosamente a su pedido!', {
            duration: 4000
          })
          ActualizarTablaServicio()
          CargarDdlServicio()
          setServicio('')
        } else {
          toast.error('Error al agregar el servicio', {
            duration: 4000
          })
        }
      })
    }
  }

  const CargarDdlServicio = () => {
    let payload = {
      pedi_Id: PedidoId
    }
    axios
      .post('https://localhost:44393/api/Pedidos_Detalles/ListarServicios', payload)
      .then(response => response.data)
      .then(data => setServicioDdl(data.map(c => ({ code: c.serv_Id, name: c.prov_Servicio }))))
      .catch(error => console.error(error))
  }

  const [radioButtonsDisabled, setRadioButtonsDisabled] = useState(false)
  const handleActionTab3 = event => {
    setCheckedT3(event.target.checked)

    if (CheckedT3) {
      console.log(CheckedT3)
      console.log('XDD')
      setRadioButtonsDisabled(true)
      setPaqueteSeleccionado('')
      handleRadioChange()
    } else {
      if (selectedRadio != null) {
        let payload = {
          pedi_Id: PedidoId,
          pede_IPS: selectedRadio
        }
        let datos = {
          pede_IPS: selectedRadio
        }
        axios.post('https://localhost:44393/api/Pedidos_Detalles/ListarPrecioPaquete', datos).then(r => {
          setSubt(Subt => +Subt - parseFloat(r.data.data.paqt_Precio))
          axios.post('https://localhost:44393/api/Pedidos_Detalles/EliminarPaquetePedido', payload).then(r => {})
        })
        console.log('XDD')
        setSelectedRadio(null)
        setRadioButtonsDisabled(false)
      }
      setSelectedRadio(null)
      setRadioButtonsDisabled(false)
    }
  }

  const onSubmit4 = e => {
    setEditDialogOpen(true)
    e.preventDefault()
  }

  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const handleDialogToggle = () => {
    setEditDialogOpen(!editDialogOpen)
  }

  const [MetodosDePago1, setMetodosDePago1] = useState('')
  const [selectError, setSelectError] = useState(false)

  const ConfirmarFactura = () => {
    if (selectedRadio === null && Subt === 0 && MetodosDePago === '') {
      setEditDialogOpen(false)
      toast.error('Debe agregar detalles a su pedido y seleccionar un método de pago', {
        duration: 4000
      })
      return
    }

    if (Subt === 0) {
      setEditDialogOpen(false) // se agrega para cerrar el modal
      toast.error('Debe agregar detalles a su pedido!', {
        duration: 4000
      })
      return
    }

    if (MetodosDePago === '') {
      setSelectError(true)
      return
    }

    let datos = {
      pedi_Id: PedidoId,
      pago_Id: MetodosDePago,
      fact_SubTotal: Subt,
      fact_Impuesto: ISV,
      fact_Total: Total,
      fact_UsuarioCreador: localStorage.getItem('IDUsuario')
    }
    axios.post('https://localhost:44393/api/Facturas/InsertarFactura', datos).then(r => {
      if (r.data.data.factura_Id != -1000) {
        toast.success('Evento creado con exito, ¡disfrute con Event Company!', {
          duration: 4000
        })
        setfactura_Id(r.data.data.factura_Id)
        console.log(r.data.data.factura_Id)
        setEditDialogOpen(false)
        setActiveStep(activeStep + 1)
      } else {
        toast.success('Ha ocurrido un error al insertar el pedido!', {
          duration: 4000
        })
      }
    })
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleAccountSubmit(onSubmit1)}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  label='¿Desea agregar un cliente?'
                  control={
                    <Checkbox
                      name='basic-unchecked'
                      disabled={disabled || disabledEdit}
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='select-payment-method'>Clientes</InputLabel>
                  <Select
                    labelId='Cliente'
                    id='Cliente'
                    value={Cliente}
                    disabled={disabled || isChecked || disabledEdit}
                    onChange={e => {
                      setCliente(e.target.value)
                      AsignarValoresClientes(e.target.value)
                    }}
                    label='Clientes'
                  >
                    {ClienteDdl.map(clie => (
                      <MenuItem key={clie.code} value={clie.code}>
                        {clie.name + ',DNI: ' + clie.DNI}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <br></br>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='Nombre'
                    control={accountControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Nombres'
                        onChange={onChange}
                        placeholder='Ingrese sus apellidos'
                        error={Boolean(accountErrors.Nombre)}
                        aria-describedby='stepper-linear-account-username'
                        disabled={!isChecked || disabled}
                      />
                    )}
                  />
                  {accountErrors.Nombre && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                      Debe ingresar el nombre del cliente
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='Apellidos'
                    control={accountControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Apellidos'
                        onChange={onChange}
                        placeholder='Ingrese sus apellidos'
                        error={Boolean(accountErrors.Apellidos)}
                        disabled={!isChecked || disabled}
                        aria-describedby='stepper-linear-account-username'
                      />
                    )}
                  />
                  {accountErrors.Apellidos && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                      Debe ingresar los apellidos del cliente
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='DNI'
                    control={accountControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Numero de identidad'
                        disabled={!isChecked || disabled}
                        onChange={onChange}
                        inputProps={{ maxLength: 13 }}
                        placeholder='Ingresa tu numero de identidad'
                        error={Boolean(accountErrors.DNI)}
                        aria-describedby='stepper-linear-account-username'
                      />
                    )}
                  />
                  {accountErrors.DNI && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                      Debe ingresar el DNI del cliente
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='Telefono'
                    control={accountControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        disabled={!isChecked || disabled}
                        label='Telefóno'
                        inputProps={{ maxLength: 8 }}
                        onChange={onChange}
                        placeholder='Ingrese su numero de telefono'
                        error={Boolean(accountErrors.Telefono)}
                        aria-describedby='stepper-linear-account-username'
                      />
                    )}
                  />
                  {accountErrors.Telefono && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                      Debe ingresar el numero de telefono del cliente
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='Sexo'
                    control={accountControl}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <RadioGroup
                        row
                        value={value}
                        name='simple-radio'
                        disabled={!isChecked || disabled}
                        onChange={event => {
                          setSexo(event.target.value)
                          onChange(event.target.value)
                        }}
                        onBlur={onBlur}
                        aria-label='simple-radio'
                      >
                        <FormControlLabel
                          value='F'
                          disabled={!isChecked || disabled}
                          control={<Radio />}
                          label='Femenino'
                        />
                        <FormControlLabel
                          value='M'
                          disabled={!isChecked || disabled}
                          control={<Radio />}
                          label='Masculino'
                        />
                      </RadioGroup>
                    )}
                  />
                  {accountErrors.Sexo && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                      Debe seleccionar el sexo del cliente
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <br></br>
              <Grid item xs={12} sm={8} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' type='submit' variant='contained'>
                  Siguiente
                </Button>
                {showCheckbox && (
                  <FormControlLabel
                    label='¿Desea editar los datos del cliente?'
                    control={<Checkbox name='basic-unchecked' checked={Checked} onChange={handleAction} />}
                    sx={{ marginLeft: '10px' }}
                  />
                )}
              </Grid>
            </Grid>
          </form>
        )
      case 1:
        return (
          <form key={1} onSubmit={handlePersonalSubmit(onSubmit2)}>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <Typography variant='h5' sx={{ mb: 4 }}>
                  Información del evento
                </Typography>
              </Grid>
              <br></br>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <Controller
                    name='Evento'
                    control={personalControl}
                    rules={personalSchema.fields.Evento}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Evento'
                        onChange={onChange}
                        disabled={disabledTab2}
                        placeholder='Ingresa el nombre del evento'
                        error={Boolean(personalErrors.Evento)}
                        aria-describedby='stepper-linear-account-username'
                      />
                    )}
                  />
                  {personalErrors.Evento && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                      {personalErrors.Evento.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <FormControl fullWidth>
                  <Controller
                    name='FechaInicio'
                    control={personalControl}
                    rules={personalSchema.fields.FechaInicio}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        showTimeSelect
                        timeFormat='HH:mm'
                        timeIntervals={15}
                        disabled={disabledTab2}
                        selected={value}
                        id='FechaInicio'
                        dateFormat='MM/dd/yyyy h:mm aa'
                        onChange={onChange}
                        customInput={<CustomInput label='Fecha y hora de inicio' />}
                        minDate={startOfToday()}
                      />
                    )}
                  />
                  {personalErrors.FechaInicio && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                      {personalErrors.FechaInicio.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <FormControl fullWidth>
                  <Controller
                    name='FechaFin'
                    control={personalControl}
                    rules={personalSchema.fields.FechaFin}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        showTimeSelect
                        timeFormat='HH:mm'
                        timeIntervals={15}
                        disabled={disabledTab2}
                        selected={value}
                        id='FechaFin'
                        dateFormat='MM/dd/yyyy h:mm aa'
                        onChange={onChange}
                        customInput={<CustomInput label='Fecha y hora de fin' />}
                        minDate={startOfToday()}
                      />
                    )}
                  />
                  {personalErrors.FechaFin && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                      {personalErrors.FechaFin.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='Direcciones-label'>Direcciones</InputLabel>
                  <Controller
                    name='Direccion'
                    control={personalControl}
                    rules={{
                      required: 'Debe elegir una dirección',
                      validate: {
                        isValidDireccion: value => {
                          true
                        }
                      }
                    }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        labelId='Direcciones'
                        id='Direcciones'
                        value={value}
                        disabled={disabledTab2}
                        onChange={e => {
                          onChange(e.target.value)
                          setDirecciones(e.target.value)
                        }}
                        label='Direcciones'
                      >
                        {DireccionesDdL.map(dire => (
                          <MenuItem key={dire.code} value={dire.code}>
                            {dire.name + ' - Departamento:' + dire.Depa + ' - Municipio: ' + dire.Muni}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {personalErrors.Direccion && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                      {personalErrors.Direccion.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DialogForm updateData={updateData} id={localStorage.getItem('IDUsuario')} disabled={disabledTab2} />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                  Regresar
                </Button>
                {showCheckboxT2 && (
                  <FormControlLabel
                    label='¿Desea editar los datos del evento?'
                    control={<Checkbox name='basic-unchecked' checked={CheckedT2} onChange={handleActionTab2} />}
                    sx={{ marginLeft: '10px' }}
                  />
                )}
                <Button size='large' type='submit' variant='contained'>
                  Siguiente
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 2:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit3)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <ImgWrapper>
                  <img
                    width={650}
                    alt='illustration'
                    src={`/images/pages/create-deal-type-${theme.palette.mode}.png`}
                  />
                </ImgWrapper>
              </Grid>
              {data1.map((data, index) => (
                <CustomRadioIcons
                  key={index}
                  data={data}
                  icon={icons[index].icon}
                  selected={selectedRadio}
                  disabled={radioButtonsDisabled}
                  name='custom-radios-deal'
                  gridProps={{ sm: 4, xs: 12 }}
                  handleChange={handleRadioChange}
                  iconProps={icons[index].iconProps}
                />
              ))}
            </Grid>
            <br></br>
            <br></br>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                Regresar
              </Button>
              {showCheckboxT3 && (
                <FormControlLabel
                  label='¿Desea cambiar la selección del paquete?'
                  control={<Checkbox name='basic-unchecked' checked={CheckedT3} onChange={handleActionTab3} />}
                  sx={{ marginLeft: '10px' }}
                />
              )}
              <Button size='large' type='submit' variant='contained'>
                Siguiente
              </Button>
            </Grid>
          </form>
        )
      case 3:
        return (
          <div>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant='h4'>Añadir servicios o elementos de nuestro Inventario</Typography>
            </Box>
            <br></br>
            <TabContext value={value2}>
              <Card sx={{ width: '100%', p: 4 }}>
                <TabList centered onChange={handleChange2} aria-label='centered tabs example'>
                  <Tab value='1' label='Inventario' />
                  <Tab value='2' label='Servicio' />
                </TabList>
                <TabPanel value='1'>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <FormControl fullWidth sx={{ width: '49%', mr: 2 }}>
                      <InputLabel id='demo-simple-select-label'>Elemento</InputLabel>
                      <Select
                        labelId='Inventario'
                        id='Inventario'
                        value={Inventario}
                        onChange={e => {
                          setInventario(e.target.value)
                          setdisableCantidad(false)
                          setdisableb(false)
                        }}
                        label='Inventario'
                      >
                        {InventarioDdl.map(inve => (
                          <MenuItem key={inve.code} value={inve.code}>
                            {inve.name + ' Precio: ' + inve.precio}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      id='id'
                      fullWidth
                      type='number'
                      label='Cantidad'
                      disabled={disableCantidad}
                      value={cantidadInve}
                      sx={{ width: '50%', height: '50px' }}
                      inputProps={{
                        min: 0,
                        step: 1
                      }}
                      onChange={e => {
                        if (!isNaN(e.target.value)) {
                          setcantidadInve(e.target.value)
                        }
                      }}
                    />
                  </Box>
                  <br></br>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant='contained'
                      onClick={AgregarInve}
                      disabled={disableb}
                      sx={{ width: '30%', ml: 2, height: '50px' }}
                    >
                      Agregar
                    </Button>
                  </Box>
                  <Box sx={{ mt: 4 }}>
                    <MUIDataTable
                      title='Inventario'
                      data={listElementos}
                      columns={InventarioCol}
                      options={{
                        selectableRows: false,
                        pagination: true,
                        rowsPerPage: 5
                      }}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value='2'>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id='demo-simple-select-label'>Servicios</InputLabel>
                    <Select
                      labelId='Servicios'
                      id='Servicios'
                      value={Servicio}
                      onChange={e => {
                        setServicio(e.target.value)
                        setdisableCantidad(false)
                      }}
                      label='Servicios'
                    >
                      {ServicioDdl.map(serv => (
                        <MenuItem key={serv.code} value={serv.code}>
                          {serv.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <br></br>
                  <br></br>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant='contained' onClick={AgregarServicioPedido} sx={{ width: '30%', height: '50px' }}>
                      Agregar
                    </Button>
                  </div>
                  <Box sx={{ mt: 4 }}>
                    <MUIDataTable
                      title='Servicios'
                      data={listServicios}
                      columns={Servicios}
                      options={{
                        selectableRows: false,
                        pagination: true,
                        rowsPerPage: 5
                      }}
                    />
                  </Box>
                </TabPanel>
              </Card>
              <br></br>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Stack direction='row' spacing={2} alignItems='center'>
                  <TextField
                    id='id'
                    fullWidth
                    type='text'
                    label='Sub total'
                    disabled={disabledAll}
                    value={Subt}
                    InputProps={{
                      sx: { fontWeight: 'bold' }
                    }}
                    onChange={e => {
                      setcantidadInve(e.target.value)
                    }}
                  />
                  <TextField
                    id='id'
                    fullWidth
                    type='text'
                    label='ISV'
                    disabled={disabledAll}
                    value={ISV}
                    InputProps={{
                      sx: { fontWeight: 'bold' }
                    }}
                    onChange={e => {
                      setcantidadInve(e.target.value)
                    }}
                  />
                  <TextField
                    id='id'
                    fullWidth
                    type='text'
                    label='Total'
                    disabled={disabledAll}
                    value={Total}
                    InputProps={{
                      sx: { fontWeight: 'bold' }
                    }}
                    onChange={e => {
                      setcantidadInve(e.target.value)
                    }}
                  />
                </Stack>
              </Box>
            </TabContext>
            <br></br>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                Regresar
              </Button>
              <Button size='large' type='submit' onClick={onSubmit4} variant='contained'>
                Siguiente
              </Button>
            </Grid>

            <Dialog open={editDialogOpen} onClose={handleDialogToggle}>
              <form onSubmit={onSubmit4}>
                <DialogTitle>Confirmar Factura</DialogTitle>
                <DialogContent>
                  <DialogContentText sx={{ mb: 3 }}>
                    Seleccione el metodo de pago para confirmar su pedido
                  </DialogContentText>
                  <Grid container spacing={2} className='select-container'>
                    <Select
                      labelId='MetodoPago-label'
                      id='MetodoPago-select'
                      value={MetodosDePago}
                      onChange={e => {
                        setMetodosDePago(e.target.value)
                        setSelectError(false)
                      }}
                      label='Metodo de pago'
                      placeholder='Seleccione el metodo de pago'
                      fullWidth
                      style={{ minWidth: 200 }}
                      error={selectError}
                    >
                      {MetodosDePagoDdl.map(MP => (
                        <MenuItem key={MP.code} value={MP.code}>
                          {MP.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {selectError && <FormHelperText error>Debe seleccionar un método de pago</FormHelperText>}
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDialogToggle}>Cancelar</Button>
                  <Button type='submit' onClick={ConfirmarFactura}>
                    Confirmar
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </div>
        )
      case 4:
        return (
          <div>
            <ReportePedido PedidoId={PedidoId} factura_Id={factura_Id} />
            <Button href='/dashboards/Facturas/Index'>Salir</Button>
          </div>
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return getStepContent(activeStep)
    }
  }

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps = {}
              if (index === activeStep) {
                labelProps.error = false
                if (
                  (accountErrors.email ||
                    accountErrors.username ||
                    accountErrors.password ||
                    accountErrors['confirm-password']) &&
                  activeStep === 0
                ) {
                  labelProps.error = true
                } else if (
                  (personalErrors.country ||
                    personalErrors.language ||
                    personalErrors['last-name'] ||
                    personalErrors['first-name']) &&
                  activeStep === 1
                ) {
                  labelProps.error = true
                } else if (
                  (socialErrors.google || socialErrors.twitter || socialErrors.facebook || socialErrors.linkedIn) &&
                  activeStep === 2
                ) {
                  labelProps.error = true
                } else if (
                  (socialErrors.google || socialErrors.twitter || socialErrors.facebook || socialErrors.linkedIn) &&
                  activeStep === 3
                ) {
                  labelProps.error = true
                } else if (
                  (socialErrors.google || socialErrors.twitter || socialErrors.facebook || socialErrors.linkedIn) &&
                  activeStep === 4
                ) {
                } else {
                  labelProps.error = false
                }
              }

              return (
                <Step key={index}>
                  <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <Divider sx={{ m: '0 !important' }} />

      <CardContent>{renderContent()}</CardContent>
    </Card>
  )
}

export default StepperLinearWithValidation
