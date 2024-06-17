import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import axios from 'axios'

function* getListAdmin(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const { page, rowsPerPage } = action.payload
  
        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/root/get-all-admins?page=${page}&page_size=${rowsPerPage}`, config)
    
        yield put({ type: 'listAdmin/setListAdmin', payload: response.data })
       
    } catch (error) {
        console.log(error)
    }
}

function* getDetailAdmin(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/root/get-all-admins`, config)
        const detailAdmin = response.data.filter((prop) => prop._id === action.payload.idAdmin)
        yield put({ type: 'detailAdmin/getDetailAdmin', payload: detailAdmin })
    } catch (error) {
        console.log(error)
    }
}

function* listAdminSaga() {
    yield all([
        takeEvery('saga/getListAdmin', getListAdmin),
        takeEvery('saga/getDetailAdmin', getDetailAdmin)
    ])
}

export default listAdminSaga