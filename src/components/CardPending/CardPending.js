import { Card, CircularProgress, Grid } from '@mui/material'
import React from 'react'

function CardPending() {
    return (
        <Card sx={{ position: "fixed", right: 10, top: 60, m: 0, p: 1, backgroundColor: 'white', width: '20%', height: '7%', borderRadius: '5px', boxShadow: 10 }}>
            <Grid container spacing={1}>
                <Grid item xs={1.5}>
                    <CircularProgress color='grey' size='1.5rem' />
                </Grid>
                <Grid item xs={10}>
                    Pending...
                </Grid>
            </Grid>

        </Card>
    )
}

export default CardPending