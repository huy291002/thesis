import React from 'react'
import { Skeleton, TableRow, TableCell } from '@mui/material'
function SkeleTonBigTable({ header }) {
    return (
        <TableRow hover tabIndex={-1} role="checkbox">
            <TableCell padding="checkbox"></TableCell>
            {header.map((eachheader, indexcolumn) => (
                <>
                    {eachheader.field_type === "ref_obj" || eachheader.field_type === "ref_field_obj" ? (
                        <TableCell >
                            <Skeleton variant='text' animation='wave' />
                        </TableCell>
                    ) : (
                        <>
                            {eachheader.id !== '' && (
                                <>
                                    {eachheader.field_type === 'email' ? (
                                        <TableCell align="left">
                                            <Skeleton variant='text' animation='wave' sx={{ minWidth: 280 }} />
                                        </TableCell>
                                    ) : (
                                        <TableCell align="left">
                                            <Skeleton variant='text' animation='wave' />
                                        </TableCell>
                                    )}

                                </>
                            )}
                        </>
                    )}
                </>
            ))}

        </TableRow>
    )
}

export default SkeleTonBigTable