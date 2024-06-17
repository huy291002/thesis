import { Button, Grid, Table, TableContainer, TableHead, TableRow, Paper, TableCell, TableBody, Toolbar, Card, CardHeader, CardContent, Stepper, Step, StepLabel, StepContent, Box, FormControl, InputLabel, Select, MenuItem, ListSubheader, Stack, Typography, Link, Divider, TableSortLabel, IconButton, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AIPrepareForm from './Child Component/AI/AIPrepareForm'
import { useDispatch, useSelector } from 'react-redux'
import SendIcon from '@mui/icons-material/Send';
import TableData from './Child Component/AI/TableData';
import ModelTrain from './Child Component/AI/ModelTrain';
import ConfigTrainForm from './Child Component/AI/ConfigTrainForm';
import ResultAI from './Child Component/AI/ResultAI';
import ModelForm from './Child Component/AI/ModelForm';
import { AppWebsiteVisits } from '../sections/@dashboard/app';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HistogramChart from './Child Component/AI/HistogramChart';
import Iconify from '../components/iconify/Iconify';
import HeatMapChart from './Child Component/AI/HeatMapChart';
import TableProcessedData from './Child Component/AI/TableProcessedData';
// import "hammerjs";
// import {
//     Chart,
//     ChartSeries,
//     ChartSeriesItem,
// } from "@progress/kendo-react-charts";
// import { makeDataObjects } from './Child Component/AI/makeDataObjects';
//import { makeDataObjects } from './Child Component/AI/makeDataObjects';

const list_step = [
    {
        id: '0',
        label: 'Select Model'
    },
    {
        id: '1',
        label: 'Processed data'
    },
    {
        id: '2',
        label: 'Model Training'
    }
]

const TABLE_HEAD = [
    { id: 'Model name', label: 'Model name', alignRight: 'false' },
    { id: 'Model Description', label: 'Model description', alignRight: 'false' },
    { id: 'Dataset', label: 'Dataset', alignRight: 'false' },
    { id: '' }
]

const styletitle = {
    fontWeight: 'bold'
}


const fake_data_model = [
    {
        _id: '1',
        model_name: 'Model 1',
        model_description: 'First Model',
        dataset_name: 'Dataset 1'
    },
    {
        _id: '2',
        model_name: 'Model 2',
        model_description: 'Second Model',
        dataset_name: 'Dataset 2'
    },
    {
        _id: '3',
        model_name: 'Model 3',
        model_description: 'Third Model',
        dataset_name: 'Dataset 3'
    },
]

let fake_field = [
    {
        _id: '1',
        field_id: 'fd_neg_918971',
        field_name: 'Neg'
    },
    {
        _id: '2',
        field_id: 'fd_pos_917575',
        field_name: 'Pos'
    },
    {
        _id: '3',
        field_id: 'fd_title_282579',
        field_name: 'Title'
    },
    {
        _id: '4',
        field_id: 'fd_score_892529',
        field_name: 'Score'
    },
]


function AIPreparePage() {

    const [validModelName, setValidModelName] = useState(true)

    const [validModelDescription, setValidModelDescription] = useState(true)

    const [object, setObject] = useState([])

    const [dataConfig, setDataConfig] = useState({
        epoch: 30,
        hiddenSize: 64,
        patchSize: 64
    })

    const [model, setModel] = useState({
        name: '',
        description: ''
    })

    const [loading, setLoading] = useState(false)

    const [alreaddyDataset, setAlreadyDataset] = useState(false)

    const [saveModel, setSaveModel] = useState(false)

    const [openModelDialog, setOpenModelDialog] = useState(false)

    const [activeStep, setActiveStep] = useState(0)

    const [openAIDialog, setOpenAIDialog] = useState(false)

    const [fieldFeature, setFieldFeature] = useState([])

    const [data, setData] = useState({
        name: '',
        description: '',
        fieldLabel: ''
    })

    const [infoModel, setInfoModel] = useState({})

    const [allField, setAllField] = useState([])

    const [saveClick, setSaveClick] = useState(false)

    const [processedData, setProcessedData] = useState(false)

    const [chooseModel, setChooseModel] = useState(false)

    const [config, setConfig] = useState(false)

    const dispatch = useDispatch()

    const listObjectsFields = useSelector(state => state.listObjectsFields)

    const listRecord = useSelector(state => state.listRecord)

    const event = useSelector(state => state.event)

    const listObject = useSelector(state => state.listObject)

    const statusProcess = useSelector(state => state.statusProcess)

    const listRecordProcessed = useSelector(state => state.listRecordProcessed)

    const loadingDataset = useSelector(state => state.loadingDataset)

    const processedDataStatus = useSelector(state => state.processedDataStatus)

    const listModel = useSelector(state => state.listModel)

    const [text, setText] = useState('')

    const handleChangeText = (e) => {
        setText(e.target.value)
    }

    const loadingText = useSelector(state => state.loadingText)

    const handleTest = () => {
        dispatch({type: 'saga/getResult', payload: {
            text: text,
            model_id: infoModel.model_id
        }})
        dispatch({type: 'loadingText/setLoadingText', payload: true})
    }


    useEffect(() => {
        dispatch({ type: 'saga/getListModel' })
    }, [])

    useEffect(() => {

    }, [])



    useEffect(() => {

    }, [listRecordProcessed])

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleModelChange = (e) => {
        const value = e.target.value
        setModel({
            ...model,
            [e.target.name]: value
        })
    }

    const handleDataChange = (e) => {
        const value = e.target.value
        setData({
            ...data,
            [e.target.name]: value
        })
    }

    const handleObjectChange = (e) => {
        const value = e.target.value

        if (value[0].name !== 'AI Datasets') {
            setObject(value[1])
            setOpenAIDialog(true)
            setAlreadyDataset(false)
        }
        else {
            let copyObject = JSON.parse(JSON.stringify(listObjectsFields))
            setObject(value[1])
            const getObject = copyObject.filter((object) => object._id === value[1]._id)[0]
            setAllField(getObject.fields)
            setAlreadyDataset(true)
            dispatch({
                type: 'saga/getAlreadyDataset', payload: getObject.obj_id
            })
        }
    }

    const handleDataConfigChange = (e) => {
        const value = e.target.value
        setDataConfig({
            ...dataConfig,
            [e.target.name]: value
        })
    }

    const handleOpenAIDialog = () => {
        setOpenAIDialog(true)
    }

    const handleFieldFeature = (event) => {
        const {
            target: { value },
        } = event;
        setFieldFeature(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );


    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (saveClick) {
            let listField = []
            let getListField = [...fieldFeature]
            getListField.push(data.fieldLabel)
            setAllField(getListField)
            dispatch({
                type: 'saga/getListRecord', payload: {
                    object_id: object._id,
                    page: 1,
                    rowsPerPage: 5
                }
            })
            setOpenAIDialog(false)
        }
    }

    /// API Call Train
    const handleSubmitConfig = (e) => {
        e.preventDefault()
        dispatch({ type: 'saga/trainAI', payload: 'hello' })
        setConfig(true)
    }



    const handleSave = () => {
        setSaveClick(true)
    }

    const handleProcessedData = () => {
        // setProcessedData(true)
        let data_processed = {}
        data_processed['obj_id'] = object._id
        data_processed["obj_id_str"] = object.obj_id
        data_processed['features'] = fieldFeature.map((field) => field.field_id)
        data_processed['label'] = data.fieldLabel.field_id
        data_processed['dataset_name'] = data.name
        data_processed['dataset_description'] = data.description


        dispatch({ type: 'saga/processedData', payload: data_processed })
        dispatch({ type: 'loadingDataset/setLoadingDataset', payload: true })
    }

    const renderSelectGroupObject = group => {
        const items = group?.objects?.map(object => {
            return (
                <MenuItem sx={{ marginLeft: '12px' }} key={object._id} value={[group, object]}>{object.obj_name}</MenuItem>
            );
        });
        return [<ListSubheader sx={{ fontWeight: 'bold', color: 'black' }}>{group?.name}</ListSubheader>, items];
    };

    const handleChooseModel = (_id) => {
        const getModel = listModel.filter((model) => model._id === _id)[0]
        dispatch({ type: 'saga/getDataset', payload: getModel.dataset_obj_id })
        setInfoModel(getModel)
        setChooseModel(true)
        setActiveStep((prevActiveStep) => prevActiveStep + 1)

    }

    const result = useSelector(state => state.result)

    return (
        <>

            <Stack sx={{ width: '100%', marginTop: 1 }} spacing={4}>
                <Stepper alternativeLabel activeStep={activeStep} >
                    {list_step.map((step, index) => (
                        <Step key={step.id}>
                            {index === 1 ? (
                                <>
                                    <StepLabel optional={
                                        <Grid item xs={12} sx={{ marginTop: -0.25 }} variant="caption">{saveModel ? model.name : ''}</Grid>
                                    }>{step.label}</StepLabel>

                                </>
                            ) : (
                                <StepLabel >{step.label}</StepLabel>
                            )}

                        </Step>
                    ))}
                </Stepper>
            </Stack>
            {activeStep === 0 && (
                <>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Grid item container spacing={1}>
                                <Grid item xs={12}>
                                    {listModel ? (
                                        <Card>
                                            <TableContainer>
                                                <Table >
                                                    <TableHead>
                                                        <TableRow sx={{
                                                            '& .MuiTableCell-head': {
                                                                backgroundColor: '#cfd8dc',
                                                                lineHeight: 0.75
                                                            }
                                                        }}>
                                                            {TABLE_HEAD.map((headCell) => (
                                                                <TableCell
                                                                    key={headCell.id}
                                                                >
                                                                    <TableSortLabel
                                                                        hideSortIcon
                                                                        sx={{ fontWeight: 'bold', color: 'black' }}
                                                                    >
                                                                        {headCell.label}
                                                                    </TableSortLabel>
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {listModel.map((row) => {
                                                            const { _id, name, description, dataset_name } = row
                                                            return (
                                                                <TableRow key={_id} style={{ height: '20px' }}>
                                                                    <TableCell align='left' sx={{ fontSize: '15px' }}>{name}</TableCell>
                                                                    <TableCell align='left' sx={{ fontSize: '15px' }}>{description}</TableCell>
                                                                    <TableCell align='left' sx={{ fontSize: '15px' }}>{dataset_name}</TableCell>
                                                                    <TableCell align="right">
                                                                        <IconButton color="inherit" onClick={() => handleChooseModel(_id)}>
                                                                            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Card>
                                    ) : null}

                                </Grid>
                                {/* {!chooseModel ? (
                                    <Grid item xs={12}>

                                        <Button onClick={handleNext} variant='outlined'>
                                            Add New Model
                                        </Button>

                                    </Grid>
                                ) : (
                                    <Grid item xs={12}>
                                        <Card sx={{ height: '320px', width: '100%' }}>
                                            <CardHeader title='Evaluation Metrics' />
                                            <CardContent>
                                                <ResultAI />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )} */}

                            </Grid>

                        </Grid>
                        {/* {chooseModel ? (
                            <>
                                <Grid item container spacing={1}>
                                    <Grid item xs={12}>
                                        <HeatMapChart />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button onClick={handleNext} variant='outlined'>
                                            Add New Model
                                        </Button>
                                    </Grid>
                                </Grid>
                            </>
                        ) : null} */}
                        <Grid item xs={11} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant='contained' onClick={handleNext}>
                                Continue
                            </Button>
                        </Grid>
                        <Grid item xs={0.75}>
                            <Button variant='contained' disabled >
                                Back
                            </Button>
                        </Grid>

                    </Grid>
                </>
            )
            }
            {
                activeStep === 1 && (

                    <Grid container spacing={1}>
                        {!chooseModel ? (
                            <Grid item xs={12}>
                                <FormControl sx={{ width: '30%' }}>
                                    <InputLabel id="input-object">Select Object</InputLabel>
                                    <Select
                                        labelId='object'
                                        label="Select Object"
                                        name="object"
                                        id='input-object'
                                        value={object}
                                        onChange={handleObjectChange}
                                        required
                                        style={{ height: 50 }}
                                        renderValue={(select) => {
 
                                            return select.obj_name
                                        }}
                                    >
                                        {listObject?.map(p => renderSelectGroupObject(p))}
                                    </Select>
                                </FormControl>
                                <AIPrepareForm handleSave={handleSave} handleSubmit={handleSubmit} object={object} data={data} handleDataChange={handleDataChange} fieldFeature={fieldFeature} setFieldFeature={setFieldFeature} handleFieldFeature={handleFieldFeature} listObject={listObject} openAIDialog={openAIDialog} setOpenAIDialog={setOpenAIDialog} />
                                <ModelForm openModelDialog={openModelDialog} setOpenModelDialog={setOpenModelDialog} model={model} handleModelChange={handleModelChange} setSaveModel={setSaveModel} validModelName={validModelName} setValidModelName={setValidModelName} validModelDescription={validModelDescription} setValidModelDescription={setValidModelDescription} />
                            </Grid>
                        ) : null}

                        {!alreaddyDataset && !chooseModel ? (
                            <>
                                {saveClick ? (
                                    <>
                                        <Grid item xs={5} sx={{ marginLeft: 5, boxShadow: 1000 }}>
                                            <Card>
                                                <TableContainer component={Paper} sx={{ boxShadow: 1000 }}>
                                                    <Table sx={{ minWidth: 500 }} aria-label="spanning table">
                                                        <TableHead>
                                                            <TableRow sx={{
                                                                '& .MuiTableCell-head': {
                                                                    backgroundColor: '#cfd8dc',
                                                                    lineHeight: 0.75
                                                                }
                                                            }}>
                                                                <TableCell sx={{ borderBottomColor: 'black', borderBottomStyle: 'solid', borderRightStyle: 'solid', borderRightColor: '#90a4ae', color: 'black', borderRight: '1' }} align="center" colSpan={fieldFeature.length}>
                                                                    Input
                                                                </TableCell>

                                                                <TableCell sx={{ borderBottomColor: 'black', borderBottomStyle: 'solid', color: 'black' }} align="center">Label</TableCell>
                                                            </TableRow>
                                                            <TableRow sx={{
                                                                '& .MuiTableCell-head': {
                                                                    backgroundColor: '#cfd8dc',
                                                                    lineHeight: 0.75

                                                                }
                                                            }}>
                                                                {allField.map((headCell, index) => (
                                                                    <>
                                                                        {index === allField.length - 2 ? (
                                                                            <TableCell align='center' sx={{ borderRightStyle: 'solid', color: 'black', borderRightColor: '#90a4ae' }} key={headCell._id}>
                                                                                {headCell.field_name}
                                                                            </TableCell>
                                                                        ) : (
                                                                            <TableCell sx={{ color: 'black' }} align='center' key={headCell._id}>
                                                                                {headCell.field_name}
                                                                            </TableCell>
                                                                        )}
                                                                    </>

                                                                ))}
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableData
                                                            allField={allField}
                                                            listRecord={listRecord}
                                                        />
                                                    </Table>
                                                </TableContainer>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <LoadingButton loading={loadingDataset} onClick={handleProcessedData} variant='outlined' endIcon={<SendIcon />} disabled={processedDataStatus && !loadingDataset}>
                                                Preprocess
                                            </LoadingButton>
                                        </Grid>
                                    </>
                                ) : null}
                                {processedDataStatus && !loadingDataset ? (
                                    <>
                                        <Grid item xs={5} sx={{ marginLeft: 1, boxShadow: 1000 }}>
                                            <Card>
                                                <TableContainer component={Paper} sx={{ boxShadow: 1000 }}>
                                                    <Table sx={{ minWidth: 500 }} aria-label="spanning table">
                                                        <TableHead>
                                                            <TableRow sx={{
                                                                '& .MuiTableCell-head': {
                                                                    backgroundColor: '#cfd8dc',
                                                                    lineHeight: 0.75

                                                                }
                                                            }}>
                                                                <TableCell sx={{ color: 'black', borderBottomColor: 'black', borderBottomStyle: 'solid' }} align="center" colSpan={allField.length}>
                                                                    Processed Data
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow sx={{
                                                                '& .MuiTableCell-head': {
                                                                    backgroundColor: '#cfd8dc',
                                                                    lineHeight: 0.75

                                                                }
                                                            }}>
                                                                {allField.map((headCell, index) => (
                                                                    <>
                                                                        {index === allField.length - 2 ? (
                                                                            <TableCell align='center' sx={{ borderRightStyle: 'solid', color: 'black', borderRightColor: '#90a4ae' }} key={headCell._id}>
                                                                                {headCell.field_name}
                                                                            </TableCell>
                                                                        ) : (
                                                                            <TableCell sx={{ color: 'black' }} align='center' key={headCell._id}>
                                                                                {headCell.field_name}
                                                                            </TableCell>
                                                                        )}
                                                                    </>

                                                                ))}
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableProcessedData

                                                            allField={allField}
                                                            fieldMapping={listRecordProcessed["field_mapping"]}
                                                            listRecordProcessed={listRecordProcessed["records"]}
                                                        />
                                                    </Table>
                                                </TableContainer>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <HistogramChart
                                                title="Label Histogram"
                                                subheader=""
                                                chartLabels={listRecordProcessed["labels"]}
                                                chartData={[
                                                    {
                                                        name: 'Team A',
                                                        type: 'column',
                                                        fill: 'solid',
                                                        data: listRecordProcessed["counts"],
                                                    },
                                                ]}
                                                type='new'
                                            />
                                        </Grid>
                                        <Grid item xs={11} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button variant='contained' onClick={handleNext}>
                                                Continue
                                            </Button>
                                        </Grid>
                                        <Grid item xs={0.75}>
                                            <Button variant='contained' >
                                                Back
                                            </Button>
                                        </Grid>

                                    </>
                                ) : null}
                            </>
                        ) : (
                            <>
                                {listRecordProcessed["records"].length > 0 ? (
                                    <>
                                        <Grid item xs={6} sx={{ marginLeft: 0, boxShadow: 1000 }}>
                                            <Card>
                                                <TableContainer component={Paper} sx={{ boxShadow: 1000 }}>
                                                    <Table sx={{ minWidth: 500 }} aria-label="spanning table">
                                                        <TableHead>
                                                            <TableRow sx={{
                                                                '& .MuiTableCell-head': {
                                                                    backgroundColor: '#cfd8dc'

                                                                }
                                                            }}>
                                                                <TableCell sx={{ color: 'black' }} align="center" colSpan={fake_field.length}>
                                                                    Processed Data
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow sx={{
                                                                '& .MuiTableCell-head': {
                                                                    backgroundColor: '#cfd8dc'

                                                                }
                                                            }}>
                                                                {fake_field.map((headCell, index) => (
                                                                    <>
                                                                        {index === fake_field.length - 2 ? (
                                                                            <TableCell align='center' sx={{ borderRightStyle: 'solid', color: 'black', borderRightColor: '#90a4ae' }} key={headCell._id}>
                                                                                {headCell.field_name}
                                                                            </TableCell>
                                                                        ) : (
                                                                            <TableCell sx={{ color: 'black' }} align='center' key={headCell._id}>
                                                                                {headCell.field_name}
                                                                            </TableCell>
                                                                        )}
                                                                    </>

                                                                ))}
                                                            </TableRow>
                                                        </TableHead>
                                                        {/* <TableData
                                                allField={allField}
                                                listRecord={listRecordProcessed["records"]}
                                            /> */}
                                                        <TableProcessedData
                                                            allField={fake_field}
                                                            listRecordProcessed={listRecordProcessed["records"]}
                                                            fieldMapping={listRecordProcessed["field_mapping"]}
                                                        />
                                                    </Table>
                                                </TableContainer>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <HistogramChart
                                                title="Label Histogram"
                                                subheader=""
                                                chartLabels={listRecordProcessed["labels"]}
                                                chartData={[
                                                    {
                                                        name: 'Team A',
                                                        type: 'column',
                                                        fill: 'solid',
                                                        data: listRecordProcessed["counts"],
                                                    },
                                                ]}
                                                type='chosen'
                                            />
                                        </Grid>
                                        <Grid item xs={11} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button variant='contained' onClick={handleNext}>
                                                Continue
                                            </Button>
                                        </Grid>
                                        <Grid item xs={0.75}>
                                            <Button variant='contained' onClick={handleBack}>
                                                Back
                                            </Button>
                                        </Grid>
                                    </>
                                ) : (null)}

                            </>

                        )}

                    </Grid>

                )
            }
            {
                activeStep === 2 && (
                    <Grid container spacing={1}>
                        <Grid item xs={4} sx={{ marginLeft: 0 }}>
                            <Grid item container spacing={1}>
                                {!chooseModel ? (
                                    <Grid item xs={12}>
                                        <Card sx={{ height: '325px' }}>
                                            <CardHeader title='Config Training' />
                                            <CardContent>
                                                <ConfigTrainForm handleSubmitConfig={handleSubmitConfig} dataConfig={dataConfig} handleDataConfig={handleDataConfigChange} />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ) : null}

                                <Grid item xs={12}>
                                    {config || chooseModel ? (
                                        <Card sx={{ height: '320px', width: '100%' }}>
                                            <CardHeader title='Evaluation Metrics' />
                                            <CardContent>
                                                <ResultAI infoModel={infoModel} />
                                            </CardContent>
                                        </Card>
                                    ) : (
                                        null
                                    )}
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={8} sx={{ display: 'flex' }}>
                            {config || chooseModel ? (
                                <Card sx={{ height: '320px', overflowY: 'auto', width: '100%' }}>
                                    <CardHeader title='Epoch Training' />
                                    <CardContent>
                                        <ModelTrain chooseModel={chooseModel} infoModel={infoModel} />
                                    </CardContent>
                                </Card>
                            ) : (
                                null
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <HeatMapChart infoModel={infoModel} />
                        </Grid>
                        <Grid item xs={6}>
                            <Card sx={{ width: '90%' }}>
                                <CardHeader title='Test Model'></CardHeader>
                                <CardContent>
                                    <Grid item container spacing={1} sx ={{height: '320px'}}>
                                        <Grid item xs={3}>
                                            <Typography sx={styletitle} color={"black"}>
                                                Input text
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <TextField
                                                // name='epoch'
                                                sx = {{width: '90%'}}
                                                value={text}
                                                onChange={handleChangeText}
                                                required
                                                multiline
                                                rows={4}
                                                // disabled
                                                size='small'
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography sx={styletitle} color={"black"}>
                                                Score
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Typography sx={styletitle} color={"black"}>
                                                {result !== null ? result.score : ''}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', height: '50px' }}>
                                            <LoadingButton loading={loadingText} variant='contained' onClick={handleTest}>
                                                Test
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-start' }}>

                    </Grid> */}
                        <Grid item xs={11} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant='contained' disabled>
                                Continue
                            </Button>
                        </Grid>
                        <Grid item xs={0.75}>
                            <Button variant='contained' onClick={handleBack} >
                                Back
                            </Button>
                        </Grid>
                    </Grid>
                )
            }
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"

            />
        </>
    )
}

export default AIPreparePage