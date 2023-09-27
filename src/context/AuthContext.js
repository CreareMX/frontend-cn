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

      let entradas = [
        {
          "id": 1,
          "idCliente": 2,
          "cliente": {
            "id": 2,
            "email": "proveedor@test.com",
            "idDatosFiscales": 2,
            "idTipoPersona": 3,
            "nombre": "PROVEEDOR DE PRUEBA",
            "sitioWeb": null,
            "telefono": "9999222222",
            "tipoPersona": {
              "nombre": "PROVEEDOR",
              "id": 3,
              "esPersonaMoral": true
            },
            "datosFiscales": {
              "id": 2,
              "apellidoMaterno": "sistema",
              "apellidoPaterno": "prueba",
              "calle": "calle 34",
              "codigoPostal": 55555,
              "colonia": "sin colonia",
              "cruzamientos": "SC",
              "domicilio": "conocido",
              "idEntidadFederativa": 9,
              "nombres": "proveedor",
              "numeroExterior": "SN",
              "numeroInterior": "SN",
              "razonSocial": "PROVEEDOR DE PRUEBA",
              "rfc": "PROV010101ABC",
              "entidadFederativa": null
            }
          },
          "idEmpleadoCrea": 3,
          "empleadoCrea": {
            "id": 3,
            "email": "compras@cnseguridad.com",
            "idDatosFiscales": null,
            "idTipoPersona": 1,
            "nombre": "EMPLEADO",
            "sitioWeb": null,
            "telefono": "9999333333",
            "tipoPersona": {
              "nombre": "EMPLEADO",
              "id": 1,
              "esPersonaMoral": false
            },
            "datosFiscales": null
          },
          "fecha": "2023-07-04T06:36:06",
          "fechaCompromiso": "2023-07-04T06:36:06",
          "fechaEnvio": "2023-07-04T06:36:06",
          "formaEnvio": "terestre",
          "idAlmacen": 1,
          "almacen": {
            "id": 1,
            "descripcion": "Almacen Principal",
            "nombre": "Mérida",
            "codigo": "C1245S",
            "idTipoAlmacen": 1,
            "tipoAlmacen": null,
            "idSucursal": 1,
            "sucursal": {
              "nombre": "Mérida",
              "id": 1,
              "domicilio": "C45 #234 Col Centro",
              "telefono": "9992353664"
            }
          },
          "idSucursal": 1,
          "sucursal": {
            "nombre": "Mérida",
            "id": 1,
            "domicilio": "C45 #234 Col Centro",
            "telefono": "9992353664"
          },
          "comentarios": "Comentario de prueba",
          "idEstado": 6,
          "estado": {
            "nombre": "OC_PAGADA",
            "id": 6,
            "idSeccion": 1,
            "seccion": null
          },
          "idEmpleadoAutoriza": null,
          "empleadoAutoriza": null,
          "fechaAutorizacion": null
        },
        {
          "id": 2,
          "idCliente": 2,
          "cliente": {
            "id": 2,
            "email": "proveedor@test.com",
            "idDatosFiscales": 2,
            "idTipoPersona": 3,
            "nombre": "PROVEEDOR DE PRUEBA",
            "sitioWeb": null,
            "telefono": "9999222222",
            "tipoPersona": {
              "nombre": "PROVEEDOR",
              "id": 3,
              "esPersonaMoral": true
            },
            "datosFiscales": {
              "id": 2,
              "apellidoMaterno": "sistema",
              "apellidoPaterno": "prueba",
              "calle": "calle 34",
              "codigoPostal": 55555,
              "colonia": "sin colonia",
              "cruzamientos": "SC",
              "domicilio": "conocido",
              "idEntidadFederativa": 9,
              "nombres": "proveedor",
              "numeroExterior": "SN",
              "numeroInterior": "SN",
              "razonSocial": "PROVEEDOR DE PRUEBA",
              "rfc": "PROV010101ABC",
              "entidadFederativa": null
            }
          },
          "idEmpleadoCrea": 3,
          "empleadoCrea": {
            "id": 3,
            "email": "compras@cnseguridad.com",
            "idDatosFiscales": null,
            "idTipoPersona": 1,
            "nombre": "EMPLEADO",
            "sitioWeb": null,
            "telefono": "9999333333",
            "tipoPersona": {
              "nombre": "EMPLEADO",
              "id": 1,
              "esPersonaMoral": false
            },
            "datosFiscales": null
          },
          "fecha": "2023-07-04T06:49:03",
          "fechaCompromiso": "2023-07-04T06:49:03",
          "fechaEnvio": "2023-07-04T06:49:03",
          "formaEnvio": "terestre",
          "idAlmacen": 1,
          "almacen": {
            "id": 1,
            "descripcion": "Almacen Principal",
            "nombre": "Mérida",
            "codigo": "C1245S",
            "idTipoAlmacen": 1,
            "tipoAlmacen": null,
            "idSucursal": 1,
            "sucursal": {
              "nombre": "Mérida",
              "id": 1,
              "domicilio": "C45 #234 Col Centro",
              "telefono": "9992353664"
            }
          },
          "idSucursal": 1,
          "sucursal": {
            "nombre": "Mérida",
            "id": 1,
            "domicilio": "C45 #234 Col Centro",
            "telefono": "9992353664"
          },
          "comentarios": "Comentarios",
          "idEstado": 6,
          "estado": {
            "nombre": "OC_PAGADA",
            "id": 6,
            "idSeccion": 1,
            "seccion": null
          },
          "idEmpleadoAutoriza": null,
          "empleadoAutoriza": null,
          "fechaAutorizacion": null
        },
        {
          "id": 3,
          "idCliente": 2,
          "cliente": {
            "id": 2,
            "email": "proveedor@test.com",
            "idDatosFiscales": 2,
            "idTipoPersona": 3,
            "nombre": "PROVEEDOR DE PRUEBA",
            "sitioWeb": null,
            "telefono": "9999222222",
            "tipoPersona": {
              "nombre": "PROVEEDOR",
              "id": 3,
              "esPersonaMoral": true
            },
            "datosFiscales": {
              "id": 2,
              "apellidoMaterno": "sistema",
              "apellidoPaterno": "prueba",
              "calle": "calle 34",
              "codigoPostal": 55555,
              "colonia": "sin colonia",
              "cruzamientos": "SC",
              "domicilio": "conocido",
              "idEntidadFederativa": 9,
              "nombres": "proveedor",
              "numeroExterior": "SN",
              "numeroInterior": "SN",
              "razonSocial": "PROVEEDOR DE PRUEBA",
              "rfc": "PROV010101ABC",
              "entidadFederativa": null
            }
          },
          "idEmpleadoCrea": 3,
          "empleadoCrea": {
            "id": 3,
            "email": "compras@cnseguridad.com",
            "idDatosFiscales": null,
            "idTipoPersona": 1,
            "nombre": "EMPLEADO",
            "sitioWeb": null,
            "telefono": "9999333333",
            "tipoPersona": {
              "nombre": "EMPLEADO",
              "id": 1,
              "esPersonaMoral": false
            },
            "datosFiscales": null
          },
          "fecha": "2023-07-04T19:03:22",
          "fechaCompromiso": "2023-07-04T19:03:22",
          "fechaEnvio": "2023-07-04T19:03:22",
          "formaEnvio": "terestre",
          "idAlmacen": 1,
          "almacen": {
            "id": 1,
            "descripcion": "Almacen Principal",
            "nombre": "Mérida",
            "codigo": "C1245S",
            "idTipoAlmacen": 1,
            "tipoAlmacen": null,
            "idSucursal": 1,
            "sucursal": {
              "nombre": "Mérida",
              "id": 1,
              "domicilio": "C45 #234 Col Centro",
              "telefono": "9992353664"
            }
          },
          "idSucursal": 1,
          "sucursal": {
            "nombre": "Mérida",
            "id": 1,
            "domicilio": "C45 #234 Col Centro",
            "telefono": "9992353664"
          },
          "comentarios": "",
          "idEstado": 5,
          "estado": {
            "nombre": "OC_PAGADA",
            "id": 5,
            "idSeccion": 1,
            "seccion": null
          },
          "idEmpleadoAutoriza": null,
          "empleadoAutoriza": null,
          "fechaAutorizacion": null
        },
        {
          "id": 4,
          "idCliente": 2,
          "cliente": {
            "id": 2,
            "email": "proveedor@test.com",
            "idDatosFiscales": 2,
            "idTipoPersona": 3,
            "nombre": "PROVEEDOR DE PRUEBA",
            "sitioWeb": null,
            "telefono": "9999222222",
            "tipoPersona": {
              "nombre": "PROVEEDOR",
              "id": 3,
              "esPersonaMoral": true
            },
            "datosFiscales": {
              "id": 2,
              "apellidoMaterno": "sistema",
              "apellidoPaterno": "prueba",
              "calle": "calle 34",
              "codigoPostal": 55555,
              "colonia": "sin colonia",
              "cruzamientos": "SC",
              "domicilio": "conocido",
              "idEntidadFederativa": 9,
              "nombres": "proveedor",
              "numeroExterior": "SN",
              "numeroInterior": "SN",
              "razonSocial": "PROVEEDOR DE PRUEBA",
              "rfc": "PROV010101ABC",
              "entidadFederativa": null
            }
          },
          "idEmpleadoCrea": 3,
          "empleadoCrea": {
            "id": 3,
            "email": "compras@cnseguridad.com",
            "idDatosFiscales": null,
            "idTipoPersona": 1,
            "nombre": "EMPLEADO",
            "sitioWeb": null,
            "telefono": "9999333333",
            "tipoPersona": {
              "nombre": "EMPLEADO",
              "id": 1,
              "esPersonaMoral": false
            },
            "datosFiscales": null
          },
          "fecha": "2023-07-04T19:05:47",
          "fechaCompromiso": "2023-07-04T19:05:47",
          "fechaEnvio": "2023-07-04T19:05:47",
          "formaEnvio": "terestre",
          "idAlmacen": 1,
          "almacen": {
            "id": 1,
            "descripcion": "Almacen Principal",
            "nombre": "Mérida",
            "codigo": "C1245S",
            "idTipoAlmacen": 1,
            "tipoAlmacen": null,
            "idSucursal": 1,
            "sucursal": {
              "nombre": "Mérida",
              "id": 1,
              "domicilio": "C45 #234 Col Centro",
              "telefono": "9992353664"
            }
          },
          "idSucursal": 1,
          "sucursal": {
            "nombre": "Mérida",
            "id": 1,
            "domicilio": "C45 #234 Col Centro",
            "telefono": "9992353664"
          },
          "comentarios": "",
          "idEstado": 6,
          "estado": {
            "nombre": "OC_PAGADA",
            "id": 6,
            "idSeccion": 1,
            "seccion": null
          },
          "idEmpleadoAutoriza": null,
          "empleadoAutoriza": null,
          "fechaAutorizacion": null
        },
      ]
      
      window.localStorage.setItem('entradas', JSON.stringify(entradas))

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
