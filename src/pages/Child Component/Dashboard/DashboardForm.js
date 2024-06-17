import React from 'react'
import OutlookDialog from '../../../components/OutlookDialog/OutlookDialog'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

function DashboardForm({ data, setData, handleDataChange, openDialog, setOpenDialog, layout, setLayout, count_item, listObject, renderSelectGroup }) {

    const handleSubmitType = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const newOut = [...layout]
        if (layout.length % 2 === 1) {
            count_item = count_item + 1
        }
        newOut.push({ i: `item-${layout.length + 1}`, id: `${layout.length}`, object: data.object, field: data.field, x: newOut.length % 2 === 0 ? 0 : 2, y: 4 * count_item, w: 3, h: 3, static: false, type: data.type })
        setLayout(newOut)
        setData({
            object: '',
            field: '',
            type: ''
        })
        setOpenDialog(false)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    return (
        <OutlookDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            title={'Config Dashboard'}
            minWidth="55%"
            minHeight='35%'
        >
            <form onSubmit={handleSubmitType}>
                <Grid container spacing={1}>
                    <Grid item xs={12} >
                        <FormControl sx={{ width: '50%', height: 40 }} size="small">
                            <InputLabel id="input-object">Select Object</InputLabel>
                            <Select
                                labelId='input-object'
                                label="Select Object"
                                name="object"
                                id='input-object'
                                value={data.object}
                                onChange={handleDataChange}
                                required
                                style={{ height: '40px' }}
                            >
                                {listObject?.map(p => renderSelectGroup(p))}
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ width: '50%', height: 40  }} size="small" >
                            <InputLabel id="input-field">Select Field</InputLabel>
                            <Select
                                labelId='input-field'
                                label="Select Field"
                                name="field"
                                id='input-field'
                                value={data.field}
                                onChange={handleDataChange}
                                required
                                style={{ height: '40px' }}
                            // style={{ height: '40px', width: data.field ? 'fit-content' : 100 }}
                            >

                                {data.object.fields ? (
                                    data.object.fields.map((field, index) => (
                                        <MenuItem key={field._id} value={field}>{field.field_name}</MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled value="">No fields</MenuItem>
                                )}

                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ width: '50%', height: 40  }} size="small" >
                            <InputLabel id="input-field">Select Type</InputLabel>
                            <Select
                                labelId='input-field'
                                label="Select Type"
                                name="type"
                                id='input-field'
                                value={data.type}
                                onChange={handleDataChange}
                                required
                                style={{ height: '40px' }}
                            // style={{ height: '40px', width: data.field ? 'fit-content' : 100 }}
                            >
                                <MenuItem value='pie'>Pie</MenuItem>
                                <MenuItem value='bar'>Bar</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={10.45} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button startIcon={<DoneIcon />} type='submit' variant="contained"  >
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleCloseDialog} startIcon={<CloseIcon />} variant="outlined"  >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </OutlookDialog>
    )
}

export default DashboardForm