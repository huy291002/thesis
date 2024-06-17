import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import userSlice from './reducer/userReducer';
import rootSaga from './rootSaga';
import loginStatusSlice from './reducer/loginStatusReducer';
import createAdminSlice from './reducer/createAdminReducer';
import listAdminSlice from './reducer/listAdminReducer';
import detailAdminSlice from './reducer/detailAdminReducer';
import updateAdminSlice from './reducer/updateAdminReducer';
// import createUserSlice from './reducer/userReducer/createUserReducer';
// import listUserSlice from './reducer/userReducer/listUserReducer';
// import detailUserSlice from './reducer/userReducer/detailUserReducer';
import statusFormSlice from './reducer/statusFormReducer';
import listObjectSlice from './reducer/listObjectReducer';
import listUserSlice from './reducer/listUserReducer';
import listGroupSlice from './reducer/listGroupReducer';
import groupobjectSlice from './reducer/groupobjectReducer';
import detailGroupSlice from './reducer/detailGroupReducer';
import createUserSlice from './reducer/createUserReducer';
import detailUserSlice from './reducer/detailUserReducer';
import objectSlice from './reducer/objectReducer';
import detailObjectSlice from './reducer/detailObjectReducer';
import objectIDSlice from './reducer/objectIDReducer';
import openSidebarSlice from './reducer/openSidebarReducer';

import listRecordSlice from './reducer/listRecordReducer';
import createRecordSlice from './reducer/createRecordReducer';
import detailRefObjectSlice from './reducer/detailRefObjectReducer';
import detailRefRecordSlice from './reducer/detailRefRecordReducer';
import fieldStatusSlice from './reducer/fieldReducer';
import listObjectsFieldsSlice from './reducer/listObjectsFieldsReducer';
import emailSlice from './reducer/emailReducer';
import templateSlice from './reducer/templateReducer';
import loadingSearchSlice from './reducer/loadingSearchReducer';
import healthCheckStatusBigSlice from './reducer/healthCheckStatusBigReducer';
import healthCheckStatusMiniSlice from './reducer/healthCheckStatusMiniReducer';
import uploadFileSlice from './reducer/uploadFileReducer';
import listTemplateSlice from './reducer/listTemplateReducer';
import listEmailSlice from './reducer/listEmailReducer';
import createWorkflowSlice from './reducer/createWorkflowReducer';
import loadingSlice from './reducer/loadingReducer';
import eventSlice from './reducer/eventReducer';
import listObjectRefsSlice from './reducer/listObjectRefsReducer';
import listRecordRefsSlice from './reducer/listRecordRefsReducer';
import customViewSlice from './reducer/customViewReducer';
import layoutViewSlice from './reducer/layoutReducer';
import listRecordProcessedSlice from './reducer/listRecordProcessedReducer';
import statusProcessSlice from './reducer/statusProcessReducer';
import listWorkflowSlice from './reducer/listWorkflowReducer';
import listAllTemplateSlice from './reducer/listAllTemplateReducer';
import mailBoxSlice from './reducer/mailBoxReducer';
import loadingDatasetSlice from './reducer/loadingDatasetReducer';
import processedDataStatusSlice from './reducer/processedDataStatusReducer';
import listModelSlice from './reducer/listModelReducer';
import customDashboardSlice from './reducer/customDashboardReucer';
import listDashboardSlice from './reducer/listDashboardReducer';
import listModelPrototypeSlice from './reducer/listModelPrototypeReducer';
import resultSlice from './reducer/resultReducer';
import loadingTextSlice from './reducer/loadingTextReducer';
import loadingUploadFileSlice from './reducer/loadingUploadFileReducer';


const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        loginStatus: loginStatusSlice.reducer,
        createAdmin: createAdminSlice.reducer,
        listAdmin: listAdminSlice.reducer,
        detailAdmin: detailAdminSlice.reducer,
        updateAdmin: updateAdminSlice.reducer,
        statusForm: statusFormSlice.reducer,
        createUser: createUserSlice.reducer,
        listUser: listUserSlice.reducer,
        detailUser: detailUserSlice.reducer,
        listObject: listObjectSlice.reducer,
        statusForm: statusFormSlice.reducer,
        listGroup: listGroupSlice.reducer,
        groupobject: groupobjectSlice.reducer,
        detailGroup: detailGroupSlice.reducer,
        object: objectSlice.reducer,
        detailObject: detailObjectSlice.reducer,
        objectID: objectIDSlice.reducer,
        openSidebar: openSidebarSlice.reducer,
        createRecord: createRecordSlice.reducer,
        listRecord: listRecordSlice.reducer,
        detailRefObject: detailRefObjectSlice.reducer,
        detailRefRecord: detailRefRecordSlice.reducer,
        fieldStatus: fieldStatusSlice.reducer,
        listObjectsFields: listObjectsFieldsSlice.reducer,
        email: emailSlice.reducer,
        template: templateSlice.reducer,
        loadingSearch: loadingSearchSlice.reducer,
        healthCheckStatusBig: healthCheckStatusBigSlice.reducer,
        healthCheckStatusMini: healthCheckStatusMiniSlice.reducer,
        uploadFile: uploadFileSlice.reducer,
        listTemplate: listTemplateSlice.reducer,
        listEmail: listEmailSlice.reducer,
        createWorkflow: createWorkflowSlice.reducer,
        loading: loadingSlice.reducer,
        event: eventSlice.reducer,
        listObjectRefs: listObjectRefsSlice.reducer,
        listRecordRefs: listRecordRefsSlice.reducer,
        customView: customViewSlice.reducer,
        layoutView: layoutViewSlice.reducer,
        listRecordProcessed: listRecordProcessedSlice.reducer,
        statusProcess: statusProcessSlice.reducer,
        listWorkflow: listWorkflowSlice.reducer,
        listAllTemplate: listAllTemplateSlice.reducer,
        mailBox: mailBoxSlice.reducer,
        loadingDataset: loadingDatasetSlice.reducer,
        processedDataStatus: processedDataStatusSlice.reducer,
        listModel: listModelSlice.reducer,
        customDashboard: customDashboardSlice.reducer,
        listDashboard: listDashboardSlice.reducer,
        listModelPrototype: listModelPrototypeSlice.reducer,
        result: resultSlice.reducer,
        loadingText: loadingTextSlice.reducer,
        loadingUploadFile: loadingUploadFileSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)

})
sagaMiddleware.run(rootSaga);
export default store;
