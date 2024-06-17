import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import axios from 'axios'
import jwt from "jwt-decode";


function* createEmail(action){
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        let decodeToken = jwt(token)
        action.payload["admin_id"] = decodeToken._id
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/mail/create-email`, action.payload, config)
        
        yield put({type: 'email/setEmail', payload: {status: 'createEmailSuccess'}})
    }catch(error){
  
        yield put({type: 'email/setEmail', payload: {status: 'createEmailError', message: error.response.data.detail}})
    }
}

function* emailSaga(){
    yield all([
        takeEvery('saga/createEmail', createEmail)
    ])
}

export default emailSaga