import { TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react'

function TableProcessedData({ allField, fieldMapping, listRecordProcessed }) {
    return (
        <>
            {listRecordProcessed.length > 0 ? (
                <TableBody>
                    {listRecordProcessed.map((row, rowIndex) => {

                        // const selectedUser = selected.indexOf(name) !== -1;

                        return (
                            <TableRow hover key={row._id} tabIndex={-1} role="checkbox">
                                {/* <TableCell padding="checkbox"></TableCell> */}

                                {allField.map((eachheader, indexcolumn) => (
                                    <>

  
                                        {row[fieldMapping[eachheader.field_id]] ? (
                                            <>

                                                {indexcolumn === allField.length - 2 ? (
                                                    <TableCell key={indexcolumn} sx={{ borderRightStyle: 'solid', borderRightColor: '#f5f5f5' }} align="left">{row[fieldMapping[eachheader.field_id]]}</TableCell>
                                                ) : (
                                                    <TableCell key={indexcolumn} align="left">{row[fieldMapping[eachheader.field_id]]}</TableCell>
                                                )}

                                            </>
                                        ) : (
                                            <>
                                                {eachheader.id !== '' && (
                                                    <TableCell key={indexcolumn} align="left"></TableCell>
                                                )}
                                            </>


                                        )}
                                    </>

                                ))}
                            </TableRow>
                        );
                    })}
                </TableBody>
            ) : null}

        </>
    )
}

export default TableProcessedData