import { takeEvery, put, all, call } from "redux-saga/effects";
import axios from 'axios'

function* createUser(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const { full_name, email, pwd, is_manager } = action.payload

        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/root/create-user`, { full_name, email, pwd, is_manager }, config)

        const listUser = yield call(axios.get, `${process.env.REACT_APP_API_URL}/root/get-all-users`, config)
        yield put({ type: 'statusForm/setStatusForm', payload: { status: 'createUsersuccess'} })
        yield put({ type: 'listUser/setListUser', payload: listUser.data })
    } catch (error) {
        yield put({ type: 'statusForm/statusForm', payload: { status: "createerror" } })
    }

}

function* updateUser(action) {
    
    try {
        const token = window.localStorage.getItem('access_token')

        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/root/update-user`, action.payload, config)
        const listUser = yield call(axios.get, `${process.env.REACT_APP_API_URL}/root/get-all-users`, config)
        yield put({ type: 'listUser/setListUser', payload: listUser.data })

        yield put({ type: 'statusForm/setStatusForm', payload: { status: "updatesuccess" } })
    } catch (error) {

        yield put({ type: 'statusForm/setStatusForm', payload: { status: "updateerror" } })
    }
}

function* createUserSaga() {
    yield all([
        takeEvery('saga/createUser', createUser),
        takeEvery('saga/updateUser', updateUser)
    ])
}

export default createUserSaga