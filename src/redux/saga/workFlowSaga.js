import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import axios from 'axios'

function* createWorkflowwithActions(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.post, `${process.env.REACT_APP_API_URL}/workflow/create-workflow-with-actions`, action.payload, config)
        yield put({ type: 'createWorkflow/setCreateWorkflow', payload: { status: 'createWorkflowSuccess' } })
    } catch (error) {
        yield put({ type: 'createWorkflow/setCreateWorkflow', payload: { status: 'createWorkflowError', message: error.response.data.detail } })
    }
}

function* getListWorkflow(action) {
    try {
        const token = window.localStorage.getItem('access_token')
        let authenticate_token = `Bearer ${token}`
        const config = {
            headers: { Authorization: authenticate_token }
        }
        const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/workflow/get-all-workflows?object_id=${action.payload}`, config)
        const listTemplate = yield call(axios.get, `${process.env.REACT_APP_API_URL}/mail/get-all-templates`, config)
        for (let i = 0; i < response.data.length; i++) {
            const actions = yield call(axios.get, `${process.env.REACT_APP_API_URL}/workflow/get-workflow-with-actions?workflow_id=${response.data[i]._id}`, config)
            response.data[i]["actions"] = actions.data.actions
        }
        yield put({type: 'listAllTemplate/setListAllTemplate', payload: listTemplate.data})
        yield put({ type: 'listWorkflow/setListWorkflow', payload: response.data })
    } catch (error) {
        console.log(error)
    }
}


    function* workFlowSaga() {
        yield all([
            takeEvery('saga/createWorkflowwithActions', createWorkflowwithActions),
            takeEvery('saga/getListWorkflow', getListWorkflow)
        ])

    }

    export default workFlowSaga