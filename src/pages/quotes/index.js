// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'


// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid, esES } from '@mui/x-data-grid'
import Select from '@mui/material/Select'
import DialogAlert from 'src/views/components/dialogs/DialogAlert'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

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
import TableHeader from 'src/views/apps/quotes/TableHeader'
import AddUserDrawer from 'src/views/apps/branch-office/AddbranchOfficeDrawer'
import SidebarEditPeople from 'src/views/apps/branch-office/EditBranchOffice'
import { getAllRequesitions, changeStatusReqById } from 'src/api/RequestApi'
import { deleteBranchOffice } from 'src/api/RequestApi'
import toast from 'react-hot-toast'




const PersonsType = ({ apiData }) => {

  const router = useRouter()

  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [editUserOpen, setEditUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [typePersons, setTypePersons] = useState([])
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [nombre,setNombre] = useState('')
  const [currentPerson, setCurrentPerson] = useState({})
  const [id,setId] = useState(null)
  const [cotizacionesLista,setCotizacionesLista] = useState([])
  const [listaPuntoDeVenta,setlListaPuntoDeVenta] = useState([])




   useEffect(()=>{
    llenarLista()
   },[])

   const llenarLista = ()=>{
    let listaFiltrada = JSON.parse(localStorage.getItem('puntoVenta')) || []
    setlListaPuntoDeVenta(listaFiltrada)
    let listaF = listaFiltrada.filter(e => e.estado == 'cotizado' || e.estado == 'cancelarC')
    setCotizacionesLista(listaF)
   }

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
  
   
  
    const handleEdit = (id) => {
      router.push('purchase-orders/[id]', `purchase-orders/${id}`);

    }

    const rechazarOC = async(id) =>{
      try {
       const response = await changeStatusReqById(id,10,1)
       if(response.status === 200){
         toast.success('Requisición rechazada correctamente')
         getRequesitions()
       }
       
    } catch (error) {
     console.log(error)
    }
    }
    

  
    // const getRequesitions =  async() =>{
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
       <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='tabler:dots-vertical' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          {data.estado == 'cotizado' &&
          <MenuItem onClick={()=>{
              cancelarCotizacion(data.id)
            }}
             sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='mdi:file-cancel-outline' fontSize={20} />
            Cancelar
          </MenuItem>
          }
          {data.estado == 'cotizado' &&
            <MenuItem onClick={()=>{
              vender(data.id)
              }}
               sx={{ '& svg': { mr: 2 } }}>
              <Icon icon='ic:twotone-price-check' fontSize={20} />
              Vender
            </MenuItem>
          }
          {data.estado == 'cancelarC' &&
            <MenuItem 
               sx={{ '& svg': { mr: 2 } }}>
              Sin opciones
            </MenuItem>
          }
        </Menu>
      </>
    )
  }
  


  const columns = [
    {
      flex: 0.25,
      maxWidth:80,
      minWidth: 80,
      field: 'id',
      headerName: 'Id',
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
                {row.id}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 160,
      field: 'fecha',
      headerName: 'Fecha',
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
                {row.fecha}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 150,
      maxWidth:150,
      field: 'cliente',
      headerName: 'Cliente',
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
                {row.cliente}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'vendedor',
      headerName: 'Vendedor',
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
                {row.vendedor}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'monto',
      headerName: 'Monto',
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
                $ {row.monto}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'estado',
      headerName: 'Estado',
      renderCell: ({ row }) => {
  
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.estado == 'cotizado' ? 'pendiente' : row.estado =='cancelarC' ? 'cancelado' : '' }
          color={row.estado == 'cotizado' ? 'info' : row.estado =='cancelarC' ? 'error' : 'warning'}
          sx={{ textTransform: 'uppercase' }}
        />
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 200,
      sortable: false,
      field: 'actions',
      headerName: 'Acciones',
      renderCell: ({ row }) => <RowOptions data={row} id={row.id} />
    }
  ]


  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)
  useEffect(() => {
    dispatch(
      fetchData({
        role,
        status,
        q: value,
        currentPlan: plan
      })
    )
  }, [dispatch, plan, role, status, value])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  


  const getRequesitions =  async() =>{
    try {
      setLoading(true)
        const response = await getAllRequesitions()
        if(response.status === 200){
          console.log(response.data)
         
          setLoading(false)

        }
        
    } catch (error) {
      console.log(error)
    }
  }

  const vender = async(id) =>{
    let lista = [...listaPuntoDeVenta]
    let objWithIdIndex = lista.findIndex((obj) => obj.id === id);
    lista[objWithIdIndex].estado = 'vendido'

    JSON.stringify(localStorage.setItem('puntoVenta', JSON.stringify(lista) ))
    setCotizacionesLista(lista)
    toast.success('Venta realizada con éxito')
    llenarLista()
}

  const cancelarCotizacion = async(id) =>{
    let lista = [...listaPuntoDeVenta]
    let objWithIdIndex = lista.findIndex((obj) => obj.id === id);
    lista[objWithIdIndex].estado = 'cancelarC'

    JSON.stringify(localStorage.setItem('puntoVenta', JSON.stringify(lista) ))
    setCotizacionesLista(lista)
    toast.success('Venta realizada con éxito')
    llenarLista()
  }

const cancelarPago = async(id) =>{
    let lista = [...cotizacionesLista]
    let objWithIdIndex = lista.findIndex((obj) => obj.id === id);
    lista.splice(objWithIdIndex, 1);
    if(lista.length === 0){
      localStorage.removeItem('porCobrar')
      setCotizacionesLista(lista)
    }else{
      JSON.stringify(localStorage.setItem('porCobrar', JSON.stringify(lista) ))
      setCotizacionesLista(lista)
  
    }
    toast.success('Pago cancelado con éxito')


 }
  
  const handleDelete = async() => {
  
    setOpenModal(false)
    try {
      let data = {id}
      
      const response = await deleteBranchOffice(data, 1)

      if(response.status == 200){
       await getRequesitions()
        toast.success('Sucursal eliminada con éxito')

      }
      
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getRequesitions()
  },[]);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)
  const toggleEditUserDrawer = () => setEditUserOpen(!editUserOpen)

  const sucessSubmit = () =>{
    getRequesitions()
  }

  const closeModal = () =>{
      setOpenModal(false)
  }

  return (
    <Grid container spacing={6.5}>
      {/* <Grid item xs={12}>
        {apiData && (
          <Grid container spacing={6}>
            {apiData.statsHorizontalWithDetails.map((item, index) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatsHorizontalWithDetails {...item} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid> */}
      <Grid item xs={12}>
        <Card>
          {/* <CardHeader title='Search Filters' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='role-select'>Select Role</InputLabel>
                  <Select
                    fullWidth
                    value={role}
                    id='select-role'
                    label='Select Role'
                    labelId='role-select'
                    onChange={handleRoleChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>Select Role</MenuItem>
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='author'>Author</MenuItem>
                    <MenuItem value='editor'>Editor</MenuItem>
                    <MenuItem value='maintainer'>Maintainer</MenuItem>
                    <MenuItem value='subscriber'>Subscriber</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Select Plan</InputLabel>
                  <Select
                    fullWidth
                    value={plan}
                    id='select-plan'
                    label='Select Plan'
                    labelId='plan-select'
                    onChange={handlePlanChange}
                    inputProps={{ placeholder: 'Select Plan' }}
                  >
                    <MenuItem value=''>Select Plan</MenuItem>
                    <MenuItem value='basic'>Basic</MenuItem>
                    <MenuItem value='company'>Company</MenuItem>
                    <MenuItem value='enterprise'>Enterprise</MenuItem>
                    <MenuItem value='team'>Team</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>Select Role</MenuItem>
                    <MenuItem value='pending'>Pending</MenuItem>
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent> */}
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={cotizacionesLista}
            columns={columns}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}  
            disableRowSelectionOnClick
            loading={loading}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} sucess={sucessSubmit} toggle={toggleAddUserDrawer} />
      <SidebarEditPeople open={editUserOpen} sucess={sucessSubmit} editPerson={currentPerson} toggle={toggleEditUserDrawer} />

      { openModal &&
       <DialogAlert open={openModal} title={'Desea cancelar la orden de compra'} content={'Esta acción no se puede revertir'} onConfirm={handleDelete} handleClose={closeModal}/> 
        }
    </Grid>
  )
}

export const getStaticProps = async () => {
  const res = await axios.get('/cards/statistics')
  const apiData = res.data

  return {
    props: {
      apiData
    }
  }
}

export default PersonsType