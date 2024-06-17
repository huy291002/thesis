import React, { useEffect, useState } from 'react'
import OutlookDialog from '../../../components/OutlookDialog/OutlookDialog'
import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Button, IconButton, Typography, Input, FormHelperText, Alert, Dialog, DialogTitle, DialogContent, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Papa, { parse } from "papaparse";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from '@mui/lab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const styleButton = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 2
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    // height: 1,
    // overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    // whiteSpace: 'nowrap',
    // width: 1,
});

function UploadForm({ openDialog, setOpenDialog, detailObject, page, rowsPerPage, 
    submitUpload, setSubmitUpload, loadingStatus, setLoadingStatus, quantity, setQuantity, 
    fieldObject, setFieldObject, schema, setSchema, file, setFile, selectedFile, setSelectedFile, handleChangeFile, data, setData}) {

    // const [file, setFile] = useState()

    // const [selectedFile, setSelectedFile] = useState('')

    const [openStatusDialog, setOpenStatusDialog] = useState(false)

    const [validSelect, setValidSelect] = useState(true)

    const [loading, setLoading] = useState(false)

    // const [schema, setSchema] = useState([])

    // const [fieldObject, setFieldObject] = useState([])

    //const [data, setData] = useState({})

    const [selectedMappingField, setSelectedMappingField] = useState({}) // store Field chosen in Field File

    const [mappingField, setMappingField] = useState([{}])

    const [indexSelected, setIndexSelected] = useState('')

    const uploadFile = useSelector(state => state.uploadFile)

    const dispatch = useDispatch()

    useEffect(() => {
        // if (uploadFile.status === "uploadFileSuccess") {
        //     toast.info('Processing records is finished', {
        //         position: "top-center",
        //         autoClose: 2000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: false,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "colored",
        //     });
        //     setFile('')
        //     setSelectedFile('')
        //     setData({})
        //     setSchema([])
        //     setQuantity(uploadFile.quantity)
        //     dispatch({ type: 'uploadFile/setUploadFile', payload: { status: "idle", quantity: [] } })
        // }
        // else if (uploadFile.status === "uploadFileError") {
        //     toast.error('Record is not uploaded', {
        //         position: "top-center",
        //         autoClose: 2000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: false,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "colored",
        //     });

        //     dispatch({ type: 'uploadFile/setUploadFile', payload: { status: "idle" } })
        // }
        setLoadingStatus(false)
        //setOpenDialog(false)
    }, [uploadFile])

    const handleDataChange = (e, field_name, index) => {
        // let addData = {
        //     ...data,
        //     [field_name]: e.target.value
        // }
        let valuesData = Object.values(data)
        // let valuesData = Object.values(addData)
        let checkExistData = valuesData.filter((item) => item === e.target.value)
        if (checkExistData.length > 0 && valuesData.length > 0) {
            setValidSelect(false)
            setIndexSelected(index)
            // setData({   
            //     ...data,
            //     [field_name]: e.target.value
            // })

        }
        else {
            setValidSelect(true)
        }
        setData({
            ...data,
            [field_name]: e.target.value
        })

    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
        setFile()
        setSelectedMappingField('')
        setSelectedFile('')
        setData({})
        setMappingField([{}])
        setSchema([])
        // setValidSubmit(true)
    }

    const handleSubmitFile = (e) => {
        e.preventDefault()
        let listAllFieldName = detailObject.fields.map((item) => item = {
            field_name: item.field_name
        })

        
        //////// REVERSE OBJECT VALUE AND KEY
        const addData = Object.fromEntries(Object.entries(data).map(([key, value]) => [value, key]))
        setLoadingStatus(true)
        setOpenDialog(false)
        setSubmitUpload(true)
        dispatch({
            type: 'saga/uploadFileRecord', payload: {
                mapping: JSON.stringify(addData),
                object_id: detailObject._id,
                file: file,
                page: 1,
                rowsPerPage: rowsPerPage
            }
        })
        dispatch({type: 'loadingUploadFile/setLoadingUploadFile', payload: true})
        // toast(
        //     <Grid container spacing={1}>
        //         <Grid item xs={1}>
        //             <CircularProgress size='10' />
        //         </Grid>
        //         <Grid item xs={8}>
        //             Pending
        //         </Grid>
        //     </Grid>
        // )
   
    }

    const handleCloseStatusDialog = () => {
        setOpenStatusDialog(false)
    }



    return (
        <>
            <OutlookDialog
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                title="Upload Record"
                minWidth="45%"
                minHeight='35%'
            >
                <form onSubmit={handleSubmitFile}>
                    <Grid container spacing={1}>
                        <Grid item container spacing={1} sx={{ marginLeft: 2 }}>
                            <Grid item xs={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                {/* <input style={{ fontSize: '16px' }} type="file" accept='.csv, .json' onChange={handleChangeFile} id="fileInput" /> */}
                                <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload file
                                    <VisuallyHiddenInput type="file" accept='.csv, .json' onChange={handleChangeFile} />
                                </Button>

                            </Grid>
                            {/* <Grid item xs={8} md={8}></Grid> */}
                            <Grid item xs={8} md={8} sx={{ display: 'flex' }}>
                                {file !== '' && (
                                    <Typography sx={{ marginLeft: 0 }}>{selectedFile}</Typography>
                                )}
                            </Grid>
                        </Grid>
                        {schema.length > 0 ? (
                            <>
                                <Grid item container spacing={1} sx={{ m: 0, alignItems: 'center', justifyContent: 'center' }}>
                                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <Typography variant='subtitle1'>Field Object</Typography>
                                    </Grid>
                                    <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <Typography variant='subtitle1'>Column Mapping</Typography>
                                    </Grid>
                                </Grid>
                                {fieldObject.map((field, index) => (
                                    <Grid key={field._id} item container spacing={1} sx={{ m: 0, alignItems: 'center', justifyContent: 'center' }}>
                                        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            <Typography variant='subtitle2' sx={{ fontSize: '16px' }}>
                                                {field.field_name}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            {field.field_type === 'id' ? (
                                                <FormControl sx={{ width: '100%' }}>
                                                    <InputLabel id='input-mapping'>Auto Increment</InputLabel>
                                                    <Select
                                                        labelId='input-mapping'
                                                        label="Auto Increment"
                                                        sx={{ height: 45 }}
                                                        disabled
                                                    >
                                                    </Select>
                                                </FormControl>
                                            ) : (
                                                <FormControl sx={{ width: '100%' }}>
                                                    {/* <InputLabel id='input-mapping'>Column Mapping</InputLabel> */}
                                                    <Select
                                                        labelId='input-mapping'

                                                        name={field.field_id}
                                                        value={data[field.field_id]}
                                                        onChange={(e) => handleDataChange(e, field.field_id, index)}
                                                        sx={{ height: 45 }}
                                                        error={!validSelect && indexSelected === index}

                                                    >
                                                        {schema.map((fieldSchema, index) => (
                                                            <MenuItem key={index} value={fieldSchema}>{fieldSchema}</MenuItem>
                                                        ))}

                                                    </Select>
                                                    {!validSelect && indexSelected === index ? (
                                                        <Typography color="red"> Value already selected</Typography>
                                                    ) : (null)}
                                                </FormControl>
                                            )}

                                        </Grid>
                                    </Grid>
                                ))}
                            </>
                        ) : (
                            null
                        )}
                        <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2.5 }}>
                            <Button  startIcon={<DoneIcon />} type='submit' variant="contained" >
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={1.75} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2.5 }}>
                            <Button startIcon={<CloseIcon />} variant="outlined" onClick={handleCloseDialog} >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </OutlookDialog>
            {/* <Dialog
                PaperProps={{
                    sx: { position: "fixed", left: 10, bottom: 10, m: 0, width: 'fit-content' },
                }}
                sx={{'& .MuiDialog-paper': { minWidth: '20%'} }}
                onClose={handleCloseStatusDialog}
                open={openStatusDialog}>
                <DialogTitle sx={{ m: 0, p: 1 }} id="customized-dialog-title">
                    <Typography variant='subtitle1'>
                        Upload Status
                    </Typography>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseStatusDialog}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers sx={{width: 'fit-content'}}>
                    <Grid container spacing={1}>
                        <Grid item xs={1} md={1}>
                            {loading ? (
                                <CircularProgress size='10px' />
                            ) : (
                                <DoneIcon color='success' />
                            )}

                        </Grid>
                        <Grid item xs={5} md={5} >
                            <Typography sx={{ color: '#56d72f' }} variant='body2'>
                                12/12 Records
                            </Typography>

                        </Grid>
                        <Grid item xs={1} md={1}>
                            {loading ? (
                                <CircularProgress size='10px' />
                            ) : (
                                <ErrorOutlineIcon color='error' />
                            )}
                        </Grid>
                        <Grid item xs={5} md={5}>
                            <Typography sx={{ color: '#ff5a55' }} variant='body2'>
                                122/222 Records
                            </Typography>

                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog> */}
            {/* <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="colored"
            /> */}
        </>

    )
}

export default UploadForm