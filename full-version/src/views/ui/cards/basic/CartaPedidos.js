import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  header: {
    backgroundColor: '#F4F4F4',
    textAlign: 'center',
    padding: '10px',
    borderRadius: '4px',
  },
  buttonEditar: {
    color: 'white',
    backgroundColor: '#9c27b0',
    '&:hover': {
      backgroundColor: '#7b1fa2',
    },
  },
  buttonEliminar: {
    color: 'white',
    backgroundColor: '#f44336',
    '&:hover': {
      backgroundColor: '#c62828',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  list: {
    listStyle: 'none',
  },
});

const CartaPedidos = ({ id, paquetes, servicios, elementos }) => {
  const classes = useStyles();

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Card>
        <CardHeader title={`Pedido #${id}`} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="div">
            <strong>Paquetes:</strong>
            <ul className={classes.list}>
              {paquetes &&
                paquetes.map((paquete) => (
                  <li key={paquete.id}>
                   {`${paquete.nombre} (${paquete.cantidad})`}
                  </li>
                ))}
            </ul>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            <strong>Elementos:</strong>
            <ul className={classes.list}>
              {elementos &&
                elementos.map((elemento) => (
                  <li key={elemento.id}>
                    {`${elemento.nombre} (${elemento.cantidad})`}
                  </li>
                ))}
            </ul>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            <strong>Servicios:</strong>
            <ul className={classes.list}>
              {servicios &&
                servicios.map((servicio) => (
                  <li key={servicio.id}>
                    {`${servicio.nombre} (${servicio.cantidad})`}
                  </li>
                ))}
            </ul>
          </Typography>
        </CardContent>
       
      </Card>
    </Box>
  );
};

export default CartaPedidos;
