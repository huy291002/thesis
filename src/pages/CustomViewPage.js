import { Box, Button, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, ListSubheader, MenuItem, Select, Typography, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress } from '@mui/material'
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CustomViewForm from './Child Component/CustomView/CustomViewForm';
import { useParams } from 'react-router-dom';
import QuillToolbar, { formats, modules } from './Child Component/InboundRule/TemplateForm/EditToolbar';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TableCustomView from './Child Component/CustomView/TableCustomView';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CardPending from '../components/CardPending/CardPending';

const initialLayout = [
    { i: 'item-1', x: 0, y: 0, w: 2, h: 2, static: false },
    { i: 'item-2', x: 4, y: 0, w: 2, h: 2, static: false },
    { i: 'item-3', x: 0, y: 4, w: 2, h: 2, static: false },
    { i: 'item-4', x: 4, y: 4, w: 2, h: 2, static: false },
];

const styletitle = {
    fontWeight: 'bold'
}

const listRef = [
    {
        id: '1',
        obj_name: 'Feedback'
    },
    {
        id: '2',
        obj_name: 'Service'
    },
    {
        id: '3',
        obj_name: 'Review'
    },
    {
        id: '4',
        obj_name: 'Information'
    }
]

const test = [
    {
        i: "item-1",
        object: { _id: '66053bd62433f7355400d687', obj_name: 'Contact', obj_id: 'obj_contact_485', group_obj_id: '6605396f768c135f0f0d0fa8', sorting_id: 1 },
        static: true,
        type: "main",
        h: 2.75,
        w: 2,
        x: 0,
        y: 0,
    },
    {
        i: "item-1",
        static: true,
        type: "action",
        h: 2.75,
        w: 2,
        x: 0,
        y: 0,
    },
    {
        i: "item-1",
        static: true,
        type: "sub",
        object: { _id: '66053bd62433f7355400d687', obj_name: 'Contact', obj_id: 'obj_contact_485', group_obj_id: '6605396f768c135f0f0d0fa8', sorting_id: 1 },
        h: 2.75,
        w: 2,
        x: 0,
        y: 0,
    },
]


const object = {
    _id: "66053bd62433f7355400d687",
    obj_name: "Contact",
    obj_id: "obj_contact_485",
    group_obj_id: "6605396f768c135f0f0d0fa8",
    sorting_id: 1,
    created_at: "2024-03-28 16:43:50",
    modified_at: "2024-03-28 16:43:50",
    created_by: "659d33ac7961655c570d44f2",
    modified_by: "659d33ac7961655c570d44f2",
    fields: [
        {
            _id: "66053bd62433f7355400d688",
            field_type: "id",
            field_name: "ID",
            field_id: "fd_id_630",
            object_id: "66053bd62433f7355400d687",
            sorting_id: 0,
            prefix: "CUS"
        },
        {
            _id: "66053bd62433f7355400d689",
            field_type: "text",
            field_name: "Name",
            field_id: "fd_name_758",
            object_id: "66053bd62433f7355400d687",
            sorting_id: 1,
            length: 100
        },
        {
            _id: "66053bd62433f7355400d68a",
            field_type: "email",
            field_name: "Email",
            field_id: "fd_email_383",
            object_id: "66053bd62433f7355400d687",
            sorting_id: 2
        },
        {
            _id: "66053bd62433f7355400d68b",
            field_type: "select",
            field_name: "Gender",
            field_id: "fd_gender_392",
            object_id: "66053bd62433f7355400d687",
            sorting_id: 3,
            options: [
                "Male",
                "Female"
            ]
        },
        {
            _id: "6606d9f0cf59f8c5d8a1ae5e",
            field_type: "textarea",
            field_name: "Description",
            field_id: "fd_description_550",
            object_id: "66053bd62433f7355400d687",
            sorting_id: 4
        },
        {
            _id: "662f7ea645da2abc155e10dd",
            field_type: "date",
            field_name: "Birthday",
            field_id: "fd_birthday_941",
            object_id: "66053bd62433f7355400d687",
            sorting_id: 4,
            format: "YYYY MM DD",
            separator: "-"
        }
    ]
}

const infoRecord1 =
    [
        {
            _id: "662f81511cd771cb1dea3392",
            object_id: "66053bd62433f7355400d687",
            fd_name_758: "Lê Hân",
            fd_email_383: "lhoflaaaa@gmail.com",
            fd_gender_392: "Female",
            fd_description_550: "Bí ẩn, người cho mượn nick",
            fd_birthday_941: "2002-10-11",
            fd_id_630: "CUS19",
            created_at: "2024-04-29 18:15:29",
            modified_at: "2024-05-04 16:08:35",
            created_by: "659d33ac7961655c570d44f2",
            modified_by: "659d33ac7961655c570d44f2"

        }
    ]

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

function CustomViewPage() {

    const [data, setData] = useState({
        object: '',
        field: '',
        template: ''
    })

    const [dataSendEmail, setDataSendEmail] = useState({})

    const [body, setBody] = useState('')

    const { objectid } = useParams()

    const { recordid } = useParams()

    const [openDialogCustom, setOpenDialogCustom] = useState(false)

    const [objectMapping, setObjectMapping] = useState([])

    const [objectRefField, setObjectRefField] = useState([])

    const customView = useSelector(state => state.customView)

    const listObject = useSelector(state => state.listObject)

    const listObjectsFields = useSelector(state => state.listObjectsFields)

    const listTemplate = useSelector(state => state.listTemplate)

    const listObjectRefs = useSelector(state => state.listObjectRefs)

    const layoutView = useSelector(state => state.layoutView)

    // const [layout, setLayout] = useState(initialLayout);

    const [layout, setLayout] = useState([]);

    const [loading, setLoading] = useState(false)

    const [signalLayout, setSignalLayout] = useState(true)

    const dispatch = useDispatch()

    const reactQuillRef = useRef(null)

    const quillRef = useRef(null)




    let count_items = 0


    useEffect(() => {

        if (layoutView !== null) {

            let copyLayout = JSON.parse(JSON.stringify(layoutView))
            let copyListObject = JSON.parse(JSON.stringify(listObjectsFields))
            for (let i = 0; i < copyLayout.length; i++) {
                if (copyLayout[i].type === 'main') {
                    let getInfoObject = copyListObject.filter((object) => object._id === copyLayout[i].object_id)[0]
                    copyLayout[i]["object"] = getInfoObject
                    copyLayout[i]['i'] = `item-${i + 1}`
                }
                else if (copyLayout[i].type === 'related') {
                    let getInfoObject = copyListObject.filter((object) => object._id === copyLayout[i].related_obj_id)[0]
                    copyLayout[i]["object"] = getInfoObject
                    copyLayout[i]['i'] = `item-${i + 1}`
                }
                else {
                    copyLayout[i]['i'] = `item-${i + 1}`
                }
            }
            setLayout(copyLayout)
        }
    }, [layoutView])

    useEffect(() => {

    }, [layout])



    useEffect(() => {

        if (objectid && !recordid) {
            let currentObject = listObjectsFields.filter((object) => object._id === objectid)
          
            setLayout([{ i: `item-1`, id: `1`, object: currentObject[0], x: 0, y: 0, w: 2, h: 2.75, static: false, type: 'main' }])

            dispatch({ type: 'saga/getListObjectRefs', payload: objectid })
        }
        else if (objectid && recordid) {

            dispatch({
                type: 'saga/getRecordInCustom', payload: {
                    objectid: objectid,
                    recordid: recordid
                }
            })

            dispatch({ type: 'saga/getListTemplateByObject', payload: objectid })
        }
        else {
            setLayout([])
        }
    }, [objectid, recordid])

    useEffect(() => {
        if (customView.status === 'createCustomViewSuccess') {
            toast.success('Create custom view successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch({type: 'customView/setCustomView', payload: {status: 'idle'}})
        }
        else if (customView.status === 'Send Email Successfully') {
            toast.success('Send email successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoading(false)
            dispatch({type: 'customView/setCustomView', payload: {status: 'idle'}})
        }
        else if (customView.status === 'createCustomViewError') {
            toast.error('Create custom view error', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch({type: 'customView/setCustomView', payload: {status: 'idle'}})
        }
        else if (customView.status === 'Send Email Error') {
            toast.error('Can not send email', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch({type: 'customView/setCustomView', payload: {status: 'idle'}})
            setLoading(false)
        }
    }, [customView])

    const onLayoutChange = (newLayout) => {

        const newOut = [...newLayout]
        if (signalLayout === true && !recordid) {
            for (let i = 0; i < layout.length; i++) {
                for (let j = 0; j < newOut.length; j++) {
                    if (newOut[j].i === layout[i].i) {
                        newOut[j]['object'] = layout[i].object
                        newOut[j]['type'] = layout[i].type
                        break;
                    }
                }
            }

            setLayout(newOut)
 
        }
        else {

            setSignalLayout(true)
        }


    };

    const handleOpenCustom = () => {
        setOpenDialogCustom(true)
    }

    const handleChangeData = (e) => {
        const value = e.target.value

        setData({
            ...data,
            [e.target.name]: value
        })
        if (layout.length % 2 === 1 && e.target.name === 'object') {
            count_items = count_items + 1
        }

        if (e.target.name === 'object') {
            setLayout([...layout, { i: `item-${layout.length + 1}`, id: `${layout.length}`, object: value, x: layout.length % 2 === 0 ? 0 : 4, y: 4 * count_items, w: 2, h: 2.75, static: false, type: 'main' }])
            setSignalLayout(false)
            dispatch({ type: 'saga/getListTemplateByObject', payload: value._id })
            dispatch({ type: 'saga/getListObjectRefs', payload: value._id })
        }

        if (e.target.name === 'field' && value !== '') {
            const range = quillRef.current.getSelection();
            let position = range ? range.index : 0;
            quillRef.current.insertText(position, `${layout[0].infoRecord[value.field_id]}`)
        }
    }

    const handleObjectMapping = (event) => {
        const {
            target: { value },
        } = event;

        setObjectMapping(

            typeof value === 'string' ? value.split(',') : value,
        );
    }


    const attachQuillRef = () => {
        if (bodyRef !== null && bodyRef.current !== undefined && typeof bodyRef?.current?.getEditor !== 'function') return

        if (quillRef.current !== undefined && quillRef?.current !== null) return;
        const quill = bodyRef?.current?.getEditor();
        if (quill !== undefined && quill !== null && quillRef.current !== undefined) {
            quillRef.current = quill
        }
    }

    useEffect(() => {
        attachQuillRef()
    })

    const handleBody = (e) => {
        setBody(e)
    }

    const bodyInitial = data.template?.body !== '' ? data.template.body : ''
    const bodyRef = useRef()

    useEffect(() => {
        if (bodyRef.current) {
            const regex = /@fd_[a-zA-Z]+_[0-9]+/g;
            const matchRegex = bodyInitial.match(regex)
            let copyBody = bodyInitial
            if (matchRegex?.length > 0) {
                for (let i = 0; i < matchRegex.length; i++) {
                    copyBody = copyBody.replace(matchRegex[i], layout[0].infoRecord[0][matchRegex[i].substring(1, matchRegex[i].length)])
                }

            }

            setBody(copyBody)
        }

    }, [bodyInitial])

    const handleSubmitCustomView = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let submit = formatCustomView()
        dispatch({ type: 'saga/createCustomView', payload: submit })
    }

    const handleChangeSendEmail = (e) => {
        const value = e.target.value
        setDataSendEmail({
            ...dataSendEmail,
            [e.target.name]: value
        })
    }

    const handleSendEmail = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let getFieldEmail = layout[0].object.fields.filter((field) => field.field_type === 'email')
        let sendEmail = {}
        sendEmail["template_id"] = data.template._id
        sendEmail["email"] = dataSendEmail.email.username.concat('@gmail.com')
        sendEmail["record_id"] = recordid
        sendEmail["send_to"] = getFieldEmail[0].field_id
        setLoading(true)
        dispatch({ type: 'saga/sendEmail', payload: sendEmail })
    }

    const formatCustomView = () => {
        let views = JSON.parse(JSON.stringify(layout))
        if (views.size === 0) return
        for (let i = 0; i < views.length; i++) {
            switch (views[i].type) {
                case 'main':
                    views[i]['object_id'] = views[i].object._id
                    views[i]['static'] = true
                    delete views[i]['i']
                    delete views[i]['id']
                    delete views[i]['object']
                    delete views[i]['moved']
                    break;
                case 'related':
                    views[i]['related_obj_id'] = views[i].object._id
                    views[i]['static'] = true
                    delete views[i]['i']
                    delete views[i]['id']
                    delete views[i]['object']
                    delete views[i]['moved']
                    break;
                case 'send_email':
                    views[i]['static'] = true
                    delete views[i]['i']
                    delete views[i]['id']
                    delete views[i]['moved']
                    break
                default:
                    break
            }
        }
        return views
    }


    const renderSelectGroup = group => {
        const items = group?.objects?.map(object => {
            return (
                <MenuItem sx={{ marginLeft: '12px' }} key={object._id} value={object}>
                    {object.obj_name}
                </MenuItem>
            );
        });
        return [<ListSubheader sx={{ fontWeight: 'bold', color: 'black' }}>{group?.name}</ListSubheader>, items];
    };

    return (
        <Grid container spacing={1}>
            {!objectid && !recordid ? (
                <Grid item xs={12} >
                    <FormControl sx={{ width: '30%', height: 40 }} size="small">
                        <InputLabel id="input-object">Select Object</InputLabel>
                        <Select
                            labelId='input-object'
                            label="Select Object"
                            name="object"
                            id='input-object'
                            value={data.object}
                            onChange={handleChangeData}

                            required
                            style={{ height: '40px' }}
                        >
                            {listObject?.map(p => renderSelectGroup(p))}
                        </Select>
                    </FormControl>
                </Grid>
            ) : null}
            {!recordid ? (
                <>
                    {layout.length > 0 && (
                        <>
                            <form onSubmit={handleSubmitCustomView}>
                                <Grid item container spacing={1}>
                                    <Grid item xs={11.75} sx={{ display: 'flex', justifyContent: 'center', marginLeft: 160 }}>
                                        <Button variant='outlined' onClick={handleOpenCustom} >
                                            Add Component
                                        </Button>
                                        <CustomViewForm setObjectMapping={setObjectMapping} openDialogCustom={openDialogCustom} setOpenDialogCustom={setOpenDialogCustom} layout={layout} setLayout={setLayout} handleObjectMapping={handleObjectMapping} objectMapping={objectMapping} listRef={listRef} count={count_items} objectRefFields={objectRefField} setObjectRefFields={setObjectRefField} listObjectRefs={listObjectRefs} />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <GridLayout
                                            className="layout"
                                            layout={layout}
                                            cols={12}
                                            rowHeight={100}
                                            width={2800}
                                            onLayoutChange={onLayoutChange}
                                        >
                                            {layout.map((item, index) => (
                                                // <div key={item.i} className="grid-item">
                                                //     {item.i}
                                                // </div>
                                                item.type === 'main' || item.type === 'related' ? (
                                                    item.type === 'main' ? (
                                                        <Card sx ={{overflowY: 'auto'}} key={item.i} className='grid-item'   >
                                                            {/* <Grid item container spacing={1}> */}
                                                            {/* {item.i} */}
                                                            <CardHeader sx={{ display: 'flex', justifyContent: 'center' }} subheader={"Main component"} title={item.object.obj_name}>

                                                            </CardHeader>
                                                            <CardContent sx={{ height: 500 }}>
                                                                {item.object?.fields?.length > 0 ? (
                                                                    item.object.fields.map((field) => (
                                                                        <Grid key={field._id} item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', margin: 0.5, fontWeight: 'bold' }}>
                                                                            {field.field_name}
                                                                        </Grid>
                                                                    ))
                                                                ) : null}
                                                            </CardContent>
                                                            {/* </Grid> */}
                                                        </Card>
                                                    ) : (
                                                        <Card sx={{ overflowY: 'auto' }} key={item.i} className='grid-item' >
                                                            <CardHeader sx={{ display: 'flex', justifyContent: 'center' }} subheader={"Sub component"} title={item.object.obj_name} />
                                                            <CardContent>
                                                                <TableCustomView item={item} recordid={recordid} layout={layout} />
                                                            </CardContent>
                                                        </Card>
                                                    )
                                                ) : (
                                                    <Card sx ={{overflowY: 'auto'}} key={item.i} className='grid-item'   >
                                                        <CardHeader title='Send Email'>

                                                        </CardHeader>
                                                        <CardContent>
                                                            <Grid item container spacing={1}>
                                                                {/* <Grid item xs={2}>
                                                                    <Typography sx={styletitle} color={"black"}>
                                                                        Email
                                                                    </Typography>
                                                                </Grid> */}
                                                                <Grid item xs={2} >
                                                                    <Typography sx={styletitle} color={"black"}>
                                                                        From
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={10} sx={{ marginTop: 1}}>
                                                                    <FormControl sx={{ width: '60%' }}>
                                                                        <InputLabel id="input-email">Select Email</InputLabel>
                                                                        <Select
                                                                            labelId='input-email'
                                                                            //label="Object"
                                                                            name="sender"
                                                                            label='Select Email'
                                                                            id='input-object'
                                                                            // value={dataOneAction.sender}
                                                                            // onChange={handleDataChange}
                                                                            // error={!validFieldType && indexField === index}
                                                                            //required
                                                                            style={{ height: 50 }}
                                                                            renderValue={(value) => {
                                                                              
                                                                                return value.username.concat('@gmail.com')
                                                                            }}
                                                                            disabled
                                                                        >
                                                                            {listemail.map((email) => (
                                                                                <MenuItem key={email._id} value={email}>{email.username}</MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={2} >
                                                                    <Typography sx={styletitle} color={"black"}>
                                                                        Template
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={10} sx={{ marginTop: 0.5 }}>
                                                                    <FormControl sx={{ width: '60%' }}>
                                                                        <InputLabel id="input-template">Choose Template</InputLabel>
                                                                        <Select
                                                                            labelId='input-template'
                                                                            //label="Template"
                                                                            name="template"
                                                                            label='Choose Template'
                                                                            id='input-template'
                                                                            // value={data.template}
                                                                            // onChange={handleChangeData}
                                                                            // error={!validFieldType && indexField === index}
                                                                            // required
                                                                            disabled
                                                                            style={{ height: 50 }}
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
                                                                <Grid item xs={2} >
                                                                    <Typography sx={styletitle} color={"black"}>
                                                                        Body
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={10}  >
                                                                    <QuillToolbar object={data.object[1]} data={data} handleChangeData={handleChangeData} />
                                                                    <ReactQuill
                                                                        style={{ height: '200px' }}
                                                                        theme='snow'
                                                                        name="content"
                                                                        // ref={bodyRef ? bodyRef : null}
                                                                        // value={body}
                                                                        // onChange={handleBody}
                                                                        modules={modules}
                                                                        formats={formats}
                                                                    />
                                                                </Grid>
                                                                {/* <Grid item xs ={12}>
                                                    <Box
                                                    ref={bodyRef}
                                                    />
                                                </Grid> */}
                                                            </Grid>
                                                        </CardContent>
                                                    </Card>
                                                )
                                            ))}
                                        </GridLayout>
                                    </Grid>
                                    <Grid item xs={11} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button startIcon={<DoneIcon />} type='submit' variant='contained'  >
                                            Save
                                        </Button>
                                    </Grid>
                                    <Grid item xs={0.75} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button startIcon={<CloseIcon />} variant='outlined'  >
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </>
                    )}
                </>
            ) : (
                <>

                    {layout.length > 0 ? (
                        <>
                     
                            <Grid item container spacing={1}>
                                <GridLayout
                                    className="layout"
                                    layout={layout}
                                    cols={12}
                                    rowHeight={100}
                                    width={2800}
                                    onLayoutChange={onLayoutChange}
                                >
                                    {layout.map((item, index) => (
                                        item.type === 'main' || item.type === 'related' ? (
                                            item.type === 'main' ? (
                                                <Card sx ={{overflowY: 'auto'}} key={item.i} className='grid-item'   >
                                                    <CardHeader sx={{ display: 'flex', justifyContent: 'center' }} subheader={"Main component"} title={item.object.obj_name}>

                                                    </CardHeader>
                                                    <CardContent sx={{ height: 500 }}  >
                                                        {item.object?.fields?.length > 0 ? (
                                                            item.object.fields.map((field) => (
                                                                <>
                                                                    <Grid key={field._id} item container spacing={1} sx={{ display: 'flex', flexDirection: 'row' }}>
                                                                        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-start', margin: 0.5, fontWeight: 'bold' }}>
                                                                            {field.field_name}
                                                                        </Grid>
                                                                        <Grid item xs={6} sx={{ display: 'flex', margin: 0.5 }}>
                                                                            {item.infoRecord[0][field.field_id]}
                                                                        </Grid>
                                                                    </Grid>
                                                                </>
                                                            ))
                                                        ) : null}
                                                    </CardContent>
                                                    {/* </Grid> */}
                                                </Card>
                                            ) : (
                                                <Card sx={{ overflowY: 'auto' }} key={item.i} className='grid-item' >
                                                    <CardHeader sx={{ display: 'flex', justifyContent: 'center' }} subheader={"Sub component"} title={item.object.obj_name} />
                                                    <CardContent>
                                                        <TableCustomView item={item} recordid={recordid} layout={layout} />
                                                    </CardContent>
                                                </Card>
                                            )
                                        ) : (
                                            <Card  key={item.i} className='grid-item' sx={{ overflowY: 'auto' }}   >
                                                <CardHeader title='Send Email'>

                                                </CardHeader>
                                                <CardContent>
                                                    <form onSubmit={handleSendEmail}>
                                                        <Grid item container spacing={1}>
                                                            <Grid item xs={2} >
                                                                <Typography sx={styletitle} color={"black"}>
                                                                    From
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={10} sx={{ marginTop: 1, display: 'flex' }}>
                                                                <FormControl sx={{ width: '60%' }}>
                                                                    <InputLabel id="input-email">Select Email</InputLabel>
                                                                    <Select
                                                                        labelId='input-email'
                                                                    
                                                                        name="email"
                                                                        label='Select Email'
                                                                        id='input-object'
                                                                        value={dataSendEmail.email}
                                                                        onChange={handleChangeSendEmail}
                                                                        
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
                                                            <Grid item xs={2} >
                                                                <Typography sx={styletitle} color={"black"}>
                                                                    Template
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={10} sx={{ marginTop: 0.5 }}>
                                                                <FormControl sx={{ width: '60%' }}>
                                                                    <InputLabel id="input-template">Choose Template</InputLabel>
                                                                    <Select
                                                                        labelId='input-template'
                                                                        //label="Template"
                                                                        name="template"
                                                                        label='Choose Template'
                                                                        id='input-template'
                                                                        value={data.template}
                                                                        onChange={handleChangeData}
                                                                        // error={!validFieldType && indexField === index}
                                                                        required
                                                                        style={{ height: 50 }}
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
                                                            <Grid item xs={2} >
                                                                <Typography sx={styletitle} color={"black"}>
                                                                    Body
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={10}  >
                                                                <QuillToolbar object={data.object[1]} data={data} handleChangeData={handleChangeData} />
                                                                <ReactQuill
                                                                    style={{ height: '200px' }}
                                                                    theme='snow'
                                                                    name="content"
                                                                    ref={bodyRef}
                                                                    value={body}
                                                                    onChange={handleBody}
                                                                    modules={modules}
                                                                    formats={formats}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                <Button type='submit' variant='contained'>
                                                                    Send
                                                                </Button>
                                                            </Grid>
                                                            {/* <Grid item xs ={12}>
                                                    <Box
                                                    ref={bodyRef}
                                                    />
                                                </Grid> */}
                                                        </Grid>
                                                    </form>
                                                </CardContent>
                                            </Card>
                                        )
                                    ))}
                                </GridLayout>
                            </Grid>
                        </>
                    ) : null}

                </>
            )
            }
            {
                customView.status === 'pending' && (
                    <Card sx={{ position: "fixed", right: 10, top: 60, m: 0, p: 1, backgroundColor: 'white', width: '15%', borderRadius: '5px' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <CircularProgress size='1.5rem' color='grey' />
                            </Grid>
                            <Grid item xs={8}>
                                Pending...
                            </Grid>
                        </Grid>

                    </Card>
                )
            }
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
            {loading ? (
                <CardPending />
            ): null}
        </Grid >
    )
}

export default CustomViewPage