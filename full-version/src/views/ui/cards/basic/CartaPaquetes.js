import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'
import axios from 'axios'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import Fab from '@mui/material/Fab'
import React, { Fragment, useState, useEffect, useCallback } from 'react'


const CartaPaquetes = ({ ID, nombre, elementos, servicios, precio }) => {
 
  const [Permiso, setPermiso] = useState(false)
  
  const Rol = localStorage.getItem('RolDes')
  
  useEffect(() => {
    
    if(Rol == 'Admin')
    {
      setPermiso(true);

    }


  });
  
  
  
  const router = useRouter();


  const GuaradarID = () =>{

     
     localStorage.setItem('IDPAQUETE', ID)
     router.push('/dashboards/PaquetesEditar/')
    
  
  }

  const EliminarPaquete = () =>{

    let payload2 = { 
      paqt_Id: ID,
         
         
    }
  
    axios
      .post('http://eventcompany.somee.com/api/PaquetesEncabezado/EliminarPaquete', payload2)
      .then(response => {     
       console.log(response);
    
        if (response.data.data.codeStatus == 1) {
         
            toast.success('Paquete Eliminado Exitosamente', {
              
              duration: 4000
            });  
            
            
            setTimeout(() => {

              window.location.reload();
             
              
            }, 4000);
                                                        
           
        } else if(response.data.data.codeStatus == 2){

          toast.error('No se puede Eliminar, Paquete siendo utilizado', {
              
            duration: 4000
          });  
        } else if(response.data.data.codeStatus == 0){

          toast.error();('Error en la accion ', {
              
            duration: 4000
          });  
        }


                
      });
   
      
   
 
 }


  // Crear una carta para el paquete con información detallada
  const cartaPaquete = (
    <Box sx={{ maxWidth: 345 }}>
      
      <Card>
        
        <CardHeader
          title={nombre}
          subheader={`Paquete: ${nombre}`}
          sx={{ textAlign: 'center' }}
        />
        {elementos.length > 0 && (
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='body1' sx={{ mb: 1, fontWeight: 'bold' }}>Elementos:</Typography>
            {elementos.map((elemento) => (
              <Typography variant='body2' sx={{ mb: 1 }} key={elemento.nombre}>
                {elemento.nombre}: {elemento.cantidad}
              </Typography>
            ))}
          </CardContent>
        )}
        {servicios.length > 0 && (
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='body1' sx={{ mb: 1, fontWeight: 'bold' }}>Servicios:</Typography>
            {servicios.map((servicio) => (
              <Typography variant='body2' sx={{ mb: 1 }} key={servicio.prov_Servicio}>
                {servicio.prov_Servicio} - {servicio.otroCampoDelServicio}
              </Typography>
            ))}
          </CardContent>
        )}

        {/* Agregar el precio y los botones */}
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <Typography variant='body1' sx={{ mb: 1, fontWeight: 'bold' }}>Precio del paquete:</Typography>
  <Typography variant='body2' sx={{ mb: 1 }}>{precio}</Typography>
  {Permiso && (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
    
    <Button variant="contained"   onClick={() => GuaradarID(ID)} color="primary" sx={{ mr: 1 }}>Editar</Button>
    <Button variant="contained" onClick={() => EliminarPaquete(ID)}  color="error">Eliminar</Button>
   
  </Box>
   )}
</CardContent>
      </Card>
    </Box>
  );

  return <>{cartaPaquete}</>;
};

export default CartaPaquetes;
