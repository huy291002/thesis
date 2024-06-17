import { useState, useEffect } from 'react';
// @mui
import {
    Grid,
    Card,
    Table,
    Stack,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
    Box,
    Button,
    FormControl,
    Select,
    Toolbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
// import Label from '../../../components/label/Label';

import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../../../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TemplateForm from './TemplateForm';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: '  Name', alignRight: false },
    { id: 'description', label: 'Description', alignRight: false },
    { id: '' },
];

const list_scan = ["Scan", "Send"]



const StyledRoot = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
}));

function TemplateTable({ listtemplate, openSidebar }) {
    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState();

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(2);

    const [openDialog, setOpenDialog] = useState(false)

    const [editTemplate, setEditTemplate] = useState(false)

    const [infoTemplate, setInfoTemplate] = useState('')

    // const detailObject = useSelector(state => state.detailObject)

    const dispatch = useDispatch()

    const { objectid } = useParams()

    // useEffect(() => {
    //     dispatch({ type: 'saga/getDetailObject', payload: objectid })

    // }, [])

    // const header = detailObject ? detailObject.field_object.map((item) => item = {
    //     ...item,
    //     label: item.name,
    //     id: item._id,
    //     alignRight: false

    // }) : []
    //  header.push({ id: '' })


    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    // const handleRequestSort = (event, property) => {
    //     const isAsc = orderBy === property && order === 'asc';
    //     setOrder(isAsc ? 'desc' : 'asc');
    //     setOrderBy(property);
    // };

    // const handleSelectAllClick = (event) => {
    //     if (event.target.checked) {
    //         const newSelecteds = USERLIST.map((n) => n.name);
    //         setSelected(newSelecteds);
    //         return;
    //     }
    //     setSelected([]);
    // };

    // const handleClick = (event, name) => {
    //     const selectedIndex = selected.indexOf(name);
    //     let newSelected = [];
    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, name);
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    //     }
    //     setSelected(newSelected);
    // };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleEditTemplate = () => {
        setOpenDialog(true)
        setEditTemplate(true)
    }



    // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;


    return (
        <>
            <Container>

                <Grid container spacing={2}>
                    <Grid item xs={6} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <Typography variant="h4" gutterBottom>
                            Template
                        </Typography>
                    </Grid>
                    {/* <Grid item xs={6} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenDialog}>
                            New Template
                        </Button>
                    </Grid> */}
                </Grid>
                <Stack direction="row" alignItems="center" justifyContent='space-between' mb={5}>
                    <TemplateForm openDialog={openDialog} setOpenDialog={setOpenDialog}  />
                </Stack>

                <Card sx={{ width:  openSidebar ? 500:  620 }}>
                    {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
                    {/* <StyledRoot /> */}
                    <Toolbar variant='dense' />
                    <Scrollbar>
                        <TableContainer sx={{ minWidth:  openSidebar ? 500:  620 }}>
                            <Table size="small">
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={listtemplate.length}
                                    numSelected={selected.length}
                                //onRequestSort={handleRequestSort}
                                //onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>

                                    <>
                                        {listtemplate.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                            const { _id, full_name, name, role, status, company, avatarUrl, isVerified, email, domain, db, is_manager, description } = row;
                                            // const selectedUser = selected.indexOf(name) !== -1;

                                            return (
                                                <TableRow hover key={_id} tabIndex={-1} role="checkbox">
                                                    <TableCell padding="checkbox">
                                                            {/* <Checkbox /> */}
                                                        </TableCell>
                                                    <TableCell align="left">{name}</TableCell>
                                                    <TableCell align="left">{description}</TableCell>

                                                    <TableCell align='right' >
                                                        <IconButton size="medium" color="inherit" onClick={(e) => handleOpenMenu(e, row)}>
                                                            <Iconify icon={'eva:more-vertical-fill'} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </>

                                </TableBody>


                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[1, 2]}
                        component="div"
                        count={listtemplate.length}
                        rowsPerPage={rowsPerPage}
                        page={page }
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem onClick={handleEditTemplate}>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 1, paddingRight: '12px' }}>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenDialog}>
                    New Template
                </Button>
            </Grid>
        </>

    )
}

export default TemplateTable