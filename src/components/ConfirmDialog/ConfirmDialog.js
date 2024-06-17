import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, IconButton, Grid, styled } from '@mui/material'
import { LoadingButton } from '@mui/lab';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
function ConfirmDialog({ open, handleClose, title, message, handleConfirm, loading }) {
    return (
        <>
            <BootstrapDialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <LoadingButton loading={loading}  onClick={handleConfirm} startIcon={<DoneIcon />} variant='outlined' color='success' >
                        Yes
                    </LoadingButton > */}
                    <Button  onClick={handleConfirm} startIcon={<DoneIcon />} variant='outlined' color='success' >
                        Yes
                    </Button >
                    <Button onClick={handleClose} startIcon={<CloseIcon />} variant='outlined' color='error'>No</Button>

                </DialogActions>
            </BootstrapDialog>
        </>
    )
}

export default ConfirmDialog