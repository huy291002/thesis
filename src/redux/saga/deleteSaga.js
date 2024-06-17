import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import axios from 'axios'


function* deleteGroupObject(action) {

    try {
        const token = window.localStorage.getItem('access_token')
       
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.delete, `${process.env.REACT_APP_API_URL}/group-objects/delete-one?group_id=${action.payload}`, config)
        const listGroup = yield call(axios.get, `${process.env.REACT_APP_API_URL}/group-objects/get-all-groups-with-details`, config)
        const allObject = yield call(axios.get,  `${process.env.REACT_APP_API_URL}/object/get-all-objects-with-field-details`, config)
        // const data = listGroup.data.map((item) => item = {
        //     ...item,
        //     objectInfo: allObject.data[item._id]
        // })
        yield put({ type: 'groupobject/setGroupObject', payload: { status: "deleteSuccess" } })
        yield put({ type: 'listGroup/setListGroup', payload: listGroup.data })
        yield put({ type: 'listObject/setListObject', payload: listGroup.data })
        // yield put({ type: 'detailGroup/setDetailGroup', payload: detailGroup.data })
    } catch (error) {
      
        yield put({ type: 'groupobject/setGroupObject', payload: { status: "deleteError" } })
    }

}

function* deleteObject(action) {
    try {
        const token = window.localStorage.getItem('access_token')
     
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.delete, `${process.env.REACT_APP_API_URL}/object/delete-one?object_id=${action.payload}`, config)
        const allGroup = yield call(axios.get, `${process.env.REACT_APP_API_URL}/group-objects/get-all-groups-with-details`, config)
        const allObject = yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-all-objects-with-field-details`, config)

        yield put({ type: 'listObject/setListObject', payload: allGroup.data })
        yield put({type: 'listObjectsFields/setListObjectsFields', payload: allObject.data})
        yield put({ type: 'object/setObject', payload: { status: "deleteSuccess" } })
  
    } catch (error) {

        yield put({ type: 'object/setObject', payload: { status: "deleteError" } })
    }
}

function* deleteField(action) {
    try {
        const token = window.localStorage.getItem('access_token')
   
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
       
        const response = yield call(axios.delete, `${process.env.REACT_APP_API_URL}/field-object/delete-one?field_id=${action.payload.IDField}`, config)
        const allGroup = yield call(axios.get, `${process.env.REACT_APP_API_URL}/group-objects/get-all-groups-with-details`, config)
        const allObject = yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-all-objects-with-field-details`, config)
        const detailGroup = yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-detail-object?id=${action.payload.object_id}`, config)
  
        yield put({ type: 'listObject/setListObject', payload: allGroup.data })
        yield put({type: 'listObjectsFields/setListObjectsFields', payload: allObject.data})
        yield put({ type: 'detailObject/setDetailObject', payload: detailGroup.data })
        yield put({ type: 'object/setObject', payload: { status: "deleteFieldSuccess" } })
 
    } catch (error) {

        yield put({ type: 'object/setObject', payload: { status: "deleteFieldError" } })
    }
}

function* deleteRecord(action){
    try{
        const token = window.localStorage.getItem('access_token')
  
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }

        const response = yield call(axios.delete, `${process.env.REACT_APP_API_URL}/record/delete-one`, {
            ...config,
            data: action.payload.data
        })
        const listRecord = yield call(axios.get, `${process.env.REACT_APP_API_URL}/record/get-all-records?obj_id=${action.payload.data.object_id}&page=${action.payload.page}&page_size=${action.payload.rowsPerPage}`, config)
        yield put({ type: 'createRecord/setCreateRecordStatus', payload: { status: "deleteRecordSuccess" } })
        yield put({ type: 'listRecord/setListRecord', payload: listRecord.data })
    } catch(error){
        yield put({ type: 'createRecord/setCreateRecordStatus', payload: { status: "deleteRecordError" } })
    }
}

function* deleteSaga() {
    yield all([
        takeEvery('saga/deleteGroupObject', deleteGroupObject),
        takeEvery('saga/deleteObject', deleteObject),
        takeEvery('saga/deleteField', deleteField),
        takeEvery('saga/deleteRecord',deleteRecord )
    ])
}

export default deleteSaga