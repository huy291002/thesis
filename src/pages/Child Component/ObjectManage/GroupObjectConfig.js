import { Grid, List, ListItem, ListItemText, ListItemButton, Paper, Button, TextField, InputLabel, Radio, Box, FormControl, RadioGroup, FormControlLabel, FormLabel, InputAdornment, IconButton, Autocomplete, createFilterOptions, FormHelperText, Typography, CircularProgress, Table, TableSortLabel, TableContainer, TableHead, TableBody, TableRow, TableCell, styled, withStyles, Chip } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import { LoadingButton } from '@mui/lab';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import AddIcon from '@mui/icons-material/Add';
import FormDetailView from '../../../components/FormDetailView/FormDetailView';
import Drop from '../../../components/Drop/Drop';
import Drag from '../../../components/Drag/Drag';
import Error from '../../../components/ErrorMessage/Error';
import SaveCancelButton from '../../../components/GroupButton/SaveCancelButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';
import DeleteDragIcon from '../../../components/DeleteDragIcon/DeleteDragIcon';
import { useSelector, useDispatch } from 'react-redux';
import DoneIcon from '@mui/icons-material/Done';
import { UserListHead } from '../../../sections/@dashboard/user';
import Iconify from '../../../components/iconify/Iconify';
import SkeletonGroup from '../../../components/Skeleton/SkeletonGroup';
const styleButton = {
    display: 'flex',
    justifyContent: 'flex-end'
}

const styleGridText = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column'
}

const TABLE_HEAD = [
    { id: 'Object name', label: 'Object', alignRight: 'false' },
    { id: '' }
]


const filter = createFilterOptions({
    matchFrom: 'any',
    stringify: (option) => option.full_name + option.email
});
function GroupObjectConfig({ setTab }) {
    const listGroup = useSelector(state => state.listGroup)
    const listObject = useSelector(state => state.listObject)

    const detail = useSelector(state => state.detailGroup);
    const listUser = useSelector(state => state.listUser);
    const groupobject = useSelector(state => state.groupobject)
    const openSidebar = useSelector(state => state.openSidebar)
    const dispatch = useDispatch()

    const [data, setData] = useState({
        group_name: '',
        manager: ''
    })
    const [addObjectName, setAddObjectName] = useState(false)
    const [objectName, setObjectName] = useState('')
    const [loading, setLoading] = useState(false)
    const [inputManager, setInputManager] = useState('')
    const [listGroupState, setListGroupState] = useState([]);
    const [detailState, setDetailState] = useState({})
    const [changeOrder, setChangeOrder] = useState(false)
    const [groupName, setGroupName] = useState('');
    const [manager, setManager] = useState(null)
    const [indexGroup, setIndexGroup] = useState('')
    const [viewDetail, setViewDetail] = useState(false);
    const [add, setAdd] = useState(false);
    const [validGroupName, setValidGroupName] = useState(true);
    const [save, setSave] = useState(false);
    const [IDGroup, setIDGroup] = useState('') // store id to update the object correspond to id
    const [cancel, setCancel] = useState(false);
    const [complete, setComplete] = useState(false);

    // const [infoGroup, setInfoGroup] = useState({
    //     groupName: "",
    //     manager: {
    //         name: '',
    //         email: ''
    //     }
    // })

    const [infoGroup, setInfoGroup] = useState({
        groupName: "",
        manager: {
            name: '',
            email: ''
        }
    })
    const [openDialog, setOpenDialog] = useState(false)

    ////TEST
    const [input, setInput] = useState({
        item: [],
        value: "",
        error: null
    })

    const handleChangeInput = (e) => {
        const value = e.target.value
        setInput({
            ...input,
            value: value
        })
    }

    const handleOnKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            let value = input.value.trim()
            if (value) {
                setInput({
                    item: [...input.item, input.value],
                    value: ""
                })
            }
        }
    }


    const SortbyID = (a, b) => {
        return a.sorting_id - b.sorting_id
    }



    useEffect(() => {
        if (add || viewDetail) {
            dispatch({ type: 'saga/getListUser', payload: { page: 1, rowsPerPage: 2 } })

        }
    }, [add, viewDetail])




    useEffect(() => {
        if (listObject !== null) {
            let deepCpyListGroup = JSON.parse(JSON.stringify(listObject))

            setListGroupState(deepCpyListGroup.sort(SortbyID))
        }

    }, [listObject])

    useEffect(() => {

    }, [listGroupState])

    useEffect(() => {
        if (detail !== null) {
            setDetailState(detail)
        }
    }, [detail])

    useEffect(() => {

        if (typeof (indexGroup) === 'number') {
            setData({
                group_name: detailState.name === listGroupState[indexGroup].name ? detailState.name : listGroupState[indexGroup].name,
                manager: detailState.manager._id === listGroupState[indexGroup].manager_id ? detailState.manager : listGroupState[indexGroup].manager
            })
        }
    }, [detailState])

    useEffect(() => {

        if (groupobject.status === 'createsuccess') {
            toast.success('Group Object has been created', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setIDGroup(groupobject.message)
            setComplete(true)
            dispatch({ type: 'groupobject/setGroupObject', payload: { status: "idle" } })
        }
        else if (groupobject.status === 'updatesuccess') {
            toast.success('Updated Successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch({ type: 'groupobject/setGroupObject', payload: { status: "idle" } })
        }
        else if (groupobject.status === 'deleteSuccess') {

            toast.success('Group Object is deleted', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setOpenDialog(false)
            dispatch({ type: 'groupobject/setGroupObject', payload: { status: "idle" } })
        }
        else if (groupobject.status === 'createObjectNameSuccess') {
            toast.success('Object name is created successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch({ type: 'groupobject/setGroupObject', payload: { status: "idle" } })
        }
        else if (groupobject.status === 'updateerror' || groupobject.status === 'createerror' ||
            groupobject.status === 'createObjectNameError' || groupobject.status === 'deleteError') {
            toast.error('Error', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch({ type: 'groupobject/setGroupObject', payload: { status: "idle" } })
        }

        setLoading(false)
        setAdd(false)
        // dispatch({ type: 'groupobject/setGroupObject', payload: { status: "idle" } })
    }, [groupobject])

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(listGroupState);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setListGroupState(items)
        setChangeOrder(true)
        // dispatch({ type: 'saga/updateOrderGroup', payload: items })
    }

    let valid = false

    //CONST HANDLE CHANGE FIELDS

    const handleChangeData = (e) => {
        const value = e.target.value;

        setData({
            ...data,
            [e.target.name]: value
        })
        if (typeof (indexGroup) === "number") {
            listGroupState.splice(indexGroup, 1, { ...listGroupState[indexGroup], name: value })
        }

    }

    const handleManager = (event, value) => {
        setData({
            ...data,
            manager: value
        })

        if (typeof (indexGroup) === "number") {
            listGroupState.splice(indexGroup, 1, { ...listGroupState[indexGroup], manager: value, manager_id: value._id })
        }
    }

    const handleValidField = () => {
        let valid = true
        let existsData = listObject.filter((element) => element.name === data.group_name)
        if (existsData.length > 0 && viewDetail === false && addObjectName === false) {
            valid = false;
            setValidGroupName(false)
        }
        return valid
    }

    // handle Call API list of manager when typing
    const handleManagerChange = (event, value) => {
        //setSelectedValue(value);
        // setCancel(false)
        setInputManager(value)
        if (value !== "") {
            dispatch({ type: 'saga/getListUserQuery', payload: value })
        }
        else if (value === "" && viewDetail === true) {
            dispatch({ type: 'saga/getListUser', payload: { page: 1, rowsPerPage: 2 } })
        }
        else {
            dispatch({ type: 'listUser/setListUser', payload: [] })
        }
    }

    // view detail current object 
    const handleViewDetail = (index, id) => {
        setAdd(false)
        setIndexGroup(index)

        setIDGroup(id)
        setAddObjectName(false)
        setViewDetail(true)
        //let viewGroup = listGroup.filter((group) => group._id === id)
        dispatch({ type: 'saga/getDetailGroup', payload: id })
        //setDetailState(viewGroup)
    }

    // add group object
    const handleAdd = (e) => {
        if (!add) {
            setAdd(true);
            setViewDetail(false)
            setComplete(false)
            setGroupName('')
            setManager(null)
            setData({
                group_name: '',
                manager: ''
            })
            setInputManager('')
            setIndexGroup('')
        }
        else {

            handleSubmit(e);
        }
        setViewDetail(false)

    }

    // handle save order
    const handleSaveOrder = (e) => {
        handleSubmit(e)
    }

    // handle add new group

    const handleSubmit = (e) => {
        e.preventDefault();

        if (handleValidField() || addObjectName) {
            if (changeOrder === true && addObjectName === false) {
                let finalGroupSubmit = listGroupState.map((group) => group = {
                    _id: group._id,
                    name: group.name,
                    manager_id: group.manager_id
                })

                dispatch({
                    type: 'saga/updateManyGroup', payload: finalGroupSubmit
                })
                setLoading(true)
                setChangeOrder(false)
                setValidGroupName(true)
                // setAdd(false)
                setComplete(false)
            }
            else if (changeOrder === false && viewDetail === true && addObjectName === false) {

                dispatch({
                    type: 'saga/updateOneGroup', payload: {
                        _id: IDGroup,
                        name: data.group_name,
                        manager_id: data.manager._id
                    }
                })
                setLoading(true)
            }
            else if (addObjectName === true && objectName !== '') {
                dispatch({
                    type: 'saga/createObjectName',
                    payload: {
                        obj_name: objectName,
                        group_obj_id: IDGroup
                    }

                })
 
                setLoading(true)
                setAddObjectName(false)
            }
            else {
                dispatch({
                    type: 'saga/createGroup', payload: {
                        name: data.group_name,
                        manager_id: data.manager._id
                    }
                })
                setLoading(true)
                setChangeOrder(false)
                setValidGroupName(true)
                // setAdd(false)

            }

            // setViewDetail(false)
        }

    }

    const handleSave = () => {
        setSave(true);
    }
    const handleCancel = () => {
        setData({
            group_name: '',
            manager: ''
        })
        setInputManager('')
        setGroupName('')
        setCancel(true);
        setManager(infoGroup.manager.name ? infoGroup.manager : null)
    }

    const handleDeleteGroupObject = (id) => {
        setIDGroup(id)
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleConfirm = () => {

        dispatch({ type: 'saga/deleteGroupObject', payload: IDGroup })
        //groupObject.splice(indexGroup, 1)
        // setUpdateOrder(groupObject)
    }

    const handleChangeTab = (id) => {
        setTab('2')
        dispatch({ type: 'objectID/setObjectID', payload: id })
    }

    const handleAddObject = (e) => {
        if (!addObjectName) {
            setAddObjectName(true)
        }
        else {
            if (objectName !== '') {
                handleSubmit(e)
            }

        }
    }

    const handleChangeObjectName = (e) => {
        setObjectName(e.target.value)
    }


    return (
        <>

            {listGroupState || viewDetail ? (
                <>
                    <Grid container spacing={1} >

                        <FormDetailView size={openSidebar ? 3.33 : 3}>
                            {listGroupState.length > 0 ? (

                                <>
                                    <List sx = {{marginBottom: -1.5}}>
                                        <Box>
                                            <Grid container spacing={1} sx={{
                                                display: 'flex', flexDirection: 'row', marginLeft: 1, ":hover": {
                                                    backgroundColor: "#f4f6f8",
                                                },
                                                backgroundColor: viewDetail && indexGroup === 0 ? "#f4f6f8" : 'white'
                                            }}>
                                                <Grid item xs={8}>
                                                    {/* <ListItemText primary={`${listGroupState[0].name}*`} sx={{
                                                        cursor: "pointer",
                                                        fontWeight: 'bold',
                                                        color: 'black'
                                                    }} onClick={() => handleViewDetail(0, listGroupState[0]._id)} ></ListItemText> */}
                                                    <Typography color="black" sx ={{cursor: "pointer"}}>{listGroupState[0].name}*</Typography>
                                                </Grid>
                                                {/* <Grid item xs={2.25} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                    <IconButton onClick={() => handleDeleteGroupObject(listGroupState[0]._id)} >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Grid> */}

                                            </Grid>
                                        </Box>
                                    </List>
                                    <DragDropContext onDragEnd={handleOnDragEnd}>
                                        <Drop id='characters'>
                                            {listGroupState.length > 1 ? (
                                                <>
                                                    {listGroupState.slice(1, listGroupState.length).map(({ _id, name }, index) => (
                                                        <Drag key={_id} id={_id} index={index} >
                                                            <DeleteDragIcon
                                                                handleView={() => handleViewDetail(index, _id)}
                                                                indexPosition={indexGroup}
                                                                index={index}
                                                                viewDetail={viewDetail}
                                                                // cancel={cancel}
                                                                // fieldName="group_name"
                                                                // infoGroup={infoGroup}
                                                                // groupName={groupName}
                                                                // validGroupName={validGroupName}
                                                                // handleGroupName={handleChangeData}
                                                                name={name}
                                                                handleDelete={() => handleDeleteGroupObject(_id)}
                                                            />
                                                        </Drag>
                                                    ))}
                                                </>
                                            ) : null}

                                        </Drop>
                                    </DragDropContext>
                                    {add === true && (
                                        <TextField
                                            placeholder='Group Object name'
                                            type='text'

                                            sx={{
                                                width: '80%',
                                            }}
                                            required
                                            name='group_name'
                                            value={data.group_name}
                                            error={!validGroupName}
                                            onChange={handleChangeData}
                                            InputProps={{
                                                sx: {
                                                    height: 40
                                                }
                                            }}
                                        />
                                    )}
                                    <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                        {changeOrder ? (
                                            <LoadingButton loading={loading} type="submit" variant='contained' onClick={handleSaveOrder} sx={{ ...styleButton, marginTop: 1, marginRight: 1 }} >
                                                <DoneIcon /> Save
                                            </LoadingButton>
                                        ) : (
                                            null
                                        )}

                                        <Button type="submit" onClick={handleAdd} variant='outlined' sx={{ ...styleButton, marginTop: 1 }} >
                                            <AddIcon /> Add
                                        </Button>
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    {listGroup && listGroup.length > 0 && (
                                        <SkeletonGroup />
                                    )}
                                    <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                        <Button type="submit" onClick={handleAdd} variant='outlined' sx={{ ...styleButton, marginTop: 1 }} >
                                            <AddIcon /> Add
                                        </Button>
                                    </Grid>
                                </>
                            )}


                        </FormDetailView>
                        {add === true || complete === true || (viewDetail === true && detailState[0]) ? (
                            <>
                                <FormDetailView size={9}>
                                    <form onSubmit={handleSubmit}>
                                        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                            <TextField
                                                placeholder='Group Object name'
                                                type='text'

                                                sx={{
                                                    width: '30%',
                                                }}
                                                required
                                                name='group_name'
                                                value={data.group_name}
                                                // value={groupName}
                                                // value={groupName  ? groupName : ''}
                                                error={!validGroupName}
                                                onChange={handleChangeData}
                                                InputProps={{
                                                    sx: {
                                                        height: 50
                                                    }
                                                }}
                                            />
                                            {!validGroupName && (
                                                <Error marginsize={1}>
                                                    Group name is existed
                                                </Error>
                                            )}
                                        </Grid>
                                        <Grid item md={12} sx={{ styleGridText }}>
                                            <Autocomplete
                                                id="filter-demo"
                                                clearOnBlur={false}
                                                value={data.manager || null}
                                                onChange={handleManager}
                                                inputValue={inputManager}
                                                onInputChange={handleManagerChange}
                                                options={listUser.data || []}
                                                getOptionLabel={(option) => option.full_name || []}

                                                // filterOptions={filter}
                                                style={{ width: 300 }}
                                                renderOption={(props, option) => (
                                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                                                        {option.full_name} - {option.email}
                                                    </Box>
                                                )}
                                                renderInput={(params) => (
                                                    <TextField
                                                        // error={!validManager}
                                                        required
                                                        name="manager"

                                                        {...params}
                                                        label="Choose Manager"
                                                        variant="outlined"

                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item md={6} sx={{ ...styleGridText, marginLeft: 1, marginTop: 1, marginBottom: 1 }}>
                                            {detailState[0]?.objects && add === false ? (
                                                <>
                                                    <TableContainer>
                                                        <Table >
                                                            <TableHead>
                                                                <TableRow>
                                                                    {TABLE_HEAD.map((headCell) => (
                                                                        <TableCell
                                                                            key={headCell.id}
                                                                        >
                                                                            <TableSortLabel
                                                                                hideSortIcon
                                                                                sx={{ fontWeight: 'bold', color: 'black', fontSize: '20px' }}
                                                                            >
                                                                                {headCell.label}
                                                                            </TableSortLabel>
                                                                        </TableCell>
                                                                    ))}
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {detailState[0].objects.map((row) => {
                                                                    const { _id, obj_name } = row
                                                                    return (
                                                                        <TableRow key={_id} style={{ height: '20px' }}>
                                                                            <TableCell align='left' sx={{ fontSize: '15px' }}>{obj_name}</TableCell>
                                                                            <TableCell align="right">
                                                                                <IconButton color="inherit" onClick={() => handleChangeTab(_id)}>
                                                                                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                                                                                </IconButton>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )
                                                                })}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>

                                                </>
                                            ) : (
                                                <></>
                                            )}

                                        </Grid>

                                        {addObjectName && (
                                            <Grid item md={12} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 1 }}>
                                                <TextField
                                                    required
                                                    value={objectName}
                                                    onChange={handleChangeObjectName}
                                                    InputProps={{
                                                        sx: {
                                                            height: 50
                                                        },
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton type='submit' edge="end">
                                                                    <DoneIcon color='success' />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                        )}
                                        {viewDetail || complete ? (
                                            <Grid item md={12} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                <Button type="submit" onClick={handleAddObject} startIcon={<AddIcon />} variant='outlined'>
                                                    Add Object name
                                                </Button>
                                            </Grid>
                                        ) : (
                                            null
                                        )}


                                        <SaveCancelButton loading={loading} handleCancel={handleCancel} handleSave={handleSave} />
                                    </form>
                                </FormDetailView>
                            </>
                        ) : (
                            null
                        )}
                        <ToastContainer
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
                        />
                    </Grid>
                    <ConfirmDialog
                        open={openDialog}
                        handleConfirm={handleConfirm}
                        handleClose={handleCloseDialog}
                        title="Group Object Deleted"
                        message="Are you sure to delete this Group Object ?"
                    />

                </>
            ) : (
                <>
                    <CircularProgress />
                </>
            )}
        </>
    )
}

export default GroupObjectConfig