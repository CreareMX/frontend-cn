// ** React Imports
import { Fragment, forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import TextField from '@mui/material/TextField'
import DatePicker from 'react-datepicker'
import Box from '@mui/material/Box'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Grid from '@mui/material/Grid'
import es from 'date-fns/locale/es'
import Autocomplete from '@mui/material/Autocomplete'

const DialogAlert = ({open = false, handleClose, onConfirm, title = '', content= '' }) => {

  // ** State
  const [startDate, setStartDate] = useState(null)
  const [responsableSelected, setResponsableSelected] = useState(null)

  const CustomInput = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Fecha de entrega' autoComplete='off' />
  })

  
  const handleOnChange = dates => {
    console.log(dates)
    setStartDate(dates)
   }

   const responsables = [
    {id:1, nombre:'Responsable 1'},
    {id:2, nombre:'Responsable 2'},
    {id:3, nombre:'Responsable 3'}
   ]

   const handleConfirm =()=>{
    
      const dataEmit = {
       responsable:responsableSelected?.nombre,
        fechaProgramada: startDate
      }
      onConfirm(dataEmit)
   }

  return (   
    <Dialog
    maxWidth={'xl'}
        open={open}
        onClose={handleClose}
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
        <DialogContentText sx={{ mb: 4, width:380 }} >
            Selecciona a un responsable para la orden              
          </DialogContentText>
        <Grid item xs={12} sm={12} sx={{mb:4}}>
        <Autocomplete
                onChange={(e, data) =>{
                  setResponsableSelected(data)
                }}
                options={responsables}
                id='autocomplete-outlined'
                getOptionLabel={option => option?.nombre || ''}
                renderInput={params => <TextField {...params}  label='Responsable' />}
            />
        </Grid>
        <DatePickerWrapper>
          <DatePicker
          selected={startDate}
          id='basic-input'
          locale={es}
          onChange={date => handleOnChange(date)}
          placeholderText='Selecciona una fecha'
          customInput={<CustomInput label='Basic' />}
         />
        </DatePickerWrapper>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
         <Button disabled={!responsableSelected ||!startDate } onClick={handleConfirm}>Aceptar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>     
  )
}

export default DialogAlert
