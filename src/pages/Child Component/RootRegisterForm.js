import { useEffect, useState } from 'react';
// @mui
import {
    Box,
    TextField,
    InputAdornment,
    InputLabel,
    Stack,
    Button,
    MenuItem,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    FormHelperText,
    Grid,
    FormControl,
    Select,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    styled

} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// components
import Iconify from '../../components/iconify/Iconify';
import { first, update } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/ErrorMessage/Error';
import checkEmailformat from '../../utils/checkEmailformat';
import OutlookDialog from '../../components/OutlookDialog/OutlookDialog';


// ----------------------------------------------------------------------
const styletitle = {
    fontWeight: 'bold'
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
export default function RootRegisterForm({ openDialog, setOpenDialog, adminInfo, edit, setEdit, setAdminInfo, setDataChange }) {



    const dispatch = useDispatch()

    const [openSnackbar, setOpenSnackbar] = useState(false)

    const [loading, setLoading] = useState(false)

    const [status, setStatus] = useState('info')

    // const createAdmin = useSelector(state => state.createAdmin)

    // const updateAdmin = useSelector(state => state.updateAdmin)

    // const detailAdmin = useSelector(state => state.detailAdmin)
    // const [openDialog, setOpenDialog] = useState(false);

    const statusForm = useSelector(state => state.statusForm)

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        company: '',
        domain: '',
    })

    // const [firstName, setFirstName] = useState('')

    // const [lastName, setLastName] = useState('')

    const [idAdmin, setIdAdmin] = useState('')

    // const [email, setEmail] = useState('')

    // const [password, setPassword] = useState('')

    // const [company, setCompany] = useState('')

    // const [domain, setDomain] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('')

    const [validFirstName, setValidFirstName] = useState(true);

    const [validLastName, setValidLastName] = useState(true);

    const [validPassword, setValidPassword] = useState(true);

    const [validConfirmPassword, setValidConfirmPassword] = useState(true);

    const [samePassword, setSamePassword] = useState(true)

    const [validEmail, setValidEmail] = useState(true);

    const [validEmailFormat, setValidEmailFormat] = useState(true)

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [validCompany, setValidCompany] = useState(true)

    const [validDomain, setValidDomain] = useState(true);

    const [clickButtonCreate, setClickButtonCreate] = useState(false);

    useEffect(
        () => {
            if (adminInfo) {
                setIdAdmin(adminInfo._id)
                setData({
                    firstName: adminInfo ? adminInfo.full_name.split(' ').slice(-1).join(' ') : '',
                    lastName: adminInfo ? adminInfo.full_name.split(' ').slice(0, -1).join(' ') : '',
                    email: adminInfo.email,
                    company: adminInfo.company,
                    domain: adminInfo.domain
                })
            }

        }, [adminInfo]
    )



    useEffect(() => {
        if (statusForm.status === 'createsuccess') {
            toast.success('Admin has been created', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                company: '',
                domain: '',
            })
            dispatch({ type: 'statusForm/setstatusForm', payload: { status: "idle" } })
        }
        else if (statusForm.status === 'updatesuccess') {
            toast.success('Admin information is updated', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch({ type: 'statusForm/setstatusForm', payload: { status: "idle" } })
        }
        else if (statusForm.status === 'updateerror' || statusForm.status === 'createerror') {
            toast.success('Error', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch({ type: 'statusForm/setstatusForm', payload: { status: "idle" } })
        }
        setOpenDialog(false)
        setLoading(false)
        //dispatch({ type: 'statusForm/setstatusForm', payload: { status: "idle" } })
    }, [statusForm])



    // HANDLE DIALOG
    // const handleOpenDialog = () => {
    //     setOpenDialog(true);
    // }

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEdit(false)
        setAdminInfo({})
        setData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            company: '',
            domain: '',
        })
        // setValidFirstName(true);
        // setValidLastName(true);
        // setValidEmail(true);
        setValidEmailFormat(true)
        // setValidPassword(true);
        // setValidConfirmPassword(true);
        setSamePassword(true);
        // setValidCompany(true)
        // setValidDomain(true);

    }

    // HANDLE CHANGE INPUT
    const handleChangeData = (e) => {
        const value = e.target.value
        setData({
            ...data,
            [e.target.name]: value
        })
    }

    const validDateField = () => {
        let valid = true
        if (data.confirmPassword !== '' && data.confirmPassword !== data.password) {
            valid = false
            setSamePassword(false)
        }
        if (!checkEmailformat(data.email)) {
            valid = false
            setValidEmailFormat(false)
        }
        return valid
    }

    const handleClickCreate = () => {
        setClickButtonCreate(true);
    }

    const handleCreate = (e) => {
        e.preventDefault();
        if (!adminInfo) {
            if (validDateField()) {
                dispatch({
                    type: 'saga/createAdmin', payload: {
                        full_name: data.lastName.concat(" ", data.firstName),
                        email: data.email,
                        pwd: data.password,
                        company: data.company,
                        domain: data.domain
                    }
                })
                setLoading(true)
                setSamePassword(true)
                setValidEmailFormat(true)


                //setDataChange(true)
            }
            else {
                setOpenDialog(true)
            }
        }
        else {
            let validPassword = true
            let info = {
                id: idAdmin,
                full_name: data.lastName.concat(" ", data.firstName),
                email: data.email,
                company: data.company,
                domain: data.domain
            }
            if (data.password !== "") {
                if (validDateField()) {
                    info["pwd"] = data.password
                    validPassword = true
                }
                else {
                    validPassword = false
                }

            }
            if (validPassword) {
                dispatch({
                    type: 'saga/updateAdmin', payload: info
                })
                setLoading(true)
                setSamePassword(true)
                setValidEmailFormat(true)
                setAdminInfo(null)
                // setDataChange(true)
            }

        }

    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }


    return (
        <>

            {/* <BootstrapDialog
                open={openDialog}
                onClose={handleCloseDialog}

                sx={{ '& .MuiDialog-paper': { minWidth: '55%', minHeight: "70%" } }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Create User
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseDialog}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers> */}
            <OutlookDialog
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                title={edit ? 'Edit Root' : 'Create Root'}
                minWidth="55%"
                minHeight='70%'
            >
                <form onSubmit={handleCreate}>
                    <Grid container spacing={1}>
                        {/* NAME */}
                        <Grid item xs={6}>
                            <Typography sx={styletitle} color={"black"}>First Name</Typography>
                            <TextField
                                type="text"
                                fullWidth
                                name="firstName"
                                required
                                value={data.firstName}
                                onChange={handleChangeData}
                                sx={{ marginBottom: 0.5 }}
                                inputProps={{
                                    style: {
                                        height: 3
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={styletitle} color={"black"}>Last Name</Typography>

                            <TextField
                                type="text"
                                fullWidth
                                name="lastName"
                                required
                                value={data.lastName}
                                onChange={handleChangeData}
                                error={!validLastName}
                                sx={{ marginBottom: 0.5 }}
                                inputProps={{
                                    style: {
                                        height: 3
                                    }
                                }}
                            />

                        </Grid>
                        <Grid item xs={12} >
                            {/* EMAIL */}

                            {!validEmailFormat ? (
                                <Typography sx={styletitle} color={"red"}>Email</Typography>
                            ) : (
                                <Typography sx={styletitle} color={"black"}>Email</Typography>
                            )}
                            <TextField
                                placeholder='example@gmail.com'
                                fullWidth
                                type="text"
                                name="email"
                                required
                                value={data.email}
                                onChange={handleChangeData}
                                error={!validEmailFormat}
                                sx={{ marginBottom: 0.5 }}
                                inputProps={{
                                    style: {
                                        height: 3
                                    }
                                }}
                            />
                            {!validEmailFormat && (
                                <Error>Invalid email address</Error>
                            )}
                        </Grid>

                        {/* PASSWORD */}
                        <Grid item xs={6}>
                            <Typography sx={styletitle} color={"black"}>Password</Typography>
                            <TextField
                                fullWidth
                                required={adminInfo ? false : true}
                                name="password"
                                value={data.password}
                                onChange={handleChangeData}
                                sx={{ marginBottom: 0.5 }}
                                type={showPassword ? 'text' : 'password'}
                                error={!validPassword}
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
                        <Grid item xs={6}>
                            {!samePassword ? (
                                <Typography sx={styletitle} color={"red"}>Confirm Password</Typography>
                            ) : (
                                <Typography sx={styletitle} color={"black"}>Confirm Password</Typography>
                            )}
                            <TextField
                                fullWidth
                                required={adminInfo ? false : true}
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={handleChangeData}
                                sx={{ marginBottom: 0.5 }}
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
                        <Grid item xs={12}>
                            <Typography sx={styletitle} color={"black"}>Company Name</Typography>
                            <TextField
                                type="text"
                                fullWidth
                                name="company"
                                value={data.company}
                                onChange={handleChangeData}
                                error={!validCompany}
                                sx={{ marginBottom: 0.5 }}
                                required
                                inputProps={{
                                    style: {
                                        height: 3
                                    }
                                }}
                            />
                            {/* {!validCompany && (
                                <Error>Company name is required</Error>
                            )} */}
                        </Grid>
                        <Grid item xs={6}>

                            {/* DOMAIN */}
                            <Typography sx={styletitle} color={"black"}>Domain</Typography>
                            <FormControl sx={{ paddingBottom: 1, width: "100%" }}>
                                <Select

                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    required
                                    name="domain"
                                    value={data.domain}
                                    defaultValue={data.domain}
                                    onChange={handleChangeData}
                                    error={!validDomain}
                                    sx={{ height: 40 }}

                                >
                                    <MenuItem value="Hotel">Hotel</MenuItem>
                                    <MenuItem value="Restaurant">Restaurant</MenuItem>
                                    <MenuItem value="Tourist">Tourist</MenuItem>
                                    <MenuItem value="Eatery">Eatery</MenuItem>
                                    <MenuItem value="IT">IT</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={10.5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <LoadingButton loading={loading} startIcon={<DoneIcon />} type="submit" variant="contained" onClick={handleClickCreate} >
                                Save
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button startIcon={<CloseIcon />} variant="outlined" onClick={handleCloseDialog} >
                                Cancel
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </OutlookDialog>
            {/* </DialogContent>
            </BootstrapDialog> */}
            <ToastContainer
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
            />
        </>
    );
}
