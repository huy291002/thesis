import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import axios from 'axios'

function* getListObject(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }

        const allGroup = yield call(axios.get, `${process.env.REACT_APP_API_URL}/group-objects/get-all-groups-with-details`, config)

        const allObject = yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-all-objects-with-field-details`, config)

        yield put({ type: 'listObjectsFields/setListObjectsFields', payload: allObject.data })
        yield put({ type: 'listObject/setListObject', payload: allGroup.data })
    } catch (error) {
        console.log(error)
    }

}



function* getDetailObject(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }

        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-detail-object?id=${action.payload}`, config)

        const listRef = response.data.fields.filter((field) => field.field_type === 'ref_obj' || field.field_type === 'ref_field_obj')

        let listObjID = listRef.length > 0 ? listRef.map((field) => field = field["ref_obj_id_value"]) : [];
        let fullInfo = []

        if (listObjID.length > 0) {
            for (let i = 0; i < listObjID.length; i++) {
                fullInfo.push((yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-detail-object?id=${listObjID[i]}`, config)).data)
            }

            for (let i = 0; i < response.data.fields.length; i++) {
                if (response.data.fields[i]["ref_obj_id_value"]) {
                    for (let j = 0; j < fullInfo.length; j++) {
                        if (response.data.fields[i]["ref_obj_id_value"] === fullInfo[j]._id) {

                            response.data.fields[i]["ref_field"] = fullInfo[j].fields
                        }
                    }
                }
            }
        }

        yield put({ type: 'detailObject/setDetailObject', payload: response.data })

    } catch (error) {
        console.log(error)
    }
}

function* getDetailRefObject(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-detail-object?id=${action.payload}`, config)

        yield put({ type: 'detailRefObject/setDetailRefObject', payload: response.data })

    } catch (error) {
        console.log(error)
    }
}

function* getListRefObject(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const { listObjID, header, infoRecord } = action.payload

        let fullInfo = []
        // list = action.payload.map((obj) => obj = list.push(yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-detail-object?id=${obj.obj_id}`, config)))
        // for (let i = 0; i < listObjID.length; i++) {
        //     list.push((yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-detail-object?id=${listObjID[i].obj_id}`, config)).data)
        // }



        if (listObjID.length > 0) {
            for (let i = 0; i < listObjID.length; i++) {
                fullInfo.push((yield call(axios.get, `${process.env.REACT_APP_API_URL}/object/get-detail-object?id=${listObjID[i].obj_id}`, config)).data)
            }


            for (let i = 0; i < header.length; i++) {
                if (header[i]["ref_obj_id_value"]) {
                    for (let j = 0; j < fullInfo.length; j++) {

                        if (infoRecord[header[i]["field_id"]]["ref_to"]["object_id"] === fullInfo[j]._id) {

                            header[i]["ref_object"] = fullInfo[j].fields
                        }
                    }
                }
            }
        }

    } catch (error) {
        console.log(error)
    }
}

function* updateOrderObject(action) {
    try {
      
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/`, action.payload)
    } catch (error) {
        console.log(error)
    }


}

function* listObjectSaga() {
    yield all([
        takeEvery('saga/getListObject', getListObject),
        takeEvery('saga/getDetailObject', getDetailObject),
        takeEvery('saga/getListRefObject', getListRefObject),
        takeEvery('saga/getDetailRefObject', getDetailRefObject),
        takeEvery('saga/updateOrderObject', updateOrderObject)
    ])
}

export default listObjectSaga