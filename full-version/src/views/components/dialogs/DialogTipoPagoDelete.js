// DialogFormDelete.js
import { Fragment, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Box from '@mui/material/Box'

const DialogFormDelete = ({ handleClick, updateData }) => {
  const [open, setOpen] = useState(false)
  const [pagoId, setPagoId] = useState(null)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleDelete = () => {
    if (pagoId) {
      handleClick(pagoId)
      handleClose()
      updateData()
    }
  }

  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' size='sm'>
        <DialogTitle id='form-dialog-title'>Eliminar registro</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>¿Desea eliminar este registro?</DialogContentText>
          <TextField
            id='name'
            autoFocus
            fullWidth
            visible='false'
            type='text'
            label='Tipo de pago'
            value={pagoId}
            onChange={e => setPagoId(e.target.value)}
          />
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} disabled={!pagoId} color='error'>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' color='error' onClick={handleClickOpen}>
          Eliminar
        </Button>
      </Box>
    </Fragment>
  )
}

export default DialogFormDelete
