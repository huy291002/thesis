import { Card, Table, TableCell, TableContainer, TableHead, TableRow, Paper, TableBody } from '@mui/material';
import React from 'react'

function TableData({ allField, listRecord }) {


    return (
        <>
            <TableBody>
                {listRecord["record_details"].map((row, rowIndex) => {

                    // const selectedUser = selected.indexOf(name) !== -1;

                    return (
                        <TableRow hover key={row._id} tabIndex={-1} role="checkbox">

                            {allField.map((eachheader, indexcolumn) => (
                                <>
                                    {typeof (row[eachheader.field_id]) === "object" ? (
                                        <>
                                            {Object.keys(row[eachheader.field_id]).length > 0 && (
                                                <TableCell key={indexcolumn} > {row[eachheader.field_id]["ref_to"][row[eachheader.field_id]["field_value"]]} </TableCell>
                                            )}
                                            {Object.keys(row[eachheader.field_id]).length === 0 && (
                                                <TableCell key={indexcolumn} > </TableCell>
                                            )}
                                        </>
                                    ) : (
                                        <>

                                            {row[eachheader.field_id] ? (
                                                <>

                                                    {indexcolumn === allField.length - 2 ? (
                                                        <TableCell key={indexcolumn} sx={{ borderRightStyle: 'solid', borderRightColor: '#f5f5f5' }} align="left">{row[eachheader.field_id]}</TableCell>
                                                    ) : (
                                                        <TableCell key={indexcolumn} align="left">{row[eachheader.field_id]}</TableCell>
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
                                    )}
                                </>
                            ))}
                        </TableRow>
                    );
                })}
            </TableBody>

        </>

    )
}

export default TableData