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
  const [clienteSelected, setClienteSelected] = useState(null)
  const [tipoPagoSelected, setTipoPagoSelected] = useState(null)
  const [monto, setmonto] = useState(null)
  const [id,setId] = useState(null)
  const [comentario, setComentario] = useState('')

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  const clientes = [
    {
      id:1,
      nombre:'Administrador'
    },
  ]

  const cobros = [
    {
      id:1,
      cobrado:'Efectivo $150',
      sistema: 'Efectivo $150',
      diferencia: 'Efectivo $0'
    },
    {
      id:2,
      cobrado:'Tarjeta $450',
      sistema: 'Tarjeta $400',
      diferencia: 'Tarjeta $50'
    },
    {
      id:3,
      cobrado:'Transferencia $1250',
      sistema: 'Transferencia $1280',
      diferencia: 'Transferencia $30'
    },
    {
      id:4,
      cobrado:' Total $259',
      sistema: 'Total $2579',
      diferencia: 'Total $80'
    },
   
  ]

  useEffect(()=>{
    if(router.query.id){
      setId(parseInt(router.query.id))
      getCortedeCaja(parseInt(router.query.id))
    }
  },[router.query.id])

  const getCortedeCaja = (id)=>{
    let cortes = localStorage.getItem('corteCaja')
    let filter = JSON.parse(cortes)
    let resultado = filter.filter(e=> e.id ==  id)
    setComentario(resultado[0].comentarios)    
  }

  const columns = [
    {
      flex: 0.25,
      width: 300,
      minWidth: 300,
      maxWidth: 450,
      field: 'nombre',
      headerName: 'Cobrado',
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
              {row.cobrado}
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
      headerName: 'Sistema',
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
                {row.sistema}
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
      headerName: 'Diferencia',
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
                {row.diferencia}
              </Typography>
            </Box>
          </Box>
        )
      }
    }, 
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
  




  const handleChangeSucursal = (event, newValue) => {
    console.log("🚀 ~ file: form.js:279 ~ handleChangeSucursal ~ newValue:", newValue)
  }

  const onSubmit = async(data) =>{

    let number= Math.floor(Math.random() *200)

    let arrayJson = []

    let dataJson = {
      id:number ,
      cliente: clientes[0].nombre,
      fecha: new Date().toLocaleDateString('es-MX'),
      estado:'Finalizado',
      comentarios: comments,
    }
    console.log("🚀 ~ file: form.js:366 ~ onSubmit ~ dataJson:", dataJson)

    arrayJson.push(dataJson)

    let dataObj = JSON.stringify(arrayJson);

    let corteDeCaja = localStorage.getItem("corteCaja");
    if(!JSON.parse(corteDeCaja)){
      localStorage.setItem('corteCaja',dataObj )
    }else{
      let addTojson = JSON.parse(corteDeCaja)
      addTojson.push(dataJson)
      localStorage.setItem('corteCaja',JSON.stringify(addTojson) )
    }
  
    toast.success('corte de caja realizado con éxito')
    router.push('/cash-register')

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
      <CardHeader title='Corte de caja' />
      <Divider sx={{ m: '0 !important' }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
         
         
           
           
            <Grid item xs={12} sm={6}>
            <Autocomplete
            required
            onChange={(e, data) =>setClienteSelected(data)}
                options={clientes}
                defaultValue={clientes[0]}
                readOnly
                id='autocomplete-outlined'
                getOptionLabel={option => option.nombre || ''}
                renderInput={params => <TextField {...params} required label='Cliente' />}
            />
            </Grid>
        
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth name='descripcion' value={comentario || ''} onChange={(e)=> setComments(e.target.value)}  label='Comentario' InputProps={{
          }} />
            </Grid>
            <Grid item xs={12} sm={12}>
            <DataGrid
              autoHeight
              rowHeight={62}
              rows={cobros}
              columns={columns}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}  
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
            </Grid>

            
          </Grid>
        
        </CardContent>
        <Divider sx={{ m: '0 !important' }} />
        <CardActions style={{display:'flex', justifyContent:'flex-end'}}>
          <Button onClick={()=> router.push('/cash-register')} size='large' variant='outlined'>
            Regresar
          </Button>
       
        </CardActions>
      </form>
    </Card>
        </>
  )
  
}

export default FormLayoutsSeparator
