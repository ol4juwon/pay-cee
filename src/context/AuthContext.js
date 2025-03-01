// ** React Imports
import { createContext, useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import { AuthService } from 'src/Service/Api/services'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)

        try {
          const x = jwt.verify(storedToken,process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET)
          const data = jwt.decode(storedToken)
          setUser(data)
          setLoading(false)
        } catch (err) {
          localStorage.removeItem('userData')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('accessToken')
          setUser(null)
          setLoading(false)
          if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
            router.replace('/login')
          }
        }

        // })
        // .catch(() => {
        //   localStorage.removeItem('userData')
        //   localStorage.removeItem('refreshToken')
        //   localStorage.removeItem('accessToken')
        //   setUser(null)
        //   setLoading(false)
        //   if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
        //     router.replace('/login')
        //   }
        // })
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    AuthService.LoginUser(params)
      .then(async response => {
        window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.token)
        const data = jwt.decode(response.data.token)
        const returnUrl = router.query.returnUrl
        setUser({ ...data })

        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(data)) : null

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
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
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
