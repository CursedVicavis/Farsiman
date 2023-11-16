import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';

const CartaPaquetes = ({ id, nombre, elementos, servicios, precio, handleChange, selected }) => {
  
    const [selectedValue, setSelectedValue] = useState(selected ? id : '');

    // Estado para la selección de la carta
    const [isCardSelected, setIsCardSelected] = useState(selected);
  
    // Función para manejar el cambio en el radio y en la selección de la carta
    const handleRadioChange = (id) => {
        setSelectedValue(id);
      };
  
    // Estilos de la carta
    const cardStyles = {
        maxWidth: 280,
        border: selected ? '2px solid #3f51b5' : '1px solid rgba(0, 0, 0, 0.12)',
        boxShadow: selected ? '2px 2px 5px rgba(0, 0, 0, 0.3)' : 'none',
        borderRadius: 5,
      };

  // Crear una carta para el paquete con información detallada
  const cartaPaquete = (
    <Box sx={cardStyles}>
        <Box sx={{ maxWidth: 280 }}>
          <Card sx={{border: selectedValue === id ? '2px solid blue' : 'none'}}>
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
            </CardContent>
      
            {/* Agregar el radio */}
            <CardActions sx={{ justifyContent: 'center' }}>
            <Radio
            checked={selected}
            onChange={() => handleRadioChange(id)}
            value={id}
            />
            </CardActions>
          </Card>
        </Box>
     </Box>
      );
      


  return <>{cartaPaquete}</>;
};

export default CartaPaquetes;
