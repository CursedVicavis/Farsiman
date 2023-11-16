import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import DialogForm from 'src/views/components/dialogs/DialogUsuarioCreate'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { useRouter } from 'next/router'

export default function Content() {
  const router = useRouter()

  //Configurar los hooks

  const [users, setUsers] = useState([])
  const [usua_Id, setusua_Id] = useState('')
  const [usua_Usuario, setusua_Usuario] = useState('')
  const [role_Descripcion, setrole_Descripcion] = useState('')
  const [selectedId, setselectedId] = useState('')
  const [open1, setopen1] = useState(false)
  const [showError, setshowError] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [Usuario_Edit, setusuaid_Edit] = useState('')

  const [RoleDDL, setRoleDDL] = useState([]) //ddl Departemento
  const [Role, setRole] = useState('') //almacena el valor seleccionado del ddl

  const [Empleado, setEmpleado] = useState('') // almacena si el ddl esta activado

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [validationErrors, setvalidationErrors] = useState({})

  //Funcion para mostrar los datos con fetch
  const URL = 'https://localhost:7002/api/Usuarios/Listar'

  const showData = async () => {
    try {
      const response = await fetch(URL)
      const data = await response.json()
      setUsers(data.data)
      console.log(data.data)
    } catch (e) {
      console.log(e)
    }
  }

  const updateData = () => {
    showData()
  }

  useEffect(() => {
    if (localStorage.getItem('IDUsuario') == null || localStorage.getItem('IDUsuario') == '') {
      router.push('/pages/auth/login-v2/')
    }
    showData()
  }, [])

  const columns = [
    {
      name: 'usua_Id',
      label: 'Usuario id'
    },
    {
      name: 'usua_Nombre',
      label: 'UserName'
    },
    {
      name: 'role_Descripcion',
      label: 'Rol usuario'
    }
  ]

  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList centered onChange={handleChange} aria-label='centered tabs example' style={{ display: 'none' }}>
        <Tab value='1' label='Tab 1' />
        <Tab value='2' label='Tab 2' />
      </TabList>
      <TabPanel value='1'>
        <h1>Usuarios</h1>

        <DialogForm updateData={updateData} />
        <br></br>
        <MUIDataTable
          data={users}
          columns={columns}
          options={{
            selectableRows: false
          }}
        />
      </TabPanel>
    </TabContext>
  )
}
