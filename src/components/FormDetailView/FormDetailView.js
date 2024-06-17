import React from 'react'
import { Grid, Paper } from '@mui/material'
import { useSelector } from 'react-redux'
function    FormDetailView(props) {
    const openSidebar = useSelector(state => state.openSidebar)
    return (
        <Grid item xs={12} md={props.size} >
            <Paper sx={{
                boxShadow: 10,
                height: '552px',
                //height: '50%',
                maxHeight: '100%',
                width: '100%',
                padding: 2,
                overflowX: 'hidden',
                overflowY: 'scroll'
            }}>
                    {props.children}
            </Paper>
        </Grid>
    )
}

export default FormDetailView