import axios from 'axios'
import toast from 'react-hot-toast'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Card from '@mui/material/Card'
import { useRouter } from 'next/router'
import MUIDataTable from 'mui-datatables'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Icon from 'src/@core/components/icon'
import React, { useState, useEffect } from 'react'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

export default function Content() {
  //Configurar los hooks
  const [users, setUsers] = useState([])

  //Delete
  const [clieId, setclieId] = useState('')
  const [open, setOpen] = useState(false)

  //Funcion para mostrar los datos con fetch
  const URL = 'http://eventcompany.somee.com/api/Clientes/ListarClientes'

  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    setUsers(data)
  }

  useEffect(() => {
    if (localStorage.getItem('IDUsuario') == null || localStorage.getItem('IDUsuario') == '') {
      router.push('/pages/auth/login-v2/')
    }
    showData()
  }, [])
  const router = useRouter()

  localStorage.setItem('Datos', null)

  const handleEditPermission = name => {
    localStorage.setItem('Datos', name)

    router.push('/dashboards/Clientes/Update')
  }

  //delete
  const handleClickDelete = name => {
    setclieId(name)
    setOpen(true)
  }

  const deleteData = async () => {
    let payload = {
      clie_Id: clieId
    }
    console.log(clieId)

    axios.put('http://eventcompany.somee.com/api/Clientes/DeleteClientes', payload).then(r => {
      if (r.data.messageStatus === 'Cliente Eliminado correctamente') {
        toast.success('Cliente Eliminado correctamente', {
          duration: 4000
        })
        setOpen(false)
        showData()
      } else {
        toast.success(r.data.messageStatus, {
          duration: 4000
        })
      }
    })
  }

  //FinDelete

  const columns = [
    {
      name: 'clie_Id',
      label: 'Cliente id'
    },
    {
      name: 'clie_DNI',
      label: 'Cliente DNI'
    },
    {
      name: 'clie_Nombres',
      label: 'Nombre Cliente'
    },
    {
      name: 'clie_Sexo',
      label: 'Sexo'
    },
    {
      name: 'clie_Telefono',
      label: 'Telefóno'
    },
    {
      name: 'Acciones',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowId = tableMeta.rowData[0]

          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Fab color='success' aria-label='edit' size='small' onClick={() => handleEditPermission(rowId)}>
                <Icon icon='tabler:pencil' />
              </Fab>
              <Box sx={{ mx: 1 }}></Box>
              <Fab color='error' aria-label='delete' size='small' onClick={() => handleClickDelete(rowId)}>
                <Icon icon='tabler:trash' />
              </Fab>
            </Box>
          )
        }
      }
    }
  ]

  return (
    <div>
      <Card>
        <CardContent>
          <h1>Clientes</h1>
          <Button href='/dashboards/Clientes/Create'>Crear</Button>
          <br></br>
          <br></br>
          <MUIDataTable
            data={users}
            columns={columns}
            options={{
              selectableRows: false
            }}
          />
        </CardContent>
      </Card>

      <form
        onSubmit={e => {
          deleteData(e)
        }}
      >
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby='form-dialog-title' fullWidth maxWidth='sm'>
          <DialogTitle>Eliminar registro</DialogTitle>
          <DialogContent>
            <DialogContentText>¿Está seguro de que desea eliminar este registro?</DialogContentText>
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={deleteData}>Eliminar</Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  )
}
