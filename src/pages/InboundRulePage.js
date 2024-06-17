import { Box, Tab } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import IncomingEmail from './Child Component/InboundRule/IncomingEmail';
import IncomingAPI from './Child Component/InboundRule/IncomingAPI';
// import WebCrawler from './Child Component/InboundRule/WebCrawler';
// import EmailTemplate from './Child Component/InboundRule/EmailTemplate';
import OutcomingEmail from './Child Component/InboundRule/OutcomingEmail';

function InboundRulePage() {
  const [tab, setTab] = useState('1');
  const handleTab = (event, value) => {
    setTab(value);
  }

  const openSidebar = useSelector(state => state.openSidebar)

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderborderColor: 'divider' }}>
          <TabList onChange={handleTab} aria-label='lab API tabs example'>
            <Tab
              label="Incoming Email"
              value="1"
            />
            <Tab
              label="Outcoming Email"
              value="2"
            />
            <Tab
              label="Incoming API Request"
              value="3"
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <IncomingEmail />
        </TabPanel>
        <TabPanel value="2">
          <OutcomingEmail openSidebar={openSidebar}/>
        </TabPanel>
        <TabPanel value="3">
          <IncomingAPI />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default InboundRulePage