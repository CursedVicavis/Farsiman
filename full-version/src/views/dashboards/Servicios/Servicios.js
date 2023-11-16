import React, { useState, useEffect } from 'react'
import { Box, Container } from '@mui/material'
import CartaServicios from 'src/views/ui/cards/basic/CartaServicios'
import { useRouter } from 'next/router'

export default function Content() {
  const [users, setUsers] = useState([])
  const router = useRouter()
  const URL = 'http://eventcompany.somee.com/api/Servicios/ListarServicios'

  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    setUsers(data)
  }

  useEffect(() => {
    if (localStorage.getItem('IDUsuario') == null || localStorage.getItem('IDUsuario') == '') {
      

      router.push('/pages/auth/login-v2/')
    }
    const interval = setInterval(() => {
      showData()
    }, 3000) // 3 seconds
  }, [])

  return (
    <Container maxWidth='lg'>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {users.map((user, index) => (
          <Box key={index} sx={{ width: '30%', minWidth: '250px', maxWidth: '350px', mb: 4, mx: 2 }}>
            <CartaServicios data={[user]} />
          </Box>
        ))}
      </Box>
    </Container>
  )
}
