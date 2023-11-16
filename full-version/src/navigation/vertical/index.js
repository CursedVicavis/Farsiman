/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import axios from 'axios'

const navigation = () => {
  const [pantallasList, SetPantallasList] = useState([])

  useEffect(() => {
    try {
      const rol = localStorage.getItem('Rol')
      Pantallas(rol)
    } catch (error) {}
  }, [])

  const Pantallas = async rol => {
    let role = {
      role_Id: rol
    }
    try {
      const response = await axios.post('https://localhost:7002/api/Usuarios/RolesPorPantalla', role)

      console.log(rol)
      const data = response.data

      SetPantallasList(data)
    } catch (error) {
      console.error(error)
    }
  }

  try {
    const UsuarioID = localStorage.getItem('IDUsuario')
  } catch (error) {}
  const Generales = []
  const Seguridad = []

  pantallasList.forEach(pantalla => {
    if (pantalla.pant_Id === 1) {
      Seguridad.push({
        title: 'Usuarios',
        path: '/dashboards/Usuarios'
      })
    }
  })

  pantallasList.forEach(pantalla => {
    if (pantalla.pant_Id === 2) {
      Generales.push({
        title: 'Salidas',
        path: '/dashboards/Salidas'
      })
    }
  })

  console.log(Seguridad)

  return [
    {
      title: 'Salidas',
      icon: 'tabler:smart-home',
      children: Generales
    },
    {
      title: 'Seguridad',
      icon: 'iconamoon:lock',
      children: Seguridad
    }
  ]
}

export default navigation
