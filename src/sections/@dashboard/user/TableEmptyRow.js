import React from 'react'
import PropTypes from 'prop-types'
import { TableRow, TableCell } from '@mui/material'
function TableEmptyRow({ emptyRows, height }) {
    if (!emptyRows) {
        return null;
    }

    return (
        <TableRow
            sx={{
                ...(height && {
                    height: height * emptyRows,
                }),
            }}
        >
            <TableCell colSpan={9} />
        </TableRow>
    );
}

export default TableEmptyRow

TableEmptyRow.propTypes = {
    emptyRows: PropTypes.number,
    height: PropTypes.number,
  };