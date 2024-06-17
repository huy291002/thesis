import React, { useEffect, useState } from 'react'
import { styled, Dialog, DialogTitle, DialogContent, IconButton, Grid, FormControl, InputLabel, Select, MenuItem, Typography, TextField, Button, InputAdornment, Autocomplete, Card, TableContainer, TableHead, TableRow, TableSortLabel, TableCell, TableBody, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import ViewListIcon from '@mui/icons-material/ViewList';
import { LoadingButton } from '@mui/lab';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import OutlookDialog from '../../../components/OutlookDialog/OutlookDialog';
import RecordTableRef from './RecordTableRef';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import SearchIcon from '@mui/icons-material/Search';
import 'react-toastify/dist/ReactToastify.css';
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
const styleFieldType = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexDirection: 'column',

  height: '100%'
}

function RecordForm({ listRecord, openDialog, setOpenDialog, header, detailObject, edit, setEdit, infoRecord, page, rowsPerPage, setInfoRecord, finishWorkflow, setFinishWorkflow, checkMessage, setCheckMessage, loading, setLoading, data, setData, dateValue, setDateValue, multiRef }) {
  //const [data, setData] = useState({})

  const [openTable, setOpenTable] = useState(false)

  // const [IDField, setIDField] = useState('')
  const [idRecord, setIdRecord] = useState('')

  //const [loading, setLoading] = useState(false)

  const [viewRefObject, setViewRefObject] = useState(false)

  const [viewRefField, setViewRefField] = useState(false)

  const [idField, setIDField] = useState('')

  const createRecord = useSelector(state => state.createRecord)

  const [valueRefObject, setValueRefObject] = useState({})

  const [valueRefField, setValueRefField] = useState({})

  // const [dateValue, setDateValue] = useState(null)

  const [floatValue, setFloatValue] = useState('')

  const [editRefObject, setEditRefObject] = useState(false)

  const [editRefField, setEditRefField] = useState(false)

  const [chooseRecord, setChooseRecord] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    if (createRecord.status === "createRecordSuccess") {
      if (!checkMessage) {
  
        toast.success('Create record successfully', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setData({})
        setDateValue(null)
        setFinishWorkflow(true)
        dispatch({ type: 'createRecord/setCreateRecordStatus', payload: { status: "idle" } })
      }

    }
    else if (createRecord.status === "updateRecordSuccess") {
      if (!checkMessage) {
        toast.success('Update record successfully', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setData({})
        setEditRefField(false)
        setEditRefObject(false)
        // setDateValue(null)
        dispatch({ type: 'createRecord/setCreateRecordStatus', payload: { status: "idle" } })
      }

    }
    else if (createRecord.status === "createRecordError" || createRecord.status === "updateRecordError") {
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
      setData({})
      dispatch({ type: 'createRecord/setCreateRecordStatus', payload: { status: "idle" } })
    }
    setLoading(false)
    setOpenDialog(false)
    setValueRefObject({})
    setViewRefField({})
  }, [createRecord])
  // HANDLE CHANGE INPUT
  const handleChangeData = (e) => {
  
    const value = e.target.value
    setData({
      ...data,
      [e.target.name]: value
    })

  }

  const handleDateChange = (field, date) => {

    setDateValue(date)
    let dayFormatted = ''
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    let transFormDate = new Date(date)

    if (field.separator === '/') {

      if (field.format === 'YYYY MM DD') {
        dayFormatted = transFormDate.toLocaleDateString('en-ZA')
      }
      else if (field.format === 'DD MM YYYY') {
        dayFormatted = transFormDate.toLocaleDateString('en-GB')
      }
      // MM DD YYYY
      else {
        dayFormatted = transFormDate.toLocaleDateString('en-US', options)
      }
    }
    else {
      if (field.format === 'YYYY MM DD') {
        dayFormatted = transFormDate.toLocaleDateString('en-CA')
      }
      else if (field.format === 'DD MM YYYY') {
        dayFormatted = transFormDate.toLocaleDateString('nl-NL', options)
      }
      // MM DD YYYY
      else {
        let subDate = date.format().substring(0, 10)
        let newDate = new Date(subDate)
        let month = newDate.getMonth() + 1; // Months are zero indexed, so we add 1
        let day = newDate.getDate();
        let year = newDate.getFullYear();

        // Pad single digit day and month with leading zeros
        if (month < 10) {
          month = '0' + month;
        }
        if (day < 10) {
          day = '0' + day;
        }
        dayFormatted = month + '-' + day + '-' + year
      }
    }

    setData({
      ...data,
      [field.field_id]: dayFormatted
    })
  };

  const handleFloatValue = (event, field_id) => {

    setFloatValue(event.target.value)
    setData({
      ...data,
      [field_id]: parseFloat(event.target.value)
    })
  }


  const handleRecord = (e) => {
    e.preventDefault()

    data["object_id"] = detailObject._id

    if (!editRefField && !editRefObject && !edit) {
      dispatch({
        type: 'saga/createRecord', payload: {
          data: data,
          page: 1,
          rowsPerPage: rowsPerPage
        }
      })
    }
    else {
      data["record_id"] = infoRecord._id
      dispatch({
        type: 'saga/updateRecord', payload: {
          data: data,
          page: 1,
          rowsPerPage: rowsPerPage
        }

      })
    }

    setLoading(true)
    setOpenDialog(false)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setData({})
    setFloatValue('')
    setViewRefField(false)
    setViewRefObject(false)
    setValueRefField({})
    setValueRefObject({})
    setInfoRecord(null)
    setEdit(false)
  }

  const handleClickCreate = () => {
    //setOpenDialog(false)
  }

  const handleOpenTableRefObj = (id) => {

    //setIDField(id)
    setOpenTable(true)
    setViewRefObject(true)
    setViewRefField(false)
    setIDField(id)
    setEditRefField(false)
    setEditRefObject(false)
  }

  const handleOpenTableReField = (id) => {
    setOpenTable(true)
    setViewRefField(true)
    setViewRefObject(false)
    setIDField(id)
    setEditRefField(false)
    setEditRefObject(false)
  }


  const handleEditRefObj = (field) => {
    setIDField(field._id)
    setOpenTable(true)
    setViewRefField(false)
    setViewRefObject(false)
    setEditRefObject(true)
    setEditRefField(false)
    if (infoRecord[field.field_id]["ref_to"]) {
      setChooseRecord(true)
      setIdRecord(infoRecord[field.field_id]["ref_to"]["_id"])
    }
  }

  const handleEditRefField = (field) => {
    setIDField(field._id)
    setOpenTable(true)
    setViewRefField(false)
    setViewRefObject(false)
    setEditRefObject(false)
    setEditRefField(true)
    if (infoRecord[field.field_id]["ref_to"]) {
      setChooseRecord(true)
      setIdRecord(infoRecord[field.field_id]["ref_to"]["_id"])
    }
  }






  return (
    <>
      <OutlookDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        title={edit ? 'Update Record' : 'Create Record'}
        minWidth="55%"
        minHeight='35%'
      >
        <form onSubmit={handleRecord}>
          <Grid container spacing={1}>
            {header?.map((field, index) => (
              <>

                {edit ? (
                  <>
                    {field.field_type === 'id' && (
                      <>
                        <Grid key={index} item xs={1} >
                          <Typography sx={styletitle} color={"black"}>{`${field.field_name}`}</Typography>
                        </Grid>
                        <Grid item xs={7} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                          <Typography>{edit ? infoRecord[field.field_id] : ''}</Typography>
                        </Grid>
                      </>

                    )}
                  </>
                ) : null}

                {field.field_type === 'text' && (
                  <Grid key={index} item xs={6} >
                    <Typography sx={styletitle} color={"black"}>{`${field.field_name}`}</Typography>

                    <TextField
                      type="text"
                      sx={{ width: '90%', marginTop: 1 }}
                      name={`${field.field_id}`}
                      required
                      value={data[field.field_id] ? data[field.field_id] : '' || edit ? infoRecord[field.field_id] : ''}
                      onChange={handleChangeData}
                      // error={!validLastName}
                      // sx={{ marginBottom: 0.5 }}
                      InputProps={{
                        style: {
                          height: 40
                        }
                      }}
                    />

                  </Grid>
                )}
                {field.field_type === 'email' && (
                  <Grid key={index} item xs={6}>
                    <Typography sx={styletitle} color={"black"}>Email</Typography>

                    <TextField
                      type="text"
                      sx={{ width: '90%', marginTop: 1 }}
                      name={`${field.field_id}`}
                      placeholder='example@gmail.com'
                      required
                      value={data[field.field_id] ? data[field.field_id] : '' || edit ? infoRecord[field.field_id] : ''}
                      onChange={handleChangeData}
                      // error={!validLastName}
                      // sx={{ marginBottom: 0.5 }}
                      InputProps={{
                        style: {
                          height: 40
                        }
                      }}
                    />

                  </Grid>
                )}
                {field.field_type === 'select' && (
                  <Grid item xs={12} md={6} sx={{ ...styleFieldType }}>
                    <Typography sx={styletitle} color={"black"}>{`${field.field_name}`}</Typography>
                    <FormControl size='small' sx={{ width: '90%', marginTop: 1 }}>
                      <InputLabel id="input-label">{`Select ${field.field_name}`}</InputLabel>
                      <Select
                        labelId='input-label'
                        label={`Select ${field.field_name}`}
                        name={`${field.field_id}`}
                        id='input'
                        value={data[field.field_id] ? data[field.field_id] : '' || edit ? infoRecord[field.field_id] : ''}
                        onChange={handleChangeData}
                        // error={!validFieldType && indexField === index}
                        required
                        style={{ height: "40px" }}
                      >
                        {field.options.map((name, index) => (
                          <MenuItem key={index} value={name}>{name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                {field.field_type === 'phonenumber' && (
                  <Grid key={index} item xs={12}>
                    <Typography sx={styletitle} color={"black"}>Phone Number</Typography>

                    <TextField
                      type="number"
                      sx={{ width: '90%', marginTop: 1 }}
                      name={`${field.field_id}`}
                      required
                      value={data[field.field_id] ? data[field.field_id] : '' || edit ? infoRecord[field.field_id] : ''}
                      onChange={handleChangeData}
                      // error={!validLastName}
                      // sx={{ marginBottom: 0.5 }}
                      InputProps={{
                        style: {
                          height: 40
                        }
                      }}
                    />

                  </Grid>
                )}
                {field.field_type === 'float' && (
                  <Grid key={index} item xs={6}>
                    <Typography sx={styletitle} color={"black"}>{`${field.field_name}`}</Typography>

                    <TextField
                      type="text"
                      sx={{ width: '90%', marginTop: 1 }}
                      name={`${field.field_id}`}
                      required
                      value={floatValue ? floatValue : '' || edit ? infoRecord[field.field_id] : ''}
                      onChange={(event) => handleFloatValue(event, field.field_id)}
                      // error={!validLastName}
                      // sx={{ marginBottom: 0.5 }}
                      InputProps={{
                        style: {
                          height: 40
                        }
                      }}
                    />

                  </Grid>
                )}
                {field.field_type === 'date' && (
                  <>
                    <Grid key={index} item xs={6}>
                      <Typography sx={styletitle} color={"black"}>{`${field.field_name}`}</Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>

                        <DatePicker
                          name={`${field.field_id}`}
                          value={dateValue ? dateValue : null || edit ? dayjs(infoRecord[field.field_id]) : null}
                          onChange={(newValue) => handleDateChange(field, newValue)}
                          views={field.format === 'YYYY MM DD' && ['year', 'month', 'day'] || field.format === 'DD MM YYYY' && ['day', 'month', 'year'] || field.format === 'MM DD YYYY' && ['month', 'day', 'year']}
                          format={field.format.replace(/\s/g, `${field.separator}`)}
                          slotProps={{
                            textField: {
                              InputProps: {
                                style: {
                                  height: 40
                                }
                              }
                            }
                          }}
                          sx={{ width: '90%' }}
                        />

                      </LocalizationProvider>

                    </Grid>
                  </>
                )}
                {field.field_type === 'textarea' && (
                  <Grid key={index} item xs={12}>
                    <Typography sx={styletitle} color={"black"}>{`${field.field_name}`}</Typography>
                    <TextField
                      type="number"
                      sx={{ width: '95%' }}
                      multiline
                      rows={6}
                      name={`${field.field_id}`}
                      required
                      value={data[field.field_id] ? data[field.field_id] : '' || edit ? infoRecord[field.field_id] : ''}
                      onChange={handleChangeData}
                    // error={!validLastName}
                    // sx={{ marginBottom: 0.5 }}

                    />

                  </Grid>
                )}
                {field.field_type === 'ref_obj' && (
                  <>
                    {edit ? (
                      <>
                        {header.length > 1 && index !== 1 && (
                          <Grid item xs={12}>
                            <Divider sx={{ color: 'black' }} />
                          </Grid>
                        )}
                        <Grid key={index} item container spacing={1} >
                          <Grid item xs={12}>
                            <Typography sx={styletitle} variant='h5' >{`${field.field_name}`}</Typography>
                          </Grid>
                          {field.ref_field.map((ref, indexref) => (
                            <>

                              <Grid key={indexref} item xs={6}>
                                <Typography sx={{ ...styletitle, color: '#696969' }} >{`${ref.field_name}`}</Typography>
                                <TextField
                                  type="text"
                                  // fullWidth
                                  sx={{ width: '90%' }}
                                  name={`${field.field_id}`}
                                  required={!editRefField && !editRefObject}
                                  value={infoRecord[field.field_id]["ref_to"] && typeof (infoRecord[field.field_id]["ref_to"][ref.field_id]) !== 'object' ? infoRecord[field.field_id]["ref_to"][ref.field_id] : infoRecord[field.field_id]["ref_to"][ref.field_id]["ref_to"][infoRecord[field.field_id]["ref_to"][ref.field_id]["field_value"]]}
                                  // onChange={handleChangeData}
                                  disabled={ref.field_type !== 'id'}
                                  // error={!validLastName}
                                  // sx={{ marginBottom: 0.5 }}
                                  InputProps={{
                                    style: {
                                      height: 40
                                    },
                                    endAdornment: (
                                      <>
                                        {ref.field_type === 'id' ? (
                                          <InputAdornment position="end">
                                            <IconButton onClick={() => handleEditRefObj(field)} edge="end">
                                              <SearchIcon />
                                            </IconButton>
                                          </InputAdornment>
                                        ) : null}

                                      </>
                                    ),
                                  }}
                                />
                              </Grid>
                              {editRefObject === true && field._id === idField && (
                                <RecordTableRef
                                  field={field}
                                  listRecord={listRecord}
                                  data={data}
                                  setData={setData}
                                  // handleChangeData={handleChangeData}
                                  field_id={editRefObject === true && openTable === true ? field.field_id : ''}
                                  openTable={openTable}
                                  setOpenTable={setOpenTable}
                                  // IDField={IDField}
                                  // id={field._id}
                                  setViewRefObject={setViewRefObject}
                                  setViewRefField={setViewRefField}
                                  viewRefField={viewRefField}
                                  viewRefObject={viewRefObject}
                                  valueRefObject={valueRefObject}
                                  setValueRefObject={setValueRefObject}
                                  edit={edit}
                                  idRecord={idRecord}
                                  setIdRecord={setIdRecord}
                                  editRefObject={editRefObject}
                                  editRefField={editRefField}
                                  chooseRecord={chooseRecord}
                                  setChooseRecord={setChooseRecord}
                                  infoRecord={infoRecord}
                                  setInfoRecord={setInfoRecord}
                                //idObject={detailObject._id}
                                // setIDField={setIDField}
                                />
                              )}
                            </>
                          ))}
                          {header.length > 1 && index !== header.length - 1 && header[index + 1].field_type !== 'ref_obj' && (
                            <Grid item xs={12}>
                              <Divider sx={{ color: 'black' }} />
                            </Grid>
                          )}
                        </Grid>

                      </>

                    ) : (
                      <>
                        <Grid key={index} item xs={6}>
                          <Typography sx={styletitle} color={"black"}>{`${field.field_name}`}</Typography>
                          <TextField
                            type="text"
                            sx={{ width: '90%' }}
                            name={`${field.field_id}`}
                            required
                            value={valueRefObject[field.field_id]}
                            // onChange={handleChangeData}
                            disabled
                            // error={!validLastName}
                            // sx={{ marginBottom: 0.5 }}
                            InputProps={{
                              style: {
                                height: 40
                              },
                              endAdornment: (

                                <InputAdornment position="end">
                                  <IconButton onClick={() => handleOpenTableRefObj(field._id)} edge="end">
                                    <SearchIcon />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />

                        </Grid >
                        {viewRefObject === true && field._id === idField && (
                          <RecordTableRef
                            field={field}
                            listRecord={listRecord}
                            data={data}
                            setData={setData}
                            // handleChangeData={handleChangeData}
                            field_id={viewRefObject === true && openTable === true ? field.field_id : ''}
                            openTable={openTable}
                            setOpenTable={setOpenTable}
                            // IDField={IDField}
                            // id={field._id}
                            setViewRefObject={setViewRefObject}
                            setViewRefField={setViewRefField}
                            viewRefField={viewRefField}
                            viewRefObject={viewRefObject}
                            valueRefObject={valueRefObject}
                            setValueRefObject={setValueRefObject}
                            edit={edit}
                            idRecord={idRecord}
                            setIdRecord={setIdRecord}
                            editRefObject={editRefObject}
                            editRefField={editRefField}
                            chooseRecord={chooseRecord}
                            setChooseRecord={setChooseRecord}
                            infoRecord={infoRecord}
                            setInfoRecord={setInfoRecord}
                          //idObject={detailObject._id}
                          // setIDField={setIDField}
                          />
                        )}
                      </>
                    )}


                  </>
                )}
                {field.field_type === 'ref_field_obj' && (
                  <>
                    {edit ? (
                      <>
                        {header.length > 1 && index !== 0 && (
                          <Grid item xs={12}>
                            <Divider sx={{ color: 'black' }} />
                          </Grid>

                        )}
                        <Grid key={index} item container spacing={1}>
                          <Grid item xs={12} sx={{ marginBottom: 1 }}>
                            <Typography variant='h5' sx={styletitle} color={"black"}>{`${field.field_name}`}</Typography>
                          </Grid>
                          {field.ref_field.map((ref, indexref) => (
                            <>
                              <Grid key={indexref} item xs={6}>
                                <Typography sx={{ ...styletitle, color: '#696969' }} >{`${ref.field_name}`}</Typography>
                                <TextField
                                  type="text"
                                  // fullWidth
                                  sx={{ width: '90%' }}
                                  name={`${field.field_id}`}
                                  required
                                  value={infoRecord[field.field_id]["ref_to"] && typeof (infoRecord[field.field_id]["ref_to"][ref.field_id]) !== 'object' ? infoRecord[field.field_id]["ref_to"][ref.field_id] : infoRecord[field.field_id]["ref_to"][ref.field_id]["ref_to"][infoRecord[field.field_id]["ref_to"][ref.field_id]["field_value"]]}
                                  // onChange={handleChangeData}
                                  disabled={infoRecord[field.field_id]["field_value"] !== ref.field_id || multiRef[field.field_id]}
                                  // error={!validLastName}
                                  // sx={{ marginBottom: 0.5 }}
                                  InputProps={{
                                    style: {
                                      height: 40
                                    },
                                    endAdornment: (
                                      <>
                                        {!multiRef[field.field_id] && infoRecord[field.field_id]["field_value"] === ref.field_id ? (
                                          <InputAdornment position="end">
                                            <IconButton onClick={() => handleEditRefField(field)} edge="end">
                                              <SearchIcon />
                                            </IconButton>
                                          </InputAdornment>
                                        ) : null}

                                      </>
                                    ),
                                  }}
                                />
                              </Grid>
                              {(editRefField === true && field._id === idField) ? (
                                <RecordTableRef
                                  field={field}
                                  listRecord={listRecord}
                                  data={data}
                                  setData={setData}
                                  // handleChangeData={handleChangeData}
                                  field_id={editRefField === true && openTable === true ? field.field_id : ''}
                                  openTable={openTable}
                                  setOpenTable={setOpenTable}
                                  // IDField={IDField}
                                  // id={field._id}
                                  setViewRefObject={setViewRefObject}
                                  setViewRefField={setViewRefField}
                                  viewRefField={viewRefField}
                                  viewRefObject={viewRefObject}
                                  valueRefField={valueRefField}
                                  setValueRefField={setValueRefField}
                                  editRefObject={editRefObject}
                                  editRefField={editRefField}
                                  chooseRecord={chooseRecord}
                                  setChooseRecord={setChooseRecord}
                                  idRecord={idRecord}
                                  setIdRecord={setIdRecord}
                                  infoRecord={infoRecord}
                                  setInfoRecord={setInfoRecord}
                                //idObject={detailObject._id}
                                // setIDField={setIDField}
                                />
                              ) : null}
                            </>
                          ))}
                          {header.length > 1 && index !== header.length - 1 && (
                            <Grid item xs={12}>
                              <Divider sx={{ color: 'black' }} />
                            </Grid>
                          )}
                        </Grid>
                      </>

                    ) : (
                      <>
                        <Grid key={index} item xs={6}>
                          <Typography sx={styletitle} color={"black"}>{`${field.field_name}`}</Typography>
                          <TextField
                            type="text"
                            sx={{ width: '90%' }}
                            name={`${field.field_id}`}
                            required
                            value={valueRefField[field.field_id]}
                            // onChange={handleChangeData}
                            disabled
                            // error={!validLastName}
                            // sx={{ marginBottom: 0.5 }}
                            InputProps={{
                              style: {
                                height: 40
                              },
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={() => handleOpenTableReField(field._id)} edge="end">
                                    <SearchIcon />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        {(viewRefField === true && field._id === idField) ? (
                          <RecordTableRef
                            field={field}
                            listRecord={listRecord}
                            data={data}
                            setData={setData}
                            // handleChangeData={handleChangeData}
                            field_id={viewRefField === true && openTable === true ? field.field_id : ''}
                            openTable={openTable}
                            setOpenTable={setOpenTable}
                            // IDField={IDField}
                            // id={field._id}
                            setViewRefObject={setViewRefObject}
                            setViewRefField={setViewRefField}
                            viewRefField={viewRefField}
                            viewRefObject={viewRefObject}
                            valueRefField={valueRefField}
                            setValueRefField={setValueRefField}
                            editRefObject={editRefObject}
                            editRefField={editRefField}
                            chooseRecord={chooseRecord}
                            setChooseRecord={setChooseRecord}
                            idRecord={idRecord}
                            setIdRecord={setIdRecord}
                            infoRecord={infoRecord}
                            setInfoRecord={setInfoRecord}
                          //idObject={detailObject._id}
                          // setIDField={setIDField}
                          />
                        ) : null}
                      </>
                    )}
                  </>
                )}
              </>
            ))}
            <Grid item xs={10.45} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
        </form >
      </OutlookDialog >
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
    //   </DialogContent>
    // </BootstrapDialog>
  )
}

export default RecordForm