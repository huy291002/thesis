import { FormControl, Grid, InputLabel, ListSubheader, MenuItem, Select, Typography, FormHelperText, Button, TextField, Box, Tooltip, IconButton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const styletitle = {
    fontWeight: 'bold'
}

const listemail = [
    {
        _id: '1',
        username: 'nqh291002',
        protocol: 'IMAP'
    },
    {
        _id: '2',
        username: 'quannguyen2711',
        protocol: 'SMTP'
    },
    {
        _id: '3',
        username: 'sebfear123',
        protocol: 'SMTP'
    }

]

function ActionEmail({ dataOneAction, listObject, senderChosen, setSenderChosen, templateChosen, setTemplateChosen, handleDataChange, listTemplate, listFields }) {



    const dispatch = useDispatch()

    const body = dataOneAction.template?.body !== '' ? dataOneAction.template.body : ''

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

    const renderSelectField = object => {
        const items = object.fields.map(field => {
          return (
                field.field_type === 'email' ? (
                    <MenuItem sx = {{marginLeft: '12px'}} key={field._id} value={[object,field]}>{field.field_name}</MenuItem>
                ) : (
                    null
                )
          );
        });
        return [<ListSubheader sx={{ fontWeight: 'bold', color: 'black' }}>{object.field_id ? `${object?.obj_name} (Reference)` : `${object?.obj_name} (Main)`}</ListSubheader>, items]
      }
    

    // const handleDataChange = (e) => {
    //     const value = e.target.value
    //     setData({
    //         ...data,
    //         [e.target.name]: value
    //     })


    // }

    const handleChooseTemplate = (e) => {

        setTemplateChosen(e.target.value)
    }

    const handleChooseSender = (e) => {

        setSenderChosen(e.target.value)
    }


    return (
        <Grid item container spacing={1} >

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
                        style={{ height: 50 }}
                        renderValue={(select) => {

                            return select.obj_name
                        }}
                    >
                        {listObject?.map(p => renderSelectGroupObject(p))}
                    </Select>
                </FormControl>
            </Grid>


            {/* Dropdown email */}
            <Grid item xs={2} >
                <Typography sx={styletitle} color={"black"}>
                    From
                </Typography>
            </Grid>
            <Grid item xs={10} sx={{ marginTop: 1, display: 'flex', justifyContent: 'center' }}>
                <FormControl sx={{ width: '60%' }}>
                    <InputLabel id="input-email">Select Email</InputLabel>
                    <Select
                        labelId='input-email'
                        //label="Object"
                        name="sender"
                        label='Select Email'
                        id='input-object'
                        value={dataOneAction.sender}
                        onChange={handleDataChange}
                        // error={!validFieldType && indexField === index}
                        required
                        style={{ height: 50 }}
                        renderValue={(value) => {

                            return value.username.concat('@gmail.com')
                        }}
                    >
                        {listemail.map((email) => (
                            <MenuItem key={email._id} value={email}>{email.username}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            {/* To email */}
            <Grid item xs={2} sx={{ display: 'flex' }}>
                <Typography sx={styletitle} color={"black"}>
                    To
                </Typography>
            </Grid>
            <Grid item xs={10} sx={{ marginTop: 1, marginBottom: 1, display: 'flex', justifyContent: 'center' }}>
                <FormControl sx={{ width: '60%' }}>
                    <InputLabel id="input-field">Select Field Object</InputLabel>
                    <Select
                        labelId='input-field'
                        label="Selet Field Object"
                        name="field"
                        id='input-field'
                        value={dataOneAction.field}
                        onChange={handleDataChange}
                        // error={!validFieldType && indexField === index}
                        required
                        style={{ height: 50 }}
                        renderValue={(select) => {
                            return `${select[0].obj_name}.${select[1].field_name}`
                        }}
                    >
                        {dataOneAction.object ? (
                            dataOneAction.object.fields ? (
                                listFields.map((p) => renderSelectField(p))
                            ) : (
                                <MenuItem disabled value="">No fields</MenuItem>
                            )
                        ) : (
                            <MenuItem disabled value="">Choose objects</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Grid>

            {/* <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <Typography variant="h4" gutterBottom>
                                    Template
                                </Typography>
                            </Grid> */}

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
            <Grid item xs={10} sx={{ marginTop: 0.5, display: 'flex', justifyContent: 'center' }}>
                <FormControl sx={{ width: '60%' }}>
                    <InputLabel id="input-template">Choose Template</InputLabel>
                    <Select
                        labelId='input-template'
                        //label="Template"
                        name="template"
                        label='Choose Template'
                        id='input-template'
                        value={dataOneAction.template}
                        onChange={handleDataChange}
                        // error={!validFieldType && indexField === index}
                        required
                        style={{ height: 50 }}
                        disabled={dataOneAction.object === ''}
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
            {dataOneAction.template !== '' && (
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
                            value={dataOneAction.template.subject}
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



        </Grid>
    )
}

export default ActionEmail