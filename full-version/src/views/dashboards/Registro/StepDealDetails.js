// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MUIDataTable from 'mui-datatables'
import Icon from 'src/@core/components/icon'
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
import CustomInput from './PickersCustomInput'

const StepDealDetails = () => {
  const [value, setValue] = useState('checked')
  const [time, setTime] = useState(new Date())
  const [dateTime, setDateTime] = useState(new Date())

  const handleChangeRadio = event => {
    setValue(event.target.value)
  }

  const handleDateChange = newValue => {
    setStartDate(newValue)
  }

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Typography variant='h5' sx={{ mb: 4 }}>
          Información del evento
        </Typography>
      </Grid>
      <br></br>
      <Grid item xs={12} sm={12}>
        <TextField fullWidth label='Evento' placeholder='Ingresa el nombre del evento' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DatePicker
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={15}
          selected={dateTime}
          id='date-time-picker'
          dateFormat='MM/dd/yyyy h:mm aa'
          onChange={date => setDateTime(date)}
          customInput={<CustomInput label='Fecha y hora de inicio' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DatePicker
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={15}
          selected={dateTime}
          id='date-time-picker'
          dateFormat='MM/dd/yyyy h:mm aa'
          onChange={date => setDateTime(date)}
          customInput={<CustomInput label='Fecha y hora de fin' />}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <FormControl fullWidth>
          <InputLabel id='select-payment-method'>Direcciones</InputLabel>
          <Select labelId='select-payment-method' label='Payment Method' defaultValue=''>
            <MenuItem value='any'>any</MenuItem>
            <MenuItem value='credit-card'>Credit Card</MenuItem>
            <MenuItem value='net-banking'>Net Banking</MenuItem>
            <MenuItem value='wallet'>Wallet</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button variant='contained' endIcon={<Icon icon='tabler:plus' />}>
          Nueva dirección
        </Button>
      </Grid>
    </Grid>
  )
}

export default StepDealDetails
