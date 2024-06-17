import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect, useContext } from 'react';
// @mui
import {
    Grid,
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
    Toolbar,
    Button,
    Drawer,
    Box,
    Divider,
    CircularProgress,
    CardHeader,
    CardContent
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import RootRegisterForm from './Child Component/RootRegisterForm';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RecordForm from './Child Component/Record/RecordForm';
import HeaderTableRef from './Child Component/Record/HeaderTableRef';
import CircleIcon from '@mui/icons-material/Circle';
import SkeleTonBigTable from './Child Component/Record/SkeleTonBigTable';
import UploadIcon from '@mui/icons-material/Upload';
import UploadForm from './Child Component/Record/UploadForm'; import ViewRecord from './Child Component/Record/ViewRecord';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import StatusUpload from '../components/StatusUpload/StatusUpload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Papa, { parse } from "papaparse";
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CardPending from '../components/CardPending/CardPending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { WebsocketContext } from '../Provider/NotificationProvider';
// ----------------------------------------------------------------------

const Room = [
    {
        name: 'Imperial',

    },
    {
        name: 'Rex'
    }

]

const HEADER = [
    { id: 'type', label: 'Type', fieldName: 'Type', fieldType: 'String', alignRight: false },
    { id: 'no of guests', label: 'Number of guests', fieldName: 'No_of_guests', fieldType: 'String', alignRight: false },
    { id: 'price', label: 'Price', fieldName: 'Price', fieldType: 'String', alignRight: false },
    { id: 'hotel', label: 'Hotel', fieldName: 'Hotel', fieldType: 'Reference Object', alignRight: false },
    { id: '' }
]
// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
    //height: 20,
    // display: 'flex',
    // justifyContent: 'space-between',
    // padding: theme.spacing(0, 1, 0, 3),
}));

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    // height: 1,
    // overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    // whiteSpace: 'nowrap',
    // width: 1,
});

let test = {
    "_id": "665858d1661eb78f98144b43",
    "fd_content_712775": "Hello world",
    "fd_history_458026": {
        "ref_to": {
            "_id": "66585855661eb78f98144b42",
            "object_id": "66571aab82bd5c6ec3016ec9",
            "fd_room_027198": "Single",
            "fd_status_582163": "New",
            "fd_customer_105800": {
                "ref_to": {
                    "_id": "6655c853c7d495c2b286f418",
                    "object_id": "6655b29665955b552ae336fd",
                    "fd_name_725261": "Ngô Quang Huy",
                    "fd_email_908547": "nqh29102002@gmail.com",
                    "fd_gender_387556": "Male",
                    "fd_description_829981": "Người hay bị leader chửi nhất",
                    "fd_birthday_055391": "2002-10-29",
                    "fd_id_584218": "CONTACT21"
                },
                "field_value": "fd_email_908547"
            },
            "fd_manager_681928": {
                "ref_to": {
                    "_id": "6658581e661eb78f98144b41",
                    "object_id": "665852b60544b7650f4754df",
                    "fd_manager_025212": "quan@gmail.com",
                    "fd_refdest_553594": {
                        "ref_to": "6658580a661eb78f98144b40",
                        "field_value": "fd_dest_955801"
                    },
                    "fd_id_072627": "EMPLOYEE2",
                    "created_at": "2024-05-30 17:42:38",
                    "modified_at": "2024-05-30 17:42:38",
                    "created_by": "659d33ac7961655c570d44f2",
                    "modified_by": "659d33ac7961655c570d44f2"
                },
                "field_value": "fd_manager_025212"
            },
            "fd_id_640536": "HISTORY6"
        },
        "field_value": "fd_id_640536"
    },
    "fd_id_375841": "FEED3",
    "created_at": "2024-05-30 17:45:37"
}

export default function RecordPage() {

    const [dataUpload, setDataUpload] = useState({})

    const [dataForm, setDataForm] = useState({})

    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(1);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [dateValue, setDateValue] = useState(null)

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [openDialog, setOpenDialog] = useState(false)

    const [openDialogUpload, setOpenDialogUpload] = useState(false)

    const [condition, setCondition] = useState(false)

    const [edit, setEdit] = useState(false)

    const [openView, setOpenView] = useState(false)

    const [existRefField, setExistRefField] = useState(false)

    const [headerWithoutRef, setHeaderWithoutRef] = useState([])

    const [infoRecord, setInfoRecord] = useState({})

    const [fieldObject, setFieldObject] = useState()

    const [loadingStatus, setLoadingStatus] = useState(false)

    const [finishWorkflow, setFinishWorkflow] = useState(false)

    const [checkMessage, setCheckMessage] = useState(false)

    const [loading, setLoading] = useState(false)

    const [loadingForm, setLoadingForm] = useState(false)

    const [submitUpload, setSubmitUpload] = useState(false)

    const [multiRef, setMultiRef] = useState({})

    const [headerInForm, setHeaderInForm] = useState([])

    const [searchRecord, setSearchRecord] = useState({})

    const [schema, setSchema] = useState([])

    const [fieldObjectFile, setFieldObjectFile] = useState([])

    const [file, setFile] = useState()

    const [selectedFile, setSelectedFile] = useState('')

    const [openDialogRecord, setOpenDialogRecord] = useState(false)

    const [quantity, setQuantity] = useState([])

    const [timer, setTimer] = useState(null)

    const [message, setMessage] = useState([])

    const listObjectsFields = useSelector(state => state.listObjectsFields)

    const listObject = useSelector(state => state.listObject)

    const createRecord = useSelector(state => state.createRecord)

    const listRecord = useSelector(state => state.listRecord)

    const loadingSearch = useSelector(state => state.loadingSearch)

    const healthCheckStatusBig = useSelector(state => state.healthCheckStatusBig)

    const loadingUploadFile = useSelector(state => state.loadingUploadFile)



    const dispatch = useDispatch()

    const navigate = useNavigate()

    const location = useLocation()



    const { objectid } = useParams()

 

    const handleNavigateRecord = (path) => {
        navigate(`${path.join('/')}`)
    }



    useEffect(() => {
        if (createRecord.status === "deleteRecordSuccess") {
            toast.success('Record is deleted', {
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
            setOpenDialogRecord(false)
            dispatch({ type: 'createRecord/setCreateRecordStatus', payload: { status: "idle" } })
        }
        else if (createRecord.status === 'deleteRecordError') {
            toast.error(`Record can't be deleted`, {
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
            setOpenDialogRecord(false)
            dispatch({ type: 'createRecord/setCreateRecordStatus', payload: { status: "idle" } })
        }
    }, [createRecord])

    useEffect(() => {
        let filterObject = listObjectsFields?.filter((object) => object._id === objectid)
        setFieldObject(filterObject ? filterObject[0] : {})
    }, [objectid, listObjectsFields])

    // useEffect(() => {

    // }, [fieldObject])

    useEffect(() => {
        dispatch({
            type: 'saga/getListRecord', payload: {
                object_id: objectid,
                page: page,
                rowsPerPage: rowsPerPage
            }
        })
    }, [objectid, page, rowsPerPage])

    useEffect(() => {

        dispatch({ type: 'saga/healthCheckInBigTable', payload: objectid })
    }, [objectid])

    const header = fieldObject ? fieldObject.fields?.map((item) => item = {
        ...item,
        label: item.field_name,
        id: item.field_id,
        alignRight: false,
        alignCenter: true

    }) : []

    header?.push({ id: '' })


    const handleSearchRecord = (e, field_id) => {
        let search = {
            ...searchRecord,
            [field_id]: e.target.value
        }
        setSearchRecord({
            ...searchRecord,
            [field_id]: e.target.value
        })
        //setSearchRecord()
        if (e.target.value === '') {
            delete searchRecord[field_id]
            delete search[field_id]
        }

        let keys = Object.keys(search)
        if (keys.length > 0) {
            for (let i = 0; i < keys.length; i++) {
                if (search[keys[i]] === '') {
                    delete search[keys[i]]
                }
            }
        }
        search["object_id"] = objectid
        dispatch({ type: 'loadingSearch/setLoadingSearch', payload: { big_table: true } })
        clearTimeout(timer)
        const newTimer = setTimeout(() => {
            if (Object.keys(search).length === 1) {
                dispatch({
                    type: 'saga/getListRecord', payload: {
                        object_id: objectid,
                        page: page,
                        rowsPerPage: rowsPerPage
                    }
                })
            }
            else {
                dispatch({ type: 'saga/getSearchRecordInBigTable', payload: search })
            }

        }, 500)

        setTimer(newTimer)


    }

    const handleOpenView = (record) => {
        setInfoRecord(record)
        setOpenView(true)
        setOpenDialog(false)
        setOpen(null)
        let headerNoRef = []
        const listRef = fieldObject.fields.filter((field) => field.field_type === 'ref_obj' || field.field_type === 'ref_field_obj')

        let listObjID = listRef.length > 0 ? listRef.map((field) => field = record[field.field_id]["ref_to"]) : [];
        let fullInfo = []

        if (listObjID.length > 0) {
            for (let i = 0; i < listObjID.length; i++) {
                fullInfo.push(listObjectsFields.filter((object) => object._id === listObjID[i].object_id))
            }

            for (let i = 0; i < header.length; i++) {
                if (header[i]["ref_obj_id_value"]) {
                    setExistRefField(true)
                    for (let j = 0; j < fullInfo.length; j++) {
                        if (typeof (record[header[i]["field_id"]]) === 'object' && record[header[i]["field_id"]]["ref_to"]["object_id"] === fullInfo[j][0]._id) {

                            header[i]["ref_field"] = fullInfo[j][0].fields
                            break;
                        }
                    }
                }
            }
        }
        headerNoRef = header.filter((item) => item.ref_field === undefined)
        if (headerNoRef.length > 0) {
            setHeaderWithoutRef(headerNoRef)
        }
        setHeaderInForm(header)
    }

    const handleOpenMenu = (event, record) => {
        event.stopPropagation()
        setOpen(event.currentTarget);
        setOpenView(false)
        setInfoRecord(record)

    };

    const handleView = () => {
        navigate(`/settings/custom-view/${objectid}/${infoRecord._id}`)
    }

    const handleEdit = () => {
        setOpen(null)
        setEdit(true)
        setOpenDialog(true)
        const listRef = fieldObject.fields.filter((field) => field.field_type === 'ref_obj' || field.field_type === 'ref_field_obj')
        let listObjID = listRef.length > 0 ? listRef.map((field) => field = infoRecord[field.field_id]["ref_to"]) : [];
        let fullInfo = []

        if (listObjID.length > 0) {
            for (let i = 0; i < listObjID.length; i++) {
                fullInfo.push(listObjectsFields.filter((object) => object._id === listObjID[i].object_id))
            }



            for (let i = 0; i < header.length; i++) {
                if (header[i]["ref_obj_id_value"]) {
                    for (let j = 0; j < fullInfo.length; j++) {
                        if (typeof (infoRecord[header[i]["field_id"]]) === 'object' && infoRecord[header[i]["field_id"]]["ref_to"]["object_id"] === fullInfo[j][0]._id) {

                            header[i]["ref_field"] = fullInfo[j][0].fields
                            break;
                        }
                    }

                }
            }
        }
        if (listRef.length > 0) {
            let list = []
            for (let i = 0; i < listRef.length; i++) {
                if (listRef[i]['ref_field_obj_id']) {
                    //list.push(listRef[i]["ref_field_obj_id"].substring(19, listRef[i]["ref_field_obj_id"].length))
                    let a = listRef[i]["ref_field_obj_id"].split('.')[1]
                    let getObject = listObjectsFields.filter((object) => object._id === listRef[i].ref_obj_id_value)[0]
                    for (let j = 0; j < getObject.fields.length; j++) {
                        if (getObject.fields[j].field_id === a && getObject.fields[j].field_type === 'ref_field_obj') {
                            setMultiRef({
                                ...multiRef,
                                [listRef[i]["field_id"]]: true
                            })
                            break
                        }
                    }

                }
            }
        }

        setHeaderInForm(header)

    }


    const handleDelete = () => {
        setOpenDialogRecord(true)
        setOpen(null)
    }

    const handleCloseConfirm = () => {
        setOpenDialogRecord(false)
    }

    const handleConfirmRecord = () => {
        let data = {}
        data["object_id"] = objectid
        data["record_id"] = infoRecord._id
        dispatch({
            type: 'saga/deleteRecord', payload: {
                data: data,
                page: 1,
                rowsPerPage: rowsPerPage
            }
        })
        //setLoading(false)
        setOpenDialogRecord(false)
        //setOpen(null)

        setLoading(true)
    }

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = USERLIST.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    };

    const handleCloseBox = () => {
        setSubmitUpload(false)
        setQuantity([])
    }

    const handleChangeRowsPerPage = (event) => {
        setPage(1);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const handleOpenDialog = () => {
        setHeaderInForm(header)
        setOpenDialog(true)
    }

    const handleOnClickUpload = (e) => {

        const element = e.target
        element.value = ''

    }

    const handleChangeFile = (e) => {
        setFile(e.target.files[0])
        let fileName = e.target.files[0].name
        if (fileName.length > 30) {
            fileName = fileName.substring(0, 30) + '...' + fileName.substring(fileName.length - 10, fileName.length)
            setSelectedFile(fileName)
        }
        else {
            setSelectedFile(fileName)
        }
        const reader = new FileReader()
        if (e.target.files[0].type === 'text/csv') {
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, {
                    header: true,
                })
                const fileData = reader.result
                // setFile(fileData)

                const parsedData = csv?.data
                const rows = Object.keys(parsedData[0])
                setSchema(rows)
                setOpenDialogUpload(true)
                let addObjectField = fieldObject.fields.map((item) => item = {
                    ...item,
                    disable: false
                })

                setFieldObjectFile(addObjectField)

            }
            reader.readAsText(e.target.files[0])
        } else {
            reader.onload = async (e) => {
                ////// DISTINGUISH BETWEEN LIST OF OBJECTS WITHOUT "[" AND HAVE "["
                let checkTypeJSON = e.target.result.split("\n")
                if (checkTypeJSON[0] === "{\r" || checkTypeJSON[0] === "[\r") {
                    let parseFileJson = JSON.parse(e.target.result)
                    if (parseFileJson.length) {
                        let max = 0
                        let list_most_keys = []
                        let record_most_keys = {}
                        parseFileJson.forEach(record => {

                            let listkeys = Object.keys((record))

                            if (listkeys.length > max) {
                                max = listkeys.length
                                list_most_keys = listkeys
                                record_most_keys = record
                            }
                        })

                        setSchema(list_most_keys)
                        setOpenDialogUpload(true)
                    }
                    else {

                        setSchema(Object.keys(parseFileJson))
                        setOpenDialogUpload(true)
                    }

                }
                else {
                    let max = 0
                    let list_most_keys = []
                    let record_most_keys = {}
                    checkTypeJSON.forEach(record => {
                        if (record) {
                            let listkeys = Object.keys(JSON.parse(record))
                            if (listkeys.length > max) {
                                max = listkeys.length
                                list_most_keys = listkeys
                                record_most_keys = record
                            }
                        }
                    })
                    setSchema(list_most_keys)
                    setOpenDialogUpload(true)
                }
                let addObjectField = fieldObject.fields.map((item) => item = {
                    ...item,
                    disable: false
                })

                setFieldObjectFile(addObjectField)

            }
            reader.readAsText(e.target.files[0], "UTF-8")
        }


    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

    return (
        <>
            <Helmet>
                <title> Record | CSA </title>
            </Helmet>
            {fieldObject ? (
                <>
                    <Container sx={{
                        // "& .MuiContainer-maxWidthLg": {
                        //     padding: 0
                        // },
                        // "& .MuiContainer-root": {
                        //     width: '120%'
                        // },
                        maxWidth: '1200px',
                        margin: 0

                    }}>
                        <Grid container spacing={2} sx={{ marginLeft: 0, width: 1400 }}>
                            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <Typography variant="h4" gutterBottom>
                                    {fieldObject.obj_name}
                                </Typography>
                            </Grid>
                            <Grid item xs={4.65} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}

                                >
                                    Upload file
                                    <VisuallyHiddenInput type="file" accept='.csv, .json' onClick={handleOnClickUpload} onChange={handleChangeFile} />
                                </Button>
                            </Grid>
                            <Grid item xs={1.35} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenDialog}>
                                    New Record
                                </Button>
                            </Grid>
                        </Grid>
                        <Stack direction="row" alignItems="center" justifyContent='space-between' mb={1}>

                            <RecordForm page={page} rowsPerPage={rowsPerPage} listRecord={listRecord} openDialog={openDialog} setOpenDialog={setOpenDialog} header={headerInForm} detailObject={fieldObject} edit={edit} setEdit={setEdit} infoRecord={infoRecord} setInfoRecord={setInfoRecord} finishWorkflow={finishWorkflow} setFinishWorkflow={setFinishWorkflow} checkMessage={checkMessage} setCheckMessage={setCheckMessage} loading={loadingForm} setLoading={setLoadingForm} data={dataForm} setData={setDataForm} dateValue={dateValue} setDateValue={setDateValue} multiRef={multiRef} />


                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent='space-between' mb={1} >

                            <ViewRecord header={headerInForm} detailObject={fieldObject} infoRecord={infoRecord} openDialog={openView} setOpenDialog={setOpenView} existRefField={existRefField} setExistRefField={setExistRefField} headerWithoutRef={headerWithoutRef} />


                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent='space-between' mb={1}>

                            <UploadForm loadingStatus={loadingStatus} setLoadingStatus={setLoadingStatus} submitUpload={submitUpload} setSubmitUpload={setSubmitUpload} page={page} rowsPerPage={rowsPerPage} openDialog={openDialogUpload} setOpenDialog={setOpenDialogUpload} detailObject={fieldObject} quantity={quantity} setQuantity={setQuantity} file={file} setFile={setFile} selectedFile={selectedFile} setSelectedFile={setSelectedFile} schema={schema} setSchema={setSchema} fieldObject={fieldObjectFile} setFieldObject={setFieldObjectFile} handleChangeFile={handleChangeFile} data={dataUpload} setData={setDataUpload} />
                        </Stack>
                        {header?.length > 1 ? (
                            <>
                                <Card sx={{ width: 1400 }}>
                                    <StyledRoot variant='dense' >
                                        <Grid container spacing={1}>
                                            <Grid item xs={11.5} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                Searchable
                                            </Grid>
                                            <Grid item xs={0.5} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                <CircleIcon sx={{ color: healthCheckStatusBig === 'pending' && 'grey' || healthCheckStatusBig === 'Good' && 'green' || healthCheckStatusBig === 'Bad' && 'red', height: 1 }} />
                                            </Grid>
                                        </Grid>
                                    </StyledRoot>
                                    <Scrollbar>
                                        <TableContainer sx={{ width: 1400 }}>
                                            <Table>
                                                <HeaderTableRef
                                                    order={order}
                                                    orderBy={orderBy}
                                                    headLabel={header}
                                                    onRequestSort={handleRequestSort}
                                                    searchInput={searchRecord}
                                                    handleSearchInput={handleSearchRecord}
                                                    healthCheckStatusBig={healthCheckStatusBig}
                                                    loadingSearch={loadingSearch}
                                                />
                                                <TableBody>

                                                    {listRecord["record_details"].length && !loadingSearch.big_table ? (
                                                        <>
                                                            {listRecord["record_details"].map((row, rowIndex) => {

                                                                // const selectedUser = selected.indexOf(name) !== -1;

                                                                return (
                                                                    <TableRow onClick={() => handleOpenView(row)} hover key={row._id} tabIndex={-1} role="checkbox">
                                                                        <TableCell padding="checkbox"></TableCell>

                                                                        {header.map((eachheader, indexcolumn) => (
                                                                            <>
                                                                                {typeof (row[eachheader.field_id]) === "object" ? (
                                                                                    <>
                                                                                        {Object.keys(row[eachheader.field_id]).length > 0 && (
                                                                                            <TableCell key={indexcolumn} > {row[eachheader.field_id]["ref_to"][row[eachheader.field_id]["field_value"]]} </TableCell>
                                                                                        )}
                                                                                        {Object.keys(row[eachheader.field_id]).length === 0 && (
                                                                                            <TableCell key={indexcolumn} > </TableCell>
                                                                                        )}
                                                                                    </>
                                                                                ) : (
                                                                                    <>

                                                                                        {row[eachheader.field_id] ? (
                                                                                            <>
                                                                                                <TableCell key={indexcolumn} align="left">{row[eachheader.field_id]}</TableCell>
                                                                                            </>
                                                                                        ) : (
                                                                                            <>
                                                                                                {eachheader.id !== '' && (
                                                                                                    <TableCell key={indexcolumn} align="left"></TableCell>
                                                                                                )}
                                                                                            </>


                                                                                        )}
                                                                                    </>
                                                                                )}
                                                                            </>
                                                                        ))}

                                                                        <TableCell key={rowIndex} align="right">
                                                                            <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, row)}>
                                                                                <Iconify icon={'eva:more-vertical-fill'} />
                                                                            </IconButton>
                                                                        </TableCell>

                                                                    </TableRow>
                                                                );
                                                            })}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {loadingSearch.big_table && (
                                                                <SkeleTonBigTable header={header} />
                                                            )}

                                                        </>
                                                    )}



                                                </TableBody>

                                                {/* {isNotFound && (
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                            <Paper
                                                                sx={{
                                                                    textAlign: 'center',
                                                                }}
                                                             >
                                                                <Typography variant="h6" paragraph>
                                                                    Not found
                                                                </Typography>

                                                                <Typography variant="body2">
                                                                    No results found for &nbsp;
                                                                    <strong>&quot;{filterName}&quot;</strong>.
                                                                    <br /> Try checking for typos or using complete words.
                                                                </Typography>
                                                            </Paper>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            )} */}
                                            </Table>
                                        </TableContainer>
                                    </Scrollbar>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={listRecord["total_records"]}
                                        rowsPerPage={rowsPerPage}
                                        page={page - 1}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Card>
                            </>
                        ) : (
                            null
                        )}

                    </Container>

                    <Popover
                        open={Boolean(open)}
                        anchorEl={open}
                        onClose={handleCloseMenu}
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
                        {/* <MenuItem onClick={handleOpenView}>
                            <Iconify icon={'eva:eye-fill'} sx={{ mr: 2 }} />
                            View
                        </MenuItem> */}
                        <MenuItem onClick={handleView}>
                            <Iconify icon={'eva:eye-fill'} sx={{ mr: 2 }} />
                            View detail
                        </MenuItem>

                        <MenuItem onClick={handleEdit}>
                            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                            Edit
                        </MenuItem>

                        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                            Delete
                        </MenuItem>
                    </Popover>
                </>
            ) : (
                null
            )}
            {/* {submitUpload ? (
                <StatusUpload
                    loadingStatus={loadingStatus}
                    handleCloseBox={handleCloseBox}
                    quantity={quantity}
                />
            ) : null} */}
            {loadingForm || loading || loadingUploadFile ? (
                <CardPending />
            ) : (
                null
            )}

            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"

            />
            <ConfirmDialog
                open={openDialogRecord}
                handleClose={handleCloseConfirm}
                handleConfirm={handleConfirmRecord}
                message="Are you sure to delete this record ?"
                title="Record Deleted"
                loading={loading}
            />
        </>
    );
}
