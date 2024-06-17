import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import axios from 'axios'

function* createTemplate(action){
    try{
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/mail/create-template`, action.payload, config)
        yield put({type: 'template/setTemplate', payload: {status: 'createTemplateSuccess'}})
    }catch(error){
        yield put({type: 'template/setTemplate', payload: {status: 'createTemplateError'}})
    }
}

function* getListTemplate(action){
    try{
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const listTemplate = yield call(axios.get, `${process.env.REACT_APP_API_URL}/mail/get-all-templates`, config)
        yield put({ type: 'listTemplate/setListTemplate', payload: listTemplate.data })
    } catch(error){
        console.log(error)
    }
}

function* getListTemplateByObject(action){
    try{
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const listTemplate = yield call(axios.get, `${process.env.REACT_APP_API_URL}/mail/get-templates-by-object-id?object_id=${action.payload}`, config)
        yield put({ type: 'listTemplate/setListTemplate', payload: listTemplate.data })
    } catch(error){
        console.log(error)
    }
}

function *templateSaga(){
    yield all([
        takeEvery('saga/createTemplate', createTemplate),
        takeEvery('saga/getListTemplate', getListTemplate),
        takeEvery('saga/getListTemplateByObject',getListTemplateByObject)
    ])
}

export default templateSaga