import React, { useState } from 'react'
import OutlookDialog from '../../../components/OutlookDialog/OutlookDialog'
import { Checkbox, Divider, FormControl, Grid, InputLabel, ListItemText, ListSubheader, MenuItem, OutlinedInput, Paper, Select, TextField, Typography, Button, IconButton, FormControlLabel, Tooltip } from '@mui/material'
import { useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Iconify from '../../../components/iconify/Iconify';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const styletitle = {
    fontWeight: 'bold'
}

const style_title_map = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const menu = ['Equal', 'Not Equal', 'Greater than', 'Less than', 'In', 'Not In']

const previous_email = ['yes', 'no']

const menuItemText = ['in', 'not in', 'equal', 'not equal']

const menuItemFloadDate = ['equal', 'not equal', 'greater than', 'less than']

const list_trigger = ['Create Record', 'Update Record', 'Trigger manually', 'Use Scanned Email']

function WorkflowForm({ data, setData, addFieldMapping, setAddFieldMapping, dataFieldMapping, setDataFieldMapping, listObject, handleDataChange, workflowid, object }) {

    const [date, setDate] = useState(null)

    const handleAddFieldMapping = () => {
        setAddFieldMapping(true)
        setDataFieldMapping([...dataFieldMapping, { id: `${dataFieldMapping.length}`, field_op: '', field: '', op: '', field_value: '' }])
    }

    const handleDeleteFieldMapping = (index) => {
        const newDataFieldMapping = [...dataFieldMapping]
        newDataFieldMapping.splice(index, 1)
        let newDataFieldMappingID = newDataFieldMapping.map((item) => item = {
            ...item,
            id: parseInt(item.id) > index ? `${String(parseInt(item.id) - 1)}` : `${item.id}`
        })
        setDataFieldMapping(newDataFieldMappingID)
    }

    const handleMappingChange = (event, index) => {
        const field = event.target.name
        const newDataFieldMapping = [...dataFieldMapping]
        newDataFieldMapping[index][field] = event.target.value
        setDataFieldMapping(newDataFieldMapping)
    }

    // const handleCloseWorkflowDialog = () => {
    //     setOpenDialogWorkflow(false)
    // }
    const handleDateChange = (date, index, field) => {
        setDate(date)
        const newDataFieldMapping = [...dataFieldMapping]
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
        newDataFieldMapping[index]['field_value'] = dayFormatted
        // newFieldRecord[index]['value_date'] = date
        setDataFieldMapping(newDataFieldMapping)
    }


    const renderSelectGroup = group => {
        const items = group?.objects?.map(object => {
            return (
                <MenuItem sx={{ marginLeft: '12px' }} key={object._id} value={object}>
                    {object.obj_name}
                </MenuItem>
            );
        });
        return [<ListSubheader sx={{ fontWeight: 'bold', color: 'black' }}>{group?.name}</ListSubheader>, items];
    };

  

    return (
        <>
            <Grid item container spacing={1} >
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant='h4' sx={styletitle} color={"black"}>
                        Workflow Information
                    </Typography>
                </Grid>
                <Grid item xs={3} md={3}>
                    <Typography sx={styletitle} color={"black"}>Name</Typography>
                </Grid>
                <Grid item xs={9} md={9}>
                    <TextField
                        name='name'
                        value={data.name}
                        onChange={handleDataChange}
                        sx={{ marginBottom: 0.5, width: '80%' }}
                        InputProps={{
                            style: {
                                height: 40
                            }
                        }}
                        required
                    />
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={styletitle} color={"black"}>Description</Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        name='description'
                        value={data.description}
                        onChange={handleDataChange}
                        sx={{ marginBottom: 0.5, width: '80%' }}
                        // InputProps={{
                        //     style: {
                        //         height: 40
                        //     }
                        // }}
                        multiline
                        rows={4}
                        required
                    />
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={styletitle} color={"black"}>Object</Typography>
                </Grid>
                <Grid item xs={9}>
                    <FormControl sx={{ width: '80%', height: 40 }} size="small">
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
                            style={{ height: '40px' }}
                            renderValue={(select) => {
                             
                                return select.obj_name
                            }}
                        >
                            {listObject?.map(p => renderSelectGroup(p))}
                            
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2.25}>
                    <Typography sx={styletitle} color={"black"}>Trigger when?</Typography>
                </Grid>
                <Grid item xs={9.75} sx={{ display: 'flex', flexDirection: 'row' }}>
                    {list_trigger.map((trigger, index) => (
                        trigger !== 'Use Scanned Email' ? (
                            <Grid key={index} item container spacing={1}  >
                                <Grid item xs={12} >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name='trigger'
                                                checked={data.trigger === trigger}
                                                onChange={handleDataChange}
                                                value={trigger}
                                            />
                                        }
                                        label={trigger}

                                    />

                                    <Tooltip title={trigger === 'Create Record' && 'This workflow will be triggered when a new record is inserted' || trigger === 'Update Record' && 'This workflow will be triggered when a record is updated' || trigger === 'Trigger manually' && 'This workflow will be triggered when a user click on trigger manually'}>
                                        <IconButton sx={{ marginLeft: -3, marginBottom: 1 }} >
                                            <HelpOutlineIcon sx={{ fontSize: '10px' }} />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        ) : (
                            null
                        )
                    ))}
                </Grid>
                <Grid item xs={2.25}></Grid>
                <Grid item xs={9.75} sx={{ display: 'flex', flexDirection: 'row' }}>
                    {list_trigger.map((trigger, index) => (
                        trigger === 'Use Scanned Email' ? (


                            <Grid key={index} item container spacing={1}  >
                                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name='trigger'
                                                checked={data.trigger === trigger}
                                                onChange={handleDataChange}
                                                value={trigger}
                                            />
                                        }
                                        label={trigger}
                                    />

                                    <Tooltip title={trigger === 'Use Scanned Email' && 'This workflow will use the content of scanned email'}>
                                        <IconButton sx={{ marginLeft: -3, marginBottom: 1 }} >
                                            <HelpOutlineIcon sx={{ fontSize: '10px' }} />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        ) : (
                            null
                        )
                    ))}
                </Grid>


                {addFieldMapping ? (
                    <>
                        <Grid item xs={2.75} sx={style_title_map}>
                            <Paper><b>Field Name</b></Paper>
                        </Grid>
                        <Grid item xs={2.75} sx={style_title_map}>
                            <Paper><b>Operator</b></Paper>
                        </Grid>
                        <Grid item xs={2.75} sx={style_title_map}>
                            <Paper><b>Value</b></Paper>
                        </Grid>
                        <Grid item xs={2.75} sx={style_title_map}>
                            <Paper><b>AND/OR</b></Paper>
                        </Grid>
                        {dataFieldMapping.map((dataField, index) => (
                            <Grid key={index} item container spacing={1} sx={{ margin: '0px 0px 8px 0px' }}>
                                <Grid item xs={2.75}>
                                    <FormControl variant='standard' sx={{ width: '100%' }} size='small'>
                                        <InputLabel id="input-field-name">Select Field</InputLabel>
                                        <Select
                                            labelId='input-field-name'
                                            label="Select Field"
                                            name="field"
                                            id='input'
                                            value={dataField.field}
                                            onChange={(e) => handleMappingChange(e, index)}
                                            // error={!validFieldType && indexField === index}
                                            required
                                            // style={{ height: "32px" }}
                                            renderValue={(field) => {
                                                return field.field_name
                                            }}

                                        >
                                            {data.object ? (
                                                data.object.fields ? (
                                                    data.object.fields.map((field) => (
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
                                <Grid item xs={2.75} >
                                    <FormControl variant='standard' sx={{ width: '100%' }} size='small'>
                                        <InputLabel id="input-status">Select Operator</InputLabel>
                                        <Select
                                            labelId='input-status'
                                            label="Select Status"
                                            name="field_op"
                                            id='input'
                                            value={dataField.field_op}
                                            onChange={(e) => handleMappingChange(e, index)}
                                            // error={!validFieldType && indexField === index}
                                            required
                                        // style={{ height: "16px" }}
                                            renderValue={(select) => {
                                            return select.toUpperCase()
                                        }}

                                        >
                                            {dataField.field !== '' ? (
                                                (dataField.field.field_type === 'text' || dataField.field.field_type === 'textarea' || dataField.field.field_type === 'email') ? (
                                                    menuItemText.map((item, index) => (
                                                        <MenuItem key={index} value={item}>{item.toUpperCase()}</MenuItem>
                                                    ))
                                                ) : (
                                                    menuItemFloadDate.map((item, index) => (
                                                        <MenuItem key={index} value={item}>{item.toUpperCase()}</MenuItem>
                                                    ))
                                                )
                                            ) : (
                                                menu.map((item, index) => (
                                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                                ))
                                            )}

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2.75} >
                                    {dataField.field?.field_type === 'select' || dataField.field.field_type === 'date' ? (
                                        dataField.field.field_type === 'select' ? (
                                            <FormControl variant='standard' sx={{ width: '100%' }} size='small'>
                                            <InputLabel id="input-value">Select Value</InputLabel>
                                            <Select
                                                labelId='input-value'
                                                label="Select Value"
                                                name="field_value"
                                                id='input-value'
                                                value={dataField.field_value}
                                                onChange={(e) => handleMappingChange(e, index)}
                                                // error={!validFieldType && indexField === index}
                                                required
                                            // style={{ height: "16px" }}
                                            >
                                                {dataField.field?.options.map((option, index) => (
                                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        ) : (
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        name={`field_value`}
                                                        value={date}
                                                        onChange={(newValue) => handleDateChange(newValue, index, dataField.field)}
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
                                        
                                    ) : (
                                        <TextField
                                            name='field_value'
                                            value={dataField.field_value}
                                            label="Input Value"
                                            //placeholder='Input Value'
                                            onChange={(e) => handleMappingChange(e, index)}
                                            required
                                            InputProps={{
                                                style: {
                                                    height: 29
                                                }
                                            }}
                                            // inputProps={{
                                            //     style: {
                                            //                 height: 10
                                            //             } 
                                            // }}
                                            variant='standard'

                                        />
                                    )}

                                </Grid>
                                <Grid item xs={2.75}>
                                    {index === dataFieldMapping.length - 1 ? (
                                        // <FormControl sx={{ width: '100%' }} size='small'>
                                        //     {/* <InputLabel id="input-condition">Select Condition</InputLabel> */}
                                        //     <Select
                                        //         labelId='input-condition'
                                        //         label="Select Condition"
                                        //         name="status"
                                        //         id='input-status'
                                        //         style={{ height: "32px" }}
                                        //         value={data.condition}
                                        //         onChange={(e) => handleMappingChange(e,index)}
                                        //         variant='standard'
                                        //         displayEmpty
                                        //     >

                                        //         <MenuItem disbale value=''><em>None</em></MenuItem>
                                        //     </Select>
                                        // </FormControl>
                                        null
                                    ) : (
                                        <FormControl variant='standard' sx={{ width: '100%' }} size='small'>
                                            <InputLabel id="input-condition">Select Condition</InputLabel>
                                            <Select
                                                labelId='input-condition'
                                                label="Select Condition"
                                                name="op"
                                                id='input'
                                                value={dataField.op}
                                                onChange={(e) => handleMappingChange(e, index)}
                                                // error={!validFieldType && indexField === index}
                                                required
                                            // style={{ height: "16px" }}
                                            >
                                                <MenuItem value='and'>AND</MenuItem>
                                                <MenuItem value='or'>OR</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                </Grid>
                                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <IconButton onClick={() => handleDeleteFieldMapping(index)}>
                                        <CloseIcon />
                                    </IconButton>
                                </Grid>
                                {index !== dataFieldMapping.length - 1 ? (
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                ) : (
                                    null
                                )}

                            </Grid>
                        ))}
                    </>
                ) : (
                    null
                )}
                {data.trigger === 'Create Record' || data.trigger === 'Update Record' || data.trigger === 'Trigger manually' ? (
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <Button variant='outlined' startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAddFieldMapping}>
                            Add Field Condition
                        </Button>
                    </Grid>
                ) : (
                    <>
                        {data.trigger === 'Use Scanned Email' ? (
                            <>
                                <Grid item xs={3}>
                                    <Typography sx={styletitle} color={"black"}>Previous scanned email?</Typography>
                                </Grid>
                                <Grid item xs={9} sx = {{display: 'flex', flexDirection: 'row'}}>
                                    {previous_email.map((previous, index) => (
                                        <Grid key={index} item container spacing={1}  >
                                            <Grid item xs={12}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name='previous'
                                                            checked={data.previous === previous}
                                                            onChange={handleDataChange}
                                                            value={previous}
                                                        />
                                                    }
                                                    label={previous[0].toUpperCase() + previous.slice(1)}

                                                />

                                                <Tooltip title={previous === 'Yes' && 'This workflow will use the previous scanned email' || previous === 'No' && 'This workflow will use emails which are scanned in this workflow'}>
                                                    <IconButton sx={{ marginLeft: -3, marginBottom: 1 }} >
                                                        <HelpOutlineIcon sx={{ fontSize: '10px' }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>

                                        </Grid>


                                    ))}
                                </Grid>
                            </>
                        ) : null}

                    </>

                )}




            </Grid>
        </>


    )
}

export default WorkflowForm