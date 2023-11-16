import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CustomInput from 'src/views/dashboards/Registro/PickersCustomInput'

const CustomDatePicker = ({ selectedDate, handleDateChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={date => handleDateChange(date)}
      dateFormat='yyyy/MM/dd'
      placeholderText='Selecciona una fecha'
      customInput={<CustomInput label='Fech Final' aria-describedby='validation-basic-FechaFinal' />}
    />
  )
}

export default CustomDatePicker
