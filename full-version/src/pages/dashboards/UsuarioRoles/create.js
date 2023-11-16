// ** React Imports
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import toast from 'react-hot-toast'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import Global from 'src/pages/acl/Global'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const SelectMultiple = () => {
  // ** State

  const router = useRouter()
  const URLDDL = 'http://eventcompany.somee.com/api/Roles/ListarPantallas'
  const [roles, useroles] = useState('')
  const [pantalla, usepantalla] = useState([])

  const DDLPantalla = async () => {
    const response = await fetch(URLDDL)
    const data = await response.json()
    console.log(data)
    usepantalla(data)
  }

  useEffect(() => {
    DDLPantalla()
  }, [])

  const [personName, setPersonName] = useState([])

  const handleChange = event => {
    setPersonName(event.target.value)
  }

  const CreateAction = () => {
    console.log(personName)

    let payload = {
      role_Descripcion: roles
    }

    axios
      .post('http://eventcompany.somee.com/api/RolesPorPantalla/InsertarRol', payload)
      .then(r => {
        console.log(r.data)
        console.log('entro')
        axios
          .post('http://eventcompany.somee.com/api/RolesPorPantalla/InsertarRolesPorPantalla', personName)

          .then(r => {
            toast.success(r.data.messageStatus, {
              duration: 4000
            })
            router.push('/dashboards/UsuarioRoles')
          })
          .catch(e => console.error(e))
      })
      .catch(e => console.error(e))
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={12}>
          <Grid item xs={12} sm={6}>
            <div>
              <Typography sx={{ mb: 2, fontWeight: 500 }}>Rol</Typography>

              <TextField
                id='DepartamentoCR'
                size='md'
                name='DepartamentoCR'
                value={roles}
                autoFocus
                fullWidth
                type='email'
                onChange={e => {
                  useroles(e.target.value)
                }}
                label='Nombre del Rol'
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div>
              <Typography sx={{ mb: 2, fontWeight: 500 }}>Pantalla</Typography>

              <FormControl fullWidth>
                <InputLabel id='demo-multiple-chip-label'>Chip</InputLabel>
                <Select
                  multiple
                  label='Chip'
                  value={personName}
                  MenuProps={MenuProps}
                  id='demo-multiple-chip'
                  onChange={handleChange}
                  labelId='demo-multiple-chip-label'
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {selected.map(value => (
                        <Chip key={value} label={value} sx={{ m: 0.75 }} />
                      ))}
                    </Box>
                  )}
                >
                  {pantalla.map(name => (
                    <MenuItem key={name.pant_Id} value={name.pant_Nombre}>
                      {name.pant_Nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
        </Grid>
        <br></br>
        <div>
          <Button href='/dashboards/UsuarioRoles'>Cerrar</Button>
          <Button onClick={CreateAction}>Agregar</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default SelectMultiple
