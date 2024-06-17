import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Dialog, DialogContent, DialogTitle, IconButton, TextField, Typograph, InputAdornment, InputLabel, FormControl, MenuItem, Grid, Typography, Select, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import Iconify from '../../../../components/iconify/Iconify';
import DoneIcon from '@mui/icons-material/Done';
import OutlookDialog from '../../../../components/OutlookDialog/OutlookDialog';
import checkEmailformat from '../../../../utils/checkEmailformat';
import Error from '../../../../components/ErrorMessage/Error';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from '@mui/lab';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function EmailForm({ openDialog, setOpenDialog }) {

    const [data, setData] = useState({
        emailAddress: '',
        emailServer: '',
        protocol: '',
        password: '',
        confirmPassword: ''
    })

    const [showPassword, setShowPassword] = useState(false)

    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [samePassword, setSamePassword] = useState(true)

    const [validEmail, setValidEmail] = useState(true)

    const [loading, setLoading] = useState(false)

    const email = useSelector(state => state.email)

    useEffect(() => {
        if (email.status === 'createEmailSuccess') {
            toast.success('Email has been created', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setValidEmail(true)
            setSamePassword(true)
            dispatch({ type: 'email/setEmail', payload: { status: "idle", message: ''} })
        }
        else if (email.status === 'createEmailError') {
            toast.error(`${email.message}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch({ type: 'email/setEmail', payload: { status: "idle", message: '' } })
        }
        setData({
            emailAddress: '',
            emailServer: '',
            protocol: '',
            password: '',
            confirmPassword: ''
        })
        setLoading(false)
        setOpenDialog(false)
    }, [email])

    const dispatch = useDispatch()

    const handleSamePassword = () => {
        let valid = true
        if (data.confirmPassword !== '' && data.password !== data.confirmPassword) {

            valid = false
            setSamePassword(false)
        }
        return valid
    }


    const handleChangeData = (e) => {
        const value = e.target.value
        setData({
            ...data,
            [e.target.name]: value
        })

        if (e.target.name === "emailAddress" && checkEmailformat(value)) {

            let indexRatesign = value.indexOf('@') // find @ symbol
            let stringAfterRateSign = value.slice(indexRatesign + 1, value.length - 1)
            let indexDot = stringAfterRateSign.indexOf('.') // find '.' after @
            let emailServer = stringAfterRateSign.slice(0, indexDot)
            setData({
                ...data,
                emailAddress: value,
                emailServer: emailServer
            })
            setValidEmail(true)
        }
        

    }

    const handleCreateEmail = (e) => {
        e.preventDefault();

        if (validEmail && handleSamePassword()) {

            let emailInfo = {}
            emailInfo["email"] = data.emailAddress
            emailInfo["pwd"] = data.password
            emailInfo["mail_server"] = data.emailServer
            emailInfo["protocol"] = data.protocol
            setLoading(true)
            setSamePassword(true)
            dispatch({ type: 'saga/createEmail', payload: emailInfo })

        }
        else {
            if (!validEmail){
                setValidEmail(false)
            }
            else {
                setSamePassword(false)
            }
            setOpenDialog(true)
            
            //setSamePassword(false)
        }
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
        setData({
            emailAddress: '',
            emailServer: '',
            protocol: '',
            password: '',
            confirmPassword: ''
        })
        setValidEmail(true)
        setSamePassword(true)
    }

    return (
        <>
            <OutlookDialog
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                title='Create Email'
                minWidth="50%"
                minHeight='35%'
            >
                <form onSubmit={handleCreateEmail}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: 'bold' }} color={"black"}>Email Address</Typography>
                            <TextField
                                type="text"
                                name="emailAddress"
                                required
                                value={data.emailAddress}
                                onChange={handleChangeData}
                                sx={{ marginBottom: 0.5, width: '50%' }}
                                inputProps={{
                                    style: {
                                        height: 3
                                    }
                                }}
                                placeholder='example@gmail.com'
                                error={!validEmail}
                            />
                            {!validEmail && (
                                <Error>Invalid Email Address</Error>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: 'bold' }} color={"black"}>Email Server</Typography>
                            <TextField
                                type="text"
                                name="emailServer"
                                required
                                value={data.emailServer}
                                // onChange={handleChangeData}
                                sx={{ marginBottom: 0.5, width: '50%' }}
                                inputProps={{
                                    style: {
                                        height: 3
                                    }
                                }}
                                InputProps={{
                                    style: {
                                        backgroundColor: '#f0f0f0'
                                    }
                                }}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ width: '50%' }}>
                                <InputLabel id='protocol' size='small'>Select Protocol</InputLabel>
                                <Select
                                    labelId='protocol'
                                    label="Select Protocol"
                                    name="protocol"
                                    id="input-protocol"
                                    value={data.protocol}
                                    onChange={handleChangeData}
                                    style={{ height: '36px' }}
                                >
                                    <MenuItem value="IMAP">IMAP</MenuItem>
                                    <MenuItem value="SMTP">SMTP</MenuItem>
                                    <MenuItem value="Outlook">Outlook</MenuItem>
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: 'bold' }} color={"black"}>Password</Typography>
                            <TextField
                                fullWidth
                                required
                                name="password"
                                placeholder='Input Password'
                                value={data.password}
                                onChange={handleChangeData}
                                sx={{ marginBottom: 0.5, width: '50%' }}
                                type={showPassword ? 'text' : 'password'}
                                // error={!validPassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                inputProps={{
                                    style: {
                                        height: 3
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: 'bold' }} color={"black"}>Confirm Password</Typography>
                            <TextField
                                fullWidth
                                required
                                name="confirmPassword"
                                placeholder='Input Confirm Password'
                                value={data.confirmPassword}
                                onChange={handleChangeData}
                                sx={{ marginBottom: 0.5, width: '50%' }}
                                type={showConfirmPassword ? 'text' : 'password'}
                                error={!samePassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                                <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                inputProps={{
                                    style: {
                                        height: 3
                                    }
                                }}
                            />
                             {!samePassword && (
                                <Error>Unmatched password</Error>
                            )}
                        </Grid>

                        <Grid item xs={10.45} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <LoadingButton loading={loading} startIcon={<DoneIcon />} type='submit' variant="contained"  >
                                Save
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={handleCloseDialog} startIcon={<CloseIcon />} variant="outlined"  >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </OutlookDialog>
            {/* <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="colored"
            /> */}
        </>

    )
}

export default EmailForm