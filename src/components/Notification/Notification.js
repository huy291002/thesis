import React from 'react'
import { Snackbar, Alert } from '@mui/material'
function Notification({open, handleClose, status, message}) {

  return (
    <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={status} onClose={handleClose}>
          {/* {newError.message} */}
          {message}
        </Alert>
      </Snackbar>
  )
}

export default Notification