import React, { useEffect, useRef, useState } from 'react'
import { styled, Dialog, DialogTitle, DialogContent, IconButton, Grid, FormControl, InputLabel, Select, MenuItem, Typography, TextField, Button, Autocomplete, createFilterOptions, FormHelperText, ListSubheader, Menu, InputAdornment, FormControlLabel, Checkbox, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from 'react-redux';
import QuillToolbar, { modules, formats } from './EditToolbar';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import OutlookDialog from '../../../../components/OutlookDialog/OutlookDialog';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const styletitle = {
  fontWeight: 'bold'
}

const list_scan = ["scan", "send"]
const filter = createFilterOptions()

function TemplateForm({ openDialog, setOpenDialog }) {

  const dispatch = useDispatch()

  const [data, setData] = useState({
    name: '',
    object: '',
    fieldSubject: '',
    subject: '',
    field: '',
    description: '',
    type: ''
  })

  const [subject, setSubject] = useState('')

  const [body, setBody] = useState('')

  const [listFields, setListFields] = useState([])

  const listObject = useSelector(state => state.listObject)

  const listObjectsFields = useSelector(state => state.listObjectsFields)

  const quillRef = useRef(null)

  const reactQuillRef = useRef(null)

  const textFieldRef = useRef()

  const reactTextFieldRef = useRef(null)

  const [loading, setLoading] = useState(false)

  const [selectionStart, setSelectionStart] = useState();

  const template = useSelector(state => state.template)


  let textSubmit = ''

  useEffect(() => {
    if (template.status === 'createTemplateSuccess') {
      toast.success('Template is created', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setData({
        name: '',
        object: '',
        subject: '',
        fieldSubject: '',
        field: '',
        type: ''
      })
      setSubject('')
      setBody('')
      dispatch({ type: 'template/setTemplate', payload: { status: "idle" } })
    }
    else if (template.status === 'createTemplateError') {
      toast.error('Error in creating email', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch({ type: 'template/setTemplate', payload: { status: "idle" } })
    }
    setLoading(false)
    setOpenDialog(false)
  }, [template])

  const handleBody = (e) => {

    setBody(e)

  }

  useEffect(() => {
    attachQuillRef();
  });



  // HANDLE CHANGE INPUT
  const handleChangeData = (e) => {

    const value = e.target.value
    setData({
      ...data,
      [e.target.name]: value
    })
    if (e.target.name === 'subject'){
      setSubject(value)
    }
    // handle input field into insertion point
    if (e.target.name === 'field' && value !== '') {

      const range = quillRef.current.getSelection();
      let position = range ? range.index : 0;
      
      if (value[0].field_id){
        quillRef.current.insertText(position, `@${value[0].field_id}.@${value[0].obj_id}.@${value[1].field_id}`)
      }
      else{
        quillRef.current.insertText(position, `@${value[1].field_id}`)
      }
     
    }
    if (e.target.name === 'fieldSubject' && value !== '') {

      let position = typeof (selectionStart) === "number" ? selectionStart : 0
      let finalText = data.subject.slice(0, position) + `${value[0].obj_name}.${value[1].field_name}`  + data.subject.slice(position)
 
      if (value[0].field_id){
        textSubmit = data.subject.slice(0, position) + `${value[0].field_id}.${value[0].obj_id}.${value[1].field_id}`  + data.subject.slice(position)
      }
      else {
        textSubmit = data.subject.slice(0, position) + `${value[1].field_id}`  + data.subject.slice(position)
      }

      setSubject(textSubmit)
      setData({
        ...data,
        subject: finalText
      })
    }
    if (e.target.name === 'object' && value !== ''){
      // let listObjectRef = []
      let objectRefFields = []
      let copyList = JSON.parse(JSON.stringify(listObjectsFields))
      for (let i = 0; i < value.fields.length; i++){
        if (value.fields[i].field_type === 'ref_obj' || value.fields[i].field_type === 'ref_field_obj'){
          let result = copyList.filter((object) => object._id === value.fields[i].ref_obj_id_value)[0]
          if (objectRefFields.indexOf(result) <= -1){
            result["field_id"] = value.fields[i].field_id
            objectRefFields.push(result)

          }

        }
      }
      objectRefFields.splice(0, 0, value)
      setListFields(objectRefFields)

    }
  }

  const updateSelectionStart = () => {
    setSelectionStart(textFieldRef.current.selectionStart);

  }



  const attachQuillRef = () => {
    if (typeof reactQuillRef.current?.getEditor !== 'function') return

    if (quillRef.current !== null) return;

    const quill = reactQuillRef.current.getEditor();
    if (quill !== null) {
      quillRef.current = quill
    }
  }

  // const attachTextFieldRef = () => {
  //   if (typeof reactTextFieldRef.current?.getEditor !== 'function') return

  //   if (textFieldRef.current !== null) return;

  //   const textField = reactTextFieldRef.current.getEditor();
  //   if (textField !== null) {
  //     textFieldRef.current = textField
  //   }
  // }

  const handleTemplate = (e) => {
    e.preventDefault()

    let templateInfo = {}
    templateInfo["name"] = data.name
    templateInfo["object_id"] = data.object._id
    templateInfo["type"] = data.type
    templateInfo["body"] = body
    if (data.type === 'send'){

      templateInfo["subject"] = subject
      dispatch({ type: 'saga/createTemplate', payload: templateInfo })
    }
    else {
      dispatch({ type: 'saga/createTemplate', payload: templateInfo })
    }
    
    setLoading(true)
    //setOpenDialog(false)
  }


  const handleCloseDialog = () => {
    setOpenDialog(false)
    setData({
      name: '',
      object: '',
      subject: '',
      fieldSubject: '',
      field: '',
      type: ''
    })
    setSubject('')

  }

  const handleClickCreate = () => {
    //setOpenDialog(false)
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

  const renderSelectField = object => {
    const items = object.fields.map(field => {
      return (

            <MenuItem sx = {{marginLeft: '12px'}} key={field._id} value={[object,field]}>{field.field_name}</MenuItem>
         
      );
    });
    return [<ListSubheader sx={{ fontWeight: 'bold', color: 'black' }}>{object.field_id ? `${object?.obj_name} (Reference)` : `${object?.obj_name} (Main)`}</ListSubheader>, items]
  }

  return (
    <div>
      <OutlookDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        title='Create Template'
        minWidth="60%"
        minHeight='35%'
      >
        <form onSubmit={handleTemplate}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Typography sx={styletitle} color={"black"}>
                Name
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                type="text"
                placeholder='Input Template Name'
                name="name"
                required
                value={data.name}
                onChange={handleChangeData}
                sx={{ marginBottom: 0.5, width: '70%' }}
                InputProps={{
                  style: {
                    height: 40
                  }
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography sx={styletitle} color={"black"}>
                Description
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                type="text"
                placeholder='Input Template Description'
                name="description"
                required
                value={data.description}
                onChange={handleChangeData}
                sx={{ marginBottom: 0.5, width: '70%' }}
                InputProps={{
                  style: {
                    height: 40
                  }
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography sx={styletitle} color={"black"}>
                Object
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl sx={{ width: '70%', height: 40 }} size="small">
                <InputLabel id="input-object">Select Object</InputLabel>
                <Select
                  labelId='input-object'
                  label="Select Object"
                  name="object"
                  id='input-object'
                  value={data.object}
                  onChange={handleChangeData}
                  // error={!validFieldType && indexField === index}
                  required
                  style={{ height: '40px' }}
                >
                  {listObject?.map(p => renderSelectGroup(p))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={styletitle} color={"black"}>
                Type
              </Typography>
            </Grid>
            <Grid item xs={10}>
              {list_scan.map((option, index) => (
                <>
                  <FormControlLabel key={index}
                    control={
                      <Checkbox
                        name="type"
                        checked={data.type === option}
                        value={option}
                        required={data.type === ''}
                        onChange={handleChangeData}
                      />
                    }
                    label={option[0].toUpperCase() + option.slice(1)}
                  />

                </>
              ))}
            </Grid>
            {data.type === 'send' ? (
              <>
                <Grid item xs={2} sx ={{display: 'flex', flexDirection: 'row'}}>
                  <Typography sx={styletitle} color={"black"}>
                    Subject
                  </Typography>
                  <Tooltip title={'You can input field into your subject'}>
                    <IconButton sx={{ marginLeft: -1, marginBottom: 3 }} >
                      <HelpOutlineIcon sx={{ fontSize: '12px' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    onSelect={updateSelectionStart}
                    inputRef={textFieldRef}
                    type="text"
                    // fullWidth
                    placeholder='Input Subject'
                    name="subject"
                    required
                    value={data.subject}
                    onChange={handleChangeData}
                    sx={{ marginBottom: 0.5, width: '70%', padding: 0 }}
                    InputProps={{
                      style: {
                        height: 40,
                        paddingLeft: 0
                      },
                      startAdornment: (
                        <InputAdornment sx={{ backgroundColor: (theme) => theme.palette.divider, padding: "20px 5px" }} position="start">
                          {data.object !== '' ? `[${data.object.obj_id.substring(4, data.object.obj_id.length).toUpperCase()}.${data.object.fields[0]?.prefix}]` : ''}
                        </InputAdornment>
                      ),
                    }}
                  // inputProps={{
                  //   style: {
                  //     padding: 0
                  //   }
                  // }}
                  />

                </Grid>
                {data.object !== '' && (
                  <>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={10}>
                      <FormControl sx={{ width: '70%', height: 40 }} size="small" >
                        <InputLabel id="input-field">Field</InputLabel>
                        <Select
                          labelId='input-field'
                          label="Field"
                          name="fieldSubject"
                          id='input-field'
                          value={data.fieldSubject}
                          onChange={handleChangeData}
                          style={{ height: '40px' }}
                        >
                          {data.object.fields ? (
                            listFields.map(p=> renderSelectField(p))
                          ) : (
                            <MenuItem disabled value="">No fields</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                      {/* <FormHelperText>
                        You can input field into your subject
                      </FormHelperText> */}
                    </Grid>
                  </>
                )}
              </>
            ) : (
              null
            )}
            <Grid item xs={2}>
              <Typography sx={styletitle} color={"black"}>
                Body
              </Typography>
            </Grid>
            <Grid item xs={10} sx={{ paddingRight: 2 }} >
              <QuillToolbar object={data.object} data={data} handleChangeData={handleChangeData} listFields={listFields} renderSelectField={renderSelectField} />
              <ReactQuill
                style={{ height: '200px' }}
                theme='snow'
                name="content"
                ref={reactQuillRef}
                value={body}
                onChange={handleBody}
                modules={modules}
                formats={formats}
              />
            </Grid>
            <Grid item xs={10.3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <LoadingButton loading={loading} startIcon={<DoneIcon />} type='submit' variant="contained" onClick={handleClickCreate} >
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
    </div>

  )
}

export default TemplateForm