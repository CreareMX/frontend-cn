// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

const DialogAlert = ({open = false, handleClose, onConfirm, title = '', content= '' }) => {

  // ** State

  return (   
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
           {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
         <Button onClick={onConfirm}>Aceptar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
  )
}

export default DialogAlert
