import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'


export default function Content() {
  //Configurar los hooks
  const [users, setUsers] = useState([])

  //Funcion para mostrar los datos con fetch
  const URL = 'http://eventcompany.somee.com/api/Facturas/ListarFacturas'

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


  const router = useRouter();
  const handleClick = rowId => {
    console.log(rowId)

    localStorage.setItem('FacturaID', rowId)
    router.push('/dashboards/Reporte/')
   
  }

  const columns = [
    {
      name: 'fact_Id',
      label: 'Factura ID'
    },
    {
      name: 'pago_Descripcion',
      label: 'Metodo de Pago'
    },
    {
        name: 'pedi_Id',
        label: 'Codigo de Pedido'
      },
      {
        name: 'clie_Nombres',
        label: 'Cliente Solicitante'
      },
      {
        name: 'fact_SubTotal',
        label: 'Sub Total'
      },
      {
        name: 'fact_Impuesto',
        label: 'IVA'
      },
      {
        name: 'fact_Total',
        label: 'Total a Pagar'
      },
      {
        name: 'Generar Factura',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            const rowId = tableMeta.rowData[0]
  
            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                
           
                <Fab color='warnig' aria-label='Factura' size='small' onClick={() => handleClick(rowId)}>
                  <Icon icon='tabler:album' />
                </Fab>
               
              </Box>
            )
          }
        }
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
