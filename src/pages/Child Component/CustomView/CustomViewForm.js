import React, { useState } from 'react'
import OutlookDialog from '../../../components/OutlookDialog/OutlookDialog';
import { Button, Checkbox, FormControl, Grid, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Select } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
function CustomViewForm({ openDialogCustom, setOpenDialogCustom, handleObjectMapping, layout, setLayout, objectMapping, listRef, count, setObjectMapping, objectRefFields, setObjectRefFields, listObjectRefs }) {

    const listObjectsFields = useSelector(state => state.listObjectsFields)

    const [type, setType] = useState('')

    const handleChangeType = (e) => {
        setType(e.target.value)
    }

    const handleCloseDialogCustom = () => {
        setOpenDialogCustom(false)
    }

    const handleAddObject = (e) => {
        e.preventDefault();
        e.stopPropagation()
        const newOut = [...layout]
        const copyObject = JSON.parse(JSON.stringify(listObjectsFields))
        let list = []
        if (type === 'Related Object'){
            for (let i = 0; i < objectMapping.length; i++) {
                if (newOut.length % 2 === 0) {
                    count = count + 1
                }
                
                let result = copyObject.filter((object) => object._id === objectMapping[i]._id)[0]
                list.push(result)
                newOut.push({ i: `item-${newOut.length + 1}`, id: `${newOut.length}`, object: result, x: newOut.length % 2 === 0 ? 0 : 2, y: 4 * count, w: 4, h: 2.75, static: false, type: 'related' })
            }
            setObjectRefFields(list)
        }
        else {
            if (newOut.length % 2 === 0){
                count = count +1
            }
            newOut.push({ i: `item-${newOut.length + 1}`, id: `${newOut.length}`,  x: newOut.length % 2 === 0 ? 0 : 2, y: 4 * count, w: 4, h: 2.75, static: false, type: 'send_email' })
        }

        

        setObjectMapping([])
        setType('')
        setLayout(newOut)
        setOpenDialogCustom(false)


    }

    return (
        <OutlookDialog
            openDialog={openDialogCustom}
            handleCloseDialog={handleCloseDialogCustom}
            title='Custom View'
            minHeight='35%'
            minWidth='55%'
        >
            <form onSubmit={handleAddObject}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <FormControl sx={{ width: '38%' }}>
                            <InputLabel id="input-type">Select type</InputLabel>
                            <Select
                                labelId='input-type'
                                label="Select type"
                                id='input'
                                value={type}
                                onChange={handleChangeType}
                                style={{ height: 50 }}
                            >
                                <MenuItem value='Related Object'>Related Object</MenuItem>
                                <MenuItem value='Send Email'>Send Email</MenuItem>
                                <MenuItem value='Mailbox'>Mailbox</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>
                    {type === 'Related Object' ? (
                        <Grid item xs={12}>
                        <FormControl sx={{ width: '38%' }}>
                            <InputLabel id="multiple-checkbox-mapping">Select Object</InputLabel>
                            <Select
                                labelId='multiple-checkbox-mapping'
                                label="Select Object"
                                id='input'
                                value={objectMapping}
                                onChange={handleObjectMapping}
                                multiple
                                // error={!validFieldType && indexField === index}
                                input={<OutlinedInput id="select-multiple-checkbox" label="Select Object" />}
                                renderValue={(selected) => selected.map(u => u.obj_name).join(', ')}
                                style={{ height: 50 }}
                            >
                                {listObjectRefs.map((column, index) => (
                                    <MenuItem
                                        key={index}
                                        value={column}
                                    >
                                        <Checkbox checked={objectMapping.indexOf(column) > -1} />
                                        <ListItemText primary={column.obj_name} />
                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Grid>
                    ) : ( 
                        null
                    )}
                    <Grid item xs={10.45} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button startIcon={<DoneIcon />} type='submit' variant="contained"  >
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleCloseDialogCustom} startIcon={<CloseIcon />} variant="outlined"  >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </OutlookDialog>
    )
}

export default CustomViewForm