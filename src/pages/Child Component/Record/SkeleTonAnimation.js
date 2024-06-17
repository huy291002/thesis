import React from 'react'
import { Skeleton, TableRow, TableCell } from '@mui/material'
function SkeleTonAnimation({ headerRef }) {

    return (
        <TableRow sx={{ textOverflow: 'ellipsis' }} hover abIndex={-1} role="checkbox">
            <TableCell padding="checkbox"></TableCell>
            {headerRef.map((header, indexcolumn) => (
                <>
                    {header.field_type === "ref_obj" || header.field_type === "ref_field_obj" ? (
                        <TableCell > 
                            <Skeleton variant='text' animation='wave'/>
                        </TableCell>
                    ) : (
                        <>
                            {header.id !== '' && (
                                <>
                                    <TableCell align="left" style={{ minWidth: 100, width: header.field_type === 'id' ? '100px' : 'auto' }}>
                                        {header.field_type === 'textarea' || header.field_type === 'text' ? (
                                            <>
                                                {header.field_type === 'textarea' && (
                                                    <Skeleton   variant='text' animation='wave' sx={{ minWidth: headerRef.length > 4 ? 200 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} />
                                                )}

                                                {header.field_type === 'text' && (
                                                    <Skeleton variant='text' animation='wave' sx={{ minWidth: 200 }} />
                                                )}

                                            </>
                                        ) : (
                                            <>
                                            {header.field_type === 'id' || header.field_type === 'select' || header.field_type === 'ref_obj' || header.field_type === 'ref_field_obj' || header.field_type === 'date' || header.field_type === 'float' ? (
                                                <Skeleton variant='text' animation='wave' sx={{ minWidth: 75 }} />
                                            ): (
                                                <Skeleton variant='text' animation='wave' sx={{ minWidth: 250 }} />
                                            )}
                                            </>
                                            
                                        )}

                                    </TableCell>
                                </>
                            )}
                        </>
                    )}
                </>
            ))}
            <TableCell align="right">
            </TableCell>
        </TableRow>
    )
}

export default SkeleTonAnimation