import React, { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import CartaPedidos from 'src/views/ui/cards/basic/CartaPedidos';
import axios from 'axios';
import { useRouter } from 'next/router'

const URL = 'http://eventcompany.somee.com/api/Pedidos/ListarPedidos';

export default function Content() {
  const [datosPedidos, setDatosPedidos] = useState([]);
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('IDUsuario') == null || localStorage.getItem('IDUsuario') == '') {
      

      router.push('/pages/auth/login-v2/')
    }
    const fetchData = async () => {
      const response = await axios.get(URL);
      const data = response.data;

      const pedidosAgrupados = data.reduce((result, pedido) => {
        // Buscar el pedido actual en el resultado
        const pedidoActual = result.find(p => p.id === pedido.pedi_Id);
        // Si el pedido actual no está en el resultado, agregarlo
        if (!pedidoActual) {
          result.push({
            id: pedido.pedi_Id,
            paquetes: [],
            servicios: [],
            elementos: []
          });
        }
        // Obtener el pedido actual del resultado
        const pedidoIndex = result.findIndex(p => p.id === pedido.pedi_Id);
        const pedidoEncontrado = result[pedidoIndex];

        // Agrupar los paquetes por pedido
        if (pedido.paqt_Nombre) {
          const paqueteIndex = pedidoEncontrado.paquetes.findIndex(p => p.nombre === pedido.paqt_Nombre);
          if (paqueteIndex !== -1) {
            pedidoEncontrado.paquetes[paqueteIndex].cantidad == pedido.pede_Cantidad;
          } else {
            pedidoEncontrado.paquetes.push({
              nombre: pedido.paqt_Nombre,
              cantidad: pedido.pede_Cantidad
            });
          }
        }

        // Agrupar los servicios por pedido
        if (pedido.prov_Servicio) {
          const servicioIndex = pedidoEncontrado.servicios.findIndex(s => s.nombre === pedido.prov_Servicio);
          if (servicioIndex !== -1) {
            pedidoEncontrado.servicios[servicioIndex].cantidad += pedido.pede_Cantidad;
          } else {
            pedidoEncontrado.servicios.push({
              nombre: pedido.prov_Servicio,
              cantidad: pedido.pede_Cantidad
            });
          }
        }

        // Agrupar los elementos por pedido
        if (pedido.inve_Elemento) {
          const elementoIndex = pedidoEncontrado.elementos.findIndex(e => e.nombre === pedido.inve_Elemento);
          if (elementoIndex !== -1) {
            pedidoEncontrado.elementos[elementoIndex].cantidad += pedido.pede_Cantidad;
          } else {
            pedidoEncontrado.elementos.push({
              nombre: pedido.inve_Elemento,
              cantidad: pedido.pede_Cantidad
            });
          }
        }

        return result;
      }, []);
     console.log(pedidosAgrupados);
      setDatosPedidos(pedidosAgrupados);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ pb: 5 }}>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {datosPedidos.map(pedido => (
            <Grid item key={pedido.id} xs={12} sm={6} md={4}>
              <CartaPedidos
                id={pedido.id}
                paquetes={pedido.paquetes}
                servicios={pedido.servicios}
                elementos={pedido.elementos}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
