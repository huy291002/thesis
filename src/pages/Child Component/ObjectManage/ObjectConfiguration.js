import { FormControl, Grid, List, ListItemButton, ListItemText, MenuItem, TextField, Select, Button, InputLabel, IconButton, Box, Typography, Icon, Divider, makeStyles, Card, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab';
import Papa from "papaparse";
import FormDetailView from '../../../components/FormDetailView/FormDetailView'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Drag from '../../../components/Drag/Drag'
import Drop from '../../../components/Drop/Drop'
import Paper from '@mui/material/Paper';
// import { reorder } from 'src/components/reorder/reorder'
import { reorder } from '../../../components/reorder/reorder'
import Error from '../../../components/ErrorMessage/Error'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SaveCancelButton from '../../../components/GroupButton/SaveCancelButton'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog'
import DeleteDragIcon from '../../../components/DeleteDragIcon/DeleteDragIcon'
import FieldForm from './FieldForm'
import { useDispatch, useSelector } from 'react-redux'
import CreateAndUpload from './CreateAndUpload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextTruncate from 'react-text-truncate';
import StatusUpload from '../../../components/StatusUpload/StatusUpload';
import { useNavigate } from 'react-router-dom';
import CardPending from '../../../components/CardPending/CardPending';


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

const styleButton = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: 2
}

const styleField = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: "center"
}

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

function ObjectConfiguration() {

  const listObject = useSelector(state => state.listObject)

  const listObjectsFields = useSelector(state => state.listObjectsFields)
  const detailObject = useSelector(state => state.detailObject)
  const object = useSelector(state => state.object)
  const objectID = useSelector(state => state.objectID)
  const openSidebar = useSelector(state => state.openSidebar)

  const [updateListObject, setUpdateListObject] = useState(listObject ? listObject : []);
  const [listObjectState, setListObjectState] = useState([])
  const [detailObjectState, setDetailObjectState] = useState({})
  const [showMore, setShowMore] = useState(false);
  const [fields, setFields] = useState([])     // FIELDS INFO
  const [loading, setLoading] = useState(false)
  const [indexGroup, setIndexGroup] = useState('')
  const [indexObject, setIndexObject] = useState('')
  const [IDObject, setIDObject] = useState('')
  const [IDField, setIDField] = useState('')
  // const [indexField, setIndexField] = useState('')
  // const [IDGroup, setGroupId] = useState('')
  const [viewDetailObject, setViewDetailObject] = useState(false)
  const [fieldInfo, setFieldInfo] = useState('')
  const [addObject, setAddObject] = useState(false);
  const [objectName, setObjectName] = useState('')  // OBJECT NAME

  const [addObjectField, setAddObjectField] = useState(false); // have obj_id with no fields

  const [updateObjectField, setUpdateObjectField] = useState(false)

  const [save, setSave] = useState(false);
  const [cancel, setCancel] = useState(false)
  // const [validFieldName, setValidFieldName] = useState(true)
  // const [validFieldType, setValidFieldType] = useState(true)
  const [checkComplete, setCheckComplete] = useState(false)
  const [edit, setEdit] = useState(false)
  const [fieldIndex, setFieldIndex] = useState(-1)
  const [groupId, setGroupId] = useState(-1) // used for specifying object's parent group
  const [openDialogField, setOpenDialogField] = useState(false)
  const [file, setFile] = useState('')
  const dispatch = useDispatch()

  const [storedInfo, setStoredInfo] = useState(

    {
      objectName: '',
      fields: [{
        id: '1',
        name: '',
        type: '',
        info: ''
      }]
    })
  const [openFieldDialog, setOpenFieldDialog] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)

  const [changeFieldOrder, setChangeFieldOrder] = useState(false)

  const [addPrefix, setAddPrefix] = useState(false)

  const [editPrefix, setEditPrefix] = useState(false)

  const [prefix, setPrefix] = useState({})

  const [schema, setSchema] = useState([])

  //////////////////////// HANDLE CREATE OBJECT AND UPLOAD FILE ///////////////////

  const [prefixUpload, setPrefixUpload] = useState({ field_name: 'ID', field_type: 'id', prefix: '' })

  const [loadingStatus, setLoadingStatus] = useState(false)

  const loadingUploadFile = useSelector(state => state.loadingUploadFile)

  const [selectedFile, setSelectedFile] = useState('')

  const [signalDataChange, setSignalDataChange] = useState(false)

  const [invalidFieldName, setInvalidFieldName] = useState(true)

  const [indexField, setIndexField] = useState('')

  const [data, setData] = useState([])

  const [columnMapping, setColumnMapping] = useState([])

  const [valueOptions, setValueOptions] = useState([])

  const [quantity, setQuantity] = useState([])

  const [parseFileJson, setParseFileJson] = useState()

  const [uploadComplete, setUploadComplete] = useState(false)

  const [submitUpload, setSubmitUpload] = useState(false)

  const navigate = useNavigate()

  const handleNavigateCustomView = () => {
    navigate(`/settings/custom-view/${IDObject}`)
  }


  const SortbyID = (a, b) => {
    return a.sorting_id - b.sorting_id
  }

  const roundUpToNearest = (num, nearest) => {
    return Math.ceil(num / nearest) * nearest;
  }

  //////////////////// GROUP OBJECT

  // useEffect(() => {
  //   dispatch({ type: 'saga/getListObject' })
  //   return () => {
  //     dispatch({ type: 'listObject/setListObject', payload: null })
  //   }
  // }, [])

  let table = []



  useEffect(() => {

    if (objectID) {
      handleViewDetailObject('', objectID, '', '')
    }
  }, [objectID])

  useEffect(() => {
    if (listObject !== null) {
      let deepObjectCopy = JSON.parse(JSON.stringify(listObject))
      setListObjectState(deepObjectCopy.sort(SortbyID))
    }
  }, [listObject])

  ////////////////// DETAIL OBJECT

  useEffect(() => {

    if (detailObject !== null) {

      setDetailObjectState(detailObject)
    }
  }, [detailObject])

  useEffect(() => {

    if (typeof (indexObject) === 'number' || (objectID || IDObject) && Object.keys(detailObjectState).length !== 0) {

      setObjectName(detailObjectState["obj_name"])
      setGroupId(detailObjectState["group_obj_id"])
      let prefixInfo = detailObjectState["fields"].length > 0 ? detailObjectState["fields"].filter((item) => item.field_type === 'id') : []
      let fieldWithoutPrefix = detailObjectState["fields"].length > 0 ? detailObjectState["fields"].filter((item) => item.field_type !== 'id') : []
      let customFields = fieldWithoutPrefix.length > 0 ? fieldWithoutPrefix.map((item) => item = {
        id: item._id,
        name: item.field_name,
        type: item.field_type === 'text' && ['Text', 'text']
          || item.field_type === 'textarea' && ['Text area', 'textarea']
          || item.field_type === 'phonenumber' && ['Phone Number', 'phonenumber']
          || item.field_type === 'email' && ['Email', 'email']
          || item.field_type === 'select' && ['Select', 'select']
          || item.field_type === 'date' && ['Date', 'date']
          || item.field_type === 'integer' && ['Integer', 'integer']
          || item.field_type === 'float' && ['Float', 'float']
          || item.field_type === 'ref_obj' && ['Reference Object', 'ref_obj']
          || item.field_type === 'ref_field_obj' && ['Reference Field Object', 'ref_field_obj']
        ,
        length: item.field_type === 'text' ? item.length : '',
        options: item.field_type === 'select' ? item.options : '',
        ref_obj: item.field_type === 'ref_obj' ? [item.display_value, item.ref_obj_id] : '',
        ref_field_obj: item.field_type === 'ref_field_obj' ? [item.display_value, item.ref_field_obj_id] : '',
        country_code: item.field_type === 'phonenumber' ? item.country_code : '',
        //step: item.field_type === 'float' ? item.step : '',
        date: item.field_type === 'date' ? [item.format, item.separator] : '',
        info: '',
        sorting_id: item.sorting_id,
        field_id: item.field_id,
        // object_id: item._id
      }) : []

      setPrefix(prefixInfo[0])

      setFields(customFields.sort(SortbyID))

    }

  }, [detailObjectState])

  useEffect(() => {

    if (object.status === 'createObjectSuccess') {
      toast.success('Object has been created', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setViewDetailObject(true)
      setIDObject(object.message)

      setDetailObjectState((listObjectsFields.filter((objectDetail) => objectDetail._id === object.message))[0])

      dispatch({ type: 'object/setObject', payload: { status: "idle", message: '' } })
    }
    else if (object.status === 'updateObjectsuccess') {
      toast.success('Updated Successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch({ type: 'object/setObject', payload: { status: "idle" } })
    }
    else if (object.status === 'updateOrderFieldSuccess') {
      toast.success('Updated order field Successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch({ type: 'object/setObject', payload: { status: "idle" } })
    }
    else if (object.status === 'deleteSuccess') {
      toast.success('Object has been deleted', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setCheckComplete(false)
      setAddObject(false)
      setViewDetailObject(false)
      setOpenDialog(false)
      setObjectName('')
      setFields([])
      dispatch({ type: 'object/setObject', payload: { status: "idle" } })
    }
    else if (object.status === 'deleteFieldSuccess') {
      toast.success('Field has been deleted', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setOpenDialogField(false)
      dispatch({ type: 'object/setObject', payload: { status: "idle" } })
    }
    else if (object.status === 'createObjectAndUploadSuccess') {
      // toast.success('Object is created and Records processing is finished', {
      //   position: "top-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
      //setQuantity(object.quantity)
      setLoadingStatus(false)
      setViewDetailObject(true)
      dispatch({ type: 'object/setObject', payload: { status: "idle", quantity: [] } })
    }
    else if (object.status === 'updateObjecterror' || object.status === 'createObjectError' ||
      object.status === 'createObjectNameError' || object.status === 'deleteError' || object.status === "updateOrderFieldError") {
      toast.error('Error', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch({ type: 'object/setObject', payload: { status: "idle" } })
    }
    setChangeFieldOrder(false)
    setLoading(false)
    setAddObject(false)

    setSave(false)
    // dispatch({ type: 'groupobject/setGroupObject', payload: { status: "idle" } })
  }, [object])

  const handleDragEnd = (result) => {
    const { type, source, destination } = result;
    if (!destination) return

    const sourceGroupObjectId = source.droppableId
    const destinationGroupObjectId = destination.droppableId
    // reorder object

    const updateOrder = reorder(
      listObjectState.find((groupobject) => groupobject._id === sourceGroupObjectId).objectInfo,

      source.index,
      destination.index
    )

    const updatedGroupObject = listObjectState.map((groupObject) =>
      groupObject._id !== sourceGroupObjectId ? groupObject : { ...groupObject, objectInfo: updateOrder }
    )


    setListObjectState(updatedGroupObject)

  }

  const handleOnDragEndField = (result) => {
    if (!result.destination) return;
    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFields(items)

    setChangeFieldOrder(true)
  }

  const handleOnDragEndFieldUpload = (result) => {

    if (!result.destination) return;
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData(items)

    // setChangeFieldOrder(true)
  }

  const handleObjectName = (event) => {
    // setCancel(false)
    setObjectName(event.target.value)
    // if (event.target.value === '' && save === true) {
    //   setValidObjectName(false)
    // }
    // else {
    //   setValidObjectName(true);
    // }
  }


  const handleAddField = () => {
  
    if (IDObject !== '') {
      setAddObjectField(true)
    }

    setCancel(false)
    setOpenFieldDialog(true)

    // setFields([...fields, { id: `${fields.length + 1} `, name: '', type: '', info: '' }])
    setStoredInfo({
      ...storedInfo,
      fields: [
        ...storedInfo.fields,
        {
          id: `${storedInfo.length + 1} `,
          name: '',
          type: '',
          info: ''
        }
      ]
    })



  }



  const handleDeleteField = (index, id) => {
    if (addObject || IDObject === '') {
      const newFields = [...fields]
      newFields.splice(index, 1)
      setFields(newFields)
    }
    else {

      setIDField(id)
      setOpenDialogField(true)
    }

  }

  const handleConfirmField = () => {

    dispatch({
      type: 'saga/deleteField', payload: {
        IDField: IDField,
        object_id: IDObject
      }
    })
    setLoading(true)
  }

  const handleCloseConfirm = () => {
    setOpenDialogField(false)
  }


  const handleSubmit = (e) => {
    e.preventDefault();


    if (changeFieldOrder === false && file === '') {

      let data = formatObject()

      // let finalFields = data.map()
      data.splice(0, 0, prefix)
      dispatch({
        type: 'saga/createObjectWithFields', payload: {
          obj_name: objectName,
          group_obj_id: groupId,
          fields: data
        }
      })
      setLoading(true)
      // setChangeOrder(false)
      // setValidGroupName(true)
      // setAdd(false)
      setCheckComplete(true)
    }
    else if (changeFieldOrder === true && file === '') {

      let fieldOrder = fields.map((field) => field = field.id)

      fieldOrder.splice(0, 0, prefix._id)
      setLoading(true)
      dispatch({
        type: 'saga/updateOrderField', payload: {
          fieldOrder: fieldOrder,
          object_id: IDObject
        }
      })

    }
    else if (file !== '') {
      let finalSubmit = {}
      let listFieldRecord = data.map((item) => item = item.fieldName)
      let listFieldObjectMapping = data.map((item) => item.columnMapping)
      for (let i = 0; i < listFieldRecord.length; i++) {
        finalSubmit[listFieldObjectMapping[i]] = listFieldRecord[i]
      }
      let dataFormat = formatObjectUpload()
      dataFormat.splice(0, 0, prefixUpload)
      setSubmitUpload(true)
      setLoadingStatus(true)
      setCheckComplete(true)
      setUploadComplete(true)
      dispatch({type: 'loadingUploadFile/setLoadingUploadFile', payload: true})
      dispatch({
        type: 'saga/createObjectAndUploadFile', payload: {
          obj_name: objectName,
          group_obj_id: groupId,
          file: file,
          fields: JSON.stringify(dataFormat),
          map: JSON.stringify(finalSubmit)
        }
      })

    }





  }

  const handleAddObject = (e, id, groupId) => {
    setAddObject(true)
    setViewDetailObject(false)
    setIndexGroup(id)
    setGroupId(groupId)
    setObjectName('')
    setIDObject('')
    setFields([])
    setPrefix({})
    setDetailObjectState({})
    setIndexObject('')
    setFile('')
    setColumnMapping([])

  }

  const handleShow = (index) => {

    // setIndexGroup(index)

    if (indexGroup === index) {
      setShowMore(!showMore)
    }

  }

  const handleSaves = () => {
    // formatObject()
    // handleSave()
  }

  const handleSave = async (e) => {
    //await formatObject()
    //handleSubmit(e)

    // setSave(true)
  }

  const handleCancel = () => {
    setCancel(true)
    setObjectName('')
    const newFields = fields.map((field) => field = {
      id: field.id,
      name: storedInfo.fields[parseInt(field.id) - 1].name !== '' ? storedInfo.fields[parseInt(field.id) - 1].name : '',
      type: storedInfo.fields[parseInt(field.id) - 1].type !== '' ? storedInfo.fields[parseInt(field.id) - 1].type : '',
      info: storedInfo.fields[parseInt(field.id) - 1].info !== '' ? storedInfo.fields[parseInt(field.id) - 1].info : '',
    })

    setFields(newFields)

  }

  const handleViewDetailObject = (objectindex, objectID, groupindex, groupID) => {
    setFile('')
    setIndexObject(objectindex)
    setIndexGroup(groupindex)
    setGroupId(groupID)
    setIDObject(objectID)
    setViewDetailObject(true)

    const viewObject = listObjectsFields.filter((object) => object._id === objectID)[0]
    // dispatch({ type: 'saga/getDetailObject', payload: objectID })
    setDetailObjectState(viewObject)
  }

  const handleDeleteObject = (groupObjectID, objectID) => {
    setOpenDialog(true)
    setIDObject(objectID)
    setGroupId(groupObjectID)

    // listObject[groupObjectIndex].children.splice(index, 1)
    // setUpdateListObject(listObject)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  const handleConfirm = () => {
    // setOpenDialog(false)
    setLoading(true)
    dispatch({ type: 'saga/deleteObject', payload: IDObject })
  }

  const handleEditPrefix = () => {

    if (prefix && Object.keys(prefix).length > 0 || detailObjectState["fields"]?.length > 0) {

      setEditPrefix(true)
    }
    else if (IDObject !== '' && detailObjectState["fields"].length === 0) {
      setAddPrefix(true)
    }
    setOpenFieldDialog(true)
  }

  const handleEdit = () => {

    if (IDObject !== '' && detailObjectState["fields"].length > 0) {
      setUpdateObjectField(true)
    }

    setEdit(true)
    setOpenFieldDialog(true)

    // setOpen(null)
  }

  const formatObject = () => {
    let objects = JSON.parse(JSON.stringify(fields));
    if (objects.size === 0) return
    for (let i = 0; i < objects.length; i++) {
      objects[i]['field_type'] = objects[i].type[1]
      delete objects[i].type
      objects[i]['field_name'] = objects[i].name
      delete objects[i].name
      switch (objects[i].field_type) {
        case 'text':
          objects[i]['length'] = parseInt(objects[i].length)
          delete objects[i]['src']
          delete objects[i]['options']
          delete objects[i]['country_code']

          delete objects[i]['date']
          break
        case 'textarea':
          delete objects[i]['length']
          delete objects[i]['src']
          delete objects[i]['options']
          delete objects[i]['country_code']

          delete objects[i]['date']
          break
        case 'email':
          delete objects[i]['length']
          delete objects[i]['src']
          delete objects[i]['options']
          delete objects[i]['country_code']

          delete objects[i]['date']
          break
        case 'select':
          objects[i]['options'] = objects[i].options
          delete objects[i]['length']
          delete objects[i]['src']
          delete objects[i]['country_code']

          delete objects[i]['date']
          break
        case 'float':
          //objects[i]['step'] = objects[i].step
          delete objects[i]['length']
          delete objects[i]['src']
          delete objects[i]['country_code']
          delete objects[i]['options']
          delete objects[i]['date']
          break
        case 'date':
          objects[i]['format'] = objects[i].date[0]
          objects[i]['separator'] = objects[i].date[1]
          delete objects[i]['length']
          delete objects[i]['src']
          delete objects[i]['country_code']
          delete objects[i]['options']

          delete objects[i]['date']
          break
        case 'phonenumber':

          objects[i]['country_code'] = objects[i].country_code
          delete objects[i]['length']
          delete objects[i]['options']
          delete objects[i]['src']

          delete objects[i]['date']
          break
        case 'ref_field_obj':
          objects[i]['src'] = objects[i].ref_field_obj[1]
          objects[i]['cascade_option'] = objects[i].replace_delete_field
          delete objects[i]['length']
          delete objects[i]['options']
          delete objects[i]['country_code']

          delete objects[i]['date']
          delete objects[i]['ref_field_obj']
          delete objects[i]['replace_delete_field']

          break
        case 'ref_obj':

          objects[i]['src'] = objects[i].ref_obj[1]
          objects[i]['cascade_option'] = objects[i].replace_delete_obj
          delete objects[i]['length']
          delete objects[i]['options']
          delete objects[i]['country_code']

          delete objects[i]['date']
          delete objects[i]['ref_obj']
          delete objects[i]['replace_delete_obj']

          break
        // case 'Number':
        //   objects[i]['number'] = objects[i].info
        default:
          break

      }
      delete objects[i].info
    }
    return objects
  }

  //////////////////////// HANDLE CREATE OBJECT AND UPLOAD FILE ///////////////////

  const handleCloseBox = () => {
    setSubmitUpload(false)
    setQuantity([])
  }

  const handlePrefixUpload = (e) => {
    setPrefixUpload({
      ...prefixUpload,
      [e.target.name]: e.target.value
    })
  }

  const handleColumnMapping = (event) => {
    const {
      target: { value },
    } = event;
    setColumnMapping(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    let listMapping = typeof value === 'string' ? value.split(',') : value
    if (!signalDataChange) {
      let addMoreField = listMapping.map((item, index) => item = {
        id: String(index),
        fieldName: '',
        fieldType: '',
        columnMapping: item,
        country_code: '',
        length: '',
        options: '',
        //step: '',
        date: '',
        ref_field_obj: '',
        ref_obj: '',
        replace_delete_obj: '',
        replace_delete_field: ''
      })
      setData(addMoreField)

    }
    else {
      setData([...data, {
        id: String(data.length),
        fieldName: '',
        fieldType: '',
        columnMapping: value[data.length],
        country_code: '',
        length: '',
        options: '',
        //step: '',
        date: '',
        ref_field_obj: '',
        ref_obj: '',
        replace_delete_obj: '',
        replace_delete_field: ''
      }])
    }


  }

  const handleDelete = (index, nameColumnMapping) => {
    const newData = [...data]
    newData.splice(index, 1)
    let newDataID = newData.map((item) => item = {
      ...item,
      id: parseInt(item.id) > index ? `${String(parseInt(item.id) - 1)}` : `${item.id}`
    })
    let newColumnMapping = columnMapping
    newColumnMapping = newColumnMapping.filter((item) => item !== nameColumnMapping)
    setColumnMapping(newColumnMapping)

    setData(newDataID)

  }

  const handleDataChange = (e, index) => {
    const field = e.target.name
    const newData = [...data]

    if (field === "fieldName") {
      let listFieldName = data.map(a => a.fieldName)
      if (listFieldName.includes(e.target.value) && e.target.value !== '') {
        setInvalidFieldName(false)
        setIndexField(index)
      }
      else {

        setInvalidFieldName(true)

      }
    }

   

    newData[index][field] = e.target.value
  
    setData(newData)


    setSignalDataChange(true)
  }
  /// HANDLE FOR FIELD TYPE: SELECT
  const handleChangeDataAuto = (e, value, index) => {
    setValueOptions(value)

    const field = e.target.name
    const newData = [...data]
    newData[index][field] = value

    setData(newData)
  }

  const handleChangeFile = (e) => {
    setFile(e.target.files[0])
    let fileName = e.target.files[0].name
    if (fileName.length > 20) {
      fileName = fileName.substring(0, 20) + '...' + fileName.substring(fileName.length - 10, fileName.length)

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
        // if (rows.length > 0) {
        //     let getSchema = rows.map(item => ({ [item]: '' }))

        //     setMappingField(getSchema)
        // }
      }
      reader.readAsText(e.target.files[0])
    } else {
      reader.onload = async (e) => {
        ////// DISTINGUISH BETWEEN LIST OF OBJECTS WITHOUT "[" AND HAVE "["
        let checkTypeJSON = e.target.result.split("\n")

        if (checkTypeJSON[0] === "{\r" || checkTypeJSON[0] === "[\r") {
          let parseFileJson = JSON.parse(e.target.result)
          if (parseFileJson.length) {
            // let schema = inferSchema(parseFileJson)

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
          }
          else {

            setSchema(Object.keys(parseFileJson))
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
          setParseFileJson(checkTypeJSON)
          setSchema(list_most_keys)
        }
      }
      reader.readAsText(e.target.files[0], "UTF-8")
    }
  }

  const formatObjectUpload = () => {
    let objects = JSON.parse(JSON.stringify(data));
    if (objects.size === 0) return
    for (let i = 0; i < objects.length; i++) {
      objects[i]['field_type'] = objects[i].fieldType[1]
      delete objects[i].fieldType
      objects[i]['field_name'] = objects[i].fieldName
      delete objects[i].fieldName
      switch (objects[i].field_type) {
        case 'text':
          objects[i]['length'] = parseInt(objects[i].length)
          delete objects[i]['src']
          delete objects[i]['options']
          delete objects[i]['country_code']
          delete objects[i]['ref_field_obj']
          delete objects[i]['ref_obj']

          delete objects[i]['date']
          delete objects[i]['replace_delete_obj']
          delete objects[i]['replace_delete_field']
          break
        case 'textarea':
          delete objects[i]['length']
          delete objects[i]['src']
          delete objects[i]['options']
          delete objects[i]['country_code']
          delete objects[i]['ref_field_obj']
          delete objects[i]['ref_obj']

          delete objects[i]['date']
          delete objects[i]['replace_delete_obj']
          delete objects[i]['replace_delete_field']
          break
        case 'email':
          delete objects[i]['length']
          delete objects[i]['src']
          delete objects[i]['options']
          delete objects[i]['country_code']
          delete objects[i]['ref_field_obj']
          delete objects[i]['ref_obj']

          delete objects[i]['date']
          delete objects[i]['replace_delete_obj']
          delete objects[i]['replace_delete_field']
          break
        case 'select':
          objects[i]['options'] = objects[i].options
          delete objects[i]['length']
          delete objects[i]['src']
          delete objects[i]['country_code']
          delete objects[i]['ref_field_obj']
          delete objects[i]['ref_obj']

          delete objects[i]['date']
          delete objects[i]['replace_delete_obj']
          delete objects[i]['replace_delete_field']
          break
        case 'float':
          //objects[i]['step'] = parseFloat(objects[i].step)
          delete objects[i]['length']
          delete objects[i]['src']
          delete objects[i]['country_code']
          delete objects[i]['options']
          delete objects[i]['date']
          delete objects[i]['ref_field_obj']
          delete objects[i]['ref_obj']
          delete objects[i]['replace_delete_obj']
          delete objects[i]['replace_delete_field']
          break
        case 'integer':
          delete objects[i]['length']
          delete objects[i]['src']
          delete objects[i]['country_code']
          delete objects[i]['options']
          delete objects[i]['date']
          delete objects[i]['ref_field_obj']
          delete objects[i]['ref_obj']
          delete objects[i]['replace_delete_obj']
          delete objects[i]['replace_delete_field']
          break
        case 'date':
          objects[i]['format'] = objects[i].date[0]
          objects[i]['separator'] = objects[i].date[1]
          delete objects[i]['length']
          delete objects[i]['src']
          delete objects[i]['country_code']
          delete objects[i]['options']

          delete objects[i]['date']
          delete objects[i]['ref_field_obj']
          delete objects[i]['ref_obj']
          delete objects[i]['replace_delete_obj']
          delete objects[i]['replace_delete_field']
          break
        case 'phonenumber':

          objects[i]['country_code'] = objects[i].country_code
          delete objects[i]['length']
          delete objects[i]['options']
          delete objects[i]['src']
          delete objects[i]['ref_field_obj']
          delete objects[i]['ref_obj']

          delete objects[i]['date']
          delete objects[i]['replace_delete_obj']
          delete objects[i]['replace_delete_field']
          break
        case 'ref_field_obj':
          objects[i]['src'] = objects[i].ref_field_obj[1]
          objects[i]['cascade_option'] = objects[i].replace_delete_field
          delete objects[i]['length']
          delete objects[i]['options']
          delete objects[i]['country_code']

          delete objects[i]['date']
          delete objects[i]['ref_field_obj']
          delete objects[i]['ref_obj']
          delete objects[i]['replace_delete_obj']
          delete objects[i]['replace_delete_field']
          break
        case 'ref_obj':

          objects[i]['src'] = objects[i].ref_obj[1]
          objects[i]['cascade_option'] = objects[i].replace_delete_obj
          delete objects[i]['length']
          delete objects[i]['options']
          delete objects[i]['country_code']

          delete objects[i]['date']
          delete objects[i]['ref_field_obj']
          delete objects[i]['ref_obj']
          delete objects[i]['replace_delete_obj']
          delete objects[i]['replace_delete_field']
          break
        default:
          break

      }
      delete objects[i].columnMapping
      delete objects[i].info
      delete objects[i].id
    }
    return objects
  }




  // let test = formatObject()

  return (
    <>
      {listObjectState ? (
        <>
          <Grid container spacing={1}>
            <FormDetailView size={openSidebar ? 3.33 : 3}>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Drop id="droppable" type="droppable-category">
                  {listObjectState.map((groupObject, groupObjectIndex) => (
                    <Drag key={groupObject._id} id={groupObject._id} index={groupObjectIndex} >
                      <List >
                        <Grid item container spacing={0}>
                          <Grid item xs={11}>

                            <ListItemText  sx ={{fontWeight: groupObjectIndex === 0 && 'bold'}}>{groupObjectIndex === 0 ? `${groupObject.name}*` : groupObject.name}</ListItemText>
                          </Grid>
                          <Grid item xs={1} sx={{ display: 'flex', flexDirection: 'flex-end', alignItems: 'flex-end' }}>
                            <IconButton onClick={() => {
                              setIndexGroup(groupObjectIndex)
  
                              handleShow(groupObjectIndex)

                            }}>
                              {/* {showMore && groupObjectIndex === indexGroup ? <ExpandLess /> : <ExpandMore />} */}
                            </IconButton>
                          </Grid>
                        </Grid>

                        {/* {showMore && groupObjectIndex === indexGroup ? ( */}
                        <>
                          <Drop key={groupObject._id} id={groupObject._id} >
                            {groupObject.objects.length > 0 && groupObject.objects.map((object, index) => (
                              <Drag key={object._id} id={object._id} index={index}  >
                                <DeleteDragIcon
                                  name={object.obj_name}
                                  handleDelete={() => handleDeleteObject(groupObject._id, object._id)}
                                  handleView={() => handleViewDetailObject(index, object._id, groupObjectIndex, groupObject._id)}
                                  indexPosition={object._id}
                                  index={IDObject}
                                  // indexGroupPosition={indexGroup}
                                  // groupIndex={groupObjectIndex}
                                  viewDetail={viewDetailObject}
                                />
                                {/* <ListItemButton>
                            {object.name}
                          </ListItemButton> */}
                              </Drag>
                            ))}
                          </Drop>
                          {groupObjectIndex !== 0 ? (
                            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <Button onClick={(e) => handleAddObject(e, groupObjectIndex, groupObject._id)} startIcon={<AddIcon />} variant='outlined' sx={{ ...styleButton, marginTop: 1 }} >
                              Add
                            </Button>
                          </Grid>
                          ): null}
                          
                        </>
                        {/* ) : (
                          null
                        )} */}

                      </List>

                    </Drag>
                  ))}
                </Drop>
              </DragDropContext>

            </FormDetailView>
            {addObject || checkComplete || viewDetailObject ? (
              <>

                <FormDetailView size={openSidebar ? 8.67 : 9}>
                  <form onSubmit={handleSubmit} id="object">
                    <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 1 }}>
                      <TextField
                        type='text'
                        name='Object Name'
                        placeholder='Object Name'
                        value={cancel ? storedInfo.objectName : objectName}
                        required
                        // error={!validObjectName}
                        onChange={handleObjectName}
                        InputProps={{
                          style: {
                            height: 45,
                          },
                        }}
                        inputProps={{
                          sx: {
                            textAlign: "center",
                            "&::placeholder": {
                              textAlign: "center",
                            },
                          },
                        }}
                        sx={{ height: 45, width: '20%' }}
                      />
                    </Grid>
                    {viewDetailObject && (
                      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant='outlined' onClick={handleNavigateCustomView}>
                          Custom View
                        </Button>
                      </Grid>
                    )}
                    {IDObject === '' || detailObjectState?.fields?.length === 0 ? (
                      <>
                        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 1 }}>
                          {/* <input style={{ fontSize: '16px' }} type="file" accept='.csv, .json' onChange={handleChangeFile} id="fileInput" /> */}
                          <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                          >
                            Upload file
                            <VisuallyHiddenInput type="file" accept='.csv, .json' onChange={handleChangeFile} />
                          </Button>

                        </Grid>
                        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                          {file !== '' && (
                            <Typography sx={{ marginLeft: 1.5 }}>{selectedFile}</Typography>
                          )}
                        </Grid>
                      </>
                    ) : null}

                    {file === '' ? (
                      <>
                        <Grid container spacing={2} sx={{ paddingLeft: '0vw', paddingTop: '0.5rem', display: 'flex' }}>
                          <Grid item xs={3.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Paper><b>Field Name</b></Paper>
                          </Grid>
                          <Grid item xs={3.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Paper><b>Field Type</b></Paper>
                          </Grid>
                          <Grid item xs={3.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Paper><b>Field Data</b></Paper>
                          </Grid>
                          <Grid item xs={0.75}></Grid>
                          <Grid item xs={0.75}></Grid>
                        </Grid>

                        {IDObject !== '' || (IDObject === '' && Object.keys(detailObjectState).length === 0 && Object.keys(prefix).length !== 0) ? (
                          <Grid item container spacing={0.75} sx={{ paddingLeft: '0vw', display: 'flex', marginTop: 0.5 }}>
                            <Grid item xs={3.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Paper>ID</Paper>
                            </Grid>
                            <Grid item xs={3.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Paper>id</Paper>
                            </Grid>
                            <Grid item xs={3.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Paper> {prefix?.prefix ? prefix.prefix : ''} </Paper>
                            </Grid>
                            <Grid item xs={0.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <IconButton onClick={handleEditPrefix}  >
                                <EditIcon />
                              </IconButton>
                            </Grid>

                          </Grid>
                        ) : (
                          null
                        )}

                        <DragDropContext onDragEnd={handleOnDragEndField}>
                          <Drop id="field">


                            {fields.size !== 0 ?

                              fields.map((field, index) => (
                                <>

                                  <Drag key={field.name} id={field.name} index={index}>
                                    <Grid key={index} item container spacing={0.75} sx={{ paddingLeft: '0vw', display: 'flex' }}>
                                      <Grid item xs={12}>
                                        <Divider variant='middle' />
                                      </Grid>
                                      <Grid item xs={3.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Paper>{field.name}</Paper>
                                      </Grid>
                                      <Grid item xs={3.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Paper>{field.type[0]}</Paper>
                                      </Grid>
                                      {field.type[1] === 'phonenumber' || field.type[1] === 'select' || field.type[1] === 'ref_obj' || field.type[1] === 'ref_field_obj' || field.type[1] === 'text' || field.type[1] === 'date' ? (
                                        <>
                                          {field.type[1] === 'phonenumber' && (
                                            <Grid item xs={3.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                              <Paper> {`(${field.country_code})`} </Paper>
                                            </Grid>
                                          )}
                                          {field.type[1] === 'select' && (
                                            <Grid item xs={3.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                              <Paper>{field.options.join(", ")} </Paper>
                                            </Grid>
                                          )}
                                          {field.type[1] === 'ref_obj' && (
                                            <Grid item xs={3.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                              
                                              <Paper>{field.ref_obj[0]} </Paper>
                                            </Grid>
                                          )}
                                          {field.type[1] === 'ref_field_obj' && (
                                            <Grid item xs={3.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                              
                                              <Paper>{field.ref_field_obj[0]} </Paper>
                                            </Grid>
                                          )}
                                          {field.type[1] === 'text' && (
                                            <Grid item xs={3.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                              <Paper>{field.length}</Paper>
                                            </Grid>
                                          )}
                                          {field.type[1] === 'date' && (
                                            <Grid item xs={3.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                              <Paper>{field.date[0].replace(/\s/g, `${field.date[1]}`)}</Paper>
                                            </Grid>
                                          )}
                                          {/* {field.type[1] === 'float' && (
                                            <Grid item xs={3.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                              <Paper>{field.step}</Paper>
                                            </Grid>
                                          )} */}

                                        </>
                                      ) : (

                                        <Grid item xs={3.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                          <Paper>{field.info}</Paper>
                                        </Grid>
                                      )}

                                      <Grid item xs={0.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <IconButton onClick={() => {
                                          setFieldInfo(fields[index])
                                          setFieldIndex(index)
                                          handleEdit()
                                        }}>
                                          <EditIcon />
                                        </IconButton>
                                      </Grid>
                                      <Grid item xs={0.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <IconButton onClick={() => handleDeleteField(index, field.id)}>
                                          <DeleteIcon />
                                        </IconButton>
                                      </Grid>
                                      <Grid item xs={0.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <IconButton>
                                          <DragIndicatorIcon />
                                        </IconButton>

                                      </Grid>
                                      <Grid item xs={12}>
                                        {index !== fields.length - 1 && (
                                          <Divider variant='middle' />
                                        )}
                                      </Grid>
                                    </Grid>
                                  </Drag>


                                </>
                              )) : <></>
                            }
                          </Drop>
                        </DragDropContext>
                        <FieldForm
                          openDialog={openFieldDialog}
                          setOpenDialog={setOpenFieldDialog}
                          fieldInfo={edit ? fieldInfo : null}
                          setEdit={setEdit}
                          fields={fields}
                          setFields={setFields}
                          edit={edit}
                          index={edit ? fieldIndex : null}
                          listObjectState={listObjectState}
                          addObjectField={addObjectField}
                          setAddObjectField={setAddObjectField}
                          updateObjectField={updateObjectField}
                          setUpdateObjectField={setUpdateObjectField}
                          IDObject={IDObject}
                          detailObjectState={detailObjectState}
                          prefix={prefix}
                          setPrefix={setPrefix}
                          editPrefix={editPrefix}
                          setEditPrefix={setEditPrefix}
                          addPrefix={addPrefix}
                          setAddPrefix={setAddPrefix}
                        />
                        {IDObject === '' && Object.keys(prefix).length === 0 && (
                          <Grid item xs={12} sx={styleButton}>
                            <Button onClick={handleAddField} startIcon={<AddIcon />} variant='outlined'>
                              Add Prefix
                            </Button>
                          </Grid>
                        )}
                        {IDObject !== '' && detailObjectState["fields"]?.length === 0 && (
                          <Grid item xs={12} sx={styleButton}>
                            <Button onClick={handleEditPrefix} startIcon={<AddIcon />} variant='outlined'>
                              Update Prefix
                            </Button>
                          </Grid>
                        )}
                        {IDObject !== '' && detailObjectState["fields"]?.length > 0 && viewDetailObject || IDObject === '' && Object.keys(prefix).length > 0 ? (
                          <Grid item xs={12} sx={styleButton}>
                            <Button onClick={handleAddField} startIcon={<AddIcon />} variant='outlined'>
                              Add Field
                            </Button>
                          </Grid>
                        ) : null}
                      </>
                    ) : (
                      <CreateAndUpload
                        file={file}
                        handleChangeFile={handleChangeFile}
                        schema={schema}
                        setSchema={setSchema}
                        data={data}
                        prefixUpload={prefixUpload}
                        handlePrefixUpload={handlePrefixUpload}
                        columnMapping={columnMapping}
                        handleColumnMapping={handleColumnMapping}
                        handleOnDragEndField={handleOnDragEndFieldUpload}
                        handleDataChange={handleDataChange}
                        handleChangeDataAuto={handleChangeDataAuto}
                        handleDelete={handleDelete}
                        valueOptions={valueOptions}
                        uploadComplete={uploadComplete}
                        invalidFieldName={invalidFieldName}
                        indexField={indexField}
                        submitUpload={submitUpload}
                      />
                    )}
                    <Grid item xs={12} sx={styleButton}>
                      <LoadingButton loading={loading} onClick={handleSave} sx={{ marginRight: 1 }} startIcon={<DoneIcon />} type="submit" variant="contained"  >
                        Save
                      </LoadingButton>
                      <Button onClick={handleCancel} startIcon={<CloseIcon />} variant="outlined"  >
                        Cancel
                      </Button>
                    </Grid>


                  </form>

                </FormDetailView>
                {/* {submitUpload ? (
                  <StatusUpload
                    handleCloseBox={handleCloseBox}
                    loadingStatus={loadingStatus}
                    quantity={quantity}
                  />
                ) : null} */}


              </>
            ) : (
              null
            )}
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
            {loadingUploadFile ? (
              <CardPending />
            ): null}
            
          </Grid>
          <ConfirmDialog
            open={openDialog}
            handleClose={handleCloseDialog}
            handleConfirm={handleConfirm}
            message="Are you sure to delete this object ?"
            title="Object Deleted"
            loading={loading}
          />
          <ConfirmDialog
            open={openDialogField}
            handleClose={handleCloseConfirm}
            handleConfirm={handleConfirmField}
            message="Are you sure to delete this field ?"
            title="Field Deleted"
            loading={loading}
          />
        </>
      ) : (
        <></>
      )}

    </>
  )
}

export default ObjectConfiguration

