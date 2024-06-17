import authenticationSaga from "./saga/authenticationSaga"
import { all } from "redux-saga/effects"
import createAdminSaga from "./saga/createAdminSaga"
import listAdminSaga from "./saga/listAdminSaga"
import createUserSaga from "./saga/createUserSaga"
import listUserSaga from "./saga/listUserSaga"
import listObjectSaga from "./saga/listObjectSaga"
import listGroupSaga from "./saga/listGroupSaga"
import createGroupSaga from "./saga/createGroupSaga"
import createObjectSaga from "./saga/createObjectSaga"
import deleteSaga from "./saga/deleteSaga"
import cretaeRecordSaga from "./saga/createRecordSaga"
import listRecordSaga from "./saga/listRecordSaga"
import emailSaga from "./saga/emailSaga"
import templateSaga from "./saga/templateSaga"
import workFlowSaga from "./saga/workFlowSaga"
import customViewSaga from "./saga/customViewSaga"
import trainAISaga from "./saga/trainAISaga"
import mailBoxSaga from "./saga/mailBoxSaga"
function* rootSaga(){
    yield all([
        authenticationSaga(),
        createAdminSaga(),
        listAdminSaga(),
        createUserSaga(),
        listUserSaga(),
        listObjectSaga(),
        listAdminSaga(),
        // listUserSaga(),
        listGroupSaga(),
        createGroupSaga(),
        createObjectSaga(),
        deleteSaga(),
        cretaeRecordSaga(),
        listRecordSaga(),
        emailSaga(),
        templateSaga(),
        workFlowSaga(),
        customViewSaga(),
        trainAISaga(),
        mailBoxSaga()
    ])
}
export default rootSaga