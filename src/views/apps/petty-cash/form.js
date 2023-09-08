// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

import { useRouter } from 'next/router'


// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'


// ** Next Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import { DataGrid, esES } from '@mui/x-data-grid'

import DialogAlert from 'src/views/components/dialogs/DialogAlert'

// ** Icon Imports

// ** Store Imports

import { Provider, useDispatch, useSelector } from 'react-redux'

import { getAllBranchOffice, getAllPeople, getAllWarehouse, getAllProducts, postRequesitions, postRequesitionsDetail, getAllProductsbyIdProvider, changeStatusReqById } from 'src/api/RequestApi'
import { deleteBranchOffice } from 'src/api/RequestApi'
import toast from 'react-hot-toast'
import Autocomplete from '@mui/material/Autocomplete'
import { useForm, Controller } from 'react-hook-form'



// ** Data
import { top100Films } from 'src/@fake-db/autocomplete'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Fecha' autoComplete='off' />
})

const FormLayoutsSeparator = () => {
  const router = useRouter()

  // ** States
  const [date, setDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [language, setLanguage] = useState([])
  const [productList, setProductList] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(false)
  const [warehouse, setWarehouse] = useState([])
  const [providerId, setProviderId] = useState('')
  const [count,setCount] = useState('')
  const [comments, setComments] = useState('')
  const [conceptoSelected, setConceptoSelected] = useState(null)
  const [monto, setmonto] = useState(null)
  const [dinero, setDinero] = useState(0)

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  const conceptos = [
    {
      id:1,
      nombre:'Telefono'
    },
    {
      id:2,
      nombre:'Agua'
    },
    {
      id:3,
      nombre:'Luz'
    }
  ]

  const getPeople =  async() =>{
    try {
      setLoading(true)
        const response = await getAllPeople()
        console.log("🚀 ~ file: form.js:110 ~ getPeople ~ response:", response)
        if(response.status === 200){
          
          const proveedores = response.data.filter(e=>e.tipoPersona.nombre ==='PROVEEDOR')
          
          setProviders(proveedores)
          setLoading(false)

        }
        
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChange = dates => {
   console.log(dates)
   setStartDate(dates)
  }

  const getWarehouse =  async() =>{
    try {
      setLoading(true)
        const response = await getAllWarehouse()
        if(response.status === 200){
          setWarehouse(response.data)
          setLoading(false)

        }
        
    } catch (error) {
      console.log(error)
    }
  }

  const getbranchOffices =  async() =>{

  }

  const getProductsbyProvider =  async(id) =>{
    try {
      setLoading(true)
        const response = await getAllProductsbyIdProvider(id)
        if(response.status === 200){
          console.log(response.data)
          setLoading(false)

        }
        
    } catch (error) {
      console.log(error)
    }
  }

  const getAllProductsProvider =  async() =>{
    try {
      setLoading(true)
        const response = await getAllProducts()
        console.log("🚀 ~ file: form.js:175 ~ getAllProductsProvider ~ response:", response)
        if(response.status === 200){
          console.log(response.data)
          setLoading(false)

        }
        
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    let dineroDisponible = parseInt(localStorage.getItem('dinero'))
    setDinero(dineroDisponible)
  },[])

  const RowOptions = ({ id, data }) => {
    // ** Hooks
    const dispatch = useDispatch()
  
    // ** State
    const [anchorEl, setAnchorEl] = useState(null)
    const rowOptionsOpen = Boolean(anchorEl)
  
  
  
    const handleRowOptionsClick = event => {
      setAnchorEl(event.currentTarget)
    }
  
    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }
  
   
  
    const handleDelete = () => {

      const objWithIdIndex = productList.findIndex((obj) => obj.id === data.id);
      const newArry = [...productList]
      newArry.splice(objWithIdIndex, 1);
      setProductList(newArry)
        }

     
  
    // const getTyperPersons =  async() =>{
    //   try {
    //       const response = await getAllTyperPersons()
    //       if(response.status === 200){
    //         console.log(response.data)
    //         setTypePersons(response.data)
  
    //       }
          
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    
  
    return (
      <>
       <Button size='medium' sx={{ mr: 2}} onClick={handleDelete}>
       <Icon icon='tabler:trash' fontSize={20} />
            Eliminar
          </Button>
     
      </>
    )
  }
  
  const columns = [
    {
      flex: 0.25,
      width: 300,
      minWidth: 300,
      maxWidth: 450,
      field: 'nombre',
      headerName: 'Nombre',
      renderCell: ({ row }) => {
  
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row.nombre}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      width: 300,
      minWidth: 300,
      maxWidth: 450,
      field: 'proveedor',
      headerName: 'Proveedor',
      renderCell: ({ row }) => {
  
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row.proveedor}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      width: 300,
      minWidth: 300,
      maxWidth: 450,
      field: 'descripcion',
      headerName: 'Descripción',
      renderCell: ({ row }) => {
  
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row.descripcion}
              </Typography>
            </Box>
          </Box>
        )
      }
    }, 
    {
      flex: 0.25,
      width: 100,
      minWidth: 100,
      maxWidth: 100,
      field: 'cantidad',
      headerName: 'Cantidad',
      renderCell: ({ row }) => {
  
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row.cantidad}
              </Typography>
            </Box>
          </Box>
        )
      }
    }, 
    {
      flex: 0.25,
      width: 100,
      minWidth: 100,
      maxWidth: 100,
      field: 'precio',
      headerName: 'Precio',
      renderCell: ({ row }) => {
  
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row.precio}
              </Typography>
            </Box>
          </Box>
        )
      }
    }, 
    {
      flex: 0.1,
      width: 100,
      minWidth: 100,
      maxWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Accion',
      renderCell: ({ row }) => <RowOptions data={row} id={row.id} />
    }
  ]



  const handleChangeSucursal = (event, newValue) => {
    console.log("🚀 ~ file: form.js:279 ~ handleChangeSucursal ~ newValue:", newValue)
  }

  const onSubmit = async(data) =>{

    let number= Math.floor(Math.random() *200)

    let arrayJson = []

    let dataJson = {
      id:number ,
      concepto: conceptoSelected ,
      fecha: new Date(startDate).toLocaleDateString('es-MX'),
      monto: parseInt(monto),
      comentarios: comments,
      tipo:'Cargo'
    }

    let dineroDisponible = parseInt(localStorage.getItem('dinero'))
    let dineroARestar = dineroDisponible - parseInt(monto)
    console.log("🚀 ~ file: form.js:415 ~ onSubmit ~ dineroARestar:", dineroARestar)

    if(dineroARestar < 0){
      toast.error('Superaste el monto maximo')
      
      return

    }

    let NuevoDineroDisponible = localStorage.setItem('dinero', dineroARestar )

    arrayJson.push(dataJson)

    let dataObj = JSON.stringify(arrayJson);

    let listaCajaChica = localStorage.getItem("cajaChica");
    if(!JSON.parse(listaCajaChica)){
      localStorage.setItem('cajaChica',dataObj )
    }else{
      let addTojson = JSON.parse(listaCajaChica)
      addTojson.push(dataJson)
      localStorage.setItem('cajaChica',JSON.stringify(addTojson) )
    }
  
    toast.success('Cargo agregado con éxito')
    router.push('/petty-cash')

  }

  const addProductsToList = (data)=>{

    if(data == ''){
      toast.error('Tienes que seleccionar por lo menos un producto de la lista')

      return
    }

    const product = {
      id: data?.idProducto,
      nombre: data?.producto?.nombre,
      descripcion: data?.producto?.descripcion,
      cantidad: parseInt(count),
      precio:data?.producto?.precios[0]?.monto,
      idProveedor:data?.idProveedor,
      proveedor:data?.proveedor?.nombre
    }

    const found = productList.some(el => el.id === data.id);

    if(found){
      setCount('')
      setProductSelected('')
      setProviderId('')
      toast.error('Ya existe el producto en la lista')

    }else if(count ===''){
      toast.error('Seleccione la cantidad deseada')

    }else{
      setProductList((old)=> [...old, product])
      setCount('')
      setProductSelected('')
      setProviderId('')
    }



     

  }


  const defaultValues = {
    cometnarios: '',

  }

  const {
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
  })


  return (
    <>
    <Card>
      <CardHeader title='Agregar' />
      <Divider sx={{ m: '0 !important' }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid item xs={12} sm={12} sx={{display:'flex', flexWrap:'wrap' , justifyContent:'space-around'}}>
         
          <Grid item xs={12} container spacing={5} sm={6}>

           
          <Grid item xs={12} sm={11}>
              <TextField required fullWidth name='concepto'  onChange={(data,e) =>setConceptoSelected(data.target.value)}  label='Concepto' InputProps={{
          }} />
          </Grid>

          <Grid item xs={12} sm={11}>
              <TextField  required fullWidth name='descripcion' onChange={(e)=>setmonto(e.target.value)}  label='Monto' InputProps={{
          }} />
            </Grid>

            <Grid item xs={12} sm={11}>
              <TextField required fullWidth name='descripcion' onChange={(e)=> setComments(e.target.value)}  label='Comentario' InputProps={{
          }} />
            </Grid>
          
          </Grid>
          <Grid item xs={6} container spacing={5} sm={6}>
            
          <Grid item xs={12} sm={12}>
          <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'center', justifyContent: 'center', height:'200px' }}>
                <Typography variant='h6' sx={{ lineHeight: 1, fontWeight: 600, fontSize: '3.75rem !important' }}>
                  ${dinero}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          </Grid>
   

        </CardContent>
        <Divider sx={{ m: '0 !important' }} />
        <CardActions style={{display:'flex', justifyContent:'flex-end'}}>
          <Button onClick={()=> router.push('/petty-cash')} size='large' variant='outlined'>
            Cancelar
          </Button>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Guardar
          </Button>
        </CardActions>
      </form>
    </Card>
        </>
  )
  
}

export default FormLayoutsSeparator
