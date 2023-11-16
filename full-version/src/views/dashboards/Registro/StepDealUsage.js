import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import Select from '@mui/material/Select'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomRadioIcons from 'src/@core/components/custom-radio/icons'

const data = [
  {
    isSelected: true,
    value: '1',
    title: 'Paquete Básico',
    content: 'Paquete básico para una reunión informal con amigos o familia'
  },
  {
    value: '2',
    title: 'Paquete Estándar',
    content: 'Paquete estándar para un concierto'
  },
  {
    value: '3',
    title: 'Paquete Premium',
    content: 'Paquete premium un evento muy grande con una capacidad de 300 personas'
  }
]
const regionArray = ['Asia', 'Europe', 'Africa', 'Australia', 'North America', 'South America']

const ImgWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 4, 0, 4)
  },
  [theme.breakpoints.up('sm')]: {
    height: 250,
    padding: theme.spacing(5, 5, 0, 5)
  },
  '& img': {
    height: 'auto',
    maxWidth: '100%'
  }
}))

const StepDealUsage = () => {
  const initialIconSelected = data.filter(item => item.isSelected)[data.filter(item => item.isSelected).length - 1]
    .value

  // ** States
  const [region, setRegion] = useState([])
  const [selectedRadio, setSelectedRadio] = useState(initialIconSelected)

  // ** Hook
  const theme = useTheme()

  const icons = [
    {
      icon: 'tabler:discount-check',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:credit-card',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:diamond',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    }
  ]

  const handleChange = event => {
    const {
      target: { value }
    } = event
    setRegion(typeof value === 'string' ? value.split(',') : value)
  }

  const handleRadioChange = prop => {
    if (typeof prop === 'string') {
      setSelectedRadio(prop)
    } else {
      setSelectedRadio(prop.target.value)
    }
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <ImgWrapper>
          <img width={650} alt='illustration' src={`/images/pages/create-deal-type-${theme.palette.mode}.png`} />
        </ImgWrapper>
      </Grid>
      {data.map((item, index) => (
        <CustomRadioIcons
          key={index}
          data={data[index]}
          icon={icons[index].icon}
          selected={selectedRadio}
          name='custom-radios-deal'
          gridProps={{ sm: 4, xs: 12 }}
          handleChange={handleRadioChange}
          iconProps={icons[index].iconProps}
        />
      ))}
    </Grid>
  )
}

export default StepDealUsage
