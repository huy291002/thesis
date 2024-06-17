import { Box, Tab } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ObjectConfiguration from './Child Component/ObjectManage/ObjectConfiguration';
import GroupObjectConfig from './Child Component/ObjectManage/GroupObjectConfig';
import UserPermission from './Child Component/ObjectManage/UserPermission';
import { useDispatch, useSelector } from 'react-redux';


function ObjectManagePage() {

  const id = useSelector(state => state.idGroup);
  const detail = useSelector(state => state.detailGroup)
  const dispatch = useDispatch()
  const [tab, setTab] = useState('1');
  const handleTab = (event, value) => {
    setTab(value);
  }

  // useEffect(() => {
  //   dispatch({ type: 'saga/getListGroup' })
  //   return () => {
  //     dispatch({ type: 'listGroup/setListGroup', payload: null })
  //   }
  // }, [])

  // useEffect(() => {
  //   if (id){
  //     dispatch({ type: 'saga/getDetailGroup', payload: id })
  //     return () => {
  //       dispatch({ type: 'detailGroup/setDetailGroup', payload: null })
  //     }
  //   }
  // }, [id])
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderborderColor: 'divider' }}>
            <TabList onChange={handleTab} aria-label='lab API tabs example'>
            <Tab
                label="Group Object Configuration"
                value="1"
              />
              <Tab
                label="Object Configuration"
                value="2"
              />
              
              {/* <Tab
                label="User Permissions"
                value="3"
              /> */}
            </TabList>
          </Box>
          <TabPanel value="2">
            <ObjectConfiguration   />
          </TabPanel>
          <TabPanel value="1">
            <GroupObjectConfig setTab={setTab} />
          </TabPanel>
          {/* <TabPanel value="3">
            <UserPermission />
          </TabPanel> */}

        </TabContext>
      </Box>

    </>
  )
}

export default ObjectManagePage