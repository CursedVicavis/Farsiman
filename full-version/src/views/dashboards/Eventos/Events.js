import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import { useRouter } from 'next/router'

export default function Content() {
  //Configurar los hooks
  const [users, setUsers] = useState([])

  //Funcion para mostrar los datos con fetch
  const URL = 'http://eventcompany.somee.com/api/Eventos/ListarEventos'
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
      name: 'evnt_Id',
      label: ' Evento id'
    },
    {
      name: 'evnt_Descri',
      label: 'Evento'
    }
  ]
  return (
    <div className='content'>
      <div className='container-fluid'>
        <MUIDataTable
          data={users}
          columns={columns}
          options={{
            selectableRows: false
          }}
        />
      </div>
    </div>
  )
}
