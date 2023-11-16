import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import { useRouter } from 'next/router'

export default function Content() {
  //Configurar los hooks
  const [users, setUsers] = useState([])
  const router = useRouter()
  //Funcion para mostrar los datos con fetch
  const URL = 'http://eventcompany.somee.com/api/Departamentos/ListarDepartamentos'

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
      name: 'dept_Id',
      label: ' Departamento id'
    },
    {
      name: 'dept_Descripcion',
      label: 'Descripción'
    }
  ]

  return (
    <div className='content'>
      <div className='container-fluid'>
        <div className='card'>
          <div className='card-header'>
            <h1>Departamentos</h1>
          </div>
          <br></br>
          <div className='card-body'>
            <div className='btn btn-primary'>Nuevo</div>
            <br></br>
            <MUIDataTable
              data={users}
              columns={columns}
              options={{
                selectableRows: false
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
