import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import axios from 'axios'

function* getMailBox(action){
    try{
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
      
        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/mail/get-all-reply-emails?page=1&page_size=10`, config)
   
        yield put({type: 'mailBox/setMailBox', payload: response.data})
    }catch(error){
        console.log(error)

    }
}

function* mailBoxSaga(){
    yield all([
        takeEvery('saga/getMailBox', getMailBox)
    ])
}


export default mailBoxSaga