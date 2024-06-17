import { Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography, Button, Box, Switch, IconButton, Popover, Chip, Card, CardHeader, CardContent, CardActions } from '@mui/material'
import React, { useState, useEffect } from 'react'
import WorkflowForm from './Child Component/Workflow/WorkflowForm'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import ActionEmail from './Child Component/Workflow/ActionEmail'
import GeneralActionForm from './Child Component/Workflow/GeneralActionForm'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { DragDropContext } from 'react-beautiful-dnd'
import Iconify from '../components/iconify/Iconify'
import Drag from '../components/Drag/Drag'
import Drop from '../components/Drop/Drop'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import SendIcon from '@mui/icons-material/Send';
import AddBoxIcon from '@mui/icons-material/AddBox';
import UpdateIcon from '@mui/icons-material/Update';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { LoadingButton } from '@mui/lab';
const styletitle = {
    fontWeight: 'bold'
}

function WorkflowAddPage() {

    const [data, setData] = useState({
        name: '',
        description: '',
        object: '',
        objectEmail: '',
        field: '',
        trigger: '',
        previous: '',
        typeaction: '',
        status: true

    })

    const [dataOneAction, setDataOneAction] = useState({
        id: '',
        typeaction: '',
        name: '',
        description: '',
        object: '',
        template: '',
        sender: '',
        frequency: '',
        weekday: '',
        option: '',
        model: '',
        field: '',
        update: '',
        status: true,
        time: null
    })

    const [openDialogAction, setOpenDialogAction] = useState(false)

    const [senderChosen, setSenderChosen] = useState('')

    const [templateChosen, setTemplateChosen] = useState('')

    const [addFieldMapping, setAddFieldMapping] = useState(false)

    const [dataFieldMapping, setDataFieldMapping] = useState([])

    const [dataAction, setDataAction] = useState([])

    const [fieldFeature, setFieldFeature] = useState([])

    const [viewAction, setViewAction] = useState(false)

    const [indexAction, setIndexAction] = useState('')

    const [infoAction, setInfoAction] = useState('')

    const [openAction, setOpenAction] = useState('')

    const [fieldRecord, setFieldRecord] = useState([])

    const [addFieldRecord, setAddFieldRecord] = useState(false)

    // const [loading, setLoading] = useState(false)

    const loading = useSelector(state => state.loading)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const createWorkflow = useSelector(state => state.createWorkflow)

    const listObject = useSelector(state => state.listObject)

    const listObjectsFields = useSelector(state => state.listObjectsFields)

    const listWorkflow = useSelector(state => state.listWorkflow)

    const { workflowid } = useParams()

    const [object, setObject] = useState('')

    useEffect(() => {
        dispatch({type: 'saga/getListModelPrototype'})
    }, [])

    useEffect(() => {
        if (workflowid) {
            let copyWorkflow = JSON.parse(JSON.stringify(listWorkflow))
            let copyObject = JSON.parse(JSON.stringify(listObjectsFields))
            let getWorkflow = copyWorkflow.filter((workflow) => workflow._id === workflowid)[0]


            let getObject = copyObject.filter((object) => object._id === getWorkflow.object_id)[0]

            let fields = []
            for (let i = 0; i < getWorkflow.conditions.length; i++) {
                for (let j = 0; j < getObject.fields.length; j++) {
                    if (getWorkflow.conditions[i].field_name === getObject.fields[j].field_id) {
                        fields.push({ id: i + 1, field: getObject.fields[j], field_op: getWorkflow.conditions[i].field_op, field_value: getWorkflow.conditions[i].field_value, op: getWorkflow.conditions[i].op ? getWorkflow.conditions[i].op : '' })
                        break
                    }
                }
            }
            let listAction = getWorkflow.actions.map((action) => action = {
                ...action,
                id: action._id,
                name: action.name,
                description: action.description,
                typeaction: action.type === 'send' && 'email Sending' || action.type === 'create' && 'record' || action.type === 'update' && 'update'

            })
            setDataAction(listAction)
            setDataFieldMapping(fields)
            // let getToSetState = getWorkflow.map((workflow) => workflow = {
            //     name: workflow.name,
            //     description: workflow.description,
            //     object: getObject,
            //     trigger: workflow.trigger === 'create' && 'Create Record' || workflow.trigger === 'update' && 'Update Record' || workflow.trigger === 'manual' && 'Trigger manually' || workflow.trigger === 'scan' && 'Use Scanned Email'
            // })
            setObject(getObject)
            setData({
                name: getWorkflow.name,
                description: getWorkflow.description,
                object: getObject,
                trigger: getWorkflow.trigger === 'create' && 'Create Record' || getWorkflow.trigger === 'update' && 'Update Record' || getWorkflow.trigger === 'manual' && 'Trigger manually' || getWorkflow.trigger === 'scan' && 'Use Scanned Email'
            })
            // setData({
            //     name: getWorkflow.name,
            //     description: getWorkflow.description,
            //     trigger: getWorkflow.trigger === 'create'
            // })
            setAddFieldMapping(true)
            setDataFieldMapping(fields)


        }
    }, [workflowid])

    useEffect(() => {

        if (createWorkflow.status === 'createWorkflowSuccess') {
            toast.success('Workflow is created', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch({ type: 'loading/setLoading', payload: false })
            dispatch({ type: 'createWorkflow/setCreateWorkflow', payload: { status: "idle" } })
            //navigate('/settings/workflow')
        }
        else if (createWorkflow.status === 'createWorkflowError') {
            toast.error(`${createWorkflow.message}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch({ type: 'loading/setLoading', payload: false })
            dispatch({ type: 'createWorkflow/setCreateWorkflow', payload: { status: "idle", message: '' } })
        }
    }, [createWorkflow])

    const handleDataChange = (e) => {
        const value = e.target.value
        setData({
            ...data,
            [e.target.name]: value
        })

    }

    const handleOpenDialogAction = () => {
        setOpenDialogAction(true)
        setViewAction(false)
    }

    const handleOnDragEndAction = (result) => {
        if (!result.destination) return;
        const items = Array.from(dataAction);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setDataAction(items)
    }

    const handleOpenMenuAction = (e, action, index) => {

        setOpenAction(e.currentTarget)
        setInfoAction(action)
        setIndexAction(index)
    }

    const handleCloseMenuAction = () => {
        setOpenAction(null)
    }

    const handleViewAction = () => {
        setOpenDialogAction(true)
        setViewAction(true)
        setOpenAction(null)
        // setDataAction(dataAction)
    }

    const handleDelete = () => {
        const newDataAction = [...dataAction]
        newDataAction.splice(indexAction, 1)
        let newDataActionID = newDataAction.map((item) => item = {
            ...item,
            id: parseInt(item.id) > indexAction ? `${String(parseInt(item.id) - 1)}` : `${item.id}`
        })
        setDataAction(newDataActionID)
        setViewAction(false)
        setOpenAction(null)

    }

    const handleDataOneAction = (e) => {
        setDataOneAction({
            ...dataOneAction,
            [e.target.name]: e.target.checked
        })
    }

    const handleSubmitWorkflow = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let actions = formatAction()
        let conditions = formatFieldMapping()
        let submitWorkflow = {}
        switch (data.trigger) {
            case "Create Record":
                submitWorkflow["trigger"] = "create"
                break
            case "Update Record":
                submitWorkflow["trigger"] = "update"
                break
            case "Trigger manually":
                submitWorkflow["trigger"] = "manual"
                break
            case "Use Scanned Email":
                submitWorkflow["trigger"] = "scan"
                break
            default:
                break
        }
        submitWorkflow["name"] = data.name
        submitWorkflow["object_id"] = data.object._id
        submitWorkflow["description"] = data.description
        submitWorkflow["conditions"] = conditions
        submitWorkflow["actions"] = actions
        submitWorkflow["status"] = 'active'
        dispatch({ type: 'loading/setLoading', payload: true })
        dispatch({ type: 'saga/createWorkflowwithActions', payload: submitWorkflow })
    }

    const formatFieldMapping = () => {
        let fieldsMapping = JSON.parse(JSON.stringify(dataFieldMapping))
        if (fieldsMapping.size === 0) return
        for (let i = 0; i < fieldsMapping.length; i++) {
            fieldsMapping[i]['field_name'] = fieldsMapping[i].field.field_id
            if (fieldsMapping[i]['op'] === '') {
                delete fieldsMapping[i]['op']
            }
            delete fieldsMapping[i]['id']
            delete fieldsMapping[i]['field']
        }
        return fieldsMapping
    }

    const formatAction = () => {
        let actions = JSON.parse(JSON.stringify(dataAction))
        if (actions.size === 0) return
        for (let i = 0; i < actions.length; i++) {
            //actions[i]['type'] = actions[i].typeaction

            if (actions[i]['status'] === false){
                actions[i]['status'] = 'inactive'
            }
            else {
                actions[i]['status'] = 'active'
            }
            switch (actions[i].typeaction) {
                case 'email Sending':

                    actions[i]['type'] = 'send'
                    actions[i]['object_id'] = actions[i].object._id
                    actions[i]['from_'] = actions[i].sender.username.concat('@gmail.com')
                    actions[i]['to'] = [actions[i].field]
                    actions[i]['template_id'] = actions[i].template._id
                    delete actions[i]['field']
                    delete actions[i]['frequency']
                    delete actions[i]['id']
                    delete actions[i]['time']
                    delete actions[i]['typeaction']
                    delete actions[i]['weekday']
                    delete actions[i]['object']
                    delete actions[i]['option']
                    delete actions[i]['template']
                    delete actions[i]['sender']
                    break
                case 'record':
                    actions[i]['type'] = 'create'
                    // actions[i]['option'] = data.trigger === 'Use Scanned Email' ? 'yes' : 'no'
                    if (data.trigger === 'Use Scanned Email') {
                        actions[i]['option'] = 'yes'
                    }
                    else {
                        actions[i]['option'] = 'no'
                    }
                    actions[i]['object_id'] = actions[i].object._id
                    let content_create = []
                    let configs_create = []
                    for (let j = 0; j < actions[i].fieldRecord.length; j++) {
                        if (actions[i].fieldRecord[j].value === '@email_reply_content') {
                            content_create.push(actions[i].fieldRecord[j].field.field_id)
                        }
                        else {
                            configs_create.push({ [`${actions[i].fieldRecord[j].field.field_id}`]: actions[i].fieldRecord[j].value })
                        }
                    }
                    if (content_create.length > 0) {
                        actions[i]["field_contents"] = content_create
                    }
                    if (configs_create.length > 0) {
                        actions[i]["field_configs"] = configs_create
                    }
                    delete actions[i]['field']
                    delete actions[i]['frequency']
                    delete actions[i]['id']
                    delete actions[i]['time']
                    delete actions[i]['typeaction']
                    delete actions[i]['weekday']
                    delete actions[i]['object']
                    //delete actions[i]['option']
                    delete actions[i]['template']
                    delete actions[i]['sender']
                    delete actions[i]['fieldRecord']
                    break
                case 'update':
                    actions[i]['type'] = 'update'
                    actions[i]['option'] = data.previous === 'yes' ? 'yes' : 'no'
                    actions[i]['object_id'] = data.object._id
                    let content = []
                    let configs = []
                    for (let j = 0; j < actions[i].fieldRecord.length; j++) {
                        if (actions[i].fieldRecord[j].value === '@email_reply_content') {
                            content.push(actions[i].fieldRecord[j].field.field_id)
                        }
                        else {
                            configs.push({ [`${actions[i].fieldRecord[j].field.field_id}`]: actions[i].fieldRecord[j].value })
                        }
                    }
                    if (content.length > 0) {
                        actions[i]["field_contents"] = content
                    }
                    if (configs.length > 0) {
                        actions[i]["field_configs"] = configs
                    }
                    delete actions[i]['field']
                    delete actions[i]['frequency']
                    delete actions[i]['id']
                    delete actions[i]['time']
                    delete actions[i]['typeaction']
                    delete actions[i]['weekday']
                    delete actions[i]['object']
                    //delete actions[i]['option']
                    delete actions[i]['template']
                    delete actions[i]['sender']
                    delete actions[i]['fieldRecord']
                case 'sentiment':

                    actions[i]['type'] = 'sentiment'
                    actions[i]['object_id'] = actions[i].object._id
                    actions[i]['model_id_str'] = actions[i].model.model_id
                    actions[i]['field_score'] = actions[i].field.field_id
                    actions[i]['field_update_score'] = actions[i].update.field_id
                    delete actions[i]['field']
                    delete actions[i]['frequency']
                    delete actions[i]['id']
                    delete actions[i]['time']
                    delete actions[i]['typeaction']
                    delete actions[i]['weekday']
                    delete actions[i]['object']
                    delete actions[i]['template']
                    delete actions[i]['sender']
                    delete actions[i]['fieldRecord']
                    delete actions[i]['model']
                    delete actions[i]['update']
                    break
                default:
                    break
            }
        }
        return actions
    }


    return (
        <>
            <form onSubmit={handleSubmitWorkflow} style={{ height: '100%' }}>
                <Grid container spacing={1} sx={{ backgroundColor: 'white', paddingBottom: 1, height: '100%' }}>
                    <Grid item md={5.5}>
                        <Grid item container spacing={1}>
                            <Grid item xs={12}></Grid>
                        </Grid>

                        <WorkflowForm
                            data={data}
                            setData={setData}
                            addFieldMapping={addFieldMapping}
                            setAddFieldMapping={setAddFieldMapping}
                            dataFieldMapping={dataFieldMapping}
                            setDataFieldMapping={setDataFieldMapping}
                            listObject={listObject}
                            handleDataChange={handleDataChange}
                            workflowid={workflowid}
                            object={object}
                        />


                    </Grid>
                    <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Divider orientation="vertical" />
                    </Grid>
                    <Grid item md={5.5}>
                        <Grid item container spacing={1}>
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant='h4' sx={styletitle} color={"black"}>
                                    Action Config
                                </Typography>
                            </Grid>

                            {/* <Paper sx={{ boxShadow: 10, width: '100%', height: '100%' }}>
                    <form onSubmit={handleCreateWorkflow}> */}
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: 1 }}>
                                <Button variant='outlined' onClick={handleOpenDialogAction}>
                                    Add Action
                                </Button>
                                <GeneralActionForm
                                    // data={data}
                                    openDialogAction={openDialogAction}
                                    setOpenDialogAction={setOpenDialogAction}
                                    listObject={listObject}
                                    senderChosen={senderChosen}
                                    setSenderChosen={setSenderChosen}
                                    templateChosen={templateChosen}
                                    setTemplateChosen={setTemplateChosen}
                                    handleDataChange={handleDataChange}
                                    dataAction={dataAction}
                                    setDataAction={setDataAction}
                                    viewAction={viewAction}
                                    infoAction={infoAction}
                                    setViewAction={setViewAction}
                                    indexAction={indexAction}
                                    fieldRecord={fieldRecord}
                                    setAddFieldRecord={setAddFieldRecord}
                                    addFieldRecord={addFieldRecord}
                                    setFieldRecord={setFieldRecord}
                                    data={data}
                                    fieldFeature={fieldFeature}
                                    setFieldFeature={setFieldFeature}
                                    workflowid={workflowid}
                                    dataOneAction={dataOneAction}
                                    setDataOneAction={setDataOneAction}

                                />
                            </Grid>
                            {dataAction?.length > 0 ? (

                                <form>
                                    <DragDropContext onDragEnd={handleOnDragEndAction}>
                                        <Drop id="action">
                                            {dataAction.map((action, index) => (
                                                <>
                                                    <Drag key={action.id} id={action.id} index={index}>
                                                        <Grid key={index} item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginLeft: 15 }} >
                                                            {/* <Box sx={{ display: 'flex', border: '0.25px solid black', width: '450px', height: '100%', borderRadius: 1, flexWrap: 'wrap' }}>
                                                                <Grid item container spacing={0.75} sx={{ m: 0.5 }}>
                                                                    <Grid item xs={8} >
                                                                        <Typography variant='h6'>
                                                                            {action.name}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                        <Switch />
                                                                    </Grid>
                                                                    <Grid item xs={0.75} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                        <IconButton color="inherit" onClick={(e) => handleOpenMenuAction(e, action, index)}>
                                                                            <Iconify icon={'eva:more-horizontal-fill'} />
                                                                        </IconButton>
                                                                    </Grid>
                                                                    <Grid item xs={12} sx={{ display: 'flex', flexGrow: 1, flexWrap: 'wrap', wordBreak: 'break-all' }} >
                                                                        <Typography variant='body1' >
                                                                            {action.description}
                                                                        </Typography>
                                                                    </Grid>

                                                                    <Grid item xs={12} sx={{ marginBottom: 1, display: 'flex', justifyContent: 'flex-end', marginRight: 1 }} >
                                                                        {action.typeaction === 'email Sending' && (
                                                                            <Chip variant='outlined' icon={<SendIcon />} color='info' sx={{ borderRadius: 0.5 }} label={action.typeaction[0].toUpperCase() + action.typeaction.slice(1)} />

                                                                        )}
                                                                        {action.typeaction === 'record' && (
                                                                            <Chip variant='outlined' icon={<AddBoxIcon />} color="secondary" sx={{ borderRadius: 0.5 }} label={'Create Record'} />

                                                                        )}
                                                                        {action.typeaction === 'update' && (
                                                                            <Chip variant='outlined' icon={<UpdateIcon />} color="secondary" sx={{
                                                                                borderRadius: 0.5, borderColor: '#FF9800',
                                                                                color: '#FF9800',
                                                                                '& .MuiChip-icon': {
                                                                                    color: '#FF9800',
                                                                                }
                                                                            }} label={'Update Record'} />

                                                                        )}
                                                                        {action.typeaction === 'sentiment' && (
                                                                            <Chip variant='outlined' icon={<InsertEmoticonIcon />} color="secondary" sx={{
                                                                                borderRadius: 0.5, borderColor: '#00FF00',
                                                                                color: '#00FF00',
                                                                                '& .MuiChip-icon': {
                                                                                    color: '#00FF00',
                                                                                }
                                                                            }} label={'Sentiment Analysis'} />

                                                                        )}

                                                                    </Grid>
                                                                </Grid>
                                                            </Box> */}
                                                            <Card sx={{ width: '450px', boxShadow: 10 }}>
                                                                <CardHeader action={
                                                                    <>
                                                                        <Switch name='status' checked={action.status} onChange={handleDataOneAction} />
                                                                        <IconButton color="inherit" onClick={(e) => handleOpenMenuAction(e, action, index)}>
                                                                            <Iconify icon={'eva:more-horizontal-fill'} />
                                                                        </IconButton>
                                                                    </>
                                                                } title={action.name}
                                                                />
                                                                <CardContent>
                                                                    {action.description}
                                                                </CardContent>
                                                                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                    {action.typeaction === 'email Sending' && (
                                                                        <Chip variant='outlined' icon={<SendIcon />} sx={{
                                                                            borderRadius: 0.5, borderColor: '#1565c0',
                                                                            color: '#1565c0',
                                                                            '& .MuiChip-icon': {
                                                                                color: '#1565c0',
                                                                            }
                                                                        }} label={action.typeaction[0].toUpperCase() + action.typeaction.slice(1)} />

                                                                    )}
                                                                    {action.typeaction === 'record' && (
                                                                        <Chip variant='outlined' icon={<AddBoxIcon />} color="secondary" sx={{
                                                                            borderRadius: 0.5, borderColor: '#0288d1',
                                                                            color: '#0288d1',
                                                                            '& .MuiChip-icon': {
                                                                                color: '#0288d1',
                                                                            }
                                                                        }} label={'Create Record'} />

                                                                    )}
                                                                    {action.typeaction === 'update' && (
                                                                        <Chip variant='outlined' icon={<UpdateIcon />} color="secondary" sx={{
                                                                            borderRadius: 0.5, borderColor: '#FF9800',
                                                                            color: '#FF9800',
                                                                            '& .MuiChip-icon': {
                                                                                color: '#FF9800',
                                                                            }
                                                                        }} label={'Update Record'} />

                                                                    )}
                                                                    {action.typeaction === 'sentiment' && (
                                                                        <Chip variant='outlined' icon={<InsertEmoticonIcon />} color="secondary" sx={{
                                                                            borderRadius: 0.5, borderColor: '#4a148c',
                                                                            color: '#4a148c',
                                                                            '& .MuiChip-icon': {
                                                                                color: '#4a148c',
                                                                            }
                                                                        }} label={'Sentiment Analysis'} />

                                                                    )}
                                                                </CardActions>
                                                            </Card>

                                                        </Grid>
                                                        {index !== dataAction.length - 1 ? (
                                                            <Grid item container spacing={1}>
                                                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginLeft: 18 }}>
                                                                    <KeyboardDoubleArrowDownIcon />
                                                                </Grid>
                                                            </Grid>
                                                        ) : (
                                                            null
                                                        )}
                                                    </Drag>
                                                </>
                                            ))}
                                        </Drop>
                                    </DragDropContext>
                                </form>

                            ) : (
                                null
                            )}

                            <Popover
                                open={Boolean(openAction)}
                                anchorEl={openAction}
                                onClose={handleCloseMenuAction}
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
                                <MenuItem onClick={handleViewAction} >
                                    <Iconify icon={'eva:eye-fill'} sx={{ mr: 2 }} />
                                    View
                                </MenuItem>
                                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                                    Delete
                                </MenuItem>
                            </Popover>
                            <Grid item xs={9.85} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <LoadingButton loading={loading} type='submit' startIcon={<DoneIcon />} variant="contained"  >
                                    Save
                                </LoadingButton>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex' }}>
                                <Button startIcon={<CloseIcon />} variant="outlined" >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>


                        {/* </form>
                </Paper> */}
                    </Grid>

                </Grid >
            </form>
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
        </>
    )
}

export default WorkflowAddPage