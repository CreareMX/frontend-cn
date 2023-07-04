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
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import { DataGrid, esES } from '@mui/x-data-grid'
import DialogAlert from 'src/views/components/dialogs/DialogAlert'

// ** Icon Imports

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteUser } from 'src/store/apps/user'

// ** Third Party Components
import axios from 'axios'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/branch-office/TableHeader'
import AddUserDrawer from 'src/views/apps/branch-office/AddbranchOfficeDrawer'
import SidebarEditPeople from 'src/views/apps/branch-office/EditBranchOffice'
import { getAllBranchOffice, getAllPeople, getAllWarehouse, getAllProducts, postRequesitions, postRequesitionsDetail } from 'src/api/RequestApi'
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
  const [language, setLanguage] = useState([])
  const [productList, setProductList] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(false)
  const [warehouse, setWarehouse] = useState([])
  const [branchOffice, setBranhOffice] = useState([])
  const [products,setProducts] = useState([])
  const [providerSelected, setProviderSelectd] = useState(null)
  const [warehouseSelected, setWarehouseSelected] = useState(null)
  const [branchOfficeSelected,setBranchOfficeSelected] = useState(null)
  const [productSelected, setProductSelected] = useState('')
  const [count,setCount] = useState('')
  const [comments, setComments] = useState('')

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  const getPeople =  async() =>{
    try {
      setLoading(true)
        const response = await getAllPeople()
        console.log("🚀 ~ file: form.js:110 ~ getPeople ~ response:", response)
        if(response.status === 200){
          
          const proveedores = response.data.filter(e=>e.idTipoPersona ===3)
          
          setProviders(proveedores)
          setLoading(false)

        }
        
    } catch (error) {
      console.log(error)
    }
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
    try {
      setLoading(true)
        const response = await getAllBranchOffice()
        if(response.status === 200){
          setBranhOffice(response.data)
          setLoading(false)

        }
        
    } catch (error) {
      console.log(error)
    }
  }

  const getProductsbyProvider =  async(id) =>{
    try {
      setLoading(true)
        const response = await getAllProducts(id)
        if(response.status === 200){
          setProducts(response.data)
          console.log(response.data)
          setLoading(false)

        }
        
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getPeople()
    getWarehouse()
    getbranchOffices()
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

    let date = new Date().toISOString();

    let dataReq = {
      idCliente: parseInt(providerSelected.id),
      idEmpleadoCrea: 3,
      fecha: date,
      fechaCompromiso:date,
      fechaEnvio:date,
      formaEnvio:'terestre',
      idAlmacen: warehouseSelected.id,
      idSucursal: branchOfficeSelected.id,
      comentarios: comments,
      idEstado:6
    }


    try {
      const response = await postRequesitions(dataReq, 1)
      console.log("🚀 ~ file: form.js:355 ~ onSubmit ~ response:", response)
      
      if(response.status === 200){

        let idReq = response.data.id
        productList.forEach(async(element) => {

          let dataDetail = {
            idOrdenCompra: idReq,
            idProducto: element.id,
            cantidad: parseInt(element.cantidad),
            descuento: 0
          }
          console.log("🚀 ~ file: form.js:369 ~ productList.forEach ~ dataDetail:", dataDetail)

          const response = await postRequesitionsDetail(dataDetail, 1)

          
        });
      
        toast.success('Requisición agregada con éxito')
        router.push('/requisitions')
      }
      
      
    } catch (error) {
      console.log(error)
    }

    console.log(dataReq)

  }

  const addProductsToList = (data)=>{



    const product = {
      id: data?.id,
      nombre: data?.nombre,
      descripcion: data?.descripcion,
      cantidad: parseInt(count)
    }

    const found = productList.some(el => el.id === data.id);

    if(found){
      setCount('')
      setProductSelected('')
      toast.error('Ya existe el producto en la lista')

    }else if(count ===''){
      toast.error('Seleccione la cantidad deseada')

    }else{
      setProductList((old)=> [...old, product])
      setCount('')
      setProductSelected('')
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
      <CardHeader title='Agregar Orden de compra' />
      <Divider sx={{ m: '0 !important' }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Autocomplete
            noOptionsText={'Sin resultados'}
            required
            onChange={(e, data) =>{
              getProductsbyProvider(data?.id)
              setProviderSelectd(data)}}
                options={providers}
                id='autocomplete-outlined'
                getOptionLabel={option => option.nombre || ''}
                renderInput={params => <TextField {...params} required label='Proveedor' />}
            />
            </Grid>
         
           
           
            <Grid item xs={12} sm={6}>
            <Autocomplete
            required
            onChange={(e, data) =>setWarehouseSelected(data)}
                options={warehouse}
                id='autocomplete-outlined'
                getOptionLabel={option => option.nombre || ''}
                renderInput={params => <TextField {...params} required label='Almacen' />}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <Autocomplete
            required
            onChange={(e, data) =>setBranchOfficeSelected(data)}
                options={branchOffice}
                id='autocomplete-outlined'
                getOptionLabel={option => option.nombre || ''}
                renderInput={params => <TextField {...params} required label='Sucursal' />}
            />
            </Grid>
           
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name='comentarios' onChange={(value) => setComments(value.target.value)} label='Comentarios' />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Agregar Productos
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
            <Autocomplete
            
            value={productSelected || ''}
                onChange={(e, data) =>setProductSelected(data)}
                options={products || []}
                disabled={products.length === 0}
                id='autocomplete-outlined'
                getOptionLabel={option => option?.nombre || ''}
                renderInput={params => <TextField {...params}  label='Producto' />}
            />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth name='comentarios' value={productSelected?.descripcion || ''} label='Descripción' InputProps={{
    readOnly: true,
  }} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth name='cantidad' value={count || ''} onChange={(value)=>{
                setCount(value.target.value)
                 console.log(value.target.value)
                 }} label='Cantidad' />
            </Grid>
            <Grid item xs={12} sm={2} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Button onClick={()=>{addProductsToList(productSelected)}} size='medium' sx={{ mr: 2 }} variant='outlined'>
            Agregar
          </Button>
            </Grid>
            <Grid item xs={12} sm={12}>
            <DataGrid
              autoHeight
              rowHeight={62}
              rows={productList}
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
