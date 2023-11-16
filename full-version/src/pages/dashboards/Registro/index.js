// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import StepperLinearWithValidation from 'src/views/dashboards/Registro/StepperLinearWithValidation'

const FormWizard = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h6'>Registro</Typography>
      </Grid>
      <Grid item xs={12}>
        <StepperLinearWithValidation />
      </Grid>
    </Grid>
  )
}

export default FormWizard
