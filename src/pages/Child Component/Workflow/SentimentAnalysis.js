import { Checkbox, FormControl, Grid, IconButton, InputLabel, ListItemText, ListSubheader, MenuItem, OutlinedInput, Select, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useSelector } from 'react-redux';

const styletitle = {
    fontWeight: 'bold'
}

function SentimentAnalysis({ listObject, dataOneAction, fieldFeature, setFieldFeature, handleDataChange, updateRecordAction }) {

    const [openTooltip, setOpenTooltip] = useState(false)

    const handleOpenTooltip = () => {
        setOpenTooltip(true)
    }

    const handleCloseTooltip = () => {
        setOpenTooltip(false)
    }



    const listModelPrototype = useSelector(state => state.listModelPrototype)

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

    const handleFieldFeature = (event) => {
        const {
            target: { value },
        } = event;
        setFieldFeature(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    return (
        <Grid item container spacing={1} >

            <Grid item xs={3} sx={{ marginTop: 0 }}>
                <Typography sx={styletitle} color={"black"}>
                    Name
                </Typography>
            </Grid>
            <Grid item xs={9} md={9} sx={{ marginTop: 0, display: 'flex', justifyContent: 'center' }}>
                <TextField
                    name='name'
                    value={dataOneAction.name}
                    onChange={handleDataChange}
                    sx={{ marginBottom: 0.5, width: '70%' }}
                    InputProps={{
                        style: {
                            height: 40
                        }
                    }}
                    required
                />
            </Grid>
            <Grid item xs={3} sx={{ marginTop: 0 }}>
                <Typography sx={styletitle} color={"black"}>
                    Description
                </Typography>
            </Grid>
            <Grid item xs={9} md={9} sx={{ marginTop: 0, display: 'flex', justifyContent: 'center' }}>
                <TextField
                    name='description'
                    value={dataOneAction.description}
                    onChange={handleDataChange}
                    sx={{ marginBottom: 0.5, width: '70%' }}
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
            <Grid item xs={3} sx={{ marginTop: 0 }}>
                <Typography sx={styletitle} color={"black"}>
                    Object
                </Typography>
            </Grid>
            <Grid item xs={9} sx={{ marginTop: 0, display: 'flex', justifyContent: 'center' }}>
                <FormControl sx={{ width: '70%' }}>
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
            <Grid item xs={3} sx={{ marginTop: 0 }}>
                <Typography sx={styletitle} color={"black"}>
                    Model
                </Typography>
            </Grid>
            <Grid item xs={9} md={9} sx={{ marginTop: 0, display: 'flex', justifyContent: 'center' }}>
                <FormControl sx={{ width: '70%' }}>
                    <InputLabel id="input-model">Select Model</InputLabel>
                    <Select
                        labelId='object'
                        label="Select Model"
                        name="model"
                        id='input-object'
                        value={dataOneAction.model}
                        onChange={handleDataChange}
                        // error={!validFieldType && indexField === index}
                        required
                        style={{ height: 50 }}
                        renderValue={(select) => {
                          
                            return select.name
                        }}
                    >
                        {listModelPrototype.map((model,index) => (
                            <MenuItem key={model._id} value={model}>{model.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={styletitle} color={"black"}>
                    Field to Score
                </Typography>
                <Tooltip open={openTooltip} onOpen={handleOpenTooltip} onClose={handleCloseTooltip} title="Select text or textarea field to score sentiment">
                    <IconButton sx={{ marginBottom: 3, marginLeft: -1 }}>
                        <HelpOutlineIcon sx={{ fontSize: '15px' }} />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={9} sx={{ marginTop: 0, display: 'flex', justifyContent: 'center' }}>
                <FormControl sx={{ width: '70%' }}>
                    <InputLabel id="multiple-checkbox-mapping">Select Field</InputLabel>
                    <Select
                        labelId='multiple-checkbox-mapping'
                        label="Select Field"
                        id='input'
                        name='field'
                        value={dataOneAction.field}
                        onChange={handleDataChange}

                        renderValue={(select) => {
                         
                            return select.field_name
                        }}

                        style={{ height: 50 }}
                    >
                        {dataOneAction.object ? (
                            dataOneAction.object.fields ? (
                                dataOneAction.object.fields.map((field, index) => (
                                    field.field_type === 'text' || field.field_type === 'textarea' ? (
                                        <MenuItem
                                            key={field._id}
                                            value={field}
                                        >
                                            {field.field_name}
                                        </MenuItem>
                                    ) : (
                                        null
                                    )

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
            <Grid item xs={3} sx={{ marginTop: 0 }}>
                <Typography sx={styletitle} color={"black"}>
                    Update Score to Field
                </Typography>
            </Grid>
            <Grid item xs={9} sx={{ marginTop: 0, display: 'flex', justifyContent: 'center' }}>
                <FormControl sx={{ width: '70%' }}>
                    <InputLabel id="multiple-checkbox-mapping">Select Field</InputLabel>
                    <Select
                        labelId='multiple-checkbox-mapping'
                        label="Select Field"
                        id='input'
                        name='update'
                        value={dataOneAction.update}
                        onChange={handleDataChange}

                        renderValue={(select) => {
                         
                            return select.field_name
                        }}

                        style={{ height: 50 }}
                    >
                        {dataOneAction.object ? (
                            dataOneAction.object.fields ? (
                                dataOneAction.object.fields.map((field, index) => (
                                    field.field_type === 'integer' || field.field_type === 'float' ? (
                                        <MenuItem
                                            key={field._id}
                                            value={field}
                                        >
                                            {field.field_name}
                                        </MenuItem>
                                    ) : (
                                        null
                                    )

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
            
        </Grid>
    )
}

export default SentimentAnalysis