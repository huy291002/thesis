import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import axios from 'axios'

function* getListObjectRefs(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-all-object-ref-to?id=${action.payload}`, config)
        yield put({ type: 'listObjectRefs/setListObjectRefs', payload: response.data })
    } catch (error) {
        console.log(error)
    }
}

function* getListRecordRefs(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-all-object-ref-to?id=${action.payload}`, config)
        yield put({ type: 'listObjectRefs/setListObjectRefs', payload: response.data })
    } catch (error) {
        console.log(error)
    }
}

function* createCustomView(action) {
    yield put({ type: 'customView/setCustomView', payload: { status: 'pending' } })
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/view-record/create-many-custom-view-records`, action.payload, config)
        yield put({ type: 'customView/setCustomView', payload: { status: 'createCustomViewSuccess' } })
    } catch (error) {
        
        yield put({ type: 'customView/setCustomView', payload: { status: 'createCustomViewError' } })
    }
}

function* getRecordInCustom(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const { objectid, recordid } = action.payload
        let listAllRecord = []
        const getLayout = yield call(axios.get, `${process.env.REACT_APP_API_URL}/view-record/get-all-by-object-id?id=${objectid}`, config)
        //const getRelatedObject = getLayout.data.filter((component) => component.type === 'related')
        const getMainRecord = yield call(axios.get, `${process.env.REACT_APP_API_URL}/record/get-record-detail?record_id=${recordid}&obj_id=${objectid}`, config)
        for (let i = 0; i < getLayout.data.length; i++) {
            if (getLayout.data[i].type === 'related'){
                let response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/record/get-all-record-ref-to?record_id=${recordid}&obj_id=${objectid}&ref_obj_id=${getLayout.data[i].related_obj_id}`, config)
                getLayout.data[i]["infoRecord"] = response.data
            }
            else if (getLayout.data[i].type === 'main'){
                getLayout.data[i]["infoRecord"] = getMainRecord.data
            }
        }
        yield put({type: 'layoutView/setLayoutView', payload: getLayout.data})
    } catch (error) {
        console.log(error)

    }
}

function* sendEmail(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/mail/send-email`, action.payload, config)
        yield put({type: 'customView/setCustomView', payload: {status: 'Send Email Successfully'}})
    } catch (error) {
        
        yield put({type: 'customView/setCustomView', payload: {status: 'Send Email Error'}})

    }
}

function* createCustomDashboard(action) {
    yield put({ type: 'customView/setCustomView', payload: { status: 'pending' } })
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/dashboard/create-many-dashboards`, action.payload, config)
        yield put({ type: 'customDashboard/setCustomDashboard', payload: { status: 'createCustomDashboardSuccess' } })
    } catch (error) {
        
        yield put({ type: 'customDashboard/setCustomDashboard', payload: { status: 'createCustomDashboardError' } })
    }
}

function* getAllDashboard(action) {
    yield put({ type: 'customView/setCustomView', payload: { status: 'pending' } })
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/dashboard/get-all`,  config)
        yield put({ type: 'listDashboard/setListDashboard', payload: response.data })
    } catch (error) {
        console.log(error)
    }
}

function* customViewSaga() {
    yield all([
        takeEvery('saga/getListObjectRefs', getListObjectRefs),
        takeEvery('saga/getListRecordRefs', getListRecordRefs),
        takeEvery('saga/createCustomView', createCustomView),
        takeEvery('saga/getRecordInCustom', getRecordInCustom),
        takeEvery('saga/sendEmail', sendEmail),
        takeEvery('saga/createCustomDashboard', createCustomDashboard),
        takeEvery('saga/getAllDashboard', getAllDashboard)
    ])

}

export default customViewSaga