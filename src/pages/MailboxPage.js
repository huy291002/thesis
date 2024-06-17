import { Box, Button, Card, Checkbox, Divider, FormControlLabel, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ActionScanning from './Child Component/Workflow/ActionScanning';
import { useDispatch, useSelector } from 'react-redux';
// import { makeStyles } from "@material-ui/core/styles";
const list_email = [
    {
        title: 'ABC Company',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam',
        time: '10:44'
    },
    {
        title: 'ABC Company',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam',
        time: '10:44'
    },
    {
        title: 'ABC Company',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam',
        time: '10:44'
    },
    {
        title: 'ABC Company',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam',
        time: '10:44'
    },
    {
        title: 'ABC Company',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam',
        time: '10th May'
    },
    {
        title: 'ABC Company',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam',
        time: '10th May'
    },
    {
        title: 'ABC Company',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam',
        time: '10th May'
    },
    {
        title: 'ABC Company',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam',
        time: '10th May'
    }
]

// const useStyles = makeStyles((theme) => ({
//     item: {
//         color: '#fff',
//         justifyContent: "center",
//         display: "flex",
//         '&:hover': {
//             '&>a': {
//                 color: 'green'
//             }
//         }
//     }
// }));

function MailboxPage() {
    // const classes = useStyles()
    const [openDialogScan, setOpenDialogScan] = useState(false)

    const [data, setData] = useState({
        object: '',
        frequecy: '',
        interval: '',
        weekday: '',
        template: '',
        time: ''
    })

    const mailBox = useSelector(state => state.mailBox)
    const HH_MM = { hour: '2-digit', minute: '2-digit' }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: 'saga/getMailBox' })
    }, [])

    useEffect(() => {

    }, [mailBox])

    const handleDataChange = (e) => {
        const value = e.target.value
        setData({
            ...data,
            [e.target.name]: value
        })
        if (e.target.name === "object") {
            dispatch({ type: 'saga/getListTemplateByObject', payload: value._id })
        }
    }

    const handleOpenDialogScan = () => {
        setOpenDialogScan(true)
    }

    return (

        <Grid container spacing={1}>
            {/* <Grid item xs={9.25} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='outlined' startIcon={<ContentPasteSearchIcon />} onClick={handleOpenDialogScan} >
                    Config Scanning
                </Button>
                <ActionScanning data={data} setData={setData} openDialogScan={openDialogScan} setOpenDialogScan={setOpenDialogScan} handleDataChange={handleDataChange} />
            </Grid> */}
            <Grid item xs={12} sx = {{marginTop: 1}}>
                <Card sx = {{width: '80%'}}>
                    {mailBox ? (
                        mailBox?.map((email, index) => (
                            <Grid key={index} item container spacing={1} sx={{
                                display: 'flex', marginLeft: 1, cursor: 'pointer', width: '98%', '&: hover': {
                                    boxShadow: 2
                                }
                            }}>
                                <Grid item xs={0.5}>
                                    <Checkbox sx={{
                                        padding: 0
                                    }} size='small' />
                                </Grid>
                                <Grid item xs={0.5}>
                                    <StarOutlineIcon />
                                </Grid>
                                <Grid item xs={3} >
                                    <Typography variant='subtitle1'>
                                        {email.from}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant='subtitle1' sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {email.subject}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {new Date().toLocaleDateString() === new Date(email.sent_at).toLocaleDateString() ? (
                                        `${new Date(email.sent_at).toLocaleTimeString('en-US', HH_MM)}`
                                    ) : (
                                        new Date(email.sent_at).toLocaleDateString()
                                    )}

                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            </Grid>
                        ))
                    ) : null}
                </Card>
            </Grid>

        </Grid>
    )
}

export default MailboxPage