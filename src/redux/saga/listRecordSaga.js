import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import axios from 'axios'

function* getListRecord(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const { object_id, page, rowsPerPage } = action.payload
        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/record/get-all-records?obj_id=${object_id}&page=${page}&page_size=${rowsPerPage}`, config)
        yield put({ type: 'loadingSearch/setLoadingSearch', payload: { big_table: false } })
        yield put({ type: 'listRecord/setListRecord', payload: response.data })
    } catch (error) {
        console.log(error)
    }

}

function* healthCheckInBigTable(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const healthCheck = yield call(axios.post, `${process.env.REACT_APP_API_URL}/record/health-check?obj_id=${action.payload}`, action.payload, config)
        yield put({ type: 'healthCheckStatusBig/setHealthCheckStatusBig', payload:  "Good" })
    } catch (error) {
        console.log(error)
        yield put({ type: 'healthCheckStatusBig/setHealthCheckStatusBig', payload: "Bad" })
    }

}

function* healthCheckInMiniTable(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const healthCheck = yield call(axios.post, `${process.env.REACT_APP_API_URL}/record/health-check?obj_id=${action.payload}`, action.payload, config)
        yield put({ type: 'healthCheckStatusMini/setHealthCheckStatusMini', payload: "Good"  })
    } catch (error) {
        console.log(error)
        yield put({ type: 'healthCheckStatusMini/setHealthCheckStatusMini', payload:"Bad"  })
    }

}

function* getDetailRefRecord(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const { object_id, page, rowsPerPage } = action.payload
        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/record/get-all-records?obj_id=${object_id}&page=${page}&page_size=${rowsPerPage}`, config)
        yield put({ type: 'loadingSearch/setLoadingSearch', payload: { mini_table: false } })
        yield put({ type: 'detailRefRecord/setDetailRefRecord', payload: response.data })

    } catch (error) {
        console.log(error)
    }
}

function* getSearchRecord(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        
     

        const searchResult = yield call(axios.post, `${process.env.REACT_APP_API_URL}/record/search`, action.payload, config)
       
        yield put({ type: 'loadingSearch/setLoadingSearch', payload: { mini_table: false } })
        yield put({ type: 'detailRefRecord/setDetailRefRecord', payload: { record_details: searchResult.data } })

    } catch (error) {
        console.log(error)
    }
}

function* getSearchRecordInBigTable(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        // const {object_id, searchInput } = action.payload
      

        const searchResult = yield call(axios.post, `${process.env.REACT_APP_API_URL}/record/search`, action.payload, config)
        
        yield put({ type: 'loadingSearch/setLoadingSearch', payload: { big_table: false } })
        yield put({ type: 'listRecord/setListRecord', payload: { record_details: searchResult.data, total_records: searchResult.data.length } })

    } catch (error) {
        console.log(error)
    }
}




function* listRecordSaga() {
    yield all([
        takeEvery('saga/getListRecord', getListRecord),
        takeEvery('saga/getDetailRefRecord', getDetailRefRecord),
        takeEvery('saga/getSearchRecord', getSearchRecord),
        takeEvery('saga/getSearchRecordInBigTable', getSearchRecordInBigTable),
        takeEvery('saga/healthCheckInBigTable', healthCheckInBigTable),
        takeEvery('saga/healthCheckInMiniTable', healthCheckInMiniTable)
    ])
}

export default listRecordSaga