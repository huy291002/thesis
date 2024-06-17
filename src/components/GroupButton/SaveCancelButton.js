import React from 'react'
import { Grid, Button } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
const styleButton = {
    display: 'flex',
    justifyContent: 'flex-end'
}
function SaveCancelButton({handleSave, handleCancel, loading}) {
    return (
        <Grid item xs={12} sx={styleButton}>
            <LoadingButton loading={loading} onClick={handleSave} sx={{ marginRight: 1 }} startIcon={<DoneIcon />} type="submit" variant="contained"  >
                Save
            </LoadingButton>
            <Button onClick={handleCancel} startIcon={<CloseIcon />} variant="outlined"  >
                Cancel
            </Button>
        </Grid>
    )
}

export default SaveCancelButton