import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import axios from 'axios'


function* createRecord(action) {

    try {
        const token = window.localStorage.getItem('access_token')

        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        // yield put({type: 'allow/setAllow', payload: true})

        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/record/create-record`, action.payload.data, config)

        const listRecord = yield call(axios.get, `${process.env.REACT_APP_API_URL}/record/get-all-records?obj_id=${action.payload.data.object_id}&page=${action.payload.page}&page_size=${action.payload.rowsPerPage}`, config)

        yield put({ type: 'createRecord/setCreateRecordStatus', payload: { status: "createRecordSuccess" } })
        yield put({ type: 'listRecord/setListRecord', payload: listRecord.data })
    } catch (error) {

        yield put({ type: 'createRecord/setCreateRecordStatus', payload: { status: "createRecordError" } })
    } 

}

function* updateRecord(action) {

    try {
        const token = window.localStorage.getItem('access_token')

        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }

        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/record/update-one`, action.payload.data, config)
        const listRecord = yield call(axios.get, `${process.env.REACT_APP_API_URL}/record/get-all-records?obj_id=${action.payload.data.object_id}&page=${action.payload.page}&page_size=${action.payload.rowsPerPage}`, config)
        yield put({ type: 'createRecord/setCreateRecordStatus', payload: { status: "updateRecordSuccess" } })
        yield put({ type: 'listRecord/setListRecord', payload: listRecord.data })
        // yield put({ type: 'detailGroup/setDetailGroup', payload: detailGroup.data })
    } catch (error) {

        yield put({ type: 'createRecord/setCreateRecordStatus', payload: { status: "updateRecordError" } })
    }

}


function* uploadFileRecord(action) {

    try {
        const token = window.localStorage.getItem('access_token')
  
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const { file, object_id, mapping, page, rowsPerPage } = action.payload
        const formData = new FormData()
        formData.append('file', file)
        formData.append('object_id', object_id)
        formData.append('mapping', mapping)
  
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/inbound-rule/inbound-file`, formData, config)
        const listRecord = yield call(axios.get, `${process.env.REACT_APP_API_URL}/record/get-all-records?obj_id=${object_id}&page=${page}&page_size=${rowsPerPage}`, config)
        yield put({ type: 'uploadFile/setUploadFile', payload: { status: "uploadFileSuccess", quantity: response.data } })
        yield put({ type: 'listRecord/setListRecord', payload: listRecord.data })
        // yield put({ type: 'detailGroup/setDetailGroup', payload: detailGroup.data })
    } catch (error) {

        yield put({ type: 'uploadFile/setUploadFile', payload: { status: "uploadFileError" } })
    }

}

function* cretaeRecordSaga() {
    yield all([
        takeLatest('saga/createRecord', createRecord),
        takeEvery('saga/uploadFileRecord', uploadFileRecord),
        takeEvery('saga/updateRecord', updateRecord)
    ])

}

export default cretaeRecordSaga