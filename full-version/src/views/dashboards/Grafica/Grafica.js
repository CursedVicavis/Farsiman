import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

export default function Grafica() {
  const [loading, setLoading] = useState(true)
  const [paqueteData, setPaqueteData] = useState([])
  const [error, setError] = useState(null)
  const [respuesta, setrespuesta] = useState([])
  const [Paquete, setPaquete] = useState([])
  const [Cantidad, setCantidad] = useState([])
  const [Colores, setColores] = useState([])

  const donutColors = {
    series1: '#fdd835',
    series2: '#00d4bd',
    series3: '#826bf8',
    series4: '#1FD5EB',
    series5: '#ffa1a1'
  }
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('IDUsuario') == null || localStorage.getItem('IDUsuario') == '') {
      

      router.push('/pages/auth/login-v2/')
    }
    const fetchData = async () => {
      try {
        const res = await fetch('http://eventcompany.somee.com/api/Grafica/GraficaPaquete')
        const data = await res.json()
        const cantidad = [],
          paquete = []
        data.map(elemento => {
          cantidad.push(elemento.cantidad)
          paquete.push(elemento.paqt_Nombre)
        })
        setCantidad(cantidad)
        setPaquete(paquete)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const theme = useTheme()

  const options = {
    stroke: { width: 0 },
    labels: Paquete,
    colors: [donutColors.series1, donutColors.series5, donutColors.series3, donutColors.series2],
    dataLabels: {
      enabled: true,
      formatter: val => `${parseInt(val, 10)}%`
    },
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: theme.palette.text.secondary,
              formatter: val => `${parseInt(val, 10)}`
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: 'Paquete más vendidos',
              color: theme.palette.text.primary
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Paquetes más vendidos'
        subheader='Estos son los paquetes más solicitados en nuestros eventos'
        subheaderTypographyProps={{ sx: { color: theme.palette.text.disabled } }}
      />
      <CardContent>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography>Error: {error.message}</Typography>
        ) : (
          <ReactApexcharts type='donut' height={400} options={options} series={Cantidad} />
        )}
      </CardContent>
    </Card>
  )
}
