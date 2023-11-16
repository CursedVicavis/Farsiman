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
import { Grid } from '@mui/material'

const DialogForm = ({ updateData }) => {
  // ** State
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const [esci_Id, setesci_Id] = useState('')
  const [esci_Descripcion, setesci_Descripcion] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [showError, setShowError] = useState(false)

  const handleClose = () => {
    setOpen(false)
    clearDialog()
    setShowError(false)
  }

  const EstadoCivilAction = e => {
    setValidationErrors({})
    e.preventDefault()
    setShowError(false)

    if (!esci_Id) {
      setValidationErrors({ esci_Id: 'Debe ingresar un valor' })
      setShowError(true)

      return
    }

    if (!esci_Descripcion) {
      setValidationErrors({ esci_Descripcion: 'Debe ingresar un valor' })
      setShowError(true)

      return
    }

    let payload2 = {
      esci_Id: esci_Id,
      esci_Descripcion: esci_Descripcion,
      esci_UsuarioCreador: localStorage.getItem('IDUsuario')
    }

    axios.post('http://eventcompany.somee.com/api/EstadosCiviles/InsertarEstadoCivil', payload2).then(r => {
      if (r.data.data.codeStatus == 4) {
        toast.success('Estado civil ingresado con exito', {
          duration: 4000
        })
        updateData()
        handleClose()
      } else {
        if (r.data.data.codeStatus == 2) {
          toast.error('Existe un registro con el id digitado', {
            duration: 4000
          })
        } else {
          if (r.data.data.codeStatus == 3) {
            toast.error('Existe un registro con la descripcion digitada', {
              duration: 4000
            })
          } else {
            toast.error('Existe un registro identico', {
              duration: 4000
            })
          }
        }
      }
    })
  }

  const clearDialog = () => {
    setesci_Descripcion('')
    setesci_Id('')
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
            <DialogContentText sx={{ mb: 3 }}>Digite los siguientes datos</DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id='id'
                  autoFocus
                  fullWidth
                  type='text'
                  label='Tipo de pago id'
                  value={esci_Id}
                  onChange={e => {
                    setesci_Id(e.target.value)
                    setShowError(false)
                  }}
                  error={showError}
                  helperText={showError && validationErrors.esci_Id}
                  inputProps={{ maxLength: 1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='name'
                  autoFocus
                  fullWidth
                  type='text'
                  label='Tipo de pago'
                  value={esci_Descripcion}
                  onChange={e => {
                    setesci_Descripcion(e.target.value)
                    setShowError(false)
                  }}
                  error={showError}
                  helperText={showError && validationErrors.esci_Descripcion}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={EstadoCivilAction}>Agregar</Button>
          </DialogActions>
        </Dialog>
      </form>
    </Fragment>
  )
}

export default DialogForm
