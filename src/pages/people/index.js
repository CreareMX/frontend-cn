// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

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
import { DataGrid , esES } from '@mui/x-data-grid'
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
import TableHeader from 'src/views/apps/people/TableHeader'
import AddUserDrawer from 'src/views/apps/people/AddUserDrawer'
import EditPeople from 'src/views/apps/people/EditPeople'
import { getAllPeople, getAllTyperPersons, deletePerson } from 'src/api/RequestApi'
import toast from 'react-hot-toast'


const PersonsType = ({ apiData }) => {
  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(false)
  const [typePersons, setTypePersons] = useState([])
  const [editUserOpen, setEditUserOpen] = useState(false)
  const [currentPerson, setCurrentPerson] = useState({})
  const [id,setId] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [nombre,setNombre] = useState('')





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
  

    
    const handleEdit = () => {
      setCurrentPerson(data)
      setEditUserOpen(!editUserOpen)
      handleRowOptionsClose()
    }

  
  
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
          {/* <MenuItem
            component={Link}
            sx={{ '& svg': { mr: 2 } }}
            href='/apps/user/view/account'
            onClick={handleRowOptionsClose}
          >
            <Icon icon='tabler:eye' fontSize={20} />
            View
          */}
           <MenuItem onClick={handleEdit} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='tabler:edit' fontSize={20} />
            Editar
          </MenuItem>
          <MenuItem onClick={()=>{
              const nombre = data?.nombre
              setNombre(nombre)
              setId(data.id)
              setOpenModal(true)
          }} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='tabler:trash' fontSize={20} />
            Eliminar
          </MenuItem>
        </Menu>
      </>
    )
  }
  
  const columns = [
    {
      flex: 0.25,
      minWidth: 280,
      field: 'nombre',
      headerName: 'Nombre',
      renderCell: ({ row }) => {
        const { nombre, email } = row
  
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
                {nombre}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
  
    // {
    //   flex: 0.15,
    //   field: 'role',
    //   minWidth: 170,
    //   headerName: 'Rol',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //         <CustomAvatar
    //           skin='light'
    //           sx={{ mr: 4, width: 30, height: 30 }}
    //           color={userRoleObj[row.role].color || 'primary'}
    //         >
    //           <Icon icon={userRoleObj[row.role].icon} />
    //         </CustomAvatar>
    //         <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
    //           {row.role}
    //         </Typography>
    //       </Box>
    //     )
    //   }
    // },
  
    // {
    //   flex: 0.15,
    //   minWidth: 120,
    //   headerName: 'Plan',
    //   field: 'currentPlan',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
    //         {row.currentPlan}
    //       </Typography>
    //     )
    //   }
    // },
    // {
    //   flex: 0.15,
    //   minWidth: 190,
    //   field: 'billing',
    //   headerName: 'Pago',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Typography noWrap sx={{ color: 'text.secondary' }}>
    //         {row.billing}
    //       </Typography>
    //     )
    //   }
    // },
    {
      flex: 0.25,
      minWidth: 280,
      field: 'esPersonaMoral',
      headerName: 'Persona moral',
      renderCell: ({ row }) => {
        const { esPersonaMoral } = row
  
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
                {esPersonaMoral === true ? 'Sí' : 'No'}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
  
    {
      flex: 0.1,
      minWidth: 100,
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


  const getPeople =  async() =>{
    try {
      setLoading(true)
        const response = await getAllPeople()
        if(response.status === 200){
          console.log(response.data)
          setPeople(response.data)
          setLoading(false)

        }
        
    } catch (error) {
      console.log(error)
    }
  }

  const getTyperPersons =  async() =>{
    try {
      setLoading(true)
        const response = await getAllTyperPersons()
        if(response.status === 200){
          console.log(response.data)
          setTypePersons(response.data)
          setLoading(false)
        }
        
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async() => {
  
    setOpenModal(false)
    try {
      let data = {id}
      
      const response = await deletePerson(data, 1)

      if(response.status == 200){
       await getPeople()
        toast.success('Persona eliminada con éxito')

      }
      
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getPeople()
    getTyperPersons()
  },[]);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)
  const toggleEditUserDrawer = () => setEditUserOpen(!editUserOpen)
  

  const closeModal = () =>{
    setOpenModal(false)
}

  const sucessSubmit = () =>{
    getPeople()
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
            rows={people}
            columns={columns}
            disableRowSelectionOnClick
            loading={loading}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}  
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} typePersons={typePersons} sucess={sucessSubmit} toggle={toggleAddUserDrawer} />
      <EditPeople open={editUserOpen}  typePersons={typePersons} sucess={sucessSubmit} editPerson={currentPerson} toggle={toggleEditUserDrawer} />
      { openModal &&
       <DialogAlert open={openModal} title={'Desea eliminar a la persona ' + nombre} content={'Esta acción no se puede revertir'} onConfirm={handleDelete} handleClose={closeModal}/> 
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
