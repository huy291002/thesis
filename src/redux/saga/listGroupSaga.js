import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import axios from 'axios'

function* getListGroup(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
     
        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/group-objects/get-all-groups-with-details`, config)
        yield put({ type: 'listGroup/setListGroup', payload: response.data })
    } catch (error) {
        console.log(error)
    }

}

function* getDetailGroup(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
      
        const allGroup = yield call(axios.get, `${process.env.REACT_APP_API_URL}/group-objects/get-all-groups-with-details`, config)
        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/group-objects/get-detail-group?group_id=${action.payload}`, config)
        const allObject = yield call(axios.get,  `${process.env.REACT_APP_API_URL}/object/get-all-objects-with-field-details`, config)
        const listUser = yield call(axios.get, `${process.env.REACT_APP_API_URL}/root/get-all-users?page=1&page_size=2`, config)
        
        response.data.Objectinfo = allObject.data[action.payload]
        
        const detailGroupInfo = allGroup.data.filter((group) => group._id === action.payload)
        // const data = listGroup.data.map((item) => item = {
        //     ...item,
        //     objectInfo: allObject.data[item._id]
        // })
        
        detailGroupInfo["manager"] = response.data["manager"]
        yield put({ type: 'listUser/setListUser', payload: listUser.data })
        yield put({ type: 'detailGroup/setDetailGroup', payload: detailGroupInfo })
        
    } catch (error) {
        console.log(error)
    }

}


function* updateOrderGroup(action) {
    try {
       
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/`, action.payload)
    } catch (error) {
        console.log(error)
    }


}

function* listGroupSaga() {
    yield all([
        takeEvery('saga/getListGroup', getListGroup),
        takeEvery('saga/getDetailGroup', getDetailGroup),
        takeEvery('saga/updateOrderGroup', updateOrderGroup)
    ])
}

export default listGroupSaga