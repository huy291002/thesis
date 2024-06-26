import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode'
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(null);
  };
  const token = window.localStorage.getItem('access_token')
  const user = jwt(token)
  // const user = useSelector(state => state.user)
  return (
    <>
      {user ? (
        <>
          <IconButton
            onClick={handleOpen}
            sx={{
              p: 0,
              ...(open && {
                '&:before': {
                  zIndex: 1,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                },
              }),
            }}
          >
            <Avatar src={account.photoURL} alt="photoURL" />
          </IconButton>

          <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                p: 0,
                mt: 1.5,
                ml: 0.75,
                width: 180,
                '& .MuiMenuItem-root': {
                  typography: 'body2',
                  borderRadius: 0.75,
                },
              },
            }}
          >
            <Box sx={{ my: 1.5, px: 2.5 }}>
              {user.system_role !== 'root' ? (
                <Typography variant="subtitle2" noWrap>
                  {user.full_name}
                </Typography>
              ) : (
                null
              )}

              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {user.email}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack sx={{ p: 1 }}>
              {MENU_OPTIONS.map((option) => (
                <MenuItem key={option.label} onClick={handleClose}>
                  {option.label}
                </MenuItem>
              ))}
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <MenuItem onClick={() => {
              dispatch({ type: 'saga/userLogout' })
              navigate("/login")
            }
            } sx={{ m: 1 }}>
              Logout
            </MenuItem>
          </Popover>
        </>
      ) : (
        null
    )}
    </>

  );
}
