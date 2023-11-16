// ** React Imports
import { useState } from 'react'

// ENTRAR AL LOGIN DE API

import axios from 'axios'

import { useRouter } from 'next/router'

// ** Next Import

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Styled Components

const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LoginV2 = () => {
  // ** States
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  // ** Variales
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)
  const [showError, setshowError] = useState(false)
  const [Username, setUsername] = useState('')
  const [contra, setcontra] = useState('')

  const clearDialog = () => {
    setValidationErrors({})
  }

  // ** Hook
  const theme = useTheme()
  const { settings } = useSettings()

  // ** Vars
  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const router = useRouter()

  const handleClick = () => {
    router.push('/dashboards/analytics/')
  }

  const loginAction = e => {
    setValidationErrors({})

    e.preventDefault()

    setIsSubmitting(true)

    if (!email) {
      setValidationErrors({ email: 'Debe ingresar una nombre de usuario' })
      setshowError(true)
      toast.error('e', {
        duration: 4000
      })

      return
    }

    if (!password) {
      setValidationErrors({ password: 'Debe ingresar un contraseña' })
      setshowError(true)
      toast.error('e', {
        duration: 4000
      })

      return
    }

    let payload = {
      usua_Nombre: email,
      usua_Contrasenia: password
    }

    axios
      .post('https://localhost:7002/api/Usuarios/Login', payload)
      .then(r => {
        console.log(r.data)
        console.log(r.data.message)
        if (r.data.message == 'El usuario o contraseña son incorrectos') {
          toast.error(r.data.message, {
            duration: 4000
          })
        } else {
          localStorage.setItem('Rol', r.data.data.role_Id)
          localStorage.setItem('IDUsuario', r.data.data.usua_Id)
          localStorage.setItem('RolDes', r.data.data.role_Descripcion)
          localStorage.setItem('registro', 1)
          handleClick()
        }
      })

      .catch(e => {
        console.error(e)
        toast.error('trono', {
          duration: 4000
        })
      })
  }

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <LoginIllustration
            alt='login-illustration'
            src={`/images/pages/colegas-preparandose-fiesta-corporativa-gestion-tiempo-fecha-limite-evento-marca_335657-3083.avif`}
          />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Box sx={{ my: 6 }}>
              <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                {`Bienvenido(a) al Sistema de inventario ! 👋🏻`}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Inicia sesion para comenzar tu aventura con nosotros
              </Typography>
            </Box>
            <form
              onSubmit={e => {
                loginAction(e)
              }}
            >
              {Object.keys(validationErrors).length !== 0 && (
                <p className='text-center '>
                  <small className='text-danger'>Contraseña o nombre de usuario incorrectas</small>
                </p>
              )}
              <FormControl fullWidth sx={{ mb: 1.5 }}>
                <InputLabel htmlFor='auth-login-v2-password'>Nombre de usuario</InputLabel>
                <OutlinedInput
                  id='email'
                  label='Email'
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                  }}
                  error={showError}
                  helperText={showError && validationErrors.email}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 1.5 }}>
                <InputLabel htmlFor='auth-login-v2-password'>Contraseña</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={password}
                  id='auth-login-v2-password'
                  onChange={e => {
                    setPassword(e.target.value)
                  }}
                  error={showError}
                  helperText={showError && validationErrors.contra}
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                      >
                        <Icon icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button fullWidth size='large' onClick={loginAction} variant='contained' sx={{ mb: 4 }}>
                Iniciar Sesión
              </Button>
              <Divider
                sx={{
                  fontSize: '0.875rem',
                  color: 'text.disabled',
                  '& .MuiDivider-wrapper': { px: 6 },
                  my: theme => `${theme.spacing(6)} !important`
                }}
              ></Divider>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}
LoginV2.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginV2
