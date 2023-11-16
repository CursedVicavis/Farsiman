import React, { useState, useEffect } from 'react';
import { Box, Container,FormControl ,Grid  , Typography, TextField, Button, Card,List, InputLabel, MenuItem, Select } from '@mui/material';
import Icon from 'src/@core/components/icon'
import Fab from '@mui/material/Fab'
import MUIDataTable from 'mui-datatables'
import { useRouter } from 'next/router';
import axios from 'axios'
import toast from 'react-hot-toast'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
export default function Content() {
  const router = useRouter();
 

  const [IDPaqueteCreado, setIDPaqueteCreado] = useState('');



  const [DeshabilitarNombre, setDeshabilitarNombre] = useState(false)

  const [HabilitarPaneles, setHabilitarPaneles] = useState(true)

  const [HabilitarBotones, setHabilitarBotones] = useState(true)
 

  const [NombrePaquete, setNombrePaquete] = useState('');
  const [value, setValue] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [showError, setShowError] = useState(false)

  const [BotomTerminar, setBotomTerminar] = useState(true)


  const [listServicios, setServicios] = useState([])
  const [selectedValueServicio, setSelectedValueServicio] = useState('');

 
  const [listElementos, setElementos] = useState([])
  const [selectedValueElemento, setSelectedValueElemento] = useState('');

  const [listServiciosTabla, setServiciosTabla] = useState([])
  const [listElementosTabla, setElementosTabla] = useState([])

  const [CantidadElementos, setCantidadElementos] = useState('');


  const [TotaldeServicios, setTotaldeServicios] = useState([]);
  const [TotaldeElementos, setTotaldeElementos] = useState([]);
 
  const [PrecioNormal, setPrecioNormal] = useState(0);

  const [PrecioFinal, setPrecioFinal] = useState(0);
 
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    actualizarPrecioTotal();
  }, [TotaldeElementos, TotaldeServicios]);

  const getPrecioTotal = () => {
   
    
    const preciosElementos = TotaldeElementos.map(elem => parseInt(elem, 10));
    const totalElementos = preciosElementos.reduce((acc, precio) => acc + precio, 0);

    const preciosServicios = TotaldeServicios.map(elem => parseInt(elem, 10));
    const totalServicios = preciosServicios.reduce((acc, precio) => acc + precio, 0);
   
   
    return totalElementos + totalServicios;
  };

  const actualizarPrecioTotal = () => {
  
    const nuevoPrecioTotal = getPrecioTotal();
    
     if(nuevoPrecioTotal > 0)
     {
      setBotomTerminar(false)

     }
     else{
      setBotomTerminar(true)

     }

    setPrecioNormal(nuevoPrecioTotal);
  };



  const CapturarNombre = (e) => {
    setNombrePaquete(e)

    
  };
  const CreateAction  = () => {
  
    setValidationErrors({})
  
    setShowError(false)

    if (!NombrePaquete) {
      toast.error('Nombre del Paquete Vacio', {
        duration: 4000
      });  

      return
    }

    let payload2 = { 
      paqt_Nombre: NombrePaquete,
      paqt_UsuarioCreador: 1
    }
  
    axios
      .post('http://eventcompany.somee.com/api/PaquetesEncabezado/InsertarNombrePaquete', payload2)
      .then(response => {     

    
        if (response.data.data.paqt_Id != 0 && response.data.data.resultado == "Creado") {
         
            toast.success('Paquete Ingresado Exitosamente', {
              duration: 4000
            });  
           
            setIDPaqueteCreado(response.data.data.paqt_Id);
         
            CargarDatosDDLElementos(response.data.data.paqt_Id);
           
            CargarDatosDDLServicios(response.data.data.paqt_Id);

            CargarDatostablaInventario(response.data.data.paqt_Id);

            CargarDatostablaServicios(response.data.data.paqt_Id)


            setDeshabilitarNombre(true);
            setHabilitarPaneles (false);
            setHabilitarBotones(false);
          
                 
        }else if (response.data.data.paqt_Id == 0 && response.data.data.resultado == "Encontrado") {
          toast.error('El Nombre del Paquete ya existe', {
            duration: 4000
          });
        
        }else if (response.data.data.paqt_Id != 0 && response.data.data.resultado == "Error") {
          toast.error('Error al Completar la soliticud', {
            duration: 4000
          });
        }
                
      });
     
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const handleSelectChange = (event) => {
    setSelectedValueElemento(event.target.value);
   
  
  }
    const CargarDatosDDLElementos  = (IDPaquete) => {
   
    axios
      .get('http://eventcompany.somee.com/api/PaqueteDetalles/ListadoElementosTodos')
      .then(response => {     
                
                 
                 setElementos(response.data);
      });
    }
  

      ///////////////////////////////////////////////////////////////////////////////////////
     
      
        
      const  CargarDatostablaInventario = (IDPaquete) => {
      let ElementosTabla = { 
        paqt_Id: IDPaquete,
     
      }
    
      axios
        .post('http://eventcompany.somee.com/api/PaqueteDetalles/ListadoElementosIngresados', ElementosTabla)
        .then(response => {             
          setElementosTabla(response.data)
          const totalArray = response.data.map(elemento => elemento.total);
          
        
           setTotaldeElementos(totalArray);
           actualizarPrecioTotal();
        });

      
      }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////

    const handleSelectChange2 = (event) => {
       
      setSelectedValueServicio(event.target.value);
      
    };
      const CargarDatosDDLServicios  = (IDPaquete) => { 

        let ServiciosDisponibles = { 
          paqt_Id: IDPaquete,
        
        }
        axios
          .post('http://eventcompany.somee.com/api/PaqueteDetalles/ListadoServiciosFaltan', ServiciosDisponibles)
          .then(response => {     
           
            setServicios (response.data)    
           
          });
        }

       ///////////////////////////////////////////////////////////////////////////////////////////////////
          const CargarDatostablaServicios  = (IDPaquete) => { 
          let ServiciosTabla = { 
            paqt_Id: IDPaquete,
          
          }
        
          axios
            .post('http://eventcompany.somee.com/api/PaqueteDetalles/ListadoServiciosIngresados', ServiciosTabla)
            .then(response => {     
                    
              setServiciosTabla(response.data)

              const totalArray = response.data.map(elemento => elemento.serv_Precio_Nuevo);
              setTotaldeServicios(totalArray);
              actualizarPrecioTotal();
             
  
                        
            }); 
    }

    
    const CapturarCantidad = (e) => {
      setCantidadElementos(e)
  
      
    };
    
    const InsertarElemento  = () => {
      
     if (selectedValueElemento == '' || selectedValueElemento == null ) {
      
      toast.error('Seleccione un Elemento', {
        duration: 4000
      });  
      return

     }else if (CantidadElementos == '' || CantidadElementos == null){
      toast.error('Ingrese una Cantidad', {
        duration: 4000
      });  
      return
     }else if (CantidadElementos <=0 ){
      toast.error('Ingrese una Cantidad valida mayor a 0', {
        duration: 4000
      }); 
      setCantidadElementos('');  
      return
     }
     
      let payload2 = { 
        paqt_Id: IDPaqueteCreado,
        inve_Id: selectedValueElemento,
        pqsv_Cantidad: CantidadElementos,
        pqsv_UsuarioCreador: localStorage.getItem('IDUsuario')
      
      
      }
    
      axios
        .post('http://eventcompany.somee.com/api/PaqueteDetalles/InsertarElementosPaqueteDetalles', payload2)
        .then(response => {     
    
      
          if (response.data.data.codeStatus == 1) {
           
              toast.success('Elemento Agregado Exitosamente', {
                duration: 4000
              });  
                   
              CargarDatosDDLElementos(IDPaqueteCreado);                      
              CargarDatostablaInventario(IDPaqueteCreado);             
              //CargarDatostablaServicios(response.data.data.paqt_Id)
              //CargarDatosDDLServicios(response.data.data.paqt_Id);
              setSelectedValueElemento('');    
              setCantidadElementos(''); 
          }
                  
        });
       
    }

     const EliminarElemento  = (rowId) => {
      
      let payload2 = { 
        paqt_Id: IDPaqueteCreado,
        inve_Id: rowId
            
      }
   
      axios
        .post('http://eventcompany.somee.com/api/PaqueteDetalles/EliminarElementosPaqueteDetalles', payload2)
        .then(response => {     
       
      
          if (response.data.data.codeStatus == 1) {
           
              toast.success('Elemento Eliminado Exitosamente', {
                duration: 4000
              });  
                   

              CargarDatosDDLElementos(IDPaqueteCreado);                      
              CargarDatostablaInventario(IDPaqueteCreado);             
             
             
              
             
          }
                  
        });
       
    }

    const InsertarServicio  = () => {
      
      if (selectedValueServicio == '' || selectedValueServicio == null ) {
       
       toast.error('Seleccione un Servicio', {
         duration: 4000
       });  
       return
      }
      
       let payload2 = { 
         paqt_Id: IDPaqueteCreado,
         serv_Id: selectedValueServicio,        
         pqsv_UsuarioCreador: localStorage.getItem('IDUsuario')
            
       }
     
       axios
         .post('http://eventcompany.somee.com/api/PaqueteDetalles/InsertarServiciosPaqueteDetalles', payload2)
         .then(response => {     
     
       
           if (response.data.data.codeStatus == 1) {
            
               toast.success('Servicio Agregado Exitosamente', {
                 duration: 4000
               });  
                    
                          
               CargarDatostablaServicios(IDPaqueteCreado);
               CargarDatosDDLServicios(IDPaqueteCreado);
               setSelectedValueServicio('');    
              
           }
                   
         });
        
     }

     


     const EliminarServicio  = (IDSERVICIO) => {
      
       let payload2 = { 
         paqt_Id: IDPaqueteCreado,
         serv_Id: IDSERVICIO         
            
       }
     
       axios
         .post('http://eventcompany.somee.com/api/PaqueteDetalles/EliminarServicioPaqueteDetalles', payload2)
         .then(response => {     
     
       
           if (response.data.data.codeStatus == 1) {
            
               toast.success('Servicio Eliminado Exitosamente', {
                 duration: 4000
               });  
                    
                          
               CargarDatostablaServicios(IDPaqueteCreado);
               CargarDatosDDLServicios(IDPaqueteCreado);
               setSelectedValueServicio('');    
              
           }
                   
         });
        
     }
    

     const CapturarPrecioFinal = (e) => {
      setPrecioFinal(e)
  
      
         };

         const InsertarPrecioFinal  = () => {
           console.log(PrecioNormal);
           console.log(PrecioFinal);
          if(PrecioNormal < PrecioFinal){

            toast.error('El Precio debe ser menor ', {
              duration: 4000
            });  
            return
          }
          if(PrecioFinal <= 0){

            toast.error('El Precio debe ser mayor a 0 ', {
              duration: 4000
            });  
            return
          }
      
          let payload2 = { 
            paqt_Id: IDPaqueteCreado,
            paqt_Precio: PrecioFinal         
               
          }
        
          axios
            .post('http://eventcompany.somee.com/api/PaquetesEncabezado/PrecioFinalPaquete', payload2)
            .then(response => {     
        
          
              if (response.data.data.codeStatus == 1) {
               
                  toast.success('Paquete Finalizado Exitosamente Exitosamente', {
                    
                    duration: 4000
                  });  
                  
                  setTimeout(() => {

                    Redirigir();
                    
                  }, 4000);
                                                              
                 
              }
                      
            });
           
        }



  const Redirigir = () => {
    router.push('/dashboards/Paquetes/')
  }


  const Servicios = [
    {
      name: 'serv_Id',
      label: 'Servicio ID'
    },
    {
      name: 'prov_Servicio',
      label: 'Nombre Servicio'
    },
    {
      name: 'serv_Precio_Nuevo',
      label: 'Precio'
    },
    {
      name: 'Acciones',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowId = tableMeta.rowData[0]

          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>                      
              <Box sx={{ mx: 1 }}></Box>
              <Fab color='error' aria-label='delete' size='small' onClick={() => EliminarServicio(rowId)}>
                <Icon icon='tabler:trash' />
              </Fab>
            </Box>
          )
        }
      }
    }
  ]

  const Inventario = [
    {
      name: 'inve_Id',
      label: 'Elemento ID'
    },
    {
      name: 'inve_Elemento',
      label: 'Nombre Elemento'
    },
    {
      name: 'pqsv_Cantidad',
      label: 'Cantidad'
    },
    {
      name: 'inve_Precio',
      label: 'Precio Unitario'
    },
    {
      name: 'total',
      label: 'Total'
    },
    {
      name: 'Acciones',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowId = tableMeta.rowData[0]

          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>                      
              <Box sx={{ mx: 1 }}></Box>
              <Fab color='error' aria-label='delete' size='small' onClick={() => EliminarElemento(rowId)}>
                <Icon icon='tabler:trash' />
              </Fab>
            </Box>
          )
        }
      }
    }
  ]

  return (
    <div>
      <Box sx={{ py: 4 }}>
      <Typography variant="h4" align="center">
        Crear Paquete
      </Typography>
    </Box>
    <br></br>
   
    <Grid container spacing={1}>
   
      <Card sx={{ width: '100%',height: '230px', p: 4, display: 'flex' }}>
        <Grid item xs={12}>
        
     <TextField
      id="outlined-basic"
      label="Nombre del paquete"
      variant="outlined"
      fullWidth
      sx={{ width: '98%', height: '50px' }}
      disabled={DeshabilitarNombre}
      value={NombrePaquete}
      onChange={e => {CapturarNombre(e.target.value)}}
         
      error={showError}
      helperText={showError && validationErrors.NombrePaquete}
    />
    
          
    <br></br>
    <br></br>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="contained"
        sx={{ width: '30%', ml: 2, height: '50px' }}
        onClick={CreateAction}
        disabled={DeshabilitarNombre} 
      >
        Agregar paquete
      </Button>
      
          </Box>
          </Grid>
          <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Precio Normal"
            variant="outlined"
            disabled={true}
            value={PrecioNormal}
            fullWidth
            sx={{ width: '100%', height: '50px' }}
          />
          <br></br>
          <br></br>
        <TextField
          id="outlined-basic"
          label="Precio Final"
          type='number'
          disabled={HabilitarBotones} 
          
          variant="outlined"
          fullWidth
          value={PrecioFinal}
          onChange={e => { CapturarPrecioFinal(e.target.value)}}
          sx={{ width: '50%', height: '50px' }}
          
          
        />
           <br></br>
          <br></br> 
         
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={InsertarPrecioFinal} disabled={BotomTerminar}   sx={{ width: '30%', height: '50px' }}>
            Confirmar Paquete
          </Button> 
        </Box>
         
        </Grid>
      </Card> 
      
    </Grid>
  
    <br></br>
    
    <TabContext value={value} disabled={true}>
    <Card sx={{ width: '100%', p: 4}}>
      <TabList  centered onChange={handleChange} aria-label='centered tabs example'>
        <Tab value='1' disabled={HabilitarPaneles} label='Inventario' />
        <Tab value='2' disabled={HabilitarPaneles} label='Servicio' />
      </TabList>
      <TabPanel value='1' >
        <Box sx={{ display: 'flex', mb: 2 }}>
          <FormControl fullWidth sx={{ width: '70%', mr: 2 }}>
            <InputLabel id="demo-simple-select-label">Elemento</InputLabel>
            
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectedValueElemento} onChange={handleSelectChange}>
      <MenuItem value={null}>Seleccione un elemento</MenuItem>
      {listElementos.map((elemento) => (
        <MenuItem key={elemento.inve_Id} value={elemento.inve_Id}>{elemento.inve_Elemento_Todos}</MenuItem>
      ))}
    </Select>   
          </FormControl>
          <TextField
  id="outlined-basic"
  label="Cantidad"
  type='number'
  
  variant="outlined"
  fullWidth
  value={CantidadElementos}
  onChange={e => { CapturarCantidad(e.target.value)}}
  sx={{ width: '50%', height: '50px' }}
  
  
/>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={InsertarElemento} variant="contained" sx={{ width: '30%', height: '50px' }}>
            Agregar
          </Button>
        </Box>
        <Box sx={{ mt: 4 }}>
          <MUIDataTable
            title="Inventario"
            data={listElementosTabla}
            columns={Inventario}
            options={{
              selectableRows: false,
              pagination: true,
              rowsPerPage: 5
            }}
          />
          </Box>
      </TabPanel >
      <TabPanel value='2' >
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="demo-simple-select-label">Servicio</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectedValueServicio} onChange={handleSelectChange2}>
  <MenuItem value={null}>Seleccione un servicio</MenuItem>
  {listServicios.map((servicio) => (
    <MenuItem key={servicio.serv_Id} value={servicio.serv_Id}>{servicio.prov_Servicio}</MenuItem>
  ))}
</Select>
        </FormControl>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={InsertarServicio} sx={{ width: '30%', height: '50px' }}>
            Agregar
          </Button>
        </div>
      <Box sx={{ mt: 4 }}>
        <MUIDataTable
          title="Servicios"
          data={listServiciosTabla}
          columns={Servicios}
          options={{
            selectableRows: false,
            pagination: true,
            rowsPerPage: 5
          }}
        />
      </Box>
      </TabPanel>  
      </Card>  
    </TabContext>
 
    </div>
);
};
