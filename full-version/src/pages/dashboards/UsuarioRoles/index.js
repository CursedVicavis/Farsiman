// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import Fab from '@mui/material/Fab'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import TextField from '@mui/material/TextField'
import axios from 'axios'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import toast from 'react-hot-toast'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

const TableCollapsible = () => {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [role_Id, setrole_Id] = useState('')
  const [open, setOpen] = useState(false)

  // ** State
  const [roles, setRoles] = useState([])
  const URLRoles = 'http://eventcompany.somee.com/api/Roles/ListarRoles'

  // ** Function to fetch roles
  const fetchRoles = async () => {
    try {
      const response = await fetch(URLRoles)
      const data = await response.json()
      setRoles(data)
    } catch (error) {
      console.log(error)
    }
  }

  // ** Effect to fetch roles on component mount
  useEffect(() => {
    fetchRoles()
  }, [])

  //DELETE

  const handleClickDelete = name => {
    setrole_Id(name)
    setOpen(true)
  }

  const handleEditPermission = name => {
    console.log(name)
    localStorage.setItem('RolPantalla', name)
    router.push('/dashboards/UsuarioRoles/update')
  }

  const deleteData = async () => {
    let payload = {
      role_Id: role_Id
    }
    console.log(role_Id)

    axios.post('http://eventcompany.somee.com/api/RolesPorPantalla/DeleteRolPorPantalla', payload).then(r => {
      axios.post('http://eventcompany.somee.com/api/RolesPorPantalla/DeleteRol', payload).then(r => {
        setOpen(false)
        fetchRoles()
      })
    })
  }

  const Row = ({ row }) => {
    // ** State
    const [open, setOpen] = useState(false)
    const [pantalla, setPantalla] = useState([])

    // ** Function to fetch screens for a given role
    const fetchScreens = async () => {
      try {
        let payload = {
          role_Id: row.role_Id
        }
        axios.post('http://eventcompany.somee.com/api/RolesPorPantalla/FindRolesPorPantalla', payload).then(r => {
          setPantalla(r.data)
        })
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={() => {
                setOpen(!open)
                if (!open) fetchScreens()
              }}
            >
              <Icon icon={open ? 'tabler:chevron-up' : 'tabler:chevron-down'} />
            </IconButton>
          </TableCell>
          <TableCell component='th' scope='row'>
            {row.role_Id}
          </TableCell>
          <TableCell align='left'>{row.role_Descripcion}</TableCell>
          <TableCell align='right'>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Fab color='success' aria-label='edit' size='small' onClick={() => handleEditPermission(row.role_Id)}>
                <Icon icon='tabler:pencil' />
              </Fab>

              <Box sx={{ mx: 1 }}></Box>
              <Fab color='error' aria-label='delete' size='small' onClick={() => handleClickDelete(row.role_Id)}>
                <Icon icon='tabler:trash' />
              </Fab>
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={6} sx={{ py: '0 !important' }}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{ m: 2 }}>
                <Typography variant='h6' gutterBottom component='div'>
                  Pantallas
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID de pantalla</TableCell>
                      <TableCell>Descripción de pantalla</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pantalla.map(screen => (
                      <TableRow key={screen.pant_Id}>
                        <TableCell>{screen.pant_Id}</TableCell>
                        <TableCell>{screen.pant_Nombre}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    )
  }
  const [open1, setOpen1] = useState(false)

  // ** Hooks
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const handleClickOpen = () => setOpen1(true)

  const handleClose = () => {
    setOpen1(false)
    clearDialog()
    setShowError(false)
  }

  const [role_Descripcion, setrole_Descripcion] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [showError, setShowError] = useState(false)

  const RolAction = e => {
    setValidationErrors({})
    e.preventDefault()
    setShowError(false)

    if (!role_Descripcion) {
      setValidationErrors({ role_Descripcion: 'Debe ingresar el nombre del rol' })
      setShowError(true)

      return
    }

    let payload = {
      role_Descripcion: role_Descripcion,
      role_UsuariosCreador: localStorage.getItem('IDUsuario')
    }

    axios.post('https://localhost:44393/api/Roles/InsertarRol', payload).then(r => {
      if (r.data.data.codeStatus == 1) {
        toast.success('Rol agregado con exito!', {
          duration: 4000
        })
        fetchRoles()
        handleClose()
      } else {
        if (r.data.data.codeStatus == 3) {
          toast.error('Ya existe un rol con el mismo nombre!', {
            duration: 4000
          })
        } else {
          toast.error('¡Error!', {
            duration: 4000
          })
        }
      }
    })
  }

  const clearDialog = () => {
    setrole_Descripcion('')
    setValidationErrors({})
  }

  return (
    <div>
      <Fragment>
        <Button variant='contained' href='/dashboards/UsuarioRoles/create/' endIcon={<Icon icon='tabler:plus' />}>
          Nuevo
        </Button>
     
      </Fragment>
      <br></br>
      <br></br>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID de rol</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell align='right'>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map(role => (
              <Row key={role.role_Id} row={role} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </div>
  )
}

export default TableCollapsible
