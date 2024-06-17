import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Box, Grid, FormHelperText, Button, Typography, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Iconify from '../../../components/iconify';
// Components
import useAuth from '../../../hooks/useAuth';
import Error from '../../../components/ErrorMessage/Error';
import checkEmailformat from '../../../utils/checkEmailformat';
import Notification from '../../../components/Notification/Notification';
// ----------------------------------------------------------------------

export default function LoginForm() {
  // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validUsername, setValidUsername] = useState(true);
  const [validEmailform, setValidEmailform] = useState(true)
  const [validPassword, setValidPassword] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginClick, setLoginClick] = useState(false);
  const [opensnackbar, setOpensnackbar] = useState(false);
  // const { user } = useAuth();
  const user = useSelector(state => state.user);
  const loginStatus = useSelector(state => state.loginStatus)

  const dispatch = useDispatch();
  const handleUsernamechange = (event) => {
    setUsername(event.target.value);
    if (event.target.value === "" && loginClick === true) {
      setValidUsername(false)
    }
    else {
      setValidEmailform(true)
      setValidUsername(true)

    }
  }

  const handlePasswordchange = (event) => {
    setPassword(event.target.value);
    if (event.target.value === "" && loginClick === true) {
      setValidPassword(false)
    }
    else {
      setValidPassword(true)
    }
  }
  const handleClick = () => {
    setLoginClick(true);
  };



  useEffect(() => {
    if (loginStatus.status === "success") {
      dispatch({ type: 'notify/setNotify', payload: { status: "idle", message: "" } })
      setLoading(false);

      if (user && user.system_role === "root") {
        navigate('/users');
      }
      else if (user && user.system_role  === "admin" || user && user.system_role === "user") {
        navigate('/dashboard');
      }
    }
    else if (loginStatus.status === "error") {
      dispatch({ type: 'notify/setNotify', payload: { status: "idle", message: "" } })
      setLoading(false);
      setOpensnackbar(true);
    }
  }, [loginStatus])

  const handleCloseSnackbar = () => {
    setOpensnackbar(false)
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginClick === true) {

      if (validUsername && checkEmailformat(username) && username !== "" && validPassword && password !== "") {
        setLoading(true)
        dispatch({
          type: 'saga/userLogin', payload: {
            email: username,
            pwd: password,
          }
        })

        // navigate('/dashboard/root')
      }
      else {
        if (!validUsername || (username === "")) {
         
          setValidUsername(false);

        }
        if (!checkEmailformat(username) && username !== "") {
        
          setValidEmailform(false)
        }
        if (!validPassword || (password === "")) {
         
          setValidPassword(false);
        }
      }
      setLoginClick(false)
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <Stack spacing={2} sx={{ display: "flex", flexDirection: 'column' }}>

          <TextField
            name="email"
            // label={validUsername && validEmailform ? <Typography color={"black"}>Email address</Typography>
            //   : <Typography color={"red"}>Email address</Typography>}
            placeholder='Email Address'
            type="text"
            value={username}
            onChange={handleUsernamechange}
            required
            error={!validEmailform}
          />
          {/* {!validUsername && (
            <Error>Email address is required</Error>
          )} */}
          {!validEmailform && (
            <Error>Invalid email address</Error>
          )}

          <TextField
            name="password"
            // label={validPassword ? <Typography color={"black"}>Password</Typography>
            //   : <Typography color={"red"}>Password</Typography>}
            placeholder='Password'
            value={password}
            onChange={handlePasswordchange}
            required
            error={!validPassword}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>

                </InputAdornment>
              )
            }}
          />
          {/* {!validPassword && (
            <Error>Password is required</Error>
          )} */}


        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton loading={loading} fullWidth size="large" type="submit" variant="contained" onClick={handleClick} >
          Login
        </LoadingButton>
      </form>
      <Notification
        open={opensnackbar}
        handleClose={handleCloseSnackbar}
        status="error"
        message="Email or password is incorrect"
      />
    </>
  );
}

