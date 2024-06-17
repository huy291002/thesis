import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
// hooks
import useAuth from '../../hooks/useAuth';

import Header from './header';
import Nav from './nav';
import jwt from 'jwt-decode'

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

// const Main = styled('div')(({ theme }) => ({
//   flexGrow: 1,
//   overflow: 'auto',
//   minHeight: '100%',
//   paddingTop: APP_BAR_MOBILE + 24,
//   paddingBottom: theme.spacing(10),
//   [theme.breakpoints.up('lg')]: {
//     paddingTop: APP_BAR_DESKTOP + 24,
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(2),
//   },
// }));
const MainSection = (props) => {
  const open = props.open
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation()
  const path = location.pathname
  const mainRef = useRef()
  useEffect(() => {
    mainRef.current.scrollTo(0, 0);
  }, [path])
  return (
    <main ref={mainRef} style={{
      flexGrow: 1,
      paddingTop: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginTop: "30px",
      //overflowY: "scroll",
      marginLeft: isMd ? `-240px` : "0px",
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
      backgroundColor: theme.palette.grey[200],
      // backgroundColor: "red"
    }}>
      {props.children}
    </main>
  )
}

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useAuth();
  useEffect(() => {
    if (user) {
      dispatch({ type: "user/setUser", payload: user })
    }

  }, [])
  return (
    <StyledRoot>
      <Header open={open} setOpen={setOpen} />
      <Nav open={open} setOpen={setOpen} />
      <MainSection open={open}>
        <Outlet  />
      </MainSection>
    </StyledRoot>
  );
}
