import React from 'react'
import { TableCell, TextField, InputAdornment, Grid, TableSortLabel, TableHead, TableRow } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function TableCellText({order, orderBy, headCell, searchInput, handleSearchInput, createSortHandler, disabled}) {

    return (
        
        <Grid container spacing={1}>

            <Grid item xs={12} >
                <TableSortLabel
                    hideSortIcon
                    sx ={{color: 'black'}}
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                >
                    {headCell?.label}
                </TableSortLabel>
            </Grid>

            <Grid item xs={12} >
                <TextField
                    sx={{ width: '100%' }}
                    name={headCell?.field_id}
                    value={searchInput[headCell?.field_id]}
                    onChange={(e) => handleSearchInput(e, headCell?.field_id)}
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
                    disabled={disabled}
                    variant='standard'
                />
            </Grid>

        </Grid>

    )
}

export default TableCellText