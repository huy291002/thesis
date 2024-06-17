import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import axios from 'axios'
import jwt from 'jwt-decode'
// hooks
import userAuth from "../../hooks/useAuth";


// const {role, setRole} = useAuth() 
function* userLogin(action) {
    try {
        const { email, pwd } = action.payload

        const responseLogin = yield call(axios.post, `${process.env.REACT_APP_API_URL}/authen/login`, { email, pwd })
     
        if (responseLogin.data) {
         
            const user = jwt(responseLogin.data);
            
            // window.localStorage.setItem('user', user.role)
       
            window.localStorage.setItem('access_token', responseLogin.data)
            // window.sessionStorage.setItem('user', user.role)
            window.localStorage.setItem('isLoggedIn', true)
            yield put({ type: 'user/setUser', payload: user })

            yield put({ type: 'loginStatus/setLoginStatus', payload: { status: "success", message: "" } })
        }

    } catch (error) {
        yield put({ type: 'loginStatus/setLoginStatus', payload: { status: "error", message: error } })
    }


}

function* userLogout(action) {
    window.localStorage.removeItem('user');
    window.sessionStorage.removeItem('user');
    window.localStorage.removeItem('isLoggedIn')
    window.localStorage.removeItem('access_token')
    yield put({ type: 'user/userLogout', payload: null })
    yield put({ type: 'user/setUser', payload: null })
}

function* authenticationSaga() {
    yield all([
        takeEvery("saga/userLogin", userLogin),
        takeEvery("saga/userLogout", userLogout)
    ])
}
export default authenticationSaga
