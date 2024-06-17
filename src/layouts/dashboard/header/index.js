import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Button, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
// hooks
import useResponsive from '../../../hooks/useResponsive';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: '100%',
    height: '7%',
    justifyContent: 'center'
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header(props) {
  const dispatch = useDispatch()
  const openSidebar = useSelector(state => state.openSidebar)
  const listObject = useSelector(state => state.listObject)
  const listObjectsFields = useSelector(state => state.listObjectsFields)
  const handleOpenSidebar = () => {
    props.setOpen(true)

    dispatch({ type: 'openSidebar/setOpenSidebar', payload: true })
  }

  useEffect(() => {
    dispatch({ type: 'saga/getListObject' })
  }, [])

  const location = useLocation()

  const navigate = useNavigate()

  const handleNavigateRecord = (path) => {
    navigate(`${path.join('/')}`)
  }

  const handleNavigateMailBox = (mailbox) => {
    navigate(mailbox)
  }



  useEffect(() => {

    const socket = new WebSocket("ws://127.0.0.1:8000/ws")

    socket.onopen = () => {
      console.log('Open')
    }
    socket.onclose = () => {
      console.log('Close')
    }

    socket.onmessage = (event) => {
      console.log('event', event)
      if (JSON.parse(event.data).status === 'SUCCESS') {
        if (JSON.parse(event.data).type === 'inbound') {
          dispatch({type: 'loadingUploadFile/setLoadingUploadFile', payload: false})
          toast.info(`Success: ${JSON.parse(event.data).result.success} records, Fail: ${JSON.parse(event.data).result.failed} records`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // setSchema([])
          // setDataUpload({})

        }
        else if (JSON.parse(event.data).type === 'create') {
          let copy = JSON.parse(JSON.stringify(listObjectsFields))
          let object = copy.filter((object) => object._id === JSON.parse(event.data).result.object_id)[0]
          let getPath = location.pathname.split('/')
          let newPath = []
          let sameObject = false
          if (getPath[1] !== 'group-object') {
            newPath.push("", "group-object")
            let copygroupObject = JSON.parse(JSON.stringify(listObject))
            let a = false
            for (let i = 0; i < copygroupObject.length; i++) {
              if (!a) {
                for (let j = 0; j < copygroupObject[i].objects.length; j++) {
                  if (copygroupObject[i].objects[j]._id === object._id) {
                    a = true
                    newPath.push(`${copygroupObject[i].name.replace(/ /g, "-")}`, `${object._id}`)
                    break;
                  }
                }
              }
              else {
                break
              }
            }
          }
          else {
            newPath = getPath
            if (object._id === getPath[3]) {
              sameObject = true
            }
            else {
              let copygroupObject = JSON.parse(JSON.stringify(listObject))
              let a = false
              for (let i = 0; i < copygroupObject.length; i++) {
                if (!a) {
                  for (let j = 0; j < copygroupObject[i].objects.length; j++) {
                    if (copygroupObject[i].objects[j]._id === object._id) {
                      a = true
                      newPath[2] = copygroupObject[i].name.replace(/ /g, "-")
                      newPath[3] = object._id
                      break;
                    }
                  }
                }
                else {
                  break
                }
              }
            }
          }
          toast(
            <Grid container spacing={1}>
              <Grid item xs={1.5}>
                <CheckCircleIcon color='success' size='1.5rem' />
              </Grid>

              <Grid item xs={10}>
                Create Record in object {object.obj_name} successfully
              </Grid>
              {!sameObject || getPath[1] !== 'group-object' ? (
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant='outlined' onClick={() => handleNavigateRecord(newPath)}>
                    View
                  </Button>
                </Grid>
              ) : null}
            </Grid>
          )
        }
        else if (JSON.parse(event.data).type === 'update') {
          dispatch({
            type: 'saga/getListRecord', payload: {
                object_id: JSON.parse(event.data).result.object_id,
                page: 1,
                rowsPerPage: 10
            }
        })
          toast.success(`Update Record successfully`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        else if (JSON.parse(event.data).type === 'send') {
          toast.success(`${JSON.parse(event.data).message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        else if (JSON.parse(event.data).type === 'None' && JSON.parse(event.data).result.emails !== 0){
          toast(
            <Grid container spacing={1}>
              <Grid item xs={1.5}>
                <CheckCircleIcon color='success' size='1.5rem' />
              </Grid>

              <Grid item xs={10}>
                Email scanned successfully
              </Grid>
              {location.pathname !== '/settings/mailbox' ? (
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant='outlined' onClick={() => handleNavigateMailBox('/settings/mailbox')}>
                    View
                  </Button>
                </Grid>
              ) : null}
            </Grid>
          )
        }
        else if (JSON.parse(event.data).type === 'preprocess_dataset'){
          dispatch({type: 'saga/getDataset', payload: JSON.parse(event.data).dataset_id})
          dispatch({ type: 'loadingDataset/setLoadingDataset', payload: false })
          dispatch({ type: 'processedDataStatus/setProcessedDataStatus', payload: true })
          toast(
            <Grid container spacing={1}>
              <Grid item xs={1.5}>
                <CheckCircleIcon color='success' size='1.5rem' />
              </Grid>
              <Grid item xs={10}>
                {JSON.parse(event.data).message}
              </Grid>
              {location.pathname !== '/settings/models/AI-prepare' ? (
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant='outlined' onClick={() => handleNavigateMailBox('/settings/models/AI-prepare')}>
                    View
                  </Button>
                </Grid>
              ) : null}
            </Grid>
          )
        }
        else if (JSON.parse(event.data).type === 'sentiment'){
          dispatch({type: 'saga/getListGroup'})
          dispatch({
            type: 'saga/getListRecord', payload: {
                object_id: JSON.parse(event.data).result.object_id,
                page: 1,
                rowsPerPage: 10
            }
        })
          toast.success(`${JSON.parse(event.data).message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
      else {
        toast.error(`${JSON.parse(event.data).message}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      // setMessage((prevMessages) => [...prevMessages, JSON.parse(event.data)])
    }
    return () => {
      socket.close()
    }
  }, [])

  const isDesktop = useResponsive('up', 'lg');
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          // onClick={() => props.setOpen(true)}
          onClick={handleOpenSidebar}
          sx={{
            display: 'flex',
            flexDirection: 'flex-start',

            ...(props.open && { display: 'none' }),
            color: 'text.primary'
          }}
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>


        <Box sx={{ flexGrow: 0.25 }} />
        {/* <Searchbar /> */}
        {isDesktop ? (
          <Box sx={{ flexGrow: 1 }} />
        ) : (
          <Box sx={{ flexGrow: 0.7 }} />
        )}


        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <LanguagePopover /> */}
          {/* <NotificationsPopover /> */}
          <AccountPopover />
        </Stack>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"

        />
      </StyledToolbar>
    </StyledRoot>
  );
}
