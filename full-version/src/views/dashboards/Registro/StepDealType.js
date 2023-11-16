// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'

const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
  const value = `${startDate}${endDate !== null ? endDate : ''}`

  return <TextField fullWidth inputRef={ref} label={props.label || ''} {...props} value={value} />
})

const StepDealDetails = () => {
  const [value, setValue] = useState('checked')

  const handleChangeRadio = event => {
    setValue(event.target.value)
  }

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Typography variant='h5' sx={{ mb: 4 }}>
          Datos del cliente
        </Typography>
      </Grid>
      <br></br>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label='Nombres' placeholder='Ingrese sus nombres' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label='Apellidos' placeholder='Ingrese sus apellidos' />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField fullWidth label='Numero de identidad' placeholder='Ingresa tu numero de identidad' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label='Telefóno' placeholder='Ingrese su numero de telefono' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl component='fieldset'>
          <FormLabel
            component='legend'
            sx={{ fontWeight: 500, fontSize: '0.875rem', lineHeight: '21px', letterSpacing: '0.1px' }}
          >
            Sexo
          </FormLabel>
          <RadioGroup row value={value} name='simple-radio' onChange={handleChangeRadio} aria-label='simple-radio'>
            <FormControlLabel value='F' control={<Radio />} label='Femenino' />
            <FormControlLabel value='M' control={<Radio />} label='Masculino' />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default StepDealDetails
