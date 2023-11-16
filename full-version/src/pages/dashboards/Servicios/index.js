import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useDispatch, useSelector } from 'react-redux'
import Servicios from 'src/views/dashboards/Servicios/Servicios'

import { fetchData, deleteUser } from 'src/store/apps/user'
import TableHeader from 'src/views/apps/user/list/TableHeader'
import Create from 'src/views/dashboards/Servicios/serviciosCreate'
import { useRouter } from 'next/router'

export default function Content() {
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [value, setValue] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)
  useEffect(() => {

    if (localStorage.getItem('IDUsuario') == null || localStorage.getItem('IDUsuario') == '') {
      

      router.push('/pages/auth/login-v2/')
    }
    dispatch(
      fetchData({
        q: value
      })
    )
  }, [value])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  return (
    <>
      <Card>
        <CardHeader title='Servicios' />
        <CardContent>
          <Create open={addUserOpen} toggle={toggleAddUserDrawer} />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <Servicios />
        </CardContent>
      </Card>
    </>
  )
}
