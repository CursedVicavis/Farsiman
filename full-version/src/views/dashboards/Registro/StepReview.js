// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import Switch from '@mui/material/Switch'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import MUIDataTable from 'mui-datatables'

const ReviewComplete = () => {
  const columns = [
    {
      name: 'muni_Id',
      label: 'Servicios'
    },
    {
      name: 'muni_Descripcion',
      label: 'Elementos del inventario'
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5' sx={{ mb: 4 }}>
              Adquisiciones extras
            </Typography>
          </Grid>
          <Grid container justifyContent='center' spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id='select-payment-method'>Servicios</InputLabel>
                <Select labelId='select-payment-method' label='Payment Method' defaultValue=''>
                  <MenuItem value='any'>any</MenuItem>
                  <MenuItem value='credit-card'>Credit Card</MenuItem>
                  <MenuItem value='net-banking'>Net Banking</MenuItem>
                  <MenuItem value='wallet'>Wallet</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField fullWidth type='number' label='Cantidad de un servicio' placeholder='500' />
              </FormControl>
            </Grid>
          </Grid>
          <br></br>
          <br></br>
          <br></br>
          <Grid container justifyContent='center' spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id='select-payment-method'>Elementos del inventario</InputLabel>
                <Select labelId='select-payment-method' label='Payment Method' defaultValue=''>
                  <MenuItem value='any'>any</MenuItem>
                  <MenuItem value='credit-card'>Credit Card</MenuItem>
                  <MenuItem value='net-banking'>Net Banking</MenuItem>
                  <MenuItem value='wallet'>Wallet</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField fullWidth type='number' label='Cantidad de elementos del inventario' placeholder='500' />
              </FormControl>
            </Grid>
          </Grid>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Grid container justifyContent='center' spacing={2}>
            <Grid item xs={12}>
              <MUIDataTable
                columns={columns}
                options={{
                  selectableRows: false
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ReviewComplete
