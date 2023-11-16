// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// ** MUI Imports
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { Input } from '@mui/material'
import toast from 'react-hot-toast'

const DialogForm = ({ updateData }) => {
  // ** State
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    clearDialog()
    setShowError(false)
  }

  const [pago_Descripcion, setpago_Descripcion] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [showError, setShowError] = useState(false)

  const TipoDePagoAction = e => {
    setValidationErrors({})
    e.preventDefault()
    console.log('hola')
    setShowError(false)

    if (!pago_Descripcion) {
      setValidationErrors({ pago_Descripcion: 'Debe ingresar un valor' })
      setShowError(true)

      return
    }

    let payload = {
      pago_id: 0,
      pago_Descripcion: pago_Descripcion,
      pago_Estado: true,
      pago_UsuarioCreador: localStorage.getItem('IDUsuario')
    }

    let payload2 = {
      pago_id: 0,
      pago_Descripcion: pago_Descripcion,
      pago_Estado: true,
      pago_UsuarioCreador: 0
    }

    axios.post('http://eventcompany.somee.com/api/TipoDePago/ValidarExisteTipoPago', payload2).then(r2 => {
      if (r2.data.data.codeStatus == 2) {
        console.log('que ondas!!!')
        axios.post('http://eventcompany.somee.com/api/TipoDePago/InsertarTipoDePago', payload).then(r => {
          if (r.data.data.codeStatus == 1) {
            toast.success('Tipo de pago agregado con exito!', {
              duration: 4000
            })
            updateData()
            handleClose()
          } else {
            console.log(r.data.code)
            toast.error('Ha ocurrido un error!')
          }
        })
      } else {
        console.log('que ondas!!!')
        toast.error('El registro ya existe', {
          duration: 4000
        })
        handleClose()
      }
    })
  }

  const clearDialog = () => {
    setpago_Descripcion('')
    setValidationErrors({})
  }

  return (
    <Fragment>
      <Button variant='contained' onClick={handleClickOpen} endIcon={<Icon icon='tabler:plus' />}>
        Nuevo
      </Button>
      <form
        onSubmit={e => {
          TipoDePagoAction(e)
        }}
      >
        {Object.keys(validationErrors).length !== 0}
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='sm'>
          <DialogTitle id='form-dialog-title'>Nuevo registro</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>Digite el nuevo tipo de pago</DialogContentText>
            <TextField
              id='name'
              autoFocus
              fullWidth
              type='text'
              label='Tipo de pago'
              value={pago_Descripcion}
              onChange={e => {
                setpago_Descripcion(e.target.value)
                setShowError(false)
              }}
              error={showError}
              helperText={showError && validationErrors.pago_Descripcion}
            />
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={TipoDePagoAction}>Agregar</Button>
          </DialogActions>
        </Dialog>
      </form>
    </Fragment>
  )
}

export default DialogForm
