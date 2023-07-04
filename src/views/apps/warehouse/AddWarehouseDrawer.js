// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { postWarehouse, getAllWarehouseType } from 'src/api/RequestApi'

// ** Third Party Components
import toast from 'react-hot-toast'


// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { addUser } from 'src/store/apps/user'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} es requerido`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} debe contener mínimo ${min} caracteres`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  nombre: yup
    .string()
    .min(3, obj => showErrors('El nombre', obj.value.length, obj.min))
    .required(),
  descripcion: yup
    .string()
    .min(3, obj => showErrors('La descripción', obj.value.length, obj.min))
    .required(),
    codigo: yup
    .string()
    .min(3, obj => showErrors('El código', obj.value.length, obj.min))
    .required(),
    idTipoAlmacen: yup
    .string()
    .min(1, obj => showErrors('El tipo alamcen', obj.value.length, obj.min))
    .required(),
  

})

const defaultValues = {
  nombre: '',
  descripcion: '',
  codigo:'',
  idTipoAlmacen: ''




}

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle, sucess } = props

  // ** State
  const [esPersonaMoral, setEsPersonaMoral] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)
  const [warehouseType, setWareHouseType] = useState([])

  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    try {
      const { id } = JSON.parse(localStorage.getItem('userData'))
      const idTipoAlmacen = parseInt(data.idTipoAlmacen)
      data.idTipoAlmacen = idTipoAlmacen


      const response = await postWarehouse(data, 1)

      if (response.status == 200) {
        toast.success('Almacen creado con éxito')
        toggle()
        reset()
        sucess()
      }

    } catch (error) {
      toast.error(error?.response?.data)
    }



    // if (store.allData.some(u => u.email === data.email || u.username === data.username)) {
    //   store.allData.forEach(u => {
    //     if (u.email === data.email) {
    //       setError('email', {
    //         message: 'Email already exists!'
    //       })
    //     }
    //     if (u.username === data.username) {
    //       setError('username', {
    //         message: 'Username already exists!'
    //       })
    //     }
    //   })
    // } else {
    //   dispatch(addUser({ ...data, role, currentPlan: plan }))
    //   toggle()
    //   reset()
    // }
  }

  const handleClose = () => {
    setEsPersonaMoral(false)
    toggle()
    reset()
  }

  const getWireHouseType =  async() =>{
    try {
        const response = await getAllWarehouseType()
        if(response.status === 200){
          console.log(response.data)
          setWareHouseType(response.data)

        }
        
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getWireHouseType()
  },[])


  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Agregar tipo de usuario</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{ borderRadius: 1, color: 'text.primary', backgroundColor: 'action.selected' }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='nombre'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Nombre'
                  placeholder=''
                  onChange={onChange}
                  error={Boolean(errors.nombre)}
                />
              )}
            />
            {errors.nombre && <FormHelperText sx={{ color: 'error.main' }}>{errors.nombre.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='descripcion'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Descripción'
                  placeholder=''
                  onChange={onChange}
                  error={Boolean(errors.descripcion)}
                />
              )}
            />
            {errors.descripcion && <FormHelperText sx={{ color: 'error.main' }}>{errors.descripcion.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='codigo'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Código'
                  placeholder=''
                  onChange={onChange}
                  error={Boolean(errors.codigo)}
                />
              )}
            />
            {errors.codigo && <FormHelperText sx={{ color: 'error.main' }}>{errors.codigo.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
          <Controller
              name='idTipoAlmacen'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <>
                <InputLabel id='role-select'>Tipo de alamacen</InputLabel>
                <Select
                fullWidth
                id='select-role'
                value={value}
                onChange={onChange}
                label='Tipo de persona'
                labelId='idTipoAlmacen'
                error={Boolean(errors.idTipoAlmacen)}
                inputProps={{ placeholder: 'Tipo de persona' }}
              >
                {
                  warehouseType.map((e) => {
                    return (
                      <MenuItem key={e.id} value={e.id}>{e.nombre}</MenuItem>
                    )
                 })
                }
              </Select>
                </>
              )}
            />
            {errors.idTipoAlmacen && <FormHelperText sx={{ color: 'error.main' }}>{errors.idTipoAlmacen.message}</FormHelperText>}
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              Guardar
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancelar
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
