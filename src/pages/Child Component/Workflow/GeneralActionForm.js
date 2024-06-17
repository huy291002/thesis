import { FormControl, Grid, InputLabel, MenuItem, Select, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OutlookDialog from '../../../components/OutlookDialog/OutlookDialog'
import ActionEmail from './ActionEmail'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from 'react-redux'
import setDate from 'date-fns/fp/setDate/index';
import ActionScanning from './ActionScanning';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendIcon from '@mui/icons-material/Send';
import CallIcon from '@mui/icons-material/Call';
import AddBoxIcon from '@mui/icons-material/AddBox';
import UpdateIcon from '@mui/icons-material/Update';
import ActionRecord from './ActionRecord';
import SentimentAnalysis from './SentimentAnalysis';

function GeneralActionForm({dataOneAction, setDataOneAction, openDialogAction, setOpenDialogAction, listObject, senderChosen, setSenderChosen,
    templateChosen, setTemplateChosen, dataAction, setDataAction, viewAction,
    infoAction, setViewAction, indexAction, fieldRecord, setFieldRecord, addFieldRecord, setAddFieldRecord, data, fieldFeature, setFieldFeature, workflowid }) {

    

    const [listFields, setListFields] = useState([])

    const [dateValue, setDateValue] = useState(null)

    const [dateValueRecord, setDateValueRecord] = useState(null)

    const [objectRecord, setObjectRecord] = useState()

    const [updateRecordAction, setUpdateRecordAction] = useState(false)

    const [validFieldReord, setValidFieldRecord] = useState(true)

    const listObjectsFields = useSelector(state => state.listObjectsFields)

    const listAllTemplate = useSelector(state => state.listAllTemplate)

    const listModelPrototype = useSelector(state => state.listModelPrototype)

    const handleDateValue = (name, date) => {
        setDateValue(date)
        setDataOneAction({
            ...dataOneAction,
            [name]: date
        })
    }

    useEffect(() => {
        if (viewAction && !workflowid) {

            if (!infoAction.fieldRecord) {

                setDataOneAction(infoAction)
                setDateValue(infoAction.time)
            }
            else {

                setDataOneAction(infoAction)
                setFieldRecord(infoAction.fieldRecord)
                setAddFieldRecord(true)
                for (let i = 0; i < infoAction.fieldRecord.length; i++) {
                    if (infoAction.fieldRecord[i].field.field_type === 'date') {
                        setDateValueRecord(infoAction.fieldRecord[i].value_date)
                        break;
                    }
                }
            }
        }
        else if (viewAction && workflowid) {
            let copyObject = JSON.parse(JSON.stringify(listObjectsFields))
            let getObject = copyObject.filter((object) => object._id === infoAction.object_id)[0]
            if (infoAction.type === 'send') {
                let objectRefFields = []
                let copyList = JSON.parse(JSON.stringify(listObjectsFields))
                for (let i = 0; i < getObject.fields.length; i++) {
                    if (getObject.fields[i].field_type === 'ref_obj' || getObject.fields[i].field_type === 'ref_field_obj') {
                        let result = copyList.filter((object) => object._id === getObject.fields[i].ref_obj_id_value)[0]

                        if (objectRefFields.indexOf(result) <= -1) {
                            result["field_id"] = getObject.fields[i].field_id
                            objectRefFields.push(result)

                        }

                    }
                }
                objectRefFields.splice(0, 0, getObject)
                setListFields(objectRefFields)
                let copyTemplate = JSON.parse(JSON.stringify(listAllTemplate))
                let getTemplate = copyTemplate.filter((template) => template._id === infoAction.template_id)[0]
                let getField = {}
                if (infoAction.to[0].split('.').length === 3) {

                    getField = getObject.fields.filter((field) => field.field_id === infoAction.to[0].split('.')[0])[0]
                    // setDataOneAction({
                    //     ...dataOneAction,
                    //     field: [getObject, getField]
                    // })
                }
                else {
                    getField = getObject.fields.filter((field) => field.field_id === infoAction.to[0])[0]
                    // setDataOneAction({
                    //     ...dataOneAction,
                    //     field: [getObject, getField]
                    // })
                }
                setDataOneAction({
                    ...dataOneAction,
                    name: infoAction.name,
                    description: infoAction.description,
                    sender: {
                        _id: '3',
                        username: infoAction.from.split('@')[0],
                        protocol: 'SMTP'
                    },
                    field: [getObject, getField],
                    template: getTemplate,
                    object: getObject,
                    status: infoAction.status === 'active' ? true: false,
                    typeaction: infoAction.type === 'send' && 'email Sending' || infoAction.type === 'create' && 'record' || infoAction.type === 'update' && 'update' || infoAction.type === 'sentiment' && 'sentiment'

                })
            }
            else if (infoAction.type === 'create') {
                setAddFieldRecord(true)
                let getFieldRecord = []

                if (infoAction.field_configs) {
                    if (infoAction.field_configs.length > 0) {
 
                        for (let i = 0; i < infoAction.field_configs.length; i++) {
                            for (let j = 0; j < getObject.fields.length; j++) {

                                if (infoAction.field_configs[i][getObject.fields[j].field_id] !== undefined) {
                                 
                                    getFieldRecord.push({ id: `${i + 1}`, field: getObject.fields[j], value: infoAction.field_configs[i][getObject.fields[j].field_id] })
                                    break;
                                }
                            }
                        }
                    }
                }
                if (infoAction.field_contents) {
                    if (infoAction.field_contents.length > 0) {
                        for (let i = 0; i < infoAction.field_contents.length; i++) {
                            for (let j = 0; j < getObject.fields.length; j++) {
                                if (infoAction.field_contents[i] === getObject.fields[j].field_id) {
                                    getFieldRecord.push({ id: `${i + 1}`, field: getObject.fields[j], value: '@email_reply_content' })
                                    break;
                                }
                            }
                        }
                    }
                }

                setFieldRecord(getFieldRecord)
                setDataOneAction({
                    ...dataOneAction,
                    name: infoAction.name,
                    description: infoAction.description,
                    object: getObject,
                    status: infoAction.status === 'active' ? true: false,
                    typeaction: infoAction.type === 'send' && 'email Sending' || infoAction.type === 'create' && 'record' || infoAction.type === 'update' && 'update' || infoAction.type === 'sentiment' && 'sentiment'

                })
            }
            else if (infoAction.type === 'update') {
                setAddFieldRecord(true)
                let getFieldRecord = []
   
                if (infoAction.field_configs) {
                    if (infoAction.field_configs.length > 0) {
                    
                        for (let i = 0; i < infoAction.field_configs.length; i++) {
                            for (let j = 0; j < getObject.fields.length; j++) {
                    
                                if (infoAction.field_configs[i][getObject.fields[j].field_id] !== undefined) {
                                   
                                    getFieldRecord.push({ id: `${i + 1}`, field: getObject.fields[j], value: infoAction.field_configs[i][getObject.fields[j].field_id] })
                                    break;
                                }
                            }
                        }
                    }
                }
                if (infoAction.field_contents) {
                    if (infoAction.field_contents.length > 0) {
                        for (let i = 0; i < infoAction.field_contents.length; i++) {
                            for (let j = 0; j < getObject.fields.length; j++) {
                                if (infoAction.field_contents[i] === getObject.fields[j].field_id) {
                                    getFieldRecord.push({ id: `${i + 1}`, field: getObject.fields[j], value: '@email_reply_content' })
                                    break;
                                }
                            }
                        }
                    }
                }
           
                setFieldRecord(getFieldRecord)
                setDataOneAction({
                    ...dataOneAction,
                    name: infoAction.name,
                    description: infoAction.description,
                    object: getObject,
                    status: infoAction.status === 'active' ? true: false,
                    typeaction: infoAction.type === 'send' && 'email Sending' || infoAction.type === 'create' && 'record' || infoAction.type === 'update' && 'update' || infoAction.type === 'sentiment' && 'sentiment'
                    
                })

            }
            else if (infoAction.type === 'sentiment'){
                let getField = getObject.fields.filter((field) => field.field_id === infoAction.field_score)[0]
                let getModel = listModelPrototype.filter((model) => model.model_id === infoAction.model_id_str)[0]
                let getFieldUpdate = getObject.fields.filter((field) => field.field_id === infoAction.field_update_score)[0]
                setDataOneAction({
                    ...dataOneAction,
                    name: infoAction.name,
                    description: infoAction.description,
                    object: getObject,
                    field: getField,
                    model: getModel,
                    update: getFieldUpdate,
                    status: infoAction.status === 'active' ? true: false,
                    typeaction: infoAction.type === 'send' && 'email Sending' || infoAction.type === 'create' && 'record' || infoAction.type === 'update' && 'update' || infoAction.type === 'sentiment' && 'sentiment'
                })
            }

        }
    }, [viewAction])

    const listTemplate = useSelector(state => state.listTemplate)

    const dispatch = useDispatch()

    const handleCloseDialogAction = () => {
        setOpenDialogAction(false)
        setViewAction(false)
        setDateValue(null)
        setDataOneAction({
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
            update: '',
            time: null
        })
        setFieldFeature([])
        setFieldRecord([])
        setAddFieldRecord(false)
        setDateValueRecord(null)
        setUpdateRecordAction(false)
        setValidFieldRecord(true)
    }

    const handleDataChange = (e) => {
        const value = e.target.value;
        setDataOneAction({
            ...dataOneAction,
            [e.target.name]: value
        })
        if (e.target.name === "object") {
            if (dataOneAction.typeaction === 'email Scanning' || dataOneAction.typeaction === 'email Sending') {
                dispatch({ type: 'saga/getListTemplateByObject', payload: value._id })
            }
            if (dataOneAction.typeaction === 'email Sending') {
                let objectRefFields = []
                let copyList = JSON.parse(JSON.stringify(listObjectsFields))
                for (let i = 0; i < value.fields.length; i++) {
                    if (value.fields[i].field_type === 'ref_obj' || value.fields[i].field_type === 'ref_field_obj') {
                        let result = copyList.filter((object) => object._id === value.fields[i].ref_obj_id_value)[0]
                       
                        if (objectRefFields.indexOf(result) <= -1) {
                            result["field_id"] = value.fields[i].field_id
                            objectRefFields.push(result)

                        }

                    }
                }
                objectRefFields.splice(0, 0, value)
                setListFields(objectRefFields)
            }

        }
  
        if (e.target.name === 'field') {
            if (value[0].field_id) {
                setDataOneAction({
                    ...dataOneAction,
                    field: `${value[0].field_id}.${value[0].obj_id}.${value[1].field_id}`
                })
            }
            else {
                setDataOneAction({
                    ...dataOneAction,
                    field: `${value[1].field_id}`
                })
            }
        }

        if (e.target.name === "typeaction" && (e.target.value === 'update' || e.target.value === 'sentiment')) {

            setUpdateRecordAction(true)
            setDataOneAction({
                ...dataOneAction,
                object: data.object,
                [e.target.name]: value
            })
  
            
        }


    }

    const handleCreateOneAction = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!viewAction) {
            dataOneAction['id'] = String(dataAction.length)
            dataOneAction['status'] = true
            if (dataOneAction.typeaction === 'record' || dataOneAction.typeaction === 'update') {
                if (fieldRecord.length > 0) {
                    dataOneAction['fieldRecord'] = fieldRecord
                    setDataAction(dataAction.concat([dataOneAction]))
                    setOpenDialogAction(false)
                    setDataOneAction({
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
                        update: '',
                        time: null
                    })
                    // setOpenDialogAction(false)
                    setFieldRecord([])
                    setFieldFeature([])
                    setAddFieldRecord(false)
                    setDateValueRecord(null)
                    setUpdateRecordAction(false)
                    setValidFieldRecord(true)
                } else {
            
                    setValidFieldRecord(false)
                    setOpenDialogAction(true)
                }

            }
            else {
              
                setDataAction(dataAction.concat([dataOneAction]))
                setOpenDialogAction(false)
                setDataOneAction({
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
                    update: '',
                    time: null
                })
                // setOpenDialogAction(false)
                setFieldRecord([])
                setFieldFeature([])
                setAddFieldRecord(false)
                setDateValueRecord(null)
                setUpdateRecordAction(false)
            }

        

        }
        else {
            let newDataAction = [...dataAction]
            newDataAction[indexAction] = dataOneAction
            // if (fieldRecord.length > 0) {
            //     newDataAction[indexAction]["fieldRecord"] = fieldRecord
            //     setDataAction(newDataAction)

            // }
            // else {
            //     setDataAction(newDataAction)
            // }
            if (dataOneAction.typeaction === 'record' || dataOneAction.typeaction === 'update') {
                if (fieldRecord.length > 0) {
                    newDataAction[indexAction]["fieldRecord"] = fieldRecord
                    setDataAction(newDataAction)
                    setValidFieldRecord(true)
                    setOpenDialogAction(false)
                } else {
                    setValidFieldRecord(false)
                    setOpenDialogAction(true)
                }

            } else {
                setDataAction(newDataAction)
                setOpenDialogAction(false)
            }

            setDataOneAction({
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
                update: '',
                time: null
            })
            setFieldFeature([])
            setFieldRecord([])
            setAddFieldRecord(false)
            setDateValueRecord(null)
            setUpdateRecordAction(false)
            // setOpenDialogAction(false)
        }
        setViewAction(false)
        setDateValue(null)

    }



    return (
        <OutlookDialog
            openDialog={openDialogAction}
            handleCloseDialog={handleCloseDialogAction}
            title='Create Action'
            minHeight='35%'
            minWidth='55%'
            width='50%'
        >
            <form onSubmit={handleCreateOneAction}>
                <Grid container spacing={1}>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginLeft: 5 }}>
                        <FormControl sx={{ width: '30%', height: 40 }} size="small">
                            <InputLabel id="input-action">Select Action</InputLabel>
                            <Select
                                labelId='input-action'
                                label="Select Action"
                                name="typeaction"
                                id='input-action'
                                value={dataOneAction.typeaction}
                                onChange={handleDataChange}
                                // error={!validFieldType && indexField === index}
                                required
                                style={{ height: '40px' }}
                            >
                                <MenuItem value='email Sending'>
                                    <SendIcon fontSize='small' sx={{ marginRight: 1, alignItems: 'center' }} /> Email Sending
                                </MenuItem>
                                {/* <MenuItem value='email Scanning'>
                                    <ContentPasteSearchIcon fontSize='small' sx={{ marginRight: 1 }} />Email Scanning
                                </MenuItem> */}
                                <MenuItem value='record'>
                                    <AddBoxIcon fontSize='small' sx={{ marginRight: 1 }} /> Create Record
                                </MenuItem>
                                <MenuItem value='update'>
                                    <UpdateIcon fontSize='small' sx={{ marginRight: 1 }} /> Update Record
                                </MenuItem>
                                <MenuItem value='sentiment'>
                                    <InsertEmoticonIcon fontSize='small' sx={{ marginRight: 1 }} /> Sentiment Analysis
                                </MenuItem>
                                <MenuItem value='call'>
                                    <CallIcon fontSize='small' sx={{ marginRight: 1 }} />Call
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {dataOneAction.typeaction !== '' ? (
                        <>
                            {dataOneAction.typeaction === 'email Sending' && (
                                <ActionEmail
                                    // data={data}
                                    listObject={listObject}
                                    senderChosen={senderChosen}
                                    setSenderChosen={setSenderChosen}
                                    templateChosen={templateChosen}
                                    setTemplateChosen={setTemplateChosen}
                                    handleDataChange={handleDataChange}
                                    dataOneAction={dataOneAction}
                                    listTemplate={listTemplate}
                                    listFields={listFields}
                                // viewAction={viewAction}
                                // infoAction={infoAction}
                                />
                            )}
                            {/* {dataOneAction.typeaction === 'email Scanning' && (
                                <ActionScanning
                                    // data={data}
                                    listObject={listObject}
                                    handleDataChange={handleDataChange}
                                    dataOneAction={dataOneAction}
                                    listTemplate={listTemplate}
                                    setDataOneAction={setDataOneAction}
                                    dateValue={dateValue}
                                    setDateValue={setDateValue}
                                    handleDateValue={handleDateValue}
                                // viewAction={viewAction}
                                // infoAction={infoAction}
                                />
                            )} */}
                            {dataOneAction.typeaction === 'sentiment' && (
                                <SentimentAnalysis
                                    listObject={listObject}
                                    dataOneAction={dataOneAction}
                                    fieldFeature={fieldFeature}
                                    setFieldFeature={setFieldFeature}
                                    handleDataChange={handleDataChange}
                                    updateRecordAction={updateRecordAction}
                                />
                            )}
                            {dataOneAction.typeaction === 'record' || dataOneAction.typeaction === 'update' ? (
                                <ActionRecord
                                    dataAction={dataAction}
                                    dataOneAction={dataOneAction}
                                    setDataOneAction={setDataOneAction}
                                    handleDataChange={handleDataChange}
                                    addFieldRecord={addFieldRecord}
                                    setAddFieldRecord={setAddFieldRecord}
                                    fieldRecord={fieldRecord}
                                    setFieldRecord={setFieldRecord}
                                    objectRecord={objectRecord}
                                    dateValueRecord={dateValueRecord}
                                    setDateValueRecord={setDateValueRecord}
                                    listObject={listObject}
                                    viewAction={viewAction}
                                    updateRecordAction={updateRecordAction}
                                    validFieldRecord={validFieldReord}
                                    data={data}
                                />
                            ) : null}

                        </>
                    ) : null}

                    <Grid item xs={10.25} sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 0, marginTop: dataOneAction.typeaction === '' ? 10 : 0 }}>
                        <Button startIcon={<DoneIcon />} type="submit" variant="contained" >
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 0, marginTop: dataOneAction.typeaction === '' ? 10 : 0 }}>
                        <Button onClick={handleCloseDialogAction} startIcon={<CloseIcon />} variant="outlined"  >
                            Cancel
                        </Button>
                    </Grid>

                </Grid>

            </form>
        </OutlookDialog>
    )
}

export default GeneralActionForm