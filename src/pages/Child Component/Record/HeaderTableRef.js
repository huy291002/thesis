import PropTypes from 'prop-types';
// @mui
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel, TextField, InputAdornment, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TableCellText from './TableCellText';
// ----------------------------------------------------------------------

const visuallyHidden = {
    border: 0,
    margin: -1,
    padding: 0,
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    clip: 'rect(0 0 0 0)',
};

HeaderTableRef.propTypes = {
    order: PropTypes.oneOf(['asc', 'desc']),
    orderBy: PropTypes.string,
    rowCount: PropTypes.number,
    headLabel: PropTypes.array,
    numSelected: PropTypes.number,
    onRequestSort: PropTypes.func,
    onSelectAllClick: PropTypes.func,
};

export default function HeaderTableRef({
    order,
    orderBy,
    headLabel,
    onRequestSort,
    searchInput,
    handleSearchInput,
    viewRefField,
    viewRefObject,
    editRefField,
    editRefObject,
    healthCheckStatusBig,
    healthCheckStatusMini
}) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead  >
            <TableRow sx ={{'& .MuiTableCell-head': {
                lineHeight: 0.75
               
            }}} >
                <TableCell padding="checkbox"> </TableCell>
                {headLabel.map((headCell, index) => (
                    <>
                        {headCell.field_type === 'text' || headCell.field_type === 'textarea' || headCell.field_type === 'date' || headCell.field_type === 'float' ? (
                            <>
                                {headCell.field_type === 'text' && (
                                    <TableCell
                                        key={headCell.id}
                                        align={'left'}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                        style={{ width: (viewRefField || viewRefObject || editRefField || editRefObject) ? 200 : 300, maxWidth: (viewRefField || viewRefObject) && 200 }}
                                    >
                                        <TableCellText
                                            order={order}
                                            orderBy={orderBy}
                                            headCell={headCell}
                                            createSortHandler={createSortHandler}
                                            searchInput={searchInput}
                                            handleSearchInput={handleSearchInput}
                                            disabled={healthCheckStatusBig && (healthCheckStatusBig === "Bad" || healthCheckStatusBig === "pending") || healthCheckStatusMini && ( healthCheckStatusMini === "Bad" || healthCheckStatusMini === "pending") }
                                        />


                                    </TableCell>
                                )}
                                {headCell.field_type === 'textarea' && (
                                    <TableCell
                                        key={headCell.id}
                                        align={'left'}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                        style={{ width: (!viewRefField && !viewRefObject && !editRefField && !editRefObject) && 520, maxWidth: 600 }}
                                    >
                                        <TableCellText
                                            order={order}
                                            orderBy={orderBy}
                                            headCell={headCell}
                                            createSortHandler={createSortHandler}
                                            searchInput={searchInput}
                                            handleSearchInput={handleSearchInput}
                                            disabled={healthCheckStatusBig && (healthCheckStatusBig === "Bad" || healthCheckStatusBig === "pending") || healthCheckStatusMini && (healthCheckStatusMini === "Bad" || healthCheckStatusMini === "pending") }
                                        />


                                    </TableCell>
                                )}
                                {headCell.field_type === 'date' && (
                                    <TableCell
                                        key={headCell.id}
                                        align={'left'}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                        style={{ width: (!viewRefField && !viewRefObject && !editRefField && !editRefObject) && 200, maxWidth: 600 }}
                                    >
                                        <TableCellText
                                            order={order}
                                            orderBy={orderBy}
                                            headCell={headCell}
                                            createSortHandler={createSortHandler}
                                            searchInput={searchInput}
                                            handleSearchInput={handleSearchInput}
                                            disabled={healthCheckStatusBig && (healthCheckStatusBig === "Bad" || healthCheckStatusBig === "pending") || healthCheckStatusMini && (healthCheckStatusMini === "Bad" || healthCheckStatusMini === "pending") }
                                        />


                                    </TableCell>
                                )}
                                {headCell.field_type === 'float' && (
                                    <TableCell
                                        key={headCell.id}
                                        align={'left'}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                        style={{ width: (!viewRefField && !viewRefObject && !editRefField && !editRefObject) && 40, maxWidth: 600 }}
                                    >
                                        <TableCellText
                                            order={order}
                                            orderBy={orderBy}
                                            headCell={headCell}
                                            createSortHandler={createSortHandler}
                                            searchInput={searchInput}
                                            handleSearchInput={handleSearchInput}
                                            disabled={healthCheckStatusBig && (healthCheckStatusBig === "Bad" || healthCheckStatusBig === "pending") || healthCheckStatusMini && (healthCheckStatusMini === "Bad" || healthCheckStatusMini === "pending") }
                                        />


                                    </TableCell>
                                )}
                            </>
                        ) : (
                            <>
                                <TableCell
                                    key={headCell.id}
                                    align={'left'}
                                    sortDirection={orderBy === headCell.id ? order : false}
                                    // style={{width: headCell.field_type === 'text' && 'fit-content', maxWidth: 100}}
                                    style={{ width: (headCell.field_type === 'id' || headCell.field_type === 'ref_obj' || headCell.field_type === 'ref_field_obj') ? 150 : 160 }}

                                >
                                    <Grid container spacing={1}>

                                        <Grid item xs={12} >
                                            <TableSortLabel
                                                hideSortIcon
                                                active={orderBy === headCell.id}
                                                direction={orderBy === headCell.id ? order : 'asc'}
                                                onClick={createSortHandler(headCell.id)}
                                                sx = {{color: 'black'}}
                                            >
                                                {headCell.label}
                                            </TableSortLabel>
                                        </Grid>
                                        {headCell.id !== '' && headCell.field_type !== 'ref_obj' && headCell.field_type !== 'ref_field_obj' ? (
                                            <Grid item xs={12} >
                                                <TextField
                                                    sx={{ width: '100%' }}
                                                    name={headCell.field_id}
                                                    value={searchInput[headCell.field_id]}
                                                    onChange={(e) => handleSearchInput(e, headCell.field_id)}
                                                    // name={`${field_id}`}
                                                    disabled={healthCheckStatusBig && (healthCheckStatusBig === "Bad" || healthCheckStatusBig === "pending") || healthCheckStatusMini && (healthCheckStatusMini === "Bad" || healthCheckStatusMini === "pending") }
                                                    InputProps={{
                                                        style: {
                                                            height: 30,
                                                            backgroundColor: 'white'
                                                        },
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <SearchIcon sx={{ height: 22 }} />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    variant='standard'
                                                />
                                            </Grid>
                                        ) :
                                            <>
                                                {headCell.field_type === 'ref_obj' || headCell.field_type === 'ref_field_obj' ? (
                                                    <Grid item xs={12} >
                                                        <TextField
                                                            sx={{ width: '100%' }}
                                                            disabled

                                                            // name={`${field_id}`}
                                                            InputProps={{
                                                                style: {
                                                                    height: 30,
                                                                    backgroundColor: 'white'
                                                                },
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <SearchIcon sx={{ height: 22 }} />
                                                                    </InputAdornment>
                                                                ),

                                                            }}
                                                            variant='standard'
                                                        />
                                                    </Grid>
                                                ) : (
                                                    null
                                                )}
                                            </>
                                        }

                                    </Grid>
                                </TableCell>
                            </>
                        )}

                    </>
                ))}
            </TableRow>
        </TableHead>
    );
}
