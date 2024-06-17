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
//import Label from '../../../components/label/Label';
// import Label from '../components/label';
import Label from '../../../../components/label/Label';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../../../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TemplateForm from '../TemplateForm/TemplateForm';
import EmailForm from './EmailForm';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'username', label: 'Email username', alignRight: false },
    { id: 'protocol', label: 'Email protocol', alignRight: false },
    { id: '' },
];




const StyledRoot = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
}));


function EmailTable({  listemail, openSidebar }) {
    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [openDialog, setOpenDialog] = useState(false)

    const [editEmail, setEditEmail] = useState(false)

    // const detailObject = useSelector(state => state.detailObject)

    const dispatch = useDispatch()

    const { objectid } = useParams()

    const handleOpenMenu = (event, email) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

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

    const handleEditEmail = () => {
        setEditEmail(true)
        setOpenDialog(true)
    }

    // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
    return (
        <>
            <Container >
                <Grid container spacing={2}>
                    <Grid item xs={6} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <Typography variant="h4" gutterBottom>
                            Email
                        </Typography>
                    </Grid>
                    {/* <Grid item xs={6} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenDialog}>
                            New Template
                        </Button>
                    </Grid> */}
                </Grid>
                <Stack direction="row" alignItems="center" justifyContent='space-between' mb={5}>
                    <EmailForm openDialog={openDialog} setOpenDialog={setOpenDialog} />
                </Stack>

                <Card sx={{ width: openSidebar ? 380:  600 }}>
                    {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
                    {/* <StyledRoot /> */}
                    <Toolbar variant='dense' />
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: openSidebar ? 380:  600 }}>
                            <Table size="small" >
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={listemail.length}
                                    numSelected={selected.length}
                                //onRequestSort={handleRequestSort}
                                //onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    <>
                                        {listemail.map((row) => {
                                            const { _id, username, protocol } = row;
                                            // const selectedUser = selected.indexOf(name) !== -1;

                                            return (
                                                <TableRow hover key={_id} tabIndex={-1} role="checkbox" >
                                                    <TableCell padding="checkbox">
                                                           
                                                        </TableCell>
                                                    <TableCell align="left">{username}</TableCell>
                                                    <TableCell align="left">{protocol}</TableCell>

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
                        count={listemail.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
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
                <MenuItem onClick={handleEditEmail}>
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
                    New Email
                </Button>
            </Grid>
        </>

    )
}

export default EmailTable