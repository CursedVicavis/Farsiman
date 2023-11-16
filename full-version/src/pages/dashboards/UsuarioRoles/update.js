// ** React Imports
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import toast from 'react-hot-toast'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import Global from 'src/pages/acl/Global'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import ListItemText from '@mui/material/ListItemText'
import { useForm, Controller } from 'react-hook-form'
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

const Update = () => {
  const router = useRouter()

  //TRAER LAS PANTALLAS PARA EL DDL
  const URLDDL = 'http://eventcompany.somee.com/api/Roles/ListarPantallas'
  const [roles, useroles] = useState('')
  const [pantalla, usepantalla] = useState([])

  const DDLPantalla = async () => {
    const response = await fetch(URLDDL)
    const data = await response.json()
    usepantalla(data)
  }

  useEffect(() => {
    if (localStorage.getItem('IDUsuario') == null || localStorage.getItem('IDUsuario') == '') {
      router.push('/pages/auth/login-v2/')
    }

    DDLPantalla()
  }, [])

  //EN UN ARREGLO METER LAS OPCIONES SELECCIONADAS

  const [personName, setPersonName] = useState([])

  const handleChange = event => {
    setPersonName(event.target.value)
  }

  //FUNCION PARA ASIGANR LAS PANTALLAS SEGUN EL ROL
  const AsignarPantallas = rolId => {
    console.log(rolId)

    let payload = {
      role_Id: rolId
    }

    var arreglo = [rolId]

    localStorage.setItem('RolPantalla', '')
    axios.post('http://eventcompany.somee.com/api/RolesPorPantalla/FindRolesPorPantalla', payload).then(response => {
      console.log(response.data)
      try
      {

        useroles(response.data[0].role_Descripcion)
      }
      catch
      {
        useroles('LAMENTABLEMENTE TIENE QUE CAMBIAR EL ROL  ')
      }
      
      axios
        .post('http://eventcompany.somee.com/api/RolesPorPantalla/FindRol', arreglo)
        .then(respon => {
          console.log(respon.data)

          const pantNombres = []

          for (let i = 0; i < respon.data.length; i++) {
            pantNombres.push(respon.data[i].pant_Nombre)
          }
          setPersonName(pantNombres)
          console.log(pantNombres)
        })
        .catch(error => console.error(error))
    })
  }

  const [rolId, setrolId] = useState('')

  //HACE FUNCIONAR EL ID
  useEffect(() => {
    if (localStorage.getItem('RolPantalla') !== '') {
      const rol_id = localStorage.getItem('RolPantalla')

      setrolId(rol_id)

      AsignarPantallas(rol_id)
    }
  })

  const UpdateAction = () => {
    console.log(personName)

    let payload = {
      role_Id: rolId,
      role_Descripcion: roles
    }

    axios.post(Global.url + '/api/RolesPorPantalla/DeleteRolPorPantalla', payload).then(Respuesta => {
      axios
        .post(Global.url + '/api/RolesPorPantalla/UpdateRol', payload)
        .then(r => {
          if(personName == null || personName == "")
          {
            toast.error('Tiene que seleccionar almenos una pantalla', {
              duration: 4000
            })

            return
          }
          else
          {
            let pay = {
              role_Id: rolId,
              rol_Array: personName
            }
            console.log(pay)
            axios
              .post(Global.url + '/api/RolesPorPantalla/ActualizarRolPorPantalla', pay)
  
              .then(r => {
                toast.success(r.data.messageStatus, {
                  duration: 4000
                })
                router.push('/dashboards/UsuarioRoles')
              })
              .catch(e => console.error(e))
          }
          
        })
        .catch(e => console.error(e))
    })
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
          <Button onClick={UpdateAction}>Agregar</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Update
