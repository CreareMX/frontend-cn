// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Config
import authConfig from 'src/configs/auth'

import { postLogin } from 'src/api/AuthApi'

import axios from 'axios'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const baseUrl = process.env.NEXT_PUBLIC_API

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      // const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      // if (storedToken) {
      //   setLoading(true)
      //   await axios
      //     .get(authConfig.meEndpoint, {
      //       headers: {
      //         Authorization: storedToken
      //       }
      //     })
      //     .then(async response => {
      //       setLoading(false)
      //       setUser({ ...response.data.userData })
      //     })
      //     .catch(() => {
      //       localStorage.removeItem('userData')
      //       localStorage.removeItem('refreshToken')
      //       localStorage.removeItem('accessToken')
      //       setUser(null)
      //       setLoading(false)
      //       if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
      //         router.replace('/login')
      //       }
      //     })
      // } else {
      //   setLoading(false)
      // }

      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

      if (storedToken) {

        let dataUser = {
          id: 1,
          role: 'admin',
          fullName: 'Admin Mayoreo',
          username: 'admninMayoreo',
          email: 'admin@mayoreo.com',
        }
        setUser(dataUser)
      
        window.localStorage.setItem('userData', JSON.stringify(dataUser))

       setLoading(false)
      }else{
        localStorage.removeItem('userData')
        localStorage.removeItem('accessToken')
        setLoading(false)
        setUser(null)
        router.replace('/login')
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleLogin = async(params, errorCallback) => {

    // axios
    //   .post(authConfig.loginEndpoint, params)
    //   .then(async response => {
    //     params.rememberMe
    //       ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
    //       : null
    //     const returnUrl = router.query.returnUrl
    //     setUser({ ...response.data.userData })
    //     params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
    //     const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
    //     router.replace(redirectURL)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     if (errorCallback) errorCallback(err)
    //   })

    try {
    const response = await postLogin(params)
    let date = new Date().toLocaleDateString('es-MX')

    let dataUser = {
      id: 1,
      role: 'admin',
      fullName: 'Admin Mayoreo',
      username: 'admninMayoreo',
      email: 'admin@mayoreo.com',
    }

    if(response.status === 200){
      let cajaChica = [
        {"id":1,"concepto":"Abono caja chica","fecha":date,"monto":500,"comentarios":"Se abono a la caja chica","tipo":"Abono"}
      ]

      let ajustes = [
        {
          id:11 ,
          usuario:'Administrador',
          fecha: '1/8/2023',
          estado:'Ajustado',
          comentarios: 'Prueba de ajuste',
        }
      ]
      

      window.localStorage.setItem('cajaChica', JSON.stringify(cajaChica))
      window.localStorage.setItem('ajustes', JSON.stringify(ajustes))
      window.localStorage.setItem('dinero', '500')
      window.localStorage.setItem(authConfig.storageTokenKeyName, response.data)
          const returnUrl = router.query.returnUrl
          setUser(dataUser)
           window.localStorage.setItem('userData', JSON.stringify(dataUser))
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
          router.replace(redirectURL)
    }
      
    } catch (error) {
      console.log(error)
      if (errorCallback) errorCallback(error)
    }

  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
