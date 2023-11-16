import toast from 'react-hot-toast'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import { useRouter } from 'next/router'
import Global from 'src/pages/acl/Global'
import DatePicker from 'react-datepicker'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import Icon from 'src/@core/components/icon'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import RadioGroup from '@mui/material/RadioGroup'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Fragment, useState, forwardRef, useEffect } from 'react'
import CustomInput from 'src/views/dashboards/Registro/PickersCustomInput'
import axios from 'axios'
import * as yup from 'yup'
import 'react-datepicker/dist/react-datepicker.css'

const defaultAccountValues = {
  nombre: '',
  apellido: '',
  dni: '',
  estadocivil: '',
  departamento: '',
  municipio: '',
  direccion: '',
  telefono: '',
  dob: '',
  sexo: '',
  correoelectronico: ''
}

const accountSchema = yup.object().shape({
  nombre: yup.string().required(),
  apellido: yup.string().required(),
  dni: yup.string().required(),
  estadocivil: yup.string().required(),
  departamento: yup.string().required(),
  municipio: yup.string().required(),
  direccion: yup.string().required(),
  telefono: yup.string().required(),
  dob: yup.string().required(),
  sexo: yup.string().required(),
  correoelectronico: yup.string().required()
})

const Update = () => {
  const [MunicipioDDL, setMunicipioDDL] = useState([])
  const [Municipio, setMunicipio] = useState('')
  const [EstadoDDL, setEstadoDDL] = useState([])
  const [DepartamentoDDL, setDepartamentoDDL] = useState([]) //ddl Departemento
  const [Deparatemento, setDepartamento] = useState('')
  const [date, setDate] = useState(new Date())

  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  useEffect(() => {
    axios
      .get('http://eventcompany.somee.com/api/Departamentos/ListarDepartamentos')
      .then(response => response.data)
      .then(data => setDepartamentoDDL(data.map(c => ({ code: c.dept_Id, name: c.dept_Descripcion }))))
      .catch(error => console.error(error))

    axios
      .get('http://eventcompany.somee.com/api/EstadosCiviles/ListarEstadosCiviles')
      .then(response => response.data)
      .then(data => setEstadoDDL(data.map(c => ({ code: c.esci_Id, name: c.esci_Descripcion }))))
      .catch(error => console.error(error))
  }, [])

  const ActivarMunicipioDDl = dept_Id => {
    let payload2 = {
      dept_Id: dept_Id,
      dept_Descripcion: ''
    }
    axios
      .post('http://eventcompany.somee.com/api/direcciones/ListarMunicipiosPorDepto', payload2)
      .then(response => response.data)
      .then(data => setMunicipioDDL(data.map(c => ({ code: c.muni_Id, name: c.muni_Descripcion }))))
      .catch(error => console.error(error))
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

  const onSubmit = data => {
    console.log(data)
    CreateAction(data)
  }

  const CreateAction = e => {
    const fecha = new Date(e.dob)

    let payload = {
      empl_DNI: e.dni,
      empl_Nombres: e.nombre,
      empl_Apellidos: e.apellido,
      empl_Sexo: e.sexo,
      esci_Id: e.estadocivil,
      muni_Id: e.municipio,
      empl_direccionExacta: e.direccion,
      empl_FechaNacimiento: fecha,
      empl_Telefono: e.telefono,
      empl_CorreoElectronico: e.correoelectronico
    }

    console.log(payload)

    axios
      .post(Global.url + '/api/Empleados/InsertarEmpleado', payload)
      .then(r => {
        if (r.data.messageStatus === 'Registro agregado exitosamente') {
          toast.success(r.data.messageStatus, {
            duration: 4000
          })
          router.push('/dashboards/Empleados/')
        } else {
          toast.error(r.data.messageStatus, {
            duration: 4000
          })
        }
      })
      .catch(e => console.error(e))
  }

  return (
    <form onSubmit={handleAccountSubmit(onSubmit)}>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='nombre'
              control={accountControl}
              rules={{ required: true }}
              defaultValue={defaultAccountValues.nombre}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='nombre'
                  onChange={onChange}
                  placeholder='Ingrese sus apellido'
                  error={Boolean(accountErrors.nombre)}
                  aria-describedby='stepper-linear-account-username'
                />
              )}
            />

            {accountErrors.nombre && (
              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                Debe ingresar el nombre del cliente
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='apellido'
              control={accountControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='apellido'
                  onChange={onChange}
                  placeholder='Ingrese sus apellido'
                  error={Boolean(accountErrors.apellido)}
                  aria-describedby='stepper-linear-account-username'
                />
              )}
            />
            {accountErrors.apellido && (
              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                Debe ingresar los apellido del cliente
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='dni'
              control={accountControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Numero de identidad'
                  onChange={onChange}
                  inputProps={{ maxLength: 13 }}
                  placeholder='Ingresa tu numero de identidad'
                  error={Boolean(accountErrors.dni)}
                  aria-describedby='stepper-linear-account-dni'
                />
              )}
            />
            {accountErrors.dni && (
              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-dni'>
                Debe ingresar el dni del cliente
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel
              id='validation-basic-estadocivil'
              error={Boolean(accountErrors.estadocivil)}
              htmlFor='validation-basic-estadocivil'
            >
              Estado Civil
            </InputLabel>
            <Controller
              name='estadocivil'
              control={accountControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='estadocivil'
                  onChange={onChange}
                  error={Boolean(accountErrors.estadocivil)}
                  labelId='validation-basic-estadocivil'
                  aria-describedby='validation-basic-estadocivil'
                >
                  {EstadoDDL.map(dept => (
                    <MenuItem key={dept.code} value={dept.code}>
                      {dept.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {accountErrors.estadocivil && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-estadocivil'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel
              id='validation-basic-departamento'
              error={Boolean(accountErrors.departamento)}
              htmlFor='validation-basic-departamento'
            >
              Departamento
            </InputLabel>
            <Controller
              name='departamento'
              control={accountControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={Deparatemento}
                  label='departamento'
                  onChange={e => {
                    setDepartamento(e.target.value)
                    setMunicipio(null) // resetea el valor del campo de selección de municipios
                    ActivarMunicipioDDl(e.target.value)
                    onChange(e.target.value)
                  }}
                  error={Boolean(accountErrors.departamento)}
                  labelId='validation-basic-departamento'
                  aria-describedby='validation-basic-departamento'
                >
                  {DepartamentoDDL.map(dept => (
                    <MenuItem key={dept.code} value={dept.code}>
                      {dept.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {accountErrors.departamento && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-departamento  '>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel
              id='validation-basic-municipio'
              error={Boolean(accountErrors.municipio)}
              htmlFor='validation-basic-municipio'
            >
              municipio
            </InputLabel>
            <Controller
              name='municipio'
              control={accountControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='municipio'
                  onChange={onChange}
                  error={Boolean(accountErrors.municipio)}
                  labelId='validation-basic-municipio'
                  aria-describedby='validation-basic-municipio'
                >
                  {MunicipioDDL.map(dept => (
                    <MenuItem key={dept.code} value={dept.code}>
                      {dept.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {accountErrors.municipio && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-municipio'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Controller
              name='direccion'
              control={accountControl}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  rows={4}
                  multiline
                  {...field}
                  label='Direccion Exacta'
                  error={Boolean(accountErrors.direccion)}
                  aria-describedby='validation-basic-direccion' //este no es
                />
              )}
            />
            {accountErrors.direccion && (
              <FormHelperText
                sx={{ color: 'error.main' }}
                id='validation-basic-direccion' //Ese de abajo tampoco es
              >
                This field is required
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='telefono'
              control={accountControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='telefono'
                  inputProps={{ maxLength: 8 }}
                  onChange={onChange}
                  placeholder='Ingrese su numero de telefono'
                  error={Boolean(accountErrors.telefono)}
                  aria-describedby='stepper-linear-account-username'
                />
              )}
            />
            {accountErrors.telefono && (
              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                Debe ingresar el numero de telefono del cliente
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='dob'
            control={accountControl}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                placeholderText='Click to select a date'
                selected={date}
                id='basic-input'
                popperPlacement={popperPlacement}
                dateFormat='MM/dd/yyyy'
                onChange={e => onChange(e)}
                customInput={
                  <CustomInput
                    value={value}
                    onChange={onChange}
                    label='Date of Birth'
                    error={Boolean(accountErrors.dob)}
                    aria-describedby='validation-basic-dob'
                  />
                }
              />
            )}
          />
          {accountErrors.dob && (
            <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-dob'>
              This field is required
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='sexo'
              control={accountControl}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <RadioGroup
                  row
                  value={value}
                  name='simple-radio'
                  onChange={event => {
                    onChange(event.target.value)
                  }}
                  onBlur={onBlur}
                  aria-label='simple-radio'
                >
                  <FormControlLabel value='F' control={<Radio />} label='Femenino' />
                  <FormControlLabel value='M' control={<Radio />} label='Masculino' />
                </RadioGroup>
              )}
            />
            {accountErrors.sexo && (
              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-sexo'>
                Debe seleccionar el sexo del cliente
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='correoelectronico'
              control={accountControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Correo Electronico'
                  onChange={onChange}
                  placeholder='Ingrese su Correo Electronico'
                  error={Boolean(accountErrors.correoelectronico)}
                  aria-describedby='stepper-linear-account-username'
                />
              )}
            />
            {accountErrors.correoelectronico && (
              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                Debe ingresar el Correo Electronico del cliente
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button size='large' type='submit' variant='contained'>
            Agregar
          </Button>
          <Button size='large' variant='contained' href='/dashboards/Clientes/'>
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default Update
