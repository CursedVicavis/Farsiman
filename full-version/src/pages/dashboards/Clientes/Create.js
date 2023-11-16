import toast from 'react-hot-toast'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Radio from '@mui/material/Radio'
import { useRouter } from 'next/router'
import Global from 'src/pages/acl/Global'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import RadioGroup from '@mui/material/RadioGroup'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Fragment, useState, forwardRef, useEffect } from 'react'
import axios from 'axios'
import * as yup from 'yup'

const defaultAccountValues = {
  Nombre: '',
  Apellidos: '',
  DNI: '',
  Telefono: '',
  Sexo: ''
}

const accountSchema = yup.object().shape({
  Nombre: yup.string().required(),
  Apellidos: yup.string().required(),
  DNI: yup.string().min(13).required(),
  Telefono: yup.string().min(8).required(),
  Sexo: yup.string().required()
})

const Update = () => {
  const {
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors }
  } = useForm({
    defaultValues: defaultAccountValues,
    resolver: yupResolver(accountSchema)
  })

  const router = useRouter()

  const onSubmit = data => {
    console.log(data)
    CreateAction(data)
  }

  const CreateAction = e => {
    let payload = {
      clie_DNI: e.DNI,
      clie_Nombres: e.Nombre,
      clie_ApellIdos: e.Apellidos,
      clie_Sexo: e.Sexo,
      clie_Telefono: e.Telefono
    }
    console.log(payload)

    axios
      .post(Global.url + '/api/Clientes/InsertarClientes', payload)
      .then(r => {
        if (r.data.messageStatus === 'Registro agregado con exito') {
          toast.success(r.data.messageStatus, {
            duration: 4000
          })
          router.push('/dashboards/Clientes/')
        } else {
          toast.error(r.data.messageStatus, {
            duration: 4000
          })
        }
      })
      .catch(e => console.error(e))
  }

  return (
    <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid container spacing={8}>
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
                      type='number'
                      value={value}
                      label='Numero de identidad'
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
                      type='number'
                      value={value}
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
                {accountErrors.Sexo && (
                  <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                    Debe seleccionar el sexo del cliente
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button size='large' type='submit' variant='contained'>
                Agregar
              </Button>
              <Button size='large' type='submit' variant='contained' href='/dashboards/Clientes/'>
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  )
}

export default Update
