import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import axios from 'axios'

function* createAdmin(action) {
    try {
        const token = window.localStorage.getItem('access_token')

        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const { full_name, email, pwd, company, domain } = action.payload

        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/root/create-admin`, { full_name, email, pwd, company, domain }, config)

        const listAdmin = yield call(axios.get, `${process.env.REACT_APP_API_URL}/root/get-all-admins`, config)
        yield put({ type: 'statusForm/setStatusForm', payload: { status: "createsuccess"} })
        yield put({ type: 'listAdmin/setListAdmin', payload: listAdmin.data })
    } catch (error) {
        yield put({ type: 'statusForm/statusForm', payload: { status: "createerror" } })
    }

}

function* updateAdmin(action) {
    
    try {
        const token = window.localStorage.getItem('access_token')

        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/root/update-admin`, action.payload, config)
        const listAdmin = yield call(axios.get, `${process.env.REACT_APP_API_URL}/root/get-all-admins`, config)
        yield put({ type: 'listAdmin/setListAdmin', payload: listAdmin.data })

        yield put({ type: 'statusForm/setStatusForm', payload: { status: "updatesuccess" } })
    } catch (error) {
   
        yield put({ type: 'statusForm/setStatusForm', payload: { status: "updateerror" } })
    }
}

function* createAdminSaga() {
    yield all([
        takeEvery('saga/createAdmin', createAdmin),
        takeEvery('saga/updateAdmin', updateAdmin)
    ])
}

export default createAdminSaga