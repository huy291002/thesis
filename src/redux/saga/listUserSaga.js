import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import axios from 'axios'

function* getListUser(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const { page, rowsPerPage } = action.payload
        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/root/get-all-users?page=${page}&page_size=${rowsPerPage}`, config)
        yield put({ type: 'listUser/setListUser', payload: response.data })
    } catch (error) {
        console.log(error)
    }
}

function* getListUserQuery(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
      
        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/root/search-company-users?query=${action.payload}`, config)
        yield put({ type: 'listUser/setListUser', payload: { data: response.data } })
    } catch (error) {
        console.log(error)
    }
}

function* listUserSaga() {
    yield all([
        takeEvery('saga/getListUser', getListUser),
        takeEvery('saga/getListUserQuery', getListUserQuery)

    ])
}

export default listUserSaga