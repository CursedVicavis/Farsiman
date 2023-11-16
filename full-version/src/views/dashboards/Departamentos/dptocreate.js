// ** React Imports
import { Fragment, useState, useEffect } from 'react'

import Global from 'src/pages/acl/Global'

// MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import toast from 'react-hot-toast'
import { updateData } from 'src/pages/dashboards/Departamentos/index'

import axios from 'axios'

const DialogForm = () => {
  // ** State
  const [DepartamentoCR, setDepartamento] = useState('')
  const [open, setOpen] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [showErroCR, setShowErrorCR] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    setDepartamento('')
    setShowError(false)
  }
  const handleClose = () => setOpen(false)

  const CreateAction = e => {
    setValidationErrors({})
    e.preventDefault()
    setShowError(false)
    if (!Departamento) {
      setValidationErrors({ Departamento: 'Debe ingresar un valor' })
      setShowError(true)

      return
    }

    let payload = {
      dept_Descripcion: Departamento
    }

    console.log('hola')

    axios
      .post(Global.url + '/api/Departamentos/InsertarDdepartamento', payload)
      .then(r => {
        console.log('Entro then')

        if (r.data.messageStatus === 'Este Departamento ya existe') {
          console.log(r.data)
          toast.error(r.data.messageStatus, {
            duration: 4000
          })
        } else if (r.data.messageStatus === 'Registro Agregado Exitosamente') {
          console.log(r.data)
          toast.success(r.data.messageStatus, {
            duration: 4000
          })

          updateData()
          handleClose()
          setDepartamento('')
        } else {
          toast.error(r.data.messageStatus, {
            duration: 4000
          })
        }
      })
      .catch(e => console.error(e))
  }

  return (
    <Fragment>
      <Button variant='outlined' onClick={handleClickOpen}>
        Nuevo Departamento
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Departamento</DialogTitle>
        <form
          onSubmit={e => {
            CreateAction(e)
          }}
        >
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>Ingrese el nuevo Departamento</DialogContentText>
            <TextField
              id='Departamento'
              name='Departamento'
              value={Departamento}
              autoFocus
              fullWidth
              type='email'
              onChange={e => {
                setDepartamento(e.target.value)
                setShowError(false)
              }}
              error={showError}
              helperText={showError && validationErrors.Departamento}
              label='Nombre del Departamento'
            />
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button onClick={handleClose}>Cerrar</Button>
            <Button onClick={CreateAction}>Agregar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default DialogForm
