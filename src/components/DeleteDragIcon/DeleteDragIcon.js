import React from 'react'
import { Grid, IconButton, ListItemText, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
function DeleteDragIcon({ name, handleDelete, handleView, viewDetail, indexPosition, index , indexGroupPosition, groupIndex, cancel, infoGroup, handleGroupName, groupName, validGroupName}) {

    return (
        <Grid container spacing={1} sx={{
            display: 'flex', flexDirection: 'row', marginLeft: 1, ":hover": {
                backgroundColor: "#f4f6f8",
            },
            backgroundColor: viewDetail && indexPosition === index ? "#f4f6f8" : 'white'
        }}>
            <>
                <Grid item xs={8}>
                    <ListItemText sx={{
                        cursor: "pointer",
                    }} onClick={handleView} >{name}</ListItemText>
                </Grid>
                <Grid item xs={2.25} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <IconButton onClick={handleDelete} >
                        <DeleteIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={1.5} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <IconButton>
                        <DragIndicatorIcon />
                    </IconButton>
                </Grid>
            </>
        </Grid>
    )
}

export default DeleteDragIcon