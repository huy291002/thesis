import React from 'react'
import { Grid, Typography, Box, Divider } from '@mui/material'
import OutlookDialog from '../../../components/OutlookDialog/OutlookDialog'
const styletitle = {
    fontWeight: 'bold'
}
function ViewRecord({ header, detailObject, infoRecord, openDialog, setOpenDialog, existRefField, setExistRefField, headerWithoutRef }) {

    const handleCloseDialog = () => {
        setOpenDialog(false)
        // setExistRefField(false)
    }


    return (
        <OutlookDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            title='View Record'
            minWidth="55%"
            minHeight='35%'>
            {/* {!existRefField ? ( */}
                <>

                    <Box sx={{ m: 1, display: 'flex', flexDirection: 'row' }}>
                        <Grid container spacing={0} sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Grid item xs={12} >
                                
                                {infoRecord && openDialog && header?.map((field, index) => (
                                    
                                    <>

                                        {field.id !== '' ? (
                                            <Grid key={index} item container spacing={1} sx={{ m: 0.25 }}>
                                                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                    <Typography sx={styletitle} color={"black"}>{`${field.field_name}`}</Typography>

                                                </Grid>
                                                
                                                {field.ref_field ? (
                                                    <>
                                                        <Grid item xs ={12}>
                                                        <Box sx={{ m: '0px 8px 8px 16px', display: 'flex', flexDirection: 'row' }}>
                                                            <Grid container spacing={0} sx={{ display: 'flex', flexDirection: 'row' }}>
                                                                <Grid item xs={4} >
                                                                    {field?.ref_field?.map((eachfield, index) => (
                                                                        <Grid key={index} item container spacing={1} sx={{ m: 0.25 }}>
                                                                            <Grid item xs={5} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                                                <Typography sx={{ ...styletitle, fontSize: '16px' }} color={"black"}  >{`${eachfield.field_name}`}</Typography>

                                                                            </Grid>
                                                                        </Grid>
                                                                    ))}
                                                                </Grid>
                                                                <Grid item xs={7}>
                                                                    {field?.ref_field?.map((eachfield, index) => (
                                                                        <Grid key={index} item container spacing={1} sx={{ m: 0.25 }}>
                                                                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                                                <Typography sx={{ fontSize: '16px' }}>{infoRecord[field.field_id]["ref_to"] && typeof (infoRecord[field.field_id]["ref_to"][eachfield.field_id]) !== 'object' ? infoRecord[field.field_id]["ref_to"][eachfield.field_id] : infoRecord[field.field_id]["ref_to"][eachfield.field_id]["ref_to"][infoRecord[field.field_id]["ref_to"][eachfield.field_id]["field_value"]]}</Typography>
                                                                            </Grid>

                                                                        </Grid>
                                                                    ))}
                                                                </Grid>

                                                            </Grid>
                                                        </Box>
                                                        </Grid>
                                                    </>
                                                ) : (
                                                    <>

                                                    <Grid item xs={7} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                        <Typography>{infoRecord[field.field_id]}</Typography>
                                                    </Grid>
                                                    </>
                                                
                                                )}
                                            </Grid>
                                        ): (null)}
                                    </>
                                ))}
                            </Grid>
                            {/* <Grid item xs={1} sx={{ backgroundColor: '#f9fafa' }}>
                                <Divider orientation='vertical' sx={{ borderColor: 'black' }} />
                            </Grid> */}
                            {/* <Grid item xs={7}>
                                {header?.map((field, index) => (
                                    <>
                                        {field.id !== '' && (
                                            <Grid key={index} item container spacing={1} sx={{ m: 0.25 }}>
                                                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                    <Typography>{infoRecord[field.field_id]}</Typography>
                                                </Grid>

                                            </Grid>
                                        )}
                                    </>
                                ))}
                            </Grid> */}

                        </Grid>
                    </Box>
                </>
            {/* ) : ( */}
                <>
                    {/* {headerWithoutRef.length > 0 && (
                        <Box sx={{ m: 0, display: 'flex', flexDirection: 'row' }}>
                            <Grid container spacing={0} sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Grid item xs={4} >
                                    {headerWithoutRef?.map((field, index) => (
                                        <>
                                            {field.id !== '' && (
                                                <Grid key={index} item container spacing={1} sx={{ m: 0.25 }}>
                                                    <Grid item xs={5} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column' }}>
                                                        <Typography sx={{...styletitle, fontSize: '16px'}} color={"black"} >{`${field.field_name}`}</Typography>

                                                    </Grid>
                                                    
                                                   
                                                </Grid>
                                            )}
                                     </>
                                    ))}
                                </Grid>
                                <Grid item xs={7}>
                                    {headerWithoutRef?.map((field, index) => (
                                        <>
                                            {field.id !== '' && (
                                                <Grid key={index} item container spacing={1} sx={{ m: 0.25 }}>
                                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                        <Typography sx={{ fontSize: '16px'}}>{infoRecord[field.field_id]}</Typography>
                                                    </Grid>
                                                    

                                                </Grid>
                                            )}
                                        </>

                                    ))}
                                </Grid>

                            </Grid>
                        </Box>
                    )}

                    {header.map((eachHeader, indexHeader) => (
                        <>
                            {eachHeader.ref_field ? (
                                <>
                                    <Box key={indexHeader} sx={{ m: 0, display: 'flex', flexDirection: 'row' }}>
                                        <Grid container spacing={0}  >

                                            <Grid item xs={4} >

                                                <Typography sx={{ ...styletitle, marginLeft: '10px', marginTop: 0.85, fontSize: '16px' }}  >{`${eachHeader.field_name}`}</Typography>

                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box key={indexHeader} sx={{ m: '0px 8px 8px 16px', display: 'flex', flexDirection: 'row' }}>
                                        <Grid container spacing={0} sx={{ display: 'flex', flexDirection: 'row' }}>
                                            <Grid item xs={4} >
                                                {eachHeader?.ref_field?.map((field, index) => (
                                                    <Grid key={index} item container spacing={1} sx={{ m: 0.25 }}>
                                                        <Grid item xs={5} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                            <Typography sx={{...styletitle, fontSize: '16px'}} color={"black"}  >{`${field.field_name}`}</Typography>

                                                        </Grid>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                            <Grid item xs={7}>
                                                {eachHeader?.ref_field?.map((field, index) => (
                                                    <Grid key={index} item container spacing={1} sx={{ m: 0.25 }}>
                                                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                            <Typography sx ={{fontSize: '16px'}}>{infoRecord[eachHeader.field_id]["ref_to"][field.field_id]}</Typography>
                                                        </Grid>

                                                    </Grid>
                                                ))}
                                            </Grid>

                                        </Grid>
                                    </Box>
                                </>
                            ) : (
                                null
                            )}
                        </>
                    ))} */}
                </>
            {/* )} */}

        </OutlookDialog>
    )
}

export default ViewRecord