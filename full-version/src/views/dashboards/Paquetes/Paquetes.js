import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Button } from '@mui/material';
import CartaPaquetes from 'src/views/ui/cards/basic/CartaPaquetes';
import { useRouter } from 'next/router'


export default function Content() {
  const [paquetes, setPaquetes] = useState([]);


  const URL = 'http://eventcompany.somee.com/api/PaqueteDetalles/ListarPaquetesDetalles';

  
  const router = useRouter();

 

  const PaginaInsertar = () => {
    router.push('/dashboards/PaquetesCreate/')
  }
  
  useEffect(() => {
    if (localStorage.getItem('IDUsuario') == null || localStorage.getItem('IDUsuario') == '') {
      

      router.push('/pages/auth/login-v2/')
    }
    const fetchData = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      // Agrupar paquetes por paqt_Id y recopilar todos los servicios y elementos
     
      
      const paquetesAgrupados = data.reduce((result, paquete) => {
        if (!result[paquete.paqt_Id]) {
          // si este paquete aún no existe, crearlo con información básica
          result[paquete.paqt_Id] = {
            paqt_Id: paquete.paqt_Id,
            paqt_Nombre: paquete.paqt_Nombre,
            paqt_Precio: paquete.paqt_Precio,
            servicios: [],
            elementos: [],          
          };          
        }
        // agregar información detallada al paquete
        if (paquete.prov_Servicio) {
          // obtener información detallada del servicio
          const servicio = data.find((s) => s.prov_Servicio === paquete.prov_Servicio);
          if (servicio) {
            // si se encuentra el servicio, agregarlo a la lista de servicios del paquete
            result[paquete.paqt_Id].servicios.push({
              prov_Servicio: paquete.prov_Servicio,
              serv_Nombre: servicio.serv_Nombre,
              // agregar otros campos relevantes del servicio aquí
            });
          }
        }
        if (paquete.inve_Elemento) {
          // si hay elemento, agregarlo a la lista de elementos del paquete con su cantidad
          result[paquete.paqt_Id].elementos.push({ nombre: paquete.inve_Elemento, cantidad: paquete.pqsv_Cantidad });
        }
        return result;
      }, {});
      // Convertir los paquetes agrupados en una matriz y establecerla en el estado
      const paquetesArray = Object.values(paquetesAgrupados);      
      setPaquetes(paquetesArray);    
    }
    fetchData();
  }, []);

  
  return (
    <Box>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <h1>Paquetes</h1>
          <Button variant="contained" color="primary" onClick={PaginaInsertar}>
  Agregar paquete
</Button>
        </Box>
        <Grid container spacing={2} justifyContent="center">
          {paquetes.map((paquete, index) => (
            <Grid item xs={12} sm={5} key={paquete.paqt_Id}>
              <CartaPaquetes
                ID={paquete.paqt_Id}
                nombre={paquete.paqt_Nombre}
                elementos={paquete.elementos}
                servicios={paquete.servicios}
                precio={paquete.paqt_Precio}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );

  
  
  
  
  
  
  
};
