import React from 'react'
import { Box, Grid, List, Skeleton } from '@mui/material'

function SkeletonGroup() {
    return (
        <List>
            <Box>
                <Grid container spacing={1} sx={{ display: 'flex', flexDirection: 'column', marginLeft: 1 }}>
                    <Grid item xs={12}>
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                    </Grid>
                </Grid>
            </Box>
        </List>

    )
}

export default SkeletonGroup