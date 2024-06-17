import { Grid, ListSubheader, MenuItem, Typography, TextField, FormControl, InputLabel, Select, FormHelperText, Box, Tooltip, IconButton, Button } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import OutlookDialog from '../../../components/OutlookDialog/OutlookDialog';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
const styletitle = {
    fontWeight: 'bold'
}

function ActionScanning({ openDialogScan, setOpenDialogScan, data, setData, handleDataChange }) {

    const [dateValue, setDateValue] = useState(null)

    const listObject = useSelector(state => state.listObject)

    const listTemplate = useSelector(state => state.listTemplate)

    const handleDateValue = (name, date) => {
        setDateValue(date)
        setData({
            ...data,
            [name]: date
        })
    }

    const body = data.template?.body !== '' ? data.template.body : ''

    const bodyRef = useRef()

    const [openTooltip, setOpenTooltip] = useState(false)

    const handleOpenTooltip = () => {
        setOpenTooltip(true)
    }

    const handleCloseTooltip = () => {
        setOpenTooltip(false)
    }
    // useEffect(() => {
    //     dispatch({ type: 'saga/getListTemplate' })
    // }, [])

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.innerHTML = body
        }

    }, [body])


    const renderSelectGroupObject = group => {
        const items = group?.objects?.map(object => {
            return (
                // <MenuItem sx={{ marginLeft: '12px' }} key={object._id} value={object}>
                //     {object.obj_name}
                // </MenuItem>
                <MenuItem sx={{ marginLeft: '12px' }} key={object._id} value={object}>{object.obj_name}</MenuItem>
            );
        });
        return [<ListSubheader sx={{ fontWeight: 'bold', color: 'black' }}>{group?.name}</ListSubheader>, items];
    };

    const handleCloseDialogScan = () => {
        setOpenDialogScan(false)
    }

    return (
        <OutlookDialog
            openDialog={openDialogScan}
            handleCloseDialog={handleCloseDialogScan}
            title={'Config Email Scanning'}
            minHeight='35%'
            minWidth='55%'
        >
            <Grid item container spacing={1}>
                {/* <Grid item xs={2} >
                    <Typography sx={styletitle} color={"black"}>
                        Name
                    </Typography>
                </Grid>
                <Grid item xs={10} md={10} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        name='title'
                        value={dataOneAction.title}
                        onChange={handleDataChange}
                        sx={{ marginBottom: 0.5, width: '60%' }}
                        InputProps={{
                            style: {
                                height: 40
                            }
                        }}
                        required
                    />
                </Grid>
                <Grid item xs={2} >
                    <Typography sx={styletitle} color={"black"}>
                        Description
                    </Typography>
                </Grid>
                <Grid item xs={10} md={10} sx={{ marginTop: 0, display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        name='description'
                        value={dataOneAction.description}
                        onChange={handleDataChange}
                        sx={{ marginBottom: 0.5, width: '60%' }}
                        // InputProps={{
                        //     style: {
                        //         height: 40
                        //     }
                        // }}
                        required
                        multiline
                        rows={4}
                    />
                </Grid> */}
                <Grid item xs={2} >
                    <Typography sx={styletitle} color={"black"}>
                        Object
                    </Typography>
                </Grid>
                <Grid item xs={10} sx={{ marginTop: 0, display: 'flex', justifyContent: 'center' }}>
                    <FormControl sx={{ width: '60%' }}>
                        <InputLabel id="input-object">Select Object</InputLabel>
                        <Select
                            labelId='input-object'
                            label="Select Object"
                            name="object"
                            id='input-object'
                            value={data.object}
                            onChange={handleDataChange}
                            // error={!validFieldType && indexField === index}
                            required
                            style={{ height: 50 }}
                            renderValue={(select) => {

                                return select.obj_name
                            }}
                        >
                            {listObject?.map(p => renderSelectGroupObject(p))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} >
                    <Typography sx={styletitle} color={"black"}>
                        Scanning time
                    </Typography>
                </Grid>
                <Grid item xs={10} sx={{ marginTop: 0, display: 'flex', justifyContent: 'center' }}>
                    <FormControl sx={{ width: '60%' }}>
                        <InputLabel id="input-frequency">Select frequency</InputLabel>
                        <Select
                            labelId='input-frequency'
                            label="Select Frequency"
                            name="frequency"
                            id='input-frequency'
                            value={data.frequency}
                            onChange={handleDataChange}
                            // error={!validFieldType && indexField === index}
                            required
                            style={{ height: 50 }}

                        >
                            <MenuItem value='interval'>Interval</MenuItem>
                            <MenuItem value='per day'>Daily</MenuItem>
                            <MenuItem value='per week'>Weekly</MenuItem>
                            {/* <MenuItem value='per month'>Monthly</MenuItem>
                        <MenuItem value='per year'>Yearly</MenuItem> */}
                        </Select>
                    </FormControl>
                </Grid>
                {data.frequency !== '' ? (
                    <>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={10} sx={{ marginTop: 0, display: 'flex', justifyContent: 'center' }}>
                            {data.frequency === 'interval' && (

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        views={['hours', 'minutes', 'seconds']}
                                        format="HH:mm:ss"
                                        label="Select Interval"

                                        value={dateValue}
                                        ampm={false}
                                        sx={{ width: '60%', height: 50 }}
                                        onChange={(newValue) => handleDateValue('time', newValue)}
                                        slotProps={{
                                            textField: {
                                                InputProps: {
                                                    style: {
                                                        height: 50
                                                    }
                                                }
                                            }
                                        }}
                                    />

                                </LocalizationProvider>

                            )}
                            {data.frequency === 'per day' && (

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        views={['hours', 'minutes', 'seconds']}
                                        label="Select Time"
                                        ampm={true}
                                        value={dateValue}
                                        sx={{ width: '60%', height: 50 }}
                                        onChange={(newValue) => handleDateValue('time', newValue)}
                                        slotProps={{
                                            textField: {
                                                InputProps: {
                                                    style: {
                                                        height: 50
                                                    }
                                                }
                                            }
                                        }}
                                    />

                                </LocalizationProvider>

                            )}
                            {data.frequency === 'per week' && (
                                <Grid item container spacing={1}>
                                    <Grid item xs={12}>
                                        <FormControl sx={{ marginLeft: 16, width: '60%' }}>
                                            <InputLabel id="input-weekday">Select Weekday</InputLabel>
                                            <Select
                                                labelId='input-weekday'
                                                label="Select Weekday"
                                                name="weekday"
                                                id='input-frequency'
                                                value={data.weekday}
                                                onChange={handleDataChange}
                                                // error={!validFieldType && indexField === index}
                                                required
                                                style={{ height: 50 }}

                                            >
                                                <MenuItem value='Monday'>Monday</MenuItem>
                                                <MenuItem value='Tuesday'>Tuesday</MenuItem>
                                                <MenuItem value='Wednesday'>Wednesday</MenuItem>
                                                <MenuItem value='Thursday'>Thursday</MenuItem>
                                                <MenuItem value='Friday'>Friday</MenuItem>
                                                <MenuItem value='Saturday'>Saturday</MenuItem>
                                                <MenuItem value='Sunday'>Sunday</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker
                                                views={['hours', 'minutes', 'seconds']}
                                                label="Select Time"

                                                ampm={true}
                                                value={dateValue}
                                                sx={{ marginLeft: 16, width: '60%', height: 50 }}
                                                onChange={(newValue) => handleDateValue('time', newValue)}
                                                slotProps={{
                                                    textField: {
                                                        InputProps: {
                                                            style: {
                                                                height: 50
                                                            }
                                                        }
                                                    }
                                                }}

                                            />

                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>

                            )}

                        </Grid>
                    </>
                ) : null}
                <Grid item xs={2} sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography sx={styletitle} color={"black"}>
                        Template
                    </Typography>
                    <Tooltip open={openTooltip} onOpen={handleOpenTooltip} onClose={handleCloseTooltip} title="You need to choose Object to choose Template">
                        <IconButton sx={{ marginBottom: 3, marginLeft: -1 }}>
                            <HelpOutlineIcon sx={{ fontSize: '15px' }} />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <FormControl sx={{ width: '60%' }}>
                        <InputLabel id="input-template">Choose Template</InputLabel>
                        <Select
                            labelId='input-template'
                            //label="Template"
                            name="template"
                            label='Choose Template'
                            id='input-template'
                            value={data.template}
                            onChange={handleDataChange}
                            // error={!validFieldType && indexField === index}
                            required
                            style={{ height: 50 }}
                            disabled={data.object === ''}
                            renderValue={(select) => {
                                return select.name
                            }}
                        >
                            {listTemplate?.map((template) => (
                                <MenuItem key={template._id} value={template}>{template.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </Grid>
                {/* <Grid item xs={2}></Grid>
            <Grid item xs={10} sx={{ display: 'flex', marginLeft: 31, paddingTop: -3 }}>
                <FormHelperText>You need to choose Object to choose Template</FormHelperText>
            </Grid> */}
                {data.template !== '' && (
                    <>
                        <Grid item xs={2} sx={{ display: 'flex' }}>
                            <Typography sx={styletitle} color={"black"}>
                                Subject
                            </Typography>
                        </Grid>
                        <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'center' }} >
                            <TextField
                                type="text"
                                // fullWidth
                                name="subject"
                                //required
                                value={data.template.subject}
                                sx={{ marginBottom: 0.5, width: '60%' }}
                                InputProps={{
                                    style: {
                                        height: 50
                                    },
                                    readOnly: true
                                }}
                            />
                        </Grid>
                        <Grid item xs={2} sx={{ display: 'flex' }}>
                            <Typography sx={styletitle} color={"black"}>
                                Body
                            </Typography>
                        </Grid>
                        <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'center', paddingRight: 0.5 }}>
                            <Box
                                sx={{ paddingLeft: 13 }}
                                width='fix-content'
                                ref={bodyRef}
                            />
                        </Grid>

                    </>
                )}
                <Grid item xs={10.25} sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 0 }}>
                    <Button startIcon={<DoneIcon />} type="submit" variant="contained" >
                        Save
                    </Button>
                </Grid>
                <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 0 }}>
                    <Button onClick={handleCloseDialogScan} startIcon={<CloseIcon />} variant="outlined"  >
                        Cancel
                    </Button>
                </Grid>

            </Grid>
        </OutlookDialog>
    )
}

export default ActionScanning