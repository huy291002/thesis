import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Grid, IconButton, Typography, CircularProgress, Divider } from '@mui/material'
function StatusUpload({ loadingStatus, handleCloseBox, quantity }) {
    return (
        <Box
            sx={{ position: "fixed", left: 10, bottom: 10, m: 0, p: 1, backgroundColor: '#212121', width: '30%', borderRadius: '5px' }}
        >
            <Grid container spacing={1}>
                <Grid item xs={11} sx={{ display: 'flex', marginLeft: 1, color: 'white' }}>
                    Upload status
                </Grid>
                {!loadingStatus ? (
                    <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseBox}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                ) : null}

                <Grid item xs={12}>
                    <Divider />
                </Grid>
                {loadingStatus ? (
                    <>
                        <Grid item xs={0.75} md={0.75} >

                            <CircularProgress color='success' size='20px' />
                        </Grid>
                        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-start', width: 'fit-content' }}>
                            <Typography sx={{ color: '#56d72f' }} variant='subtitle2'>
                                Success
                            </Typography>
                        </Grid>
                        <Grid item xs={0.75} md={0.75} >

                            <CircularProgress color='error' size='20px' />
                        </Grid>
                        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-start', width: 'fit-content' }}>
                            <Typography sx={{ color: '#ff5a55' }} variant='subtitle2'>
                                Error
                            </Typography>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item xs={0.75} maxWidth={0.75}>
                            <DoneIcon color='success' />
                        </Grid>
                        <Grid item xs={3.5} md={3.5} sx={{ display: 'flex', justifyContent: 'flex-start', width: 'fit-content' }}>
                            <Typography sx={{ color: '#56d72f' }} variant='subtitle2'>
                                {quantity[0]} Success
                            </Typography>
                        </Grid>
                        <Grid item xs={0.75} maxWidth={0.75}>
                            <ErrorOutlineIcon color='error' />
                        </Grid>
                        <Grid item xs={3} md={3} sx={{ display: 'flex', justifyContent: 'flex-start', width: 'fit-content' }}>
                            <Typography sx={{ color: '#ff5a55' }} variant='subtitle2'>
                                {quantity[1]} Error
                            </Typography>
                        </Grid>
                    </>  
                )}

                {/* <Grid item xs={0.25} md={0.25}>
                    {loadingStatus ? (
                        <CircularProgress color='error' size='20px' />
                    ) : (
                        <ErrorOutlineIcon color='error' />
                    )}

                </Grid>
                
                <Grid item xs={3} md={3} sx={{ display: 'flex', justifyContent: 'center', width: 'fit-content' }} >
                    <Typography sx={{ color: '#ff5a55' }} variant='subtitle2'>
                        12222 Fail
                    </Typography>
                </Grid> */}
                <Grid item xs={3.75} md={3.75} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography sx={{ color: 'white' }} variant='subtitle2'>
                        Total Records: {quantity.length > 0 ? quantity[0] + quantity[1] : ''}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default StatusUpload