import PropTypes, { element } from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, IconButton } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// mock
import account from '../../../_mock/account';
// hooks
import useResponsive from '../../../hooks/useResponsive';
import useAuth from '../../../hooks/useAuth';
import jwt from 'jwt-decode'
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import { adminnavConfig, usernavConfig, rootnavConfig } from './config';
import RootPage from '../../../pages/RootPage';
import DepartmentPage from '../../../pages/DepartmentPage';
import RecordPage from '../../../pages/RecordPage';




// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------
const drawerWidth = 240;


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));


Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({open, setOpen}) {
  const [adminNav, setAdminNav] = useState([])
  const dispatch = useDispatch();
  const allGroup = useSelector(state => state.listObject)
  const openSidebar = useSelector(state => state.openSidebar)

  useEffect(() => {
      dispatch({ type: 'saga/getListObject' })
  }, [])

  const handleCloseSidebar = () => {
    setOpen(false)
    dispatch({ type: 'openSidebar/setOpenSidebar', payload: false })
  }

  // let adminNav = []

  useEffect(() => {

    if (allGroup) {

      let setupPath = allGroup.map((item) => item = {
        ...item,
        title: `${item.name}`,
        children: item.objects.length > 0 ? item.objects.map((object) => object = {
          ...object,
          title: `${object.obj_name}`,
          path: `/group-object/${item.name.replace(/ /g, "-")}/${object._id}`,
          element: <RecordPage />
        }) :
          null
      })
      let updateAdminNav = adminnavConfig.map((item) => item = {
        ...item,
        children: item.children && item.title === 'Group Object' ? setupPath : item.children
      })
      setAdminNav(updateAdminNav)
    }
  }, [allGroup])

  useEffect(() => {

  }, [adminNav])

  const { pathname } = useLocation();
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'lg');

  // useEffect(() => {
  //   if (openNav) {
  //     onCloseNav();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname]);
  // const user = useSelector(state => state.user)
  const { role, setRole } = useAuth();


  const token = window.localStorage.getItem('access_token')
  const user = jwt(token)
  const renderContent = (
    <>
      {user && adminNav.length > 0 ? (
        <Scrollbar
          sx={{
            height: 1,
            '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
          }}
        >
          <Box sx={{ px: 2.5, py: 1, display: 'inline-flex' }}>
            <Logo />
          </Box>

          <Box sx={{ mb: 5, mx: 2.5 }}>
            <Link underline="none">
              <StyledAccount>
                <Avatar src={account.photoURL} alt="photoURL" />

                <Box sx={{ ml: 2 }}>
                  {user.system_role !== 'root' ? (
                    <Typography variant="subtitle2" noWrap>
                      {user.full_name}
                    </Typography>
                  ) : (
                    null
                  )}

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {user.system_role}
                  </Typography>
                </Box>
              </StyledAccount>
            </Link>
          </Box>
          {user.system_role === "root" && (
            <NavSection setOpenDrawer={setOpen} data={rootnavConfig} />
          )}
          {user.system_role === "admin" && (
            <NavSection open={open} setOpenDrawer={setOpen} data={adminNav} />
          )}
          {user.system_role === "user" && (
            <NavSection setOpenDrawer={setOpen} data={usernavConfig} />
          )}

          <Box sx={{ flexGrow: 1 }} />

        </Scrollbar>
      ) : (
        null
      )}
    </>
  );

  return (

    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        variant={isDesktop ? "persistent" : "temporary"}

        PaperProps={{
          sx: {
            width: NAV_WIDTH,
            bgcolor: 'background.default',
            borderRightStyle: 'dashed',
          },
        }}
      >
        <DrawerHeader sx = {{display: 'flex', justifyContent: 'flex-end'}}>
          <IconButton // onClick={() => props.setOpen(false)} 
            onClick={handleCloseSidebar}
          >
            {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{ color: "common.black" }} /> : <ChevronRightIcon sx={{ color: "common.black" }} />}
          </IconButton>
        </DrawerHeader>
        {renderContent}
      </Drawer>


    </Box>
  );
}
