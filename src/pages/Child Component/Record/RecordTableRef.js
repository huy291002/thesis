import React, { useEffect, useState } from 'react'
import OutlookDialog from '../../../components/OutlookDialog/OutlookDialog'
import { TableContainer, TextField, TableHead, TableRow, TableCell, TableSortLabel, Grid, Card, TableBody, Button, Table, IconButton, Popover, InputAdornment, Typography, Toolbar, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles';
import CircleIcon from '@mui/icons-material/Circle';
import Scrollbar from '../../../components/scrollbar/Scrollbar'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import LensIcon from '@mui/icons-material/Lens';
import Iconify from '../../../components/iconify/Iconify';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { UserListHead } from '../../../sections/@dashboard/user';
import HeaderTableRef from './HeaderTableRef';
import SkeleTonAnimation from './SkeleTonAnimation';
const listexampleRecord = [
    { _id: '1', id: 'name', label: 'Name' },
    { _id: '2', id: 'email', label: 'Email' },
    { _id: '3', id: 'phone', label: 'Phone' },
    { _id: '4', id: 'gender', label: 'Gender' },
    { id: '' }
]

const infoRecord = [
    { _id: '1', name: 'Quang Huy', email: 'huy@gmail.com', phone: '0123455666', gender: 'Male' },
    {
        _id: '2', name: 'Hong Quan', email: 'quan@gmail.com', phone: '0123456678', gender: 'Male'
    }
]
const StyledRoot = styled(Toolbar)(({ theme }) => ({
    height: 50,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
}));

function RecordTableRef({ field, openTable, setOpenTable, data, field_id,
    setData, listRecord, setViewRefObject, setViewRefField, viewRefField,
    viewRefObject, valueRefObject, setValueRefObject, valueRefField, setValueRefField, editRefField, editRefObject,
    chooseRecord, setChooseRecord, idRecord, setIdRecord, setInfoRecord, infoRecord }) {

    const [searchInput, setSearchInput] = useState({})


    const [timerDelay, setTimerDelay] = useState(null)

    const dispatch = useDispatch()

    const detailRefObject = useSelector(state => state.detailRefObject)

    const detailRefRecord = useSelector(state => state.detailRefRecord)

    const healthCheckStatusMini = useSelector(state => state.healthCheckStatusMini)

    const loadingSearch = useSelector(state => state.loadingSearch)



    let object_id = field ? field["ref_obj_id_value"] : null;

    let headerRef = detailRefObject ? detailRefObject.fields.map((item) => item = {
        ...item,
        label: item.field_name,
        id: item.field_id,
        alignRight: false,
        alignCenter: true
    }) : []

    headerRef.push({ id: '' })

    // headerRefField.push({ id: '' })



    useEffect(() => {
        if (object_id) {
            dispatch({ type: 'saga/getDetailRefObject', payload: object_id })
            dispatch({
                type: 'saga/getDetailRefRecord', payload: {
                    object_id: object_id,
                    page: 1,
                    rowsPerPage: 5
                }
            })
            dispatch({ type: 'saga/healthCheckInMiniTable', payload: object_id })

            // setViewRefObject(true)

        }
    }, [object_id])





    const handleSearchInput = (e, field_id) => {

        let search = {
            ...searchInput,
            [field_id]: e.target.value
        }
        setSearchInput({
            ...searchInput,
            [field_id]: e.target.value
        })
        if (e.target.value === '') {
            delete searchInput[field_id]
            delete search[field_id]
        }
        let keys = Object.keys(search)
        if (keys.length > 0) {
            for (let i = 0; i < keys.length; i++) {
                if (search[keys[i]] === '') {
                    delete search[keys[i]]
                }
            }
        }
        search["object_id"] = object_id
        dispatch({ type: 'loadingSearch/setLoadingSearch', payload: { mini_table: true } })
        clearTimeout(timerDelay)

        const newTimer = setTimeout(() => {
            if (Object.keys(search).length === 1) {
                dispatch({
                    type: 'saga/getDetailRefRecord', payload: {
                        object_id: object_id,
                        page: 1,
                        rowsPerPage: 5
                    }
                })
            }else {
                dispatch({ type: 'saga/getSearchRecord', payload: search })
            }
            
        }, 500)

        setTimerDelay(newTimer)
    }

    const handleCloseTable = () => {
        setOpenTable(false)
        setData({})
        setChooseRecord(false)
        setIdRecord('')
        setViewRefField(false)
        setViewRefObject(false)
        if (Object.keys(valueRefField).length > 0) {
            setValueRefField({})
        } else {
            setValueRefObject({})
        }
    }



    const handleSave = () => {
        setOpenTable(false)
        // setData({
        //     ...data,
        //     [field_id]: data[field_id]
        // })
    }




    const handleChooseRecord = (event, info) => {
        if (viewRefField || viewRefObject) {
            let objectkeys = Object.keys(info)
            let deleteRefObject = objectkeys.filter((keys) => typeof (info[keys]) !== 'object')

            setIdRecord(info._id)
            setChooseRecord(true)

            setData({
                ...data,
                [field_id]: info._id
            })

            // if (field_value === '_id') {
            //     setValueRefObject(info[objectkeys[3]])
            // }
            // else {
            //     setValueRefField(info[field_value])
            // }
            if (viewRefObject) {

                setValueRefObject({
                    ...valueRefObject,
                    [field_id]: info[headerRef[0].field_id]
                })
                // row[header.field_id]["ref_to"][row[header.field_id]["field_value"]]
            }
            else if (viewRefField) {

                setValueRefField({
                    ...valueRefField,
                    [field_id]: info[headerRef[0].field_id]
                })
            }
        }
        else {
            setIdRecord(info._id)
            setChooseRecord(true)
            setData({
                ...data,
                [field_id]: info._id
            })

            setInfoRecord({
                ...infoRecord,
                [field_id]: {
                    ref_to: info
                    
                }
            })

        }

    };


    return (
        <OutlookDialog
            openDialog={openTable}
            handleCloseDialog={handleCloseTable}
            title='Data Record'
            minWidth="76%"
            minHeight='40%'
        >
            <Grid container spacing={2}>


                <Grid item xs={12}>
                    <Card sx={{ width: 1100 }}>
                        <StyledRoot >
                            <Grid container spacing={1}>
                                <Grid item xs={11.5} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                    Searchable
                                </Grid>
                                <Grid item xs={0.5} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                    <CircleIcon sx={{ color: healthCheckStatusMini === 'pending' && 'grey' || healthCheckStatusMini === 'Good' && 'green' || healthCheckStatusMini === 'Bad' && 'red', height: 1 }} />
                                </Grid>
                            </Grid>
                        </StyledRoot>
                        <Scrollbar>
                            <TableContainer sx={{ minWidth: 200 }}>
                                <Table size="small" sx={{ tableLayout: 'auto' }} >
                                    <HeaderTableRef
                                        headLabel={headerRef}
                                        searchInput={searchInput}
                                        handleSearchInput={handleSearchInput}
                                        viewRefField={viewRefField}
                                        viewRefObject={viewRefObject}
                                        healthCheckStatusMini={healthCheckStatusMini}
                                        loadingSearch={loadingSearch}
                                        editRefField={editRefField}
                                        editRefObject={editRefObject}
                                    />
                                    <TableBody>
                                        {detailRefRecord && detailRefRecord["record_details"].length > 0 && !loadingSearch.mini_table ? (
                                            <>
                                                {detailRefRecord["record_details"].map((info) => (
                                                    <TableRow sx={{ textOverflow: 'ellipsis' }} hover key={info._id} tabIndex={-1} role="checkbox">
                                                        <TableCell padding="checkbox"></TableCell>
                                                        {headerRef.map((header, indexcolumn) => (
                                                            <>
                                                                {/* {typeof (row[eachheader.field_id]) === "object" ? (
                                                                                    <>
                                                                                        {Object.keys(row[eachheader.field_id]).length > 0 && (
                                                                                            <TableCell key={indexcolumn} > {row[eachheader.field_id]["ref_to"][row[eachheader.field_id]["field_value"]]} </TableCell>
                                                                                        )}
                                                                                        {Object.keys(row[eachheader.field_id]).length === 0 && (
                                                                                            <TableCell key={indexcolumn} > </TableCell>
                                                                                        )}
                                                                                    </>
                                                                                ) */}
                                                                {typeof (info[header.field_id]) === "object" ? (
                                                                    <>
                                                                        {Object.keys(info[header.field_id]).length > 0 && (
                                                                            <TableCell > {info[header.field_id]["ref_to"][info[header.field_id]["field_value"]]} </TableCell>
                                                                        )}
                                                                        {Object.keys(info[header.field_id]).length === 0 && (
                                                                            <TableCell key={indexcolumn} > </TableCell>
                                                                        )}

                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {info[header.field_id] ? (
                                                                            <>

                                                                                <TableCell align="left" style={{ minWidth: '100px', width: header.field_type === 'id' ? '100px' : 'auto' }}>
                                                                                    {header.field_type === 'textarea' || header.field_type === 'text' ? (
                                                                                        <>
                                                                                            {header.field_type === 'textarea' && (
                                                                                                <Typography sx={{ maxWidth: headerRef.length > 4 ? 200 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                                                    {info[header.field_id]}
                                                                                                </Typography>
                                                                                            )}

                                                                                            {header.field_type === 'text' && (
                                                                                                <Typography sx={{ minWidth: 200 }}>
                                                                                                    {info[header.field_id]}
                                                                                                </Typography>
                                                                                            )}

                                                                                        </>
                                                                                    ) : (
                                                                                        <>

                                                                                            <Typography sx={{ minWidth: 50 }}>
                                                                                                {info[header.field_id]}
                                                                                            </Typography>

                                                                                        </>

                                                                                    )}

                                                                                </TableCell>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                {header.id !== '' && (
                                                                                    <TableCell key={indexcolumn} align="left"></TableCell>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </>
                                                        ))}
                                                        <TableCell align="right">
                                                            <IconButton size="large" color="inherit" onClick={(e) => handleChooseRecord(e, info)}>
                                                                {chooseRecord && info._id === idRecord ? (
                                                                    <LensIcon />
                                                                ) : (
                                                                    <RadioButtonUncheckedIcon />
                                                                )}

                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </>
                                        ) : (
                                            <>
                                                {loadingSearch.mini_table && (
                                                    <SkeleTonAnimation headerRef={headerRef} />
                                                )}
                                            </>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Scrollbar>
                    </Card>
                </Grid>
                <Grid item xs={10.45} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button startIcon={<DoneIcon />} variant="contained" onClick={handleSave} >
                        Save
                    </Button>
                </Grid>
                <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button startIcon={<CloseIcon />} variant="outlined" onClick={handleCloseTable} >
                        Cancel
                    </Button>
                </Grid>
            </Grid>

        </OutlookDialog>
    )
}

export default RecordTableRef