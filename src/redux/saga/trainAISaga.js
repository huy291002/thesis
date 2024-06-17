import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import axios from 'axios'

function* processedData(action){
    try{
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
     
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/ai-dataset/preprocess`, action.payload, config)

    }catch(error){

    }
}

function* trainAI(action){
    try{
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/`, action.payload, config)
        // yield put({type: 'createWorkflow/setCreateWorkflow', payload: {status: 'createWorkflowSuccess'}})
    }catch(error){
        // yield put({type: 'createWorkflow/setCreateWorkflow', payload: {status: 'createWorkflowError', message: error.response.data.detail}})
    }
}

function* getDataset(action){
    try{
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        console.log('callAPI')
        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/ai-dataset/get-detail-by-id?dataset_obj_id=${action.payload}`, config)
        // yield put({type: 'createWorkflow/setCreateWorkflow', payload: {status: 'createWorkflowSuccess'}})
        yield put({type: 'listRecordProcessed/setListRecordProcessed', payload: response.data})
        yield put({type: 'statusProcess/setStatusProcess', payload: {status: 'processSuccess'}})
    }catch(error){
        yield put({type: 'statusProcess/setStatusProcess', payload: {status: 'processError'}})
        // yield put({type: 'createWorkflow/setCreateWorkflow', payload: {status: 'createWorkflowError', message: error.response.data.detail}})
    }
}

function* getAlreadyDataset(action){
    try{
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
  
        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/ai-dataset/get-detail-by-id-str?dataset_obj_id_str=${action.payload}`, config)

        yield put({type: 'listRecordProcessed/setListRecordProcessed', payload: response.data})
    }catch(error){
        console.log(error)

    }
}


function* getListModel(action){
    try{
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
     
        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/sentiment-analysis/get-all-models-with-details`, config)
        // yield put({type: 'createWorkflow/setCreateWorkflow', payload: {status: 'createWorkflowSuccess'}})
        yield put({type: 'listModel/setListModel', payload: response.data})
    }catch(error){
        console.log(error)
        // yield put({type: 'createWorkflow/setCreateWorkflow', payload: {status: 'createWorkflowError', message: error.response.data.detail}})
    }
}

function* getListModelPrototype(action){
    try{
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
     
        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/sentiment-analysis/get-all-models-prototype`, config)
        // yield put({type: 'createWorkflow/setCreateWorkflow', payload: {status: 'createWorkflowSuccess'}})
        yield put({type: 'listModelPrototype/setListModelPrototype', payload: response.data})
    }catch(error){
        console.log(error)
        // yield put({type: 'createWorkflow/setCreateWorkflow', payload: {status: 'createWorkflowError', message: error.response.data.detail}})
    }
}

function* getResult(action){
    try{
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
    
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL_AI}/predict`, action.payload, config)
        // yield put({type: 'createWorkflow/setCreateWorkflow', payload: {status: 'createWorkflowSuccess'}})
        yield put({type: 'result/setResult', payload: response.data})
        yield put({type: 'loadingText/setLoadingText', payload: false})
    }catch(error){
        console.log(error)
        // yield put({type: 'createWorkflow/setCreateWorkflow', payload: {status: 'createWorkflowError', message: error.response.data.detail}})
    }
}


function* trainAISaga(){
    yield all([
        takeEvery('saga/trainAI', trainAI),
        takeEvery('saga/processedData', processedData),
        takeEvery('saga/getDataset', getDataset),
        takeEvery('saga/getListModel', getListModel),
        takeEvery('saga/getAlreadyDataset', getAlreadyDataset),
        takeEvery('saga/getListModelPrototype', getListModelPrototype),
        takeEvery('saga/getResult', getResult)
    ])

}

export default trainAISaga