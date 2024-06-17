import { useEffect, useState } from 'react';
// @mui
import {
    Autocomplete,
    Button,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    InputLabel,
    MenuItem,
    IconButton,
    Grid,
    FormControl,
    Select,
    styled,
    ListSubheader,
    List,
    ListItemText,
    Typography,
    FormHelperText,
    Divider,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// components
import { first, update } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../../components/ErrorMessage/Error';
import checkEmailformat from '../../../utils/checkEmailformat';
import OutlookDialog from '../../../components/OutlookDialog/OutlookDialog';
import { LoadingButton } from '@mui/lab';

const existObject = [
    {
        id: '1',
        name: 'Department'
    },
    {
        id: '2',
        name: 'Employee'
    },
    {
        id: '3',
        name: 'Customer'
    }
]

const styleButton = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 2
}

const styletitle = {
    fontWeight: 'bold'
}

const styleFieldType = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: 1,
    height: '100%'
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function FieldForm({ openDialog, setOpenDialog, fieldInfo, edit,
    setEdit, index, fields, setFields,
    listObjectState, addObjectField, setAddObjectField, updateObjectField,
    setUpdateObjectField, IDObject, detailObjectState, editPrefix, setEditPrefix, prefix, setPrefix, addPrefix, setAddPrefix }) {

    const [data, setData] = useState({
        name: '',
        type: '',
        length: '',
        ref_obj: '',
        ref_field_obj: '',
        options: '',
        prefix: '',
        country_code: '',
        //step: '',
        date: '',
        replace_delete_obj: '',
        replace_delete_field: ''
    });
    const cascade_options = ['replace', 'delete']
    const [valueOptions, setValueOptions] = useState([])
    const [showMore, setShowMore] = useState(false);
    const [idField, setIdField] = useState('')

    const [prefixName, setPrefixName] = useState('')

    const [loading, setLoading] = useState(false)

    const [checked, setChecked] = useState(false)

    const dispatch = useDispatch()

    const fieldStatus = useSelector(state => state.fieldStatus)

    const listObjectsFields = useSelector(state => state.listObjectsFields)

    const listObject = useSelector(state => state.listObject)

    useEffect(() => {
        if (fieldStatus.status === 'createFieldSuccess') {
            toast.success('Field has been created', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch({ type: 'fieldStatus/setFieldStatus', payload: { status: "idle" } })

        }
        else if (fieldStatus.status === 'updateOneFieldSuccess') {
            toast.success('Field is updated successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch({ type: 'fieldStatus/setFieldStatus', payload: { status: "idle" } })

        }
        else if (fieldStatus.status === 'updatePrefixSuccess') {
            toast.success('Prefix is updated successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch({ type: 'fieldStatus/setFieldStatus', payload: { status: "idle" } })

        }
        else if (fieldStatus.status === 'createFieldError') {
            toast.error('Error in crating Field', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch({ type: 'fieldStatus/setFieldStatus', payload: { status: "idle" } })

        }
        else if (fieldStatus.status === 'updateOneFieldError') {
            toast.error('Error in updating field', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch({ type: 'fieldStatus/setFieldStatus', payload: { status: "idle" } })

        }
        setLoading(false)
        handleCloseDialog()
        setAddObjectField(false)
        setEditPrefix(false)
        setAddPrefix(false)

    }, [fieldStatus])

    useEffect(
        () => {

            if (fieldInfo) {
                setIdField(fieldInfo._id)
                setData({
                    name: fieldInfo ? fieldInfo.name : '',
                    type: fieldInfo ? fieldInfo.type : '',
                    length: fieldInfo.type[1] === 'text' ? fieldInfo.length : '',
                    ref_obj: fieldInfo.type[1] === 'ref_obj' ? fieldInfo.ref_obj : '',
                    ref_field_obj: fieldInfo.type[1] === 'ref_field_obj' ? fieldInfo.ref_field_obj : '',
                    country_code: fieldInfo.type[1] === 'phonenumber' ? fieldInfo.country_code : '',
                })
                if (fieldInfo.type[1] === 'select') {
                    setValueOptions(fieldInfo.options)
                }
            }
            else if (editPrefix) {
                setData({
                    ...data,
                    prefix: prefix.prefix
                })
            }


        }, [fieldInfo, editPrefix]
    )

    const handlePrefixName = (e) => {
        setPrefixName(e.target.value)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
        setEdit(false)
        setData({
            name: '',
            type: '',
            info: '',
            country_code: '',
        })
        setValueOptions([])
    }

    const handleChangeData = (e) => {
        const value = e.target.value

        setData({
            ...data,
            [e.target.name]: value
        })


    }

    const handleChangeDataAuto = (e, value) => {
        setValueOptions(value)
        setData({
            ...data,
            options: value
        })
    }

    const formatObject = () => {
        let objects = JSON.parse(JSON.stringify(data));
        if (objects.size === 0) return
        objects['field_type'] = objects.type[1]
        delete objects.type
        objects['field_name'] = objects.name
        delete objects.name
        switch (objects.field_type) {
            case 'text':
                objects['length'] = parseInt(objects.length)
                delete objects['src']
                delete objects['options']
                delete objects['country_code']
                delete objects['date']
                delete objects['prefix']
                delete objects['ref_field_obj']
                delete objects['ref_obj']
                delete objects['replace_delete_obj']
                delete objects['replace_delete_field']
                break
            case 'textarea':
                delete objects['length']
                delete objects['src']
                delete objects['options']
                delete objects['country_code']
                delete objects['date']
                
                delete objects['prefix']
                delete objects['ref_field_obj']
                delete objects['ref_obj']
                delete objects['replace_delete_obj']
                delete objects['replace_delete_field']
                break
            case 'email':
                delete objects['length']
                delete objects['src']
                delete objects['options']
                delete objects['country_code']
                delete objects['date']
                
                delete objects['prefix']
                delete objects['ref_field_obj']
                delete objects['ref_obj']
                delete objects['replace_delete_obj']
                delete objects['replace_delete_field']
                break
            case 'select':
                objects['options'] = objects.options
                delete objects['length']
                delete objects['src']
                delete objects['country_code']
                delete objects['date']
                
                delete objects['prefix']
                delete objects['ref_field_obj']
                delete objects['ref_obj']
                delete objects['replace_delete_obj']
                delete objects['replace_delete_field']
                break
            case 'phonenumber':
                objects['country_code'] = objects.country_code
                delete objects['length']
                delete objects['options']
                delete objects['src']
                delete objects['date']
                
                delete objects['prefix']
                delete objects['ref_field_obj']
                delete objects['ref_obj']
                delete objects['replace_delete_obj']
                delete objects['replace_delete_field']
                break
            case 'integer':
                delete objects['length']
                delete objects['options']
                delete objects['src']
                delete objects['country_code']
                delete objects['textarea']
                delete objects['date']
                delete objects['prefix']
                delete objects['ref_field_obj']
                delete objects['ref_obj']
                delete objects['replace_delete_obj']
                delete objects['replace_delete_field']
                break
            case 'float':
                // objects['step'] = objects.step
                delete objects['length']
                delete objects['options']
                delete objects['src']
                delete objects['country_code']
                delete objects['textarea']
                delete objects['date']
                delete objects['prefix']
                delete objects['ref_field_obj']
                delete objects['ref_obj']
                delete objects['replace_delete_obj']
                delete objects['replace_delete_field']
                break
            case 'date':
                objects['format'] = objects.date[0]
                objects['separator'] = objects.date[1]
                delete objects['length']
                delete objects['options']
                delete objects['src']
                delete objects['country_code']
                delete objects['textarea']
                delete objects['date']
                
                delete objects['prefix']
                delete objects['ref_field_obj']
                delete objects['ref_obj']
                delete objects['replace_delete_obj']
                delete objects['replace_delete_field']
                break
            case 'ref_field_obj':
                objects['src'] = objects.ref_field_obj[1]
                objects['cascade_option'] = objects.replace_delete_field
                delete objects['length']
                delete objects['options']
                delete objects['country_code']
                delete objects['textarea']
                delete objects['date']
                
                delete objects['prefix']
                delete objects['ref_field_obj']
                delete objects['ref_obj']
                delete objects['replace_delete_obj']
                delete objects['replace_delete_field']
                break
            case 'ref_obj':
                objects['src'] = objects.ref_obj[1]
                objects['cascade_option'] = objects.replace_delete_obj
                delete objects['length']
                delete objects['options']
                delete objects['country_code']
                delete objects['date']
                
                delete objects['prefix']
                delete objects['ref_field_obj']
                delete objects['ref_obj']
                delete objects['replace_delete_obj']
                delete objects['replace_delete_field']
                break

            default:
                break

        }
        delete objects.info

        return objects
    }

    const handleDeleteField = () => { }


    const handleSubCheckCreate = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if ((!edit && !editPrefix && !addObjectField && !updateObjectField && !addPrefix) || (editPrefix && IDObject === '')) {

            handleCloseDialog()
            if ((fields.length === 0 && Object.keys(prefix).length === 0) || editPrefix) {
                setPrefix({
                    field_type: 'id',
                    field_name: 'ID',
                    prefix: data.prefix?.toUpperCase()
                })
                delete data["prefix"]
                setEditPrefix(false)
            }
            else {
                setFields(fields.concat([data]))
            }


        }
        else if (edit && IDObject === '') {
            fields[index] = data
            setFields(fields)
            setOpenDialog(false)
        }
        // create field from exsting object
        else if (addObjectField === true && editPrefix === false) {

            let field = formatObject()
            field["object_id"] = IDObject
            field["sorting_id"] = detailObjectState.fields.length
            setLoading(true)
            dispatch({ type: 'saga/createFieldFromObject', payload: field })
            // fields[index] = data
            // setFields(fields)
        }

        // update info of one field
        else if (updateObjectField === true && editPrefix === false) {

            let field = formatObject()
            field["object_id"] = IDObject
            field["sorting_id"] = fieldInfo.sorting_id
            field["field_id"] = fieldInfo.field_id
            field["_id"] = fieldInfo.id
            delete field["prefix"]
            // switch (fieldInfo.type[]) {
            //     case []
            // }

            setLoading(true)
            dispatch({
                type: 'saga/updateOneField', payload: {
                    field: field,
                    object_id: IDObject
                }
            })
            // dispatcj update
        }
        else if (editPrefix === true) {
            let field = {
                _id: prefix._id,
                object_id: IDObject,
                sorting_id: 0,
                field_id: prefix.field_id,
                field_name: 'ID',
                field_type: 'id',
                prefix: data.prefix,
                // _id: prefix._id
            }
            dispatch({
                type: 'saga/updateOneField', payload: {
                    field: field,
                    object_id: IDObject
                }
            })
            setLoading(true)
        }
        else if (addPrefix === true) {

            let field = {}
            field["field_name"] = 'ID'
            field["field_type"] = 'id'
            field["object_id"] = IDObject
            field["sorting_id"] = 0
            field["prefix"] = data.prefix

            setLoading(true)
            dispatch({ type: 'saga/createFieldFromObject', payload: field })
        }
        
    }



    const handleShow = (index) => {
        // setIndexField(index)
        setShowMore(!showMore)
    }


    const objectFields = listObjectState && listObjectState.map((item) => item = item["objects"])
  
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
        // <MenuItem sx={{ marginLeft: '12px' }} key={object._id} value={object}>
        //     {object.obj_name}
        // </MenuItem>
        return [<ListSubheader sx={{ fontWeight: 'bold', color: 'black', fontSize: '18px', marginTop: 0 }}>{group?.name}</ListSubheader>, items, <Divider variant='middle' sx={{ borderColor: 'black' }} />];
    }

    const renderSelectGroupObject = group => {
        const items = group?.objects?.map(object => {
            return (
                // <MenuItem sx={{ marginLeft: '12px' }} key={object._id} value={object}>
                //     {object.obj_name}
                // </MenuItem>
                <MenuItem sx={{ marginLeft: '12px' }} key={object._id} value={[object.obj_name, object.obj_id]}>{object.obj_name}</MenuItem>
            );
        });
        return [<ListSubheader sx={{ fontWeight: 'bold', color: 'black' }}>{group?.name}</ListSubheader>, items];
    };

    return (
        <>
            <OutlookDialog
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                title='Create Field'
                minWidth="55%"
                minHeight='35%'
            >

                <form onSubmit={handleSubCheckCreate} id='formField'>
                    <Grid key={index} container spacing={1} sx={{ m: 0 }}>
                        {editPrefix === true || addPrefix === true || (IDObject === '' && prefix && Object.keys(prefix).length === 0) ? (
                            <>
                                <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant='subtitle1' sx={styletitle} color={"black"}>
                                        Prefix
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={10} sx={styleFieldType}>
                                    <TextField
                                        sx={{ width: '50%' }}
                                        id='prefix'
                                        label='Prefix'
                                        type='text'
                                        name='prefix'
                                        onChange={handleChangeData}
                                        value={data.prefix}
                                        required
                                        InputProps={{
                                            sx: {
                                                height: 50
                                            }
                                        }}
                                    />
                                    <FormHelperText>
                                        Object hasn't had prefix
                                    </FormHelperText>
                                </Grid>
                            </>
                        ) : (
                            null
                        )}

                        {(editPrefix === false && addPrefix === false && prefix && Object.keys(prefix).length !== 0) || (editPrefix === false && IDObject === '' && Object.keys(detailObjectState).length === 0 && prefix && Object.keys(prefix).length !== 0) ? (

                            <>
                                <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant='subtitle1' sx={styletitle} color={"black"}>
                                        Field Name
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={10} sx={styleFieldType}>
                                    <TextField
                                        sx={{ width: '50%' }}
                                        id='object-name'
                                        label='Field Name'
                                        type='text'
                                        name='name'
                                        onChange={handleChangeData}
                                        value={data.name}
                                        required
                                        InputProps={{
                                            sx: {
                                                height: 50
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant='subtitle1' sx={styletitle} color={"black"}>
                                        Field Type
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={10} sx={{ ...styleFieldType, marginTop: 1 }}>
                                    <FormControl sx={{ width: '50%' }}>
                                        <InputLabel id="input-label">Select Field Type</InputLabel>
                                        <Select
                                            labelId='input-label'
                                            label="Select Field Type"
                                            name="type"
                                            id='input'
                                            value={data.type}
                                            onChange={handleChangeData}
                                            // error={!validFieldType && indexField === index}
                                            required
                                            style={{ height: "50px" }}
                                            renderValue={(field) => {
                                                return field[0]
                                            }}
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
                                {data.type !== '' ? (
                                    <>
                                        {data.type[1] === 'text' && (
                                            <>
                                                {/* <Grid item container spacing={0} sx={{ m: 1 }}> */}
                                                <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography sx={styletitle} color={"black"}>
                                                        Text's length
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} md={10} sx={styleFieldType}>
                                                    <TextField
                                                        sx={{ width: '50%' }}
                                                        id='addtion-info'
                                                        placeholder="Input Text's length"
                                                        type='text'
                                                        name='length'
                                                        onChange={handleChangeData}
                                                        value={data.length}
                                                        InputProps={{
                                                            sx: {
                                                                height: 50
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                            </>
                                        )}
                                        {data.type[1] === 'phonenumber' && (
                                            <>
                                                {/* <Grid item container spacing={0} sx={{ m: 1 }}> */}
                                                <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography variant='subtitle1' sx={styletitle} color={"black"}>
                                                        Country code
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12} md={10} sx={styleFieldType}>
                                                    <TextField
                                                        sx={{ width: '50%' }}
                                                        id='addtion-info'
                                                        label="Country code"
                                                        placeholder="Input Country code"
                                                        type='text'
                                                        name='country_code'
                                                        onChange={handleChangeData}
                                                        value={data.country_code}
                                                        InputProps={{
                                                            sx: {
                                                                height: 50
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                                {/* </Grid> */}
                                            </>
                                        )}
                                        {data.type[1] === 'select' && (
                                            <>
                                                {/* <Grid item container spacing={0} sx={{ m: 1 }}> */}
                                                <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography variant='subtitle1' sx={styletitle} color={"black"}>
                                                        Options
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} md={10} sx={styleFieldType}>
                                                    <Autocomplete
                                                        name="options"
                                                        value={valueOptions}
                                                        onChange={(event, newValue) => {

                                                            handleChangeDataAuto(event, newValue)
  
                                                        }}
                                                        multiple
                                                        clearIcon={false}
                                                        placeholder='Input your options'
                                                        options={[]}
                                                        sx={{ width: 300 }}
                                                        freeSolo
                                                        renderTags={(value, props) =>
                                                            value.map((option, index) => (
                                                                <Chip label={option} {...props({ index })} />
                                                            ))
                                                        }
                                                        renderInput={(params) => <TextField sx={{ width: '132%' }} label="Add Options" {...params} />}
                                                    />
                                                </Grid>
                                                {/* </Grid> */}
                                            </>
                                        )}
                                        {data.type[1] === 'date' && (
                                            <>
                                                <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography variant='subtitle1' sx={styletitle} color={"black"}>
                                                        Date's format
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} md={10} sx={styleFieldType}>
                                                    <FormControl sx={{ width: '50%' }}>
                                                        <InputLabel id="input-date-format">Select Date's format</InputLabel>
                                                        <Select
                                                            labelId='input-date-format'
                                                            label="Select Date's format"
                                                            name="date"
                                                            id='input-date'
                                                            value={data.date}
                                                            onChange={handleChangeData}
                                                            style={{ height: "50px" }}
                                                            renderValue={(select) => {
                                                                return select[0].replace(/\s/g, `${select[1]}`)
                                                            }}

                                                        >
                                                            {/* {listObjectsFields?.map((object) => (
                                                                <MenuItem key={object._id} value={[object.obj_name, object.obj_id]}>{object.obj_name}</MenuItem>
                                                            ))} */}
                                                            <MenuItem value={['DD MM YYYY', '/']}>DD/MM/YYYY</MenuItem>
                                                            <MenuItem value={['MM DD YYYY', '/']}>MM/DD/YYYY</MenuItem>
                                                            <MenuItem value={['YYYY MM DD', '/']}>YYYY/MM/DD</MenuItem>
                                                            <MenuItem value={['DD MM YYYY', '-']}>DD-MM-YYYY</MenuItem>
                                                            <MenuItem value={['MM DD YYYY', '-']}>MM-DD-YYYY</MenuItem>
                                                            <MenuItem value={['YYYY MM DD', '-']}>YYYY-MM-DD</MenuItem>
                                                            <MenuItem value={['Month Day, Year']}>Month Day, Year</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </>
                                        )}
                                        {data.type[1] === 'ref_obj' && (
                                            <>
                                                <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography variant='subtitle1' sx={styletitle} color={"black"}>
                                                        Object
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} md={10} sx={styleFieldType}>
                                                    <FormControl sx={{ width: '50%' }}>
                                                        <InputLabel id="input-object-reference">Select Object</InputLabel>
                                                        <Select
                                                            labelId='input-object-reference'
                                                            label="Select Object"
                                                            name="ref_obj"
                                                            id='input-object'
                                                            value={data.ref_obj}
                                                            onChange={handleChangeData}
                                                            style={{ height: "50px" }}
                                                            renderValue={(select) => {
                                                                return select[0]
                                                            }}

                                                        >
                                                            {listObject?.map(p => renderSelectGroupObject(p))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2} ></Grid>
                                                <Grid item xs={12} md={10} sx={styleFieldType}>
                                                    {cascade_options.map((option, index) => (
                                                        <>
                                                            <FormControlLabel key={index}
                                                                control={
                                                                    <Checkbox
                                                                        name="replace_delete_obj"
                                                                        checked={data.replace_delete_obj === option}
                                                                        value={option}
                                                                        required={data.replace_delete_obj === ''}
                                                                        onChange={handleChangeData}
                                                                    />
                                                                }
                                                                label={option[0].toUpperCase() + option.slice(1)}
                                                            />
                                                            {option === 'replace' ? (
                                                                <FormHelperText>
                                                                    The field will be set empty if your reference object is deleted
                                                                </FormHelperText>
                                                            ) : (
                                                                <FormHelperText>
                                                                    The record will be deleted if your reference object is deleted
                                                                </FormHelperText>
                                                            )}
                                                        </>
                                                    ))}
                                                </Grid>
                                            </>
                                        )}
                                        {data.type[1] === 'ref_field_obj' && (
                                            <>
                                                <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography variant='subtitle1' sx={styletitle} color={"black"}>
                                                        Field Object
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} md={10} sx={styleFieldType}>
                                                    <FormControl sx={{ width: '50%' }}>
                                                        <InputLabel id="input-label-reference">Select Field Object</InputLabel>
                                                        <Select
                                                            labelId='input-label-reference'
                                                            label="Select Field Object"
                                                            name="ref_field_obj"
                                                            id='input-label'
                                                            value={data.ref_field_obj}
                                                            onChange={handleChangeData}
                                                            style={{ height: "50px" }}
                                                            renderValue={(select) => {
                                                                return select[0]
                                                            }}
                                                        >
                                                            {listObject?.map(p => renderSelectGroupObjectField(p))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2} ></Grid>
                                                <Grid item xs={12} md={10} sx={styleFieldType}>
                                                    {cascade_options.map((option, index) => (
                                                        <>
                                                            <FormControlLabel key={index}
                                                                control={
                                                                    <Checkbox
                                                                        name="replace_delete_field"
                                                                        checked={data.replace_delete_field === option}
                                                                        value={option}
                                                                        required={data.replace_delete_field === ''}
                                                                        onChange={handleChangeData}
                                                                    />
                                                                }
                                                                label={option[0].toUpperCase() + option.slice(1)}
                                                            />
                                                            {option === 'replace' ? (
                                                                <FormHelperText>
                                                                    The field will be set empty if your reference record is deleted
                                                                </FormHelperText>
                                                            ) : (
                                                                <FormHelperText>
                                                                    The record will be deleted if your reference field is deleted
                                                                </FormHelperText>
                                                            )}
                                                        </>
                                                    ))}
                                                </Grid>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    null
                                )}
                            </>
                        ) : null}
                        <Grid item xs={10.15} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <LoadingButton loading={loading} type='submit' startIcon={<DoneIcon />} variant="contained" form="formField"  >
                                Save
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button startIcon={<CloseIcon />} variant="outlined" onClick={handleCloseDialog} >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </OutlookDialog>
            {/* <ToastContainer
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
            /> */}
        </>
    )
}

export default FieldForm

