import React from 'react'
import { styled, Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
function OutlookDialog({ title, openDialog, handleCloseDialog, minWidth, minHeight,  ...props }) {
  return (
    <BootstrapDialog
      open={openDialog}
      onClose={handleCloseDialog}
      sx={{ '& .MuiDialog-paper': { minWidth: minWidth, minHeight: minHeight} }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <Typography variant='h4'>
          {title}
        </Typography>
        
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseDialog}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {props.children}
      </DialogContent>
    </BootstrapDialog>
  )
}

export default OutlookDialog