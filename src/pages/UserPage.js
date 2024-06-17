import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  Button,
  TableContainer,
  TablePagination,
  Grid,
} from '@mui/material';

// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import UserRegisterForm from './Child Component/UserRegister/UserRegisterForm';
import { useDispatch, useSelector } from 'react-redux';

// import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'name', label: 'Name', alignRight: false },
//   { id: 'company', label: 'Company', alignRight: false },
//   { id: 'role', label: 'Role', alignRight: false },
//   { id: 'isVerified', label: 'Verified', alignRight: false },
//   { id: 'status', label: 'Status', alignRight: false },
//   { id: '' },
// ];

const TABLE_HEAD = [

  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'isManager', label: 'Is Manager', alignRight: false },
  { id: '' },
];


// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {

  const dispatch = useDispatch()

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(1);

  const [edit, setEdit] = useState(false)

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openDialog, setOpenDialog] = useState(false);

  const [userInfo, setUserInfo] = useState('')

  const listUser = useSelector(state => state.listUser)

  const [dataChange, setDataChange] = useState(false)

  useEffect(() => {
    dispatch({
      type: 'saga/getListUser', payload: {
        page: page,
        rowsPerPage: rowsPerPage
      }
    })

    return () => {
      dispatch({ type: 'listUser/setListUser', payload: null })
    }
  }, [page, rowsPerPage])

  const handleOpenMenu = (event, user) => {
    setOpen(event.currentTarget);
    setUserInfo(user)
  };

  // const handleIdUser = (id) => {

  // }

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);

  };

  const handleChangeRowsPerPage = (event) => {
    setPage(1);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setEdit(false)

  }

  const handleEdit = () => {
    setEdit(true)
    setOpenDialog(true)
    setOpen(null)
  }

  // const emptyRows = page > 0 && listUser  ? Math.max(0, (1 + page) * rowsPerPage - listUser.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;


  return (
    <>
      <Helmet>
        <title> User | CSA </title>
      </Helmet>
      {listUser ? (
        <>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <Typography variant="h4" gutterBottom>
                  User
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenDialog}>
                  New User
                </Button>
              </Grid>
            </Grid>
            <Stack direction="row" alignItems="center" justifyContent='space-between' mb={5}>
              <UserRegisterForm openDialog={openDialog} setOpenDialog={setOpenDialog} userInfo={edit ? userInfo : null} setEdit={setEdit} setUserInfo={setUserInfo} setDataChange={setDataChange} />
            </Stack>

            <Card>
              <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={listUser.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {listUser.data.length ? (
                        <>
                          {listUser.data.map((row) => {
                            const { _id, full_name, role, status, company, avatarUrl, isVerified, email, domain, db, is_manager } = row;
                            // const selectedUser = selected.indexOf(name) !== -1;

                            return (
                              <TableRow hover key={_id} tabIndex={-1} role="checkbox">
                                <TableCell padding="checkbox">

                                </TableCell>
                                <TableCell align="left">{full_name}</TableCell>
                                <TableCell align="left">{email}</TableCell>
                                <TableCell align="left">{`${is_manager}`.charAt(0).toUpperCase() + `${is_manager}`.slice(1)}</TableCell>
                                <TableCell align="right">
                                  <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, row)}>
                                    <Iconify icon={'eva:more-vertical-fill'} />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </>
                      ) : (
                        null
                      )}
                      {/* <TableEmptyRow
                      height={77}
                      emptyRows={emptyRows(page,rowsPerPage, listUser.length)}
                      /> */}
                    </TableBody>

                    {isNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <Paper
                              sx={{
                                textAlign: 'center',
                              }}
                            >
                              <Typography variant="h6" paragraph>
                                Not found
                              </Typography>

                              <Typography variant="body2">
                                No results found for &nbsp;
                                <strong>&quot;{filterName}&quot;</strong>.
                                <br /> Try checking for typos or using complete words.
                              </Typography>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[10, 15, 20, 1, 2]}
                component="div"
                count={listUser.count}
                rowsPerPage={rowsPerPage}
                page={page - 1}
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
            <MenuItem onClick={() => {
              handleOpenDialog()
              handleEdit()
            }
            }>
              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
              Edit
            </MenuItem>

            <MenuItem sx={{ color: 'error.main' }}>
              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>
        </>
      ) : (
        null
      )}

    </>
  );
}
