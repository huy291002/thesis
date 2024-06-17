import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import axios from 'axios'


function* createObject(action) {

    try {
        const token = window.localStorage.getItem('access_token')
      
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/object/create-object-with-fields`, action.payload, config)
       
        const allGroup = yield call(axios.get, `${process.env.REACT_APP_API_URL}/group-objects/get-all-groups-with-details`, config)
        const allObject = yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-all-objects-with-field-details`, config)
        
        yield put({ type: 'listObject/setListObject', payload: allGroup.data })
        yield put({type: 'listObjectsFields/setListObjectsFields', payload: allObject.data})
        yield put({ type: 'object/setObject', payload: { status: "createObjectSuccess", message: response.data } })
        // yield put({ type: 'detailGroup/setDetailGroup', payload: detailGroup.data })
    } catch (error) {
      
        yield put({ type: 'object/setObject', payload: { status: "createObjectError" } })
    }

}

function* createObjectName(action) {

    try {
        const token = window.localStorage.getItem('access_token')
      
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/object/create-object`, action.payload, config)
        const detailGroup = yield call(axios.get, `${process.env.REACT_APP_API_URL}/group-objects/get-detail-group?group_id=${action.payload.group_obj_id}`, config)
        const allObject = yield call(axios.get,  `${process.env.REACT_APP_API_URL}/object/get-all-objects-with-field-details`, config)
        const allGroup = yield call(axios.get, `${process.env.REACT_APP_API_URL}/group-objects/get-all-groups-with-details`, config)

        const detailGroupInfo = allGroup.data.filter((group) => group._id === action.payload.group_obj_id)
        // const data = listGroup.data.map((item) => item = {
        //     ...item,
        //     objectInfo: allObject.data[item._id]
        // })
 
        detailGroupInfo["manager"] = detailGroup.data["manager"]

        yield put({ type: 'groupobject/setGroupObject', payload: { status: "createObjectNameSuccess" } })
        yield put({ type: 'detailGroup/setDetailGroup', payload: detailGroupInfo })
        yield put({ type: 'listObject/setListObject', payload: allGroup.data })
        yield put({type: 'listObjectsFields/setListObjectsFields', payload: allObject.data})
    } catch (error) {

        yield put({ type: 'groupobject/setGroupObject', payload: { status: "createObjectNameError" } })
    }
}

function* createFieldFromObject(action){
    try {
        const token = window.localStorage.getItem('access_token')

        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/field-object/create-field`, action.payload, config)

      
        const allGroup = yield call(axios.get, `${process.env.REACT_APP_API_URL}/group-objects/get-all-groups-with-details`, config)
        const allObject = yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-all-objects-with-field-details`, config)
        const detailGroup = yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-detail-object?id=${action.payload.object_id}`, config)
        yield put({ type: 'listObject/setListObject', payload: allGroup.data })
        yield put({type: 'listObjectsFields/setListObjectsFields', payload: allObject.data})
        yield put({ type: 'detailObject/setDetailObject', payload: detailGroup.data })
        yield put({type: 'objectID/setObjectID', payload: action.payload.object_id})
        yield put({ type: 'fieldStatus/setFieldStatus', payload: { status: "createFieldSuccess" } })
        // yield put({ type: 'detailGroup/setDetailGroup', payload: detailGroup.data })
    } catch (error) {

        yield put({ type: 'fieldStatus/setFieldStatus', payload: { status: "createFieldError" } })
    }

}

function* updateOneField(action){
    try {
        const token = window.localStorage.getItem('access_token')

        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }

        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/field-object/update-one-field`, action.payload.field, config)

        const allGroup = yield call(axios.get, `${process.env.REACT_APP_API_URL}/group-objects/get-all-groups-with-details`, config)
        const allObject = yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-all-objects-with-field-details`, config)

        const detailObject = yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-detail-object?id=${action.payload.object_id}`, config)

        yield put({ type: 'listObject/setListObject', payload: allGroup.data })
        yield put({ type: 'detailObject/setDetailObject', payload: detailObject.data })
        yield put({type: 'listObjectsFields/setListObjectsFields', payload: allObject.data})
 
        if (action.payload["field"].field_type === 'id'){
            yield put({ type: 'fieldStatus/setFieldStatus', payload: { status: "updatePrefixSuccess" } })
        }
        else {
            yield put({ type: 'fieldStatus/setFieldStatus', payload: { status: "updateOneFieldSuccess" } })
        }
        
        // yield put({ type: 'detailGroup/setDetailGroup', payload: detailGroup.data })
    } catch (error) {
    
        yield put({ type: 'fieldStatus/setFieldStatus', payload: { status: "updateOneFieldError" } })
    }

}

function* updateOrderField(action){
    try{
        const token = window.localStorage.getItem('access_token')
     
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/field-object/update-sorting-fields`, action.payload.fieldOrder, config)
      
        const allGroup = yield call(axios.get, `${process.env.REACT_APP_API_URL}/group-objects/get-all-groups-with-details`, config)
        const allObject = yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-all-objects-with-field-details`, config)
        const detailObject = yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-detail-object?id=${action.payload.object_id}`, config)

        yield put({ type: 'listObject/setListObject', payload: allGroup.data })
        yield put({type: 'listObjectsFields/setListObjectsFields', payload: allObject.data})
        yield put({ type: 'detailObject/setDetailObject', payload: detailObject.data })
        yield put({ type: 'object/setObject', payload: { status: "updateOrderFieldSuccess" } })
    }catch(error){
        yield put({ type: 'object/setObject', payload: { status: "updateOrderFieldError" } })
    }
}

function* createObjectAndUploadFile(action){
    try{
        const token = window.localStorage.getItem('access_token')
     
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const { obj_name, group_obj_id, file, fields, map} = action.payload
   
        const formData = new FormData()
        formData.append('obj_name', obj_name)
        formData.append('group_obj_id', group_obj_id)
        formData.append('file', file)
        formData.append('fields',fields)
        formData.append('map', map)

        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/inbound-rule/inbound-file_with_new_obj`, formData, config)
        const allGroup = yield call(axios.get, `${process.env.REACT_APP_API_URL}/group-objects/get-all-groups-with-details`, config)
        const allObject = yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-all-objects-with-field-details`, config)
        
        yield put({ type: 'object/setObject', payload: { status: "createObjectAndUploadSuccess", quantity: response.data } })
        yield put({ type: 'listObject/setListObject', payload: allGroup.data })
        yield put({type: 'listObjectsFields/setListObjectsFields', payload: allObject.data})
    } catch(error){
        yield put({ type: 'object/setObject', payload: { status: "createObjectAndUploadError" } })
    }
}


function *createObjectSaga(){
    yield all([
        takeEvery('saga/createObjectWithFields', createObject),
        takeEvery('saga/createObjectName', createObjectName),
        takeEvery('saga/createFieldFromObject', createFieldFromObject),
        takeEvery('saga/updateOneField', updateOneField),
        takeEvery('saga/updateOrderField', updateOrderField),
        takeEvery('saga/createObjectAndUploadFile', createObjectAndUploadFile)
    ])
}

export default createObjectSaga