import React, { useState } from 'react'
import OutlookDialog from '../../../components/OutlookDialog/OutlookDialog'
import { Button, FormHelperText, Grid, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
//import Error from '../../../components/ErrorMessage/Error';
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

const styletitle = {
    fontWeight: 'bold'
}

function ModelForm({ openModelDialog, setOpenModelDialog, model, handleModelChange, setSaveModel, validModelName, setValidModelName, validModelDescription, setValidModelDescription }) {

    // const [validModelName, setValidModelName] = useState(true)

    // const [validModelDescription, setValidModelDescription] = useState(true)

    const handleCloseModelDialog = () => {
        setOpenModelDialog(false)

    }

    const handleSubmitModel = (e) => {
        e.preventDefault()
        setOpenModelDialog(false)
        setSaveModel(true)
        setValidModelDescription(true)
        setValidModelName(true)
    }

    return (
        <OutlookDialog
            openDialog={openModelDialog}
            handleCloseDialog={handleCloseModelDialog}
            title='Model Config'
            minHeight='35%'
            minWidth='35%'
        >
            <form onSubmit={handleSubmitModel}>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <Typography sx={styletitle} color={"black"}>
                            Name
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            name='name'
                            value={model.name}
                            onChange={handleModelChange}
                            InputProps={{
                                style: {
                                    height: 40
                                }
                            }}
                            sx={{ width: '80%' }}
                            required
                        />
                    </Grid>

                    {!validModelName && (
                        <>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={10} sx ={{display: 'flex', flexDirection: 'row'}}>
                                <ErrorOutlineOutlinedIcon sx={{ fontSize: "25px", color: 'red' }} />
                                <FormHelperText sx={{ fontSize: "15px", paddingTop: 0, paddingLeft: 1, color: "red" }}>
                                    Model name must be filled in
                                </FormHelperText>
                            </Grid>
                        </>

                    )}
                    <Grid item xs={2}>
                        <Typography sx={styletitle} color={"black"}>
                            Description
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            name='description'
                            value={model.description}
                            onChange={handleModelChange}
                            multiline
                            rows={4}
                            sx={{ width: '80%' }}
                            required
                        />
                    </Grid>
                    {!validModelDescription && (
                         <>
                         <Grid item xs={2}></Grid>
                         <Grid item xs={10} sx ={{display: 'flex', flexDirection: 'row'}}>
                             <ErrorOutlineOutlinedIcon sx={{ fontSize: "25px", color: 'red' }} />
                             <FormHelperText sx={{ fontSize: "15px", paddingTop: 0, paddingLeft: 1, color: "red" }}>
                                 Model description must be filled in
                             </FormHelperText>
                         </Grid>
                     </>
                    )}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 0 }}>
                        <Button startIcon={<DoneIcon />} type="submit" variant="contained" >
                            Save
                        </Button>
                    </Grid>
                    {/* <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 0 }}>
                        <Button onClick={handleCloseModelDialog} startIcon={<CloseIcon />} variant="outlined"  >
                            Cancel
                        </Button>
                    </Grid> */}
                </Grid>
            </form>
        </OutlookDialog>
    )
}

export default ModelForm