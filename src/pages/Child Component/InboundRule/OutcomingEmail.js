import React, { useEffect, useRef, useState } from 'react'
import { Grid, Paper, TextField, Typography, FormControl, Select, MenuItem, InputLabel, Menu, Box, Divider, Button, ListSubheader, Autocomplete, createFilterOptions, FormHelperText } from '@mui/material'
import FormDetailView from '../../../components/FormDetailView/FormDetailView'
import EmailTable from './EmailConfig/EmailTable'
import TemplateTable from './TemplateForm/TemplateTable'
import { useDispatch, useSelector } from 'react-redux'
import QuillToolbar, { modules, formats } from './TemplateForm/EditToolbar'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const styletitle = {
    fontWeight: 'bold'
}

const listtemplate = [
    {
        _id: '1',
        name: 'template 1',
        subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nullam ipsum purus, bibendum sit amet vulputate eget, porta',
        body: '<ol><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum purus, bibendum sit amet vulputate eget, porta semper ligula. Donec bibendum vulputate erat, ac fringilla mi finibus nec. Donec ac dolor sed dolor porttitor blandit vel vel purus. Fusce vel malesuada ligula. Nam quis vehicu<u>la ante, eu finibus est. Proin ullamcorper fermentum orci, quis finibus massa. Nunc lobortis, massa ut rutrum ultrices, metus metus finibus ex, sit ame</u>t facilisis neque enim sed neque. Quisque accumsan metus vel maximus consequat. Suspendisse lacinia tellus a libero volutpat maximus.</li><li><strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum purus, bibendum sit amet vulputate eget, porta semper ligula. Donec bibendum vulputate erat, ac fringilla mi finibus nec. Donec ac dolor sed</strong> dolor porttitor blandit vel vel purus. Fusce vel malesuada ligula. Nam quis vehicula ante, eu finibus est. Proin ullamcorper fermentum orci, quis finibus massa. Nunc lobortis, massa ut rutrum ultrices, metus metus finibus ex, sit amet facilisis neque enim sed neque. Quisque accumsan metus vel maximus consequat. Suspendisse lacinia tellus a libero volutpat maximus.</li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum purus, bibendum sit amet vulputate eget, porta semper ligula. Donec bibendum vulputate erat, ac fringilla mi finibus nec. Donec ac dolor sed dolor porttitor blandit vel vel purus. Fusce vel malesuada ligula. Nam quis vehicula ante, eu finibus est. Proin ullamcorper fermentum orci, quis finibus massa. Nunc lobortis, mass<strong>a ut rutrum ultrices, metus metus finibus ex, sit amet facilisis neque enim sed neque. Quisque accumsan metus vel maximus consequat. Suspendisse lacinia tellus a libero volutpat maximus.</strong></li></ol>'
    },
    {
        _id: '2',
        name: 'template 2',
        subject: 'Hotel Service',
        body: ' <p class="ql-align-justify"><strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum purus, bibendum sit amet vulputate eget, porta semper ligula. Don</strong>ec bibendum vulputate erat, ac fringilla mi finibus nec. Donec ac dolor sed dolor porttitor blandit vel vel purus. F<u>usce vel malesuada ligula. Nam quis vehicula ante, eu finibus est. Proin ullamcorper fermentum orci, quis finibus massa. </u>Nunc lobortis, massa ut rutrum ultrices, metus metus finibus ex, sit amet facilisis neque enim sed neque. Quisque accumsan metus vel maximus consequat. Suspendisse lacinia tellus a libero volutpat maximus.</p>'
    },
]

const listemail = [
    {
        _id: '1',
        username: 'nqh291002',
        protocol: 'IMAP'
    },
    {
        _id: '2',
        username: 'quannguyen2711',
        protocol: 'SMTP'
    },

]

const filter = createFilterOptions()

function OutcomingEmail({ openSidebar }) {


    const [data, setData] = useState({
        object: '',
        template: '',
        sender: '',
        field: ''
    })

    const handleChangeData = (e) => {
        const value = e.target.value
        setData({
            ...data,
            [e.target.name]: value
        })
        if (e.target.name === "object") {
            dispatch({ type: 'saga/getListTemplateByObject', payload: value._id })
        }

    }

    const [senderChosen, setSenderChosen] = useState('')

    const [templateChosen, setTemplateChosen] = useState('')

    const dispatch = useDispatch()

    const listObject = useSelector(state => state.listObject)

    const listTemplate = useSelector(state => state.listTemplate)

    const body = templateChosen?.body !== '' ? templateChosen.body : ''

    const bodyRef = useRef()


    useEffect(() => {
        dispatch({ type: 'saga/getListTemplate' })
    }, [])

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.innerHTML = body
        }

    }, [body])

    const handleChooseTemplate = (e) => {

        setTemplateChosen(e.target.value)
    }

    const handleChooseSender = (e) => {

        setSenderChosen(e.target.value)
    }

    const renderSelectGroupObject = group => {
        const items = group?.objects?.map(object => {
            return (

                <MenuItem sx={{ marginLeft: '12px' }} key={object._id} value={object}>{object.obj_name}</MenuItem>
            );
        });
        return [<ListSubheader sx={{ fontWeight: 'bold', color: 'black' }}>{group?.name}</ListSubheader>, items];
    };



    return (
        <>
            <Grid container spacing={1} sx={{ display: 'flex', flexDirection: 'row' }}>
                
                <Grid item xs={12}>
                    <Grid item container spacing={0}>
                        <Grid item xs={5.5} sx={{ marginTop: 0 }}>
                            <Paper sx={{ boxShadow: 10, height: '110%' }}>
                                <EmailTable listemail={listemail} openSidebar={openSidebar} />
                            </Paper>
                        </Grid>
                        <Grid item xs ={1}></Grid>
                        <Grid item xs={5.5} sx={{ marginTop: 1 }}>
                            <Paper sx={{ boxShadow: 10, height: '110%' }}>
                                <TemplateTable listtemplate={listTemplate} openSidebar={openSidebar} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
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

    )
}

export default OutcomingEmail