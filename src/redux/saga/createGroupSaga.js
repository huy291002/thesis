import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import axios from 'axios'


function* createGroup(action) {

    try {
        const token = window.localStorage.getItem('access_token')

        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const { name, manager_id } = action.payload

        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/group-objects/create`, { name, manager_id }, config)

        const listGroup = yield call(axios.get, `${process.env.REACT_APP_API_URL}/group-objects/get-all-groups-with-details`, config)
        // const detailGroup = yield call(axios.get, `${process.env.REACT_APP_API_URL}/group-objects/get-detail-group?group_id=${response.data}`, config)
        const allObject = yield call(axios.get,  `${process.env.REACT_APP_API_URL}/object/get-all-objects-with-field-details`, config)

 
        const detailGroup = listGroup.data.filter((group) => group._id === response.data)
        // const data = listGroup.data.map((item) => item = {
        //     ...item,
        //     objectInfo: allObject.data[item._id]
        // })

        yield put({ type: 'detailGroup/setDetailGroup', payload: detailGroup })
        yield put({ type: 'groupobject/setGroupObject', payload: { status: "createsuccess", message: response.data } })
        yield put({ type: 'listGroup/setListGroup', payload: listGroup.data })
        yield put({ type: 'listObject/setListObject', payload: listGroup.data })
    } catch (error) {
        yield put({ type: 'groupobject/setGroupObject', payload: { status: "createerror" } })
    }

}

function* updateManyGroup(action) {
    try {
        const token = window.localStorage.getItem('access_token')

        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/group-objects/update-many`, action.payload, config)

        const listGroup = yield call(axios.get, `${process.env.REACT_APP_API_URL}/group-objects/get-all-groups-with-details`, config)
        yield put({ type: 'groupobject/setGroupObject', payload: { status: "updatesuccess" } })
        yield put({ type: 'listGroup/setListGroup', payload: listGroup.data })
        yield put({type: 'listObject/setListObject', payload: listGroup.data })
    } catch (error) {
    
        yield put({ type: 'groupobject/setGroupObject', payload: { status: "updateerror" } })
    }

}

function* updateOneGroup(action){
    try{
        const token = window.localStorage.getItem('access_token')

        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/group-objects/update-one`, action.payload, config)
        const listGroup = yield call(axios.get, `${process.env.REACT_APP_API_URL}/group-objects/get-all-groups-with-details`, config)
        
        yield put({ type: 'groupobject/setGroupObject', payload: { status: "updatesuccess" } })
        
        yield put({ type: 'listGroup/setListGroup', payload: listGroup.data })
    } catch(error){
        yield put({ type: 'groupobject/setGroupObject', payload: { status: "updateerror" } })
    }
}

function* createGroupSaga() {
    yield all([
        takeEvery('saga/createGroup', createGroup),
        takeEvery('saga/updateOneGroup', updateOneGroup),
        takeEvery('saga/updateManyGroup', updateManyGroup)

    ])
}

export default createGroupSaga