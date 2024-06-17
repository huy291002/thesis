import { Button, Grid, Typography, Box, IconButton, Switch, Divider, Chip, FormControl, InputLabel, Select, ListSubheader, MenuItem, Card, CardHeader, CardContent, CardActions, Popover } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Iconify from '../components/iconify/Iconify'
import WorkflowForm from './Child Component/Workflow/WorkflowForm'
import { useNavigate } from 'react-router-dom'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import SendIcon from '@mui/icons-material/Send';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PaginationWorkflow from '../components/Pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
const workflow = [
    {
        title: 'New Ticket Information',
        description: 'If ticket has been created, notify Requester',
        object_name: 'Feedback'
    },
    {
        title: 'Feedback Request',
        description: 'If ticket status changes to Solved, send feedback request after 1 hour.',
        object_name: 'Feedback'
    },
    {
        title: 'Feedback Request',
        description: 'If ticket status changes to Solved, send feedback request after 1 hour',
        object_name: 'Feedback'
    },
    {
        title: 'Feedback Request',
        description: 'If ticket status changes to Solved, send feedback request after 1 hour',
        object_name: 'Feedback'
    },
    {
        title: 'Feedback Request',
        description: 'If ticket status changes to Solved, send feedback request after 1 hour',
        object_name: 'Product'
    },
    {
        title: 'Feedback Request',
        description: 'If ticket status changes to Solved, send feedback request after 1 hour',
        object_name: 'Contact'
    },
    {
        title: 'New Ticket Information',
        description: 'If ticket has been created, notify Requester',
        object_name: 'Feedback'
    },
    {
        title: 'Feedback Request',
        description: 'If ticket status changes to Solved, send feedback request after 1 hour. If ticket has been created, notify Requester',
        object_name: 'Feedback'
    },
    {
        title: 'Feedback Request',
        description: 'If ticket status changes to Solved, send feedback request after 1 hour',
        object_name: 'Feedback'
    },
    {
        title: 'Feedback Request',
        description: 'If ticket status changes to Solved, send feedback request after 1 hour',
        object_name: 'Feedback'
    },
    {
        title: 'Feedback Request',
        description: 'If ticket status changes to Solved, send feedback request after 1 hour',
        object_name: 'Product'
    },
    {
        title: 'Feedback Request',
        description: 'If ticket status changes to Solved, send feedback request after 1 hour',
        object_name: 'Contact'
    }
]

function WorkFlowPage() {

    const [open, setOpen] = useState()

    const [openDialogWorkflow, setOpenDialogWorkflow] = useState(false)

    const [workflowList, setWorkflowList] = useState([])

    const [idWorkflow, setIdWorkflow] = useState('')

    //const [openWorkflow, setOpenWorkflow] = useState('')

    const [filterObject, setFilterObject] = useState('')

    const [loading, setLoading] = useState(false)

    const listObject = useSelector(state => state.listObject)

    const listWorkflow = useSelector(state => state.listWorkflow)

    useEffect(() => {

    }, [listWorkflow])

    const handleFilterObject = (e) => {
        setFilterObject(e.target.value)
        dispatch({ type: 'saga/getListWorkflow', payload: e.target.value._id })
    }

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const createWorkflow = useSelector(state => state.createWorkflow)

    useEffect(() => {

        if (createWorkflow.status === 'createWorkflowSuccess') {
            toast.success('Workflow is created', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            // dispatch({type: 'loading/setLoading', payload: false})
            dispatch({ type: 'createWorkflow/setCreateWorkflow', payload: { status: "idle" } })
            navigate('/settings/workflow')
        }
    }, [createWorkflow])


    const handleOpenMenu = (e, flow) => {
        setOpen(e.currentTarget)
        setIdWorkflow(flow._id)
    }

    const handleNavigateAddWorkflow = () => {
        navigate('/settings/workflow/add')
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

    const handleCloseMenuWorkflow = () => {
        setOpen(null)
    }

    const handleDelete = () => {

    }

    const handleViewWorkflow = () => {
        navigate(`/settings/workflow/${idWorkflow}`)
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sx={{ display: 'flex', marginLeft: 10 }}>
                    <Typography variant='h6'>
                        Workflows
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ marginLeft: 10 }}>
                    <Divider />
                </Grid>
                <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'flex-start', marginLeft: 10 }}>
                    <FormControl sx={{ width: '50%' }} size='small'>
                        <InputLabel id="input-object">Select Object</InputLabel>
                        <Select
                            labelId='object'
                            label="Select Object"
                            name="object"
                            id='input-object'
                            value={filterObject}
                            onChange={handleFilterObject}
                            // error={!validFieldType && indexField === index}
                            required
                            style={{ height: 40 }}
                            renderValue={(select) => {
                                return select.obj_name
                            }}
                        >
                            {listObject?.map(p => renderSelectGroupObject(p))}
                        </Select>
                    </FormControl>

                </Grid>
                {filterObject !== '' && listWorkflow !== null ? (
                    <>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: 10 }}>
                            <Button onClick={handleNavigateAddWorkflow} variant='contained'>
                                Add Workflow
                            </Button>
                            {/* <WorkflowForm openDialogWorkflow={openDialogWorkflow} setOpenDialogWorkflow={setOpenDialogWorkflow} /> */}
                        </Grid>

                        {listWorkflow.map((flow, index) => (
                            <Grid key={index} item xs={5} sx={{ display: 'flex', justifyContent: 'center', marginLeft: 10, marginTop: 1 }}>
                                {/* <Box sx={{ border: '1px solid black', width: '100%', height: '200px', borderRadius: 1 }}>
                            <Grid item container spacing={0.75} sx={{ m: 0.5 }}>
                                <Grid item xs={8}>
                                    <Typography variant='h6'>
                                        {flow.title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Switch />
                                </Grid>
                                <Grid item xs={0.75} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <IconButton color="inherit" onClick={(e) => handleOpenMenu(e)}>
                                        <Iconify icon={'eva:more-horizontal-fill'} />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12} sx={{ flexGrow: 1 }}>
                                    <Typography variant='body1'>
                                        {flow.description}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: 2, marginTop: 6 }}>
                                    <Chip label={flow.object_name} variant='outlined' sx={{ borderRadius: 0.5 }} color='primary' />
                                </Grid>
                            </Grid>
                        </Box> */}
                                <Card sx={{ boxShadow: 5, width: '100%' }}>
                                    <CardHeader title={flow.name} action={
                                        <>
                                            <Switch checked={flow.status === 'active' ? true : false} />
                                            <IconButton color="inherit" onClick={(e) => handleOpenMenu(e, flow)}>
                                                <Iconify icon={'eva:more-horizontal-fill'} />
                                            </IconButton>
                                        </>
                                    } />
                                    <CardContent>
                                        {flow.description}
                                    </CardContent>
                                    <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip label={filterObject.obj_name} variant='outlined' sx={{ borderRadius: 0.5 }} color='primary' />
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                        {/* <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <PaginationWorkflow setWorkflow={(p) => setWorkflowList(p)} />
                        </Grid> */}
                    </>
                ) : null}

            </Grid>
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
            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenuWorkflow}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem onClick={handleViewWorkflow} >
                    <Iconify icon={'eva:eye-fill'} sx={{ mr: 2 }} />
                    View
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
        // </Grid>
    )
}

export default WorkFlowPage