import { Autocomplete, Button, Checkbox, FormControl, FormControlLabel, Grid, IconButton, InputLabel, ListSubheader, MenuItem, Paper, Select, TextField, Tooltip, Typography, createFilterOptions } from '@mui/material'
import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';
import Iconify from '../../../components/iconify/Iconify';

const styletitle = {
    fontWeight: 'bold'
}

const style_title_map = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const list_content_email = ["@email_reply_content"]

const filter = createFilterOptions();

const list_use = ["Yes", "No"]

function ActionRecord({ dataAction, dataOneAction, handleDataChange, setDataOneAction, addFieldRecord, setAddFieldRecord, fieldRecord, setFieldRecord,
    objectRecord, dateValueRecord, setDateValueRecord, listObject, viewAction, updateRecordAction,
    validFieldRecord, data }) {

    const [value, setValue] = useState(null);

    const [openTooltip, setOpenTooltip] = useState(false)

    const handleCloseTooltip = () => {
        setOpenTooltip(false);
    };

    const handleOpenTooltip = () => {
        setOpenTooltip(true);
    };

    const handleAddFieldRecord = () => {
        setAddFieldRecord(true)
        setFieldRecord([...fieldRecord, { id: `${fieldRecord.length}`, field: '', value: dataOneAction.option === 'Yes' ? null : '' }])
    }

    const handleDeleteFieldRecord = (index) => {
        const newFieldRecord = [...fieldRecord]
        newFieldRecord.splice(index, 1)
        let newFieldRecordID = newFieldRecord.map((item) => item = {
            ...item,
            id: parseInt(item.id) > index ? `${String(parseInt(item.id) - 1)}` : `${item.id}`
        })
        setFieldRecord(newFieldRecordID)
    }

    const handleFieldRecordChange = (event, index) => {
        const name = event.target.name
        const newFieldRecord = [...fieldRecord]  
        newFieldRecord[index][name] = event.target.value
        setFieldRecord(newFieldRecord)
    }

    const handleDateRecordChange = (date, index, field) => {
        setDateValueRecord(date)
        const newFieldRecord = [...fieldRecord]
        let dayFormatted = ''
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };
        let transFormDate = new Date(date)
        if (field.separator === '/') {

            if (field.format === 'YYYY MM DD') {
                dayFormatted = transFormDate.toLocaleDateString('en-ZA')
            }
            else if (field.format === 'DD MM YYYY') {
                dayFormatted = transFormDate.toLocaleDateString('en-GB')
            }
            // MM DD YYYY
            else {
                dayFormatted = transFormDate.toLocaleDateString('en-US', options)
            }
        }
        else {
            if (field.format === 'YYYY MM DD') {
                dayFormatted = transFormDate.toLocaleDateString('en-CA')
            }
            else if (field.format === 'DD MM YYYY') {
                dayFormatted = transFormDate.toLocaleDateString('nl-NL', options)
            }
            // MM DD YYYY
            else {
                let subDate = date.format().substring(0, 10)
                let newDate = new Date(subDate)
                let month = newDate.getMonth() + 1; // Months are zero indexed, so we add 1
                let day = newDate.getDate();
                let year = newDate.getFullYear();

                // Pad single digit day and month with leading zeros
                if (month < 10) {
                    month = '0' + month;
                }
                if (day < 10) {
                    day = '0' + day;
                }
                dayFormatted = month + '-' + day + '-' + year
            }
        }
        newFieldRecord[index]['value'] = dayFormatted
        newFieldRecord[index]['value_date'] = date
        setFieldRecord(newFieldRecord)
    }

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



    return (
        <Grid item container spacing={1}>
            <Grid item xs={2} sx={{ marginTop: 0 }}>
                <Typography sx={styletitle} color={"black"}>
                    Name
                </Typography>
            </Grid>
            <Grid item xs={10} md={10} sx={{ marginTop: 0, display: 'flex', justifyContent: 'center' }}>
                <TextField
                    name='name'
                    value={dataOneAction.name}
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
            <Grid item xs={2} sx={{ marginTop: 0 }}>
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
            </Grid>
            <>
                <Grid item xs={2} sx={{ marginTop: 0 }}>
                    <Typography sx={styletitle} color={"black"}>
                        Object
                    </Typography>
                </Grid>
                <Grid item xs={10} sx={{ marginTop: 0, display: 'flex', justifyContent: 'center' }}>
                    <FormControl sx={{ width: '60%' }}>
                        <InputLabel id="input-object">Select Object</InputLabel>
                        <Select
                            labelId='object'
                            label="Select Object"
                            name="object"
                            id='input-object'
                            value={dataOneAction.object}
                            onChange={handleDataChange}
                            // error={!validFieldType && indexField === index}
                            required
                            disabled={updateRecordAction}
                            style={{ height: 50 }}
                            renderValue={(select) => {

                                return select.obj_name
                            }}
                        >
                            {listObject?.map(p => renderSelectGroupObject(p))}
                        </Select>
                    </FormControl>
                </Grid>
            </>
            {addFieldRecord ? (
                <>
                    <Grid item xs={4} sx={style_title_map}>
                        <Paper><b>Field Name</b></Paper>
                    </Grid>
                    <Grid item xs={4} sx={style_title_map}>
                        <Paper><b>Value</b></Paper>
                    </Grid>
                    {fieldRecord.map((dataField, index) => (
                        <Grid key={index} item container spacing={1}>
                            <Grid item xs={4}>
                                <FormControl variant='standard' sx={{ width: '100%' }} size='small'>
                                    <InputLabel id="input-field-name">Select Field</InputLabel>
                                    <Select
                                        labelId='input-field-name'
                                        label="Select Field"
                                        name="field"
                                        id='input'
                                        value={dataField.field}
                                        onChange={(e) => handleFieldRecordChange(e, index)}
                                        // error={!validFieldType && indexField === index}
                                        required
                                        // style={{ height: "31px" }}
                                        renderValue={(field) => {
                                            return field.field_name
                                        }}

                                    >
                                        {dataOneAction.object ? (
                                            dataOneAction.object.fields ? (
                                                dataOneAction.object.fields.map((field) => (
                                                    <MenuItem value={field} key={field._id}>{field.field_name}</MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem disabled value="">No fields</MenuItem>
                                            )
                                        ) : (
                                            <MenuItem disabled value="">Choose objects</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                {data.trigger === 'Use Scanned Email' ? (
                                    <>
                                        {dataField.field.field_type === 'text' || dataField.field.field_type === 'textarea' ? (
                                            <Autocomplete
                                                value={dataField.value}
                                                onChange={(event, newValue) => {
                                                    let newFieldRecord = [...fieldRecord]
                                                    if (typeof newValue === 'string') {
                                                        // setValue({
                                                        //     title: newValue,
                                                        // });

                                                        newFieldRecord[index]["value"] = newValue
                                                        setFieldRecord(newFieldRecord)
                                                        // setValue(newValue)
                                                    } else if (newValue && newValue.inputValue) {
                                                        // Create a new value from the user input
                                                        // setValue({
                                                        //     title: newValue.inputValue,
                                                        // });
                                                        newFieldRecord[index]["value"] = newValue.inputValue
                                                        setFieldRecord(newFieldRecord)
                                                        // setValue(newValue.inputValue)
                                                    } else {
                                                        newFieldRecord[index]["value"] = newValue
                                                        setFieldRecord(newFieldRecord)
                                                        // setValue(newValue);
                                                    }
                                                }}
                                                filterOptions={(options, params) => {
 
                                                    const filtered = filter(options, params);

                                                    const { inputValue } = params;
                                                    // Suggest the creation of a new value
                                                    const isExisting = options.some((option) => inputValue === option);
                                                    if (inputValue !== '' && !isExisting) {
                                                        // filtered.push({
                                                        //     inputValue,
                                                        //     title: `Add "${inputValue}"`,
                                                        //     // inputValue
                                                        // });
                                                        filtered.push(inputValue);
                                                    }

                                                    return filtered;
                                                }}
                                                selectOnFocus
                                                clearOnBlur
                                                handleHomeEndKeys
                                                id="free-solo-with-text-demo"
                                                options={list_content_email}

                                                getOptionLabel={(option) => option}
                                                renderOption={(props, option) => <li {...props}>{option}</li>}
                                                sx={{ width: '90%', height: '10%' }}
                                                freeSolo
                                                renderInput={(params) => (
                                                    <TextField variant='standard' {...params} label="Input value" InputProps={{
                                                        ...params.InputProps,
                                                        style: {
                                                            height: 29
                                                        }
                                                    }} />
                                                )}
                                            />
                                        ) : (
                                            <>
                                                {dataField.field.field_type === 'date' && (
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            name={`value`}
                                                            value={dateValueRecord}
                                                            onChange={(newValue) => handleDateRecordChange(newValue, index, dataField.field)}
                                                            views={dataField.field.format === 'YYYY MM DD' && ['year', 'month', 'day'] || dataField.field.format === 'DD MM YYYY' && ['day', 'month', 'year'] || dataField.field.format === 'MM DD YYYY' && ['month', 'day', 'year']}
                                                            format={dataField.field.format.replace(/\s/g, `${dataField.field.separator}`)}
                                                            slotProps={{
                                                                textField: {
                                                                    InputProps: {
                                                                        style: {
                                                                            height: 45
                                                                        }
                                                                    }
                                                                }
                                                            }}
                                                            sx={{ width: '90%' }}
                                                        />

                                                    </LocalizationProvider>
                                                )}
                                                {dataField.field.field_type === 'float' && (
                                                    <TextField
                                                        name='value'
                                                        value={dataField.value}
                                                        onChange={(e) => handleFieldRecordChange(e, index)}
                                                        sx={{ width: '100%' }}
                                                        label="Input Value"
                                                        InputProps={{
                                                            style: {
                                                                height: 29
                                                            }
                                                        }}
                                                        variant='standard'
                                                        required
                                                    />
                                                )}
                                                {dataField.field.field_type === 'email' && (
                                                    <TextField
                                                        name='value'
                                                        value={dataField.value}
                                                        onChange={(e) => handleFieldRecordChange(e, index)}
                                                        sx={{ width: '100%' }}
                                                        label="Input Value"
                                                        InputProps={{
                                                            style: {
                                                                height: 29
                                                            }
                                                        }}
                                                        variant='standard'
                                                        required
                                                    />
                                                )}
                                                {dataField.field.field_type === 'select' && (
                                                    <FormControl variant='standard' sx={{ width: '90%' }} size='small'>
                                                        <InputLabel id="input-option-select">Select Option</InputLabel>
                                                        <Select
                                                            labelId='input-option-select'
                                                            label="Select Option"
                                                            name="value"
                                                            id='input-option-select'
                                                            value={dataField.value}
                                                            onChange={(e) => handleFieldRecordChange(e, index)}
                                                            // error={!validFieldType && indexField === index}
                                                            required
                                                        // style={{ height: 50 }}
                                                        >
                                                            {dataField.field.options.map((option, indexOption) => (
                                                                <MenuItem key={indexOption} value={option}>{option}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                )}


                                            </>
                                        )}

                                    </>
                                ) : (
                                    <>

                                        {dataField.field.field_type !== 'select' && dataField.field.field_type !== 'date' ? (

                                            <TextField
                                                name='value'
                                                value={dataField.value}
                                                onChange={(e) => handleFieldRecordChange(e, index)}
                                                sx={{ width: '90%' }}
                                                label="Input Value"
                                                InputProps={{
                                                    style: {
                                                        height: 29
                                                    }
                                                }}
                                                variant='standard'
                                                required
                                            />
                                        ) : (
                                            // <>

                                            dataField.field.field_type === 'select' ? (
                                                <FormControl variant='standard' sx={{ width: '90%' }} size='small'>
                                                    <InputLabel id="input-option-select">Select Option</InputLabel>
                                                    <Select
                                                        labelId='input-option-select'
                                                        label="Select Option"
                                                        name="value"
                                                        id='input-option-select'
                                                        value={dataField.value}
                                                        onChange={(e) => handleFieldRecordChange(e, index)}
                                                        // error={!validFieldType && indexField === index}
                                                        required
                                                    // style={{ height: 50 }}
                                                    >
                                                        {dataField.field.options.map((option, indexOption) => (
                                                            <MenuItem key={indexOption} value={option}>{option}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                // </>
                                            ) : (

                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        name={`value`}
                                                        value={dateValueRecord}
                                                        onChange={(newValue) => handleDateRecordChange(newValue, index, dataField.field)}
                                                        views={dataField.field.format === 'YYYY MM DD' && ['year', 'month', 'day'] || dataField.field.format === 'DD MM YYYY' && ['day', 'month', 'year'] || dataField.field.format === 'MM DD YYYY' && ['month', 'day', 'year']}
                                                        format={dataField.field.format.replace(/\s/g, `${dataField.field.separator}`)}
                                                        slotProps={{
                                                            textField: {
                                                                InputProps: {
                                                                    style: {
                                                                        height: 45
                                                                    }
                                                                }
                                                            }
                                                        }}
                                                        sx={{ width: '90%' }}
                                                    />

                                                </LocalizationProvider>
                                            )

                                        )}
                                    </>
                                )}
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={() => handleDeleteFieldRecord(index)}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                </>
            ) : null}
            <Grid item xs={12} sx={{ marginTop: 2 }}>
                <Button startIcon={<Iconify icon="eva:plus-fill" />} variant='outlined' onClick={handleAddFieldRecord}>
                    Add Field
                </Button>
            </Grid>
            {!validFieldRecord ? (
                <Grid item xs={12} >
                    <Typography variant='subtitle1' color={"red"}>
                        You need to choose key-value field pair for this action.
                    </Typography>
                </Grid>
            ) : null}

        </Grid>
    )
}

export default ActionRecord