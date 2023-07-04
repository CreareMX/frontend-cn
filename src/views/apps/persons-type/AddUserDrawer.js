// ** React Imports
import { useState } from 'react'

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
import { postPersonType } from 'src/api/RequestApi'

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
    return `${field} must be at least ${min} characters`
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
    .required()
})

const defaultValues = {
  nombre: '',

 
}

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle, sucess } = props

  // ** State
  const [esPersonaMoral, setEsPersonaMoral] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)

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

  const onSubmit = async(data) => {
    try {
      data.esPersonaMoral = esPersonaMoral
      const {id} = JSON.parse(localStorage.getItem('userData'))
      const response = await postPersonType(data, 1)

      if(response.status == 200){
        toast.success('Tipo de usuario creado con éxito!')
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
                  placeholder='Proveedor'
                  onChange={onChange}
                  error={Boolean(errors.nombre)}
                />
              )}
            />
            {errors.nombre && <FormHelperText sx={{ color: 'error.main' }}>{errors.nombre.message}</FormHelperText>}
          </FormControl>
          
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel id='role-select'>Persona moral</InputLabel>
            <Select
              fullWidth
              value={esPersonaMoral}
              id='select-role'
              label='Persona moral'
              labelId='role-select'
              onChange={e => setEsPersonaMoral(e.target.value)}
              inputProps={{ placeholder: 'Select Role' }}
            >
              <MenuItem value={false}>No</MenuItem>
              <MenuItem value={true}>Si</MenuItem>
            </Select>
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
