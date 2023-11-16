// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider = {
  user: null,
  setUser: () => null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async response => {
            setUser({ ...response.data.userData })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')

            localStorage.removeItem('Usuario')
            localStorage.removeItem('Rol')
            localStorage.removeItem('IDUsuario')
            localStorage.removeItem('Empleado')

            setUser(null)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.push('/pages/auth/login-v2/')
            }
          })
      } else {
      }
    }
    initAuth()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        params.rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
          : null
        const returnUrl = router.query.returnUrl
        setUser({ ...response.data.userData })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('Usuario', null)

    localStorage.removeItem('Rol', null)
    localStorage.removeItem('IDUsuario', null)
    localStorage.removeItem('RolDes', null)
    localStorage.removeItem('registro', null)

    router.push('/pages/auth/login-v2/')
  }

  const handleRegister = (params, errorCallback) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch(err => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    setUser,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
