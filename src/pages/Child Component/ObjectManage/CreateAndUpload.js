import { Box, Chip, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField, Divider, Checkbox, ListItemText, Autocomplete, ListSubheader, IconButton, InputBase, Typography, FormControlLabel } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import FormDetailView from '../../../components/FormDetailView/FormDetailView'
import { DragDropContext } from 'react-beautiful-dnd'
import Drop from '../../../components/Drop/Drop'
import Drag from '../../../components/Drag/Drag'
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Error from '../../../components/ErrorMessage/Error'

function CreateAndUpload({ file, handleChangeFile, objectName, handleObjectName, schema, setSchema,
    data, setData, prefixUpload, handlePrefixUpload, columnMapping, handleColumnMapping,
    handleOnDragEndField, handleDataChange, handleChangeDataAuto, handleDelete, valueOptions, invalidFieldName, indexField, uploadComplete }) {

    const openSidebar = useSelector(state => state.openSidebar)

    const listObject = useSelector(state => state.listObject)

    const [value, setValue] = useState([])

    const cascade_options_obj = [
        {
            replace_delete_obj: 'replace'
        },
        {
            replace_delete_obj: 'delete'
        }
    ]

    const cascade_options = ['replace', 'delete']

    const renderSelectObjectField = object => {
        const items = object?.fields?.map(field => {
            return (
                <MenuItem sx={{ marginLeft: '40px', marginTop: 0, paddingTop: 0 }} key={field._id} value={[`${object.obj_name}.${field.field_name}`, `${object.obj_id}.${field.field_id}`]}>
                    {field.field_name}
                </MenuItem>
            );
        });
        return [<ListSubheader sx={{ fontWeight: 'bold', color: 'black', marginLeft: '20px', marginTop: 0, paddingTop: 0, fontSize: '16px' }}>{object?.obj_name}</ListSubheader>, items];
    };

    const renderSelectGroupObjectField = group => {
        const items = group?.objects.length > 0 ? group.objects.map(p => renderSelectObjectField(p)) : [];
        return [<ListSubheader sx={{ fontWeight: 'bold', color: 'black', fontSize: '18px', marginTop: 0 }}>{group?.name}</ListSubheader>, items, <Divider variant='middle' sx={{ borderColor: 'black' }} />];
    }

    const renderSelectGroupObject = group => {
        const items = group?.objects?.map(object => {
            return (
                <MenuItem sx={{ marginLeft: '12px' }} key={object._id} value={[object.obj_name, object.obj_id]}>{object.obj_name}</MenuItem>
            );
        });
        return [<ListSubheader sx={{ fontWeight: 'bold', color: 'black' }}>{group?.name}</ListSubheader>, items];
    };


    return (
        <>
            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 1.5, marginLeft: 2 }}>
                <FormControl sx={{ width: '38%' }}>
                    <InputLabel id="multiple-checkbox-mapping">Select Column Mapping</InputLabel>
                    <Select
                        labelId='multiple-checkbox-mapping'
                        label="Select Column Mapping"
                        id='input'
                        value={columnMapping}
                        onChange={handleColumnMapping}
                        multiple
                        // error={!validFieldType && indexField === index}
                        input={<OutlinedInput id="select-multiple-checkbox" label="Select Column Mapping" />}
                        renderValue={(selected) => selected.join(', ')}
                        style={{ height: 50 }}
                    >
                        {schema.map((column, index) => (
                            <MenuItem
                                key={index}
                                value={column}
                            >
                                
                                <Checkbox checked={columnMapping.indexOf(column) > -1} />
                                <ListItemText primary={column} />
                            </MenuItem>
                        ))}

                    </Select>
                </FormControl>
            </Grid>
            <Grid container spacing={2} sx={{ paddingLeft: '0vw', paddingTop: '0.5rem', display: 'flex' }}>
                <Grid item xs={3.125} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Paper><b>Field Name</b></Paper>
                </Grid>
                <Grid item xs={2.75} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Paper><b>Column Mapping</b></Paper>
                </Grid>
                <Grid item xs={2.375} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Paper><b>Field Type</b></Paper>
                </Grid>
                <Grid item xs={2.75} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Paper><b>Field Data</b></Paper>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <Grid item container spacing={0.5} sx={{ paddingLeft: '0vw', display: 'flex', margin: '0px 8px 0px 0px' }}>
                <Grid item xs={3.125} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TextField
                        value={prefixUpload.field_name}
                        type='text'
                        label="Field Name"
                        InputProps={{

                            readOnly: true
                        }}
                        variant='standard'

                    />
                </Grid>
                <Grid item xs={2.75} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                </Grid>
                <Grid item xs={2.375} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TextField
                        value={prefixUpload.field_type[0].toUpperCase() + prefixUpload.field_type.slice(1)}
                        type='text'
                        label="Field Type"
                        InputProps={{

                            readOnly: true
                        }}
                        sx={{ width: '100%' }}
                        // InputProps={{
                        //     sx: {
                        //         height: 50
                        //     }
                        // }}
                        variant='standard'

                    />
                </Grid>
                <Grid item xs={2.75} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TextField
                        value={prefixUpload.prefix}
                        // placeholder='Input Prefix'
                        label="Input Prefix"
                        name="prefix"
                        onChange={handlePrefixUpload}
                        type='text'
                        required
                        // InputProps={{
                        //     sx: {
                        //         height: 50
                        //     }
                        // }}
                        variant='standard'
                        sx={{ width: '90%' }}
                    />
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
            <DragDropContext onDragEnd={handleOnDragEndField}>
                <Drop id="upload">
                    {data.length > 0 ?
                        data.map((field, index) => (
                            <>
                                <Drag key={field.id} id={field.columnMapping} index={index}>
                                    <Grid key={index} item container spacing={0.5} sx={{ paddingLeft: '0vw', display: 'flex', margin: '8px 8px 0px 0px' }}>
                                        <Grid item xs={12}>
                                            <Divider sx={{ marginY: 0 }} />
                                        </Grid>
                                        <Grid item xs={3.125} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                            <TextField
                                                value={field.fieldName}
                                                name="fieldName"
                                                placeholder='Input Field Name'
                                                label="Input Field Name"
                                                onChange={(e) => handleDataChange(e, index)}
                                                type='text'
                                                // InputProps={{
                                                //     sx: {
                                                //         height: 40
                                                //     },
                                                //     readOnly: uploadComplete
                                                // }}
                                                // inputProps={{ sx: {step
                                                //     height: 50
                                                // }}}
                                                required
                                                variant='standard'
                                            />
                                            {!invalidFieldName && index === indexField ? (
                                                <Error>Field Name is existed</Error>
                                            ) : null}
                                        </Grid>
                                        <Grid item xs={2.75} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', marginTop: 3 }}>
                                            {field.columnMapping}
                                        </Grid>
                                        <Grid item xs={2.375} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <FormControl variant='standard' sx={{ width: '100%', height: '42px' }}>
                                                <InputLabel id="input-field-type">Select Field Type</InputLabel>
                                                <Select
                                                    labelId='input-field-type'
                                                    label="Select Field Type"
                                                    id='input'
                                                    name="fieldType"
                                                    value={field.fieldType}
                                                    onChange={(e) => handleDataChange(e, index)}
                                                    // error={!validFieldType && indexField === index}
                                                    style={{ height: '29px' }}
                                                    renderValue={(field) => {
                                                        return field[0]
                                                    }}
                                                    required
                                                    disabled={uploadComplete}
                                                >
                                                    <MenuItem value={['Text', 'text']}>Text</MenuItem>
                                                    <MenuItem value={['Text area', 'textarea']}>Text Area</MenuItem>
                                                    <MenuItem value={['Phone Number', 'phonenumber']}>Phone Number</MenuItem>
                                                    <MenuItem value={['Email', 'email']}>Email</MenuItem>
                                                    <MenuItem value={['Select', 'select']}>Select</MenuItem>
                                                    <MenuItem value={['Float', 'float']}>Float</MenuItem>
                                                    <MenuItem value={['Integer', 'integer']}>Integer</MenuItem>
                                                    <MenuItem value={['Date', 'date']}>Date</MenuItem>
                                                    <MenuItem value={['Reference Object', 'ref_obj']}>Reference Object</MenuItem>
                                                    <MenuItem value={['Reference Field Object', 'ref_field_obj']}>Reference Field Object</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2.75} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {field.fieldType[0] === 'Text' && (
                                                <TextField
                                                    name="length"
                                                    value={field.length}
                                                    placeholder={`Input Text's length`}
                                                    label={`Input Text's length`}
                                                    onChange={(e) => handleDataChange(e, index)}
                                                    InputProps={{
                                                        // sx: {
                                                        //     height: 40
                                                        // },
                                                        readOnly: uploadComplete
                                                    }}
                                                    sx={{ width: '90%' }}
                                                    required
                                                    variant='standard'
                                                />
                                            )}
                                            {field.fieldType[0] === 'Phone Number' && (
                                                <TextField
                                                    name="country_code"
                                                    value={field.country_code}
                                                    placeholder={`Input Country code`}
                                                    label={`Input Country code`}
                                                    onChange={(e) => handleDataChange(e, index)}
                                                    InputProps={{
                                                        // sx: {
                                                        //     height: 40
                                                        // },
                                                        readOnly: uploadComplete
                                                    }}
                                                    sx={{ width: '90%' }}
                                                    required
                                                    variant='standard'
                                                />
                                            )}
                                            {field.fieldType[0] === 'Select' && (

                                                <Autocomplete

                                                    value={valueOptions}
                                                    onChange={(event, newValue) => {
                                                        handleChangeDataAuto(event, newValue, index)


                                                    }}
                                                    readOnly={uploadComplete}
                                                    multiple
                                                    clearIcon={false}

                                                    placeholder='Input your options'

                                                    options={[]}
                                                    sx={{ width: '90%', height: valueOptions.length > 2 ? 'fit-content' : '48px' }}
                                                    freeSolo
                                                    renderValue={(selected) => selected.join(', ')}
                                                    // renderTags={(value, props) =>
                                                    //     value.map((option, index) => (
                                                    //         <>

                                                    //             <Typography sx={{margin: '2px', maxWidth: '360px'}} noWrap={true}>{`${option}` + "," }</Typography>
                                                    //         </>
                                                    //     ))
                                                    // }
                                                    // renderTags={ ( list ) => {
                                                    //     let displayList = list.map( ( item ) => item).join( ', ' );

                                                    //     // Render <span> elements instead of <Chip> components.
                                                    //     return <Typography sx={{margin: '2px', maxWidth: '360px'}} noWrap={true}>{ displayList }{' '}</Typography>;
                                                    // } }
                                                    renderTags={(value, props) =>
                                                        value.map((option, index) => (
                                                            <Chip size='small' label={option} {...props({ index })} />
                                                        ))
                                                    }
                                                    renderInput={(params) =>
                                                        <TextField name="options" variant='standard' label="Add Options" {...params}
                                                        />

                                                    }
                                                />
                                                // <Autocomplete
                                                //     value={value}
                                                //     onChange={(event, newValue) => {
                                                //         setValue(newValue);
                                                //     }}
                                                //     placeholder='Input your options'
                                                //     multiple
                                                //     clearIcon={false}
                                                //     options={[]}
                                                //     sx={{ width: 300 }}
                                                //     freeSolo
                                                //     renderTags={(value, props) =>
                                                //         value.map((option, index) => (
                                                //             <Chip label={option} {...props({ index })} />
                                                //         ))
                                                //     }
                                                //     renderInput={(params) => <TextField variant='standard' label="Add Tags" {...params} InputProps={{
                                                //                 sx: {
                                                //                     height: '34px'
                                                //                 }
                                                //             }} />}
                                                // />
                                            )}
                                            {/* {field.fieldType[0] === 'Float' && (
                                                <TextField
                                                    name="step"
                                                    value={field.step}
                                                    placeholder={`Input step`}
                                                    label={`Input step`}
                                                    onChange={(e) => handleDataChange(e, index)}
                                                    InputProps={{
                                                        // sx: {
                                                        //     height: 40
                                                        // },
                                                        readOnly: uploadComplete
                                                    }}
                                                    sx={{ width: '90%' }}
                                                    required
                                                    variant='standard'
                                                />
                                            )} */}
                                            {field.fieldType[0] === 'Date' && (
                                                <FormControl variant='standard' sx={{ width: '90%', height: '42px' }}>
                                                    <InputLabel id="input-date-format">Select Date's format</InputLabel>
                                                    <Select
                                                        labelId='input-date-format'
                                                        label="Select Date's format"
                                                        name="date"
                                                        id='input-date'
                                                        value={field.date}
                                                        required
                                                        onChange={(e) => handleDataChange(e, index)}
                                                        style={{ height: '29px' }}
                                                        renderValue={(select) => {

                                                            return select[0].replace(/\s/g, `${select[1]}`)
                                                        }}
                                                        disabled={uploadComplete}

                                                    >
                                                        <MenuItem value={['DD MM YYYY', '/']}>DD/MM/YYYY</MenuItem>
                                                        <MenuItem value={['MM DD YYYY', '/']}>MM/DD/YYYY</MenuItem>
                                                        <MenuItem value={['YYYY MM DD', '/']}>YYYY/MM/DD</MenuItem>
                                                        <MenuItem value={['DD MM YYYY', '-']}>DD-MM-YYYY</MenuItem>
                                                        <MenuItem value={['MM DD YYYY', '-']}>MM-DD-YYYY</MenuItem>
                                                        <MenuItem value={['YYYY MM DD', '-']}>YYYY-MM-DD</MenuItem>
                                                        <MenuItem value={['Month Day, Year']}>Month Day, Year</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            )}
                                            {field.fieldType[0] === 'Reference Object' && (
                                                <>
                                                    <FormControl variant='standard' sx={{ width: '90%', height: '42px' }}>
                                                        <InputLabel id="input-object-reference">Select Object</InputLabel>
                                                        <Select
                                                            labelId='input-object-reference'
                                                            label="Select Object"
                                                            name="ref_obj"
                                                            id='input-object'
                                                            value={field.ref_obj}
                                                            onChange={(e) => handleDataChange(e, index)}
                                                            style={{ height: '29px' }}
                                                            renderValue={(select) => {
                                                                return select[0]
                                                            }}
                                                            required
                                                            disabled={uploadComplete}

                                                        >
                                                            {listObject?.map(p => renderSelectGroupObject(p))}
                                                        </Select>
                                                    </FormControl>
                                                </>
                                            )}
                                            {field.fieldType[0] === 'Reference Field Object' && (
                                                <>
                                                    <FormControl variant='standard' sx={{ width: '90%', height: '42px' }}>
                                                        <InputLabel id="input-object-reference">Select Field Object</InputLabel>
                                                        <Select
                                                            labelId='input-object-reference'
                                                            label="Select Field Object"
                                                            name="ref_field_obj"
                                                            id='input-object'
                                                            value={field.ref_field_obj}
                                                            onChange={(e) => handleDataChange(e, index)}
                                                            style={{ height: '29px' }}
                                                            renderValue={(select) => {
                                                                return select[0]
                                                            }}
                                                            required
                                                            disabled={uploadComplete}

                                                        >
                                                            {listObject?.map(p => renderSelectGroupObjectField(p))}
                                                        </Select>
                                                    </FormControl>
                                                </>
                                            )}

                                        </Grid>
                                        {/* <Grid item xs={1}></Grid> */}
                                        <Grid item xs={0.35} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <IconButton onClick={() => handleDelete(index, field.columnMapping)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>

                                        <Grid item xs={0.35} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <IconButton>
                                                <DragIndicatorIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={8.25}></Grid>
                                        <Grid item xs={2.75} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {field.fieldType[0] === 'Reference Object' || field.fieldType[0] === 'Reference Field Object' ? (
                                                <>
                                                    {field.fieldType[0] === 'Reference Object' && (
                                                        <>
                                                            {cascade_options.map((option, indexOption) => (
                                                                <>
                                                                    <FormControlLabel key={indexOption}
                                                                        control={
                                                                            <Checkbox
                                                                                name="replace_delete_obj"
                                                                                checked={field.replace_delete_obj === option}
                                                                                value={option}
                                                                                required={field.replace_delete_obj === ''}
                                                                                onChange={(e) => handleDataChange(e, index)}
                                                                                disabled={uploadComplete}
                                                                            />
                                                                        }
                                                                        label={option[0].toUpperCase() + option.slice(1)}
                                                                    />
                                                                </>
                                                            ))}
                                                        </>
                                                    )}
                                                    {field.fieldType[0] === 'Reference Field Object' && (
                                                        <>
                                                            {cascade_options.map((option, indexOption) => (
                                                                <>
                                                                    <FormControlLabel key={indexOption}
                                                                        control={
                                                                            <Checkbox
                                                                                name="replace_delete_field"
                                                                                checked={field.replace_delete_field === option}
                                                                                value={option}
                                                                                required={field.replace_delete_obj === ''}
                                                                                onChange={(e) => handleDataChange(e, index)}
                                                                                disabled={uploadComplete}
                                                                            />
                                                                        }
                                                                        label={option[0].toUpperCase() + option.slice(1)}
                                                                    />
                                                                </>
                                                            ))}
                                                        </>
                                                    )}

                                                </>
                                            ) : null}
                                        </Grid>
                                        {/* <Grid item xs={12}>
                                        {index !== data.length - 1 && (
                                          <Divider variant='middle' />
                                        )}
                                      </Grid> */}
                                    </Grid>
                                </Drag>
                            </>
                        ))

                        :
                        <></>
                    }
                </Drop>
            </DragDropContext>
        </>
    )
}


export default CreateAndUpload