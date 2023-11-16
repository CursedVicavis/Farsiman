import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Card from '@mui/material/Card'
import MUIDataTable from 'mui-datatables'
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
import React, { useState, useEffect } from 'react'
import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router'

export default function Content() {
  //Configurar los hooks
  const [users, setUsers] = useState([])

  //Funcion para mostrar los datos con fetch
  const URL = 'http://eventcompany.somee.com/api/Empleados/ListarEmpleados'
  const router = useRouter()
  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    console.log(data)
    setUsers(data)
  }

  useEffect(() => {
    if (localStorage.getItem('IDUsuario') == null || localStorage.getItem('IDUsuario') == '') {
      

      router.push('/pages/auth/login-v2/')
    }
    showData()
  }, [])

  const columns = [
    {
      name: 'empl_Id',
      label: ' Empleados id'
    },
    {
      name: 'empl_DNI',
      label: 'Empleado DNI'
    },
    {
      name: 'empl_Nombres',
      label: 'Empleado Nombres'
    },
    {
      name: 'empl_sexo',
      label: 'Empleado Sexo'
    },
    {
      name: 'esci_Descripcion',
      label: 'Estado Civil'
    },
    {
      name: 'muni_Descripcion',
      label: 'Municipio'
    },
    {
      name: 'empl_DireccionExacta',
      label: 'Dirección exacta'
    },
    {
      name: 'empl_FechaNacimiento',
      label: 'Fecha nacimiento'
    },
    {
      name: 'empl_Telefono',
      label: 'Telefóno'
    },
    {
      name: 'empl_CorreoElectronico',
      label: 'Correo electrónico'
    }
  ]

  return (
    <div>
      <Card>
        <CardContent>
          <h1>Clientes</h1>
          <Button href='/dashboards/Empleados/Create'>Nuevo Cliente</Button>
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
    </div>
  )
}
