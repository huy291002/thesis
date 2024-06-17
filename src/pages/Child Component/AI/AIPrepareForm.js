import React from 'react'
import OutlookDialog from '../../../components/OutlookDialog/OutlookDialog'
import { Checkbox, FormControl, Grid, InputLabel, ListItemText, ListSubheader, MenuItem, OutlinedInput, Select, Typography, Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

const styletitle = {
    fontWeight: 'bold'
}


function AIPrepareForm({ openAIDialog, setOpenAIDialog, object, listObject, fieldFeature, setFieldFeature, handleFieldFeature, data, handleDataChange, handleSubmit, handleSave }) {



    const handleCloseAIDialog = () => {
        setOpenAIDialog(false)
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



    // const handleFieldFeature = (event) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setFieldFeature(
    //         // On autofill we get a stringified value.
    //         typeof value === 'string' ? value.split(',') : value,
    //     );

    // }

    return (
        <OutlookDialog
            openDialog={openAIDialog}
            handleCloseDialog={handleCloseAIDialog}
            title='Dataset'
            minHeight='35%'
            minWidth='55%'
        >
            <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <Typography sx={styletitle} color={"black"}>
                            Name
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            name='name'
                            value={data.name}
                            onChange={handleDataChange}
                            InputProps={{
                                style: {
                                    height: 40
                                }
                            }}
                            required
                            sx = {{width: '60%'}}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography sx={styletitle} color={"black"}>
                           Description
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            name='description'
                            value={data.description}
                            onChange={handleDataChange}
                            multiline
                            rows={4}
                            required
                            sx = {{width: '60%'}}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography sx={styletitle} color={"black"}>
                            Field Feature
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <FormControl sx={{ width: '60%' }}>
                            <InputLabel id="multiple-checkbox-mapping">Select Field Feature</InputLabel>
                            <Select
                                labelId='multiple-checkbox-mapping'
                                label="Select Column Mapping"
                                id='input'
                                value={fieldFeature}
                                onChange={handleFieldFeature}
                                multiple
                                // error={!validFieldType && indexField === index}
                                input={<OutlinedInput id="select-multiple-checkbox" label="Select Field Feature" />}

                                renderValue={(selected) => selected.map(u => u.field_name).join(', ')}

                                style={{ height: 50 }}
                            >
                                {object ? (
                                    object.fields ? (
                                        object.fields.map((field, index) => (
                                            <MenuItem
                                                key={index}
                                                value={field}
                                            >
                                                <Checkbox checked={fieldFeature.indexOf(field) > -1} />
                                                <ListItemText primary={field.field_name} />
                                            </MenuItem>
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
                    <Grid item xs={2}>
                        <Typography sx={styletitle} color={"black"}>
                            Field Label
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <FormControl sx={{ width: '60%' }}>
                            <InputLabel id="input-field-label">Select Field Label</InputLabel>
                            <Select
                                labelId='input-field-label'
                                label="Select Field Label"
                                id='input'
                                name='fieldLabel'
                                value={data.fieldLabel}
                                onChange={handleDataChange}


                                style={{ height: 50 }}
                            >
                                {object ? (
                                    object.fields ? (
                                        object.fields.map((field, index) => (
                                            !fieldFeature.map(u => u.field_name).includes(field.field_name) && (
                                                <MenuItem key={index} value={field}>{field.field_name}</MenuItem>
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
                    <Grid item xs={10.25} sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 0 }}>
                        <Button onClick={handleSave} startIcon={<DoneIcon />} type="submit" variant="contained" >
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 0 }}>
                        <Button onClick={handleCloseAIDialog} startIcon={<CloseIcon />} variant="outlined"  >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </OutlookDialog>
    )
}

export default AIPrepareForm