import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator, timelineOppositeContentClasses } from '@mui/lab'
import { Card, CardContent, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'

const object = {
    _id: "66053bd62433f7355400d687",
    obj_name: "Contact",
    obj_id: "obj_contact_485",
    group_obj_id: "6605396f768c135f0f0d0fa8",
    sorting_id: 1,
    created_at: "2024-03-28 16:43:50",
    modified_at: "2024-03-28 16:43:50",
    created_by: "659d33ac7961655c570d44f2",
    modified_by: "659d33ac7961655c570d44f2",
    fields: [
        {
            _id: "66053bd62433f7355400d688",
            field_type: "id",
            field_name: "ID",
            field_id: "fd_id_630",
            object_id: "66053bd62433f7355400d687",
            sorting_id: 0,
            prefix: "CUS"
        },
        {
            _id: "66053bd62433f7355400d689",
            field_type: "text",
            field_name: "Name",
            field_id: "fd_name_758",
            object_id: "66053bd62433f7355400d687",
            sorting_id: 1,
            length: 100
        },
        {
            _id: "66053bd62433f7355400d68a",
            field_type: "email",
            field_name: "Email",
            field_id: "fd_email_383",
            object_id: "66053bd62433f7355400d687",
            sorting_id: 2
        },
        {
            _id: "66053bd62433f7355400d68b",
            field_type: "select",
            field_name: "Gender",
            field_id: "fd_gender_392",
            object_id: "66053bd62433f7355400d687",
            sorting_id: 3,
            options: [
                "Male",
                "Female"
            ]
        },
        {
            _id: "6606d9f0cf59f8c5d8a1ae5e",
            field_type: "textarea",
            field_name: "Description",
            field_id: "fd_description_550",
            object_id: "66053bd62433f7355400d687",
            sorting_id: 4
        },
        {
            _id: "662f7ea645da2abc155e10dd",
            field_type: "date",
            field_name: "Birthday",
            field_id: "fd_birthday_941",
            object_id: "66053bd62433f7355400d687",
            sorting_id: 4,
            format: "YYYY MM DD",
            separator: "-"
        }
    ]
}

const infoRecordExample =
    [
        {
            _id: "662f81511cd771cb1dea3392",
            object_id: "66053bd62433f7355400d687",
            fd_name_758: "Lê Hân",
            fd_email_383: "lhoflaaaa@gmail.com",
            fd_gender_392: "Female",
            fd_description_550: "Bí ẩn, người cho mượn nick",
            fd_birthday_941: "2002-10-11",
            fd_id_630: "CUS19",
            created_at: "2024-04-29 18:15:29",
            modified_at: "2024-05-04 16:08:35",
            created_by: "659d33ac7961655c570d44f2",
            modified_by: "659d33ac7961655c570d44f2"

        },
        {
            _id: "662f81511cd771cb1dea3392",
            object_id: "66053bd62433f7355400d687",
            fd_name_758: "Lê Hân",
            fd_email_383: "lhoflaaaa@gmail.com",
            fd_gender_392: "Female",
            fd_description_550: "Bí ẩn, người cho mượn nick",
            fd_birthday_941: "2002-10-11",
            fd_id_630: "CUS19",
            created_at: "2024-04-29 18:15:29",
            modified_at: "2024-05-04 16:08:35",
            created_by: "659d33ac7961655c570d44f2",
            modified_by: "659d33ac7961655c570d44f2"

        },
        {
            _id: "662f81511cd771cb1dea3392",
            object_id: "66053bd62433f7355400d687",
            fd_name_758: "Lê Hân",
            fd_email_383: "lhoflaaaa@gmail.com",
            fd_gender_392: "Female",
            fd_description_550: "Bí ẩn, người cho mượn nick",
            fd_birthday_941: "2002-10-11",
            fd_id_630: "CUS19",
            created_at: "2024-04-29 18:15:29",
            modified_at: "2024-05-04 16:08:35",
            created_by: "659d33ac7961655c570d44f2",
            modified_by: "659d33ac7961655c570d44f2"

        },
        {
            _id: "662f81511cd771cb1dea3392",
            object_id: "66053bd62433f7355400d687",
            fd_name_758: "Lê Hân",
            fd_email_383: "lhoflaaaa@gmail.com",
            fd_gender_392: "Female",
            fd_description_550: "Bí ẩn, người cho mượn nick",
            fd_birthday_941: "2002-10-11",
            fd_id_630: "CUS19",
            created_at: "2024-04-29 18:15:29",
            modified_at: "2024-05-04 16:08:35",
            created_by: "659d33ac7961655c570d44f2",
            modified_by: "659d33ac7961655c570d44f2"

        }
    ]


function TableCustomView({ item, recordid, layout }) {

    const [infoRecord, setInfoRecord] = useState([])

    // useEffect(() => {

    // }, [])

    return (
        <>

            {/* <TableContainer component={Paper} sx={{ maxHeight: 440 }} >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {object.fields.map((field, index) => (
                                <TableCell key={field._id}>
                                    {field.field_name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer> */}
            <Timeline sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.2,
                },
                marginRight: 1
            }}>
                {!recordid ? (
                    <>
                        {infoRecordExample.slice(0, 2).map((record, index) => (
                            <TimelineItem key={record._id}>
                                {index === 0 ? (
                                    <TimelineOppositeContent sx={{ marginTop: 9 }} color='textSecondary'>
                                        {record.created_at}
                                    </TimelineOppositeContent>
                                ) : (
                                    <TimelineOppositeContent sx={{ marginTop: 2 }} color='textSecondary'>
                                        {record.created_at}
                                    </TimelineOppositeContent>
                                )}

                                <TimelineSeparator sx={{ marginTop: index === 0 ? 9 : 2 }}>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <TableContainer component={Paper} sx={{ maxHeight: 440 }} >
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    {index === 0 && (
                                                        item.object.fields.map((field, index) => (
                                                            <TableCell key={field._id}>
                                                                {field.field_name}
                                                            </TableCell>
                                                        ))
                                                    )}

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {/* <TableRow hover tabIndex={-1} role="checkbox">
                                            {item.object.fields.map((eachheader, indexcolumn) => (
                                                <>
                                                    {typeof (record[eachheader.field_id]) === "object" ? (
                                                        <>
                                                            {Object.keys(record[eachheader.field_id]).length > 0 && (
                                                                <TableCell key={indexcolumn} > {record[eachheader.field_id]["ref_to"][record[eachheader.field_id]["field_value"]]} </TableCell>
                                                            )}
                                                            {Object.keys(record[eachheader.field_id]).length === 0 && (
                                                                <TableCell key={indexcolumn} > </TableCell>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {record[eachheader.field_id] ? (
                                                                <TableCell key={indexcolumn} align="left">{record[eachheader.field_id]}</TableCell>
                                                            ) : (
                                                                null
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            ))}
                                        </TableRow> */}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </>
                ) : (
                    <>
                        {item.infoRecord.map((record, index) => (
                            <TimelineItem key={record._id}>
                                {index === 0 ? (
                                    <TimelineOppositeContent sx={{ marginTop: 9 }} color='textSecondary'>
                                        {record.created_at}
                                    </TimelineOppositeContent>
                                ) : (
                                    <TimelineOppositeContent sx={{ marginTop: 2 }} color='textSecondary'>
                                        {record.created_at}
                                    </TimelineOppositeContent>
                                )}

                                <TimelineSeparator sx={{ marginTop: index === 0 ? 9 : 2 }}>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <TableContainer component={Paper} sx={{ maxHeight: 440 }} >
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    {index === 0 && (
                                                        item.object.fields.map((field, index) => (
                                                            <TableCell key={field._id}>
                                                                {field.field_name}
                                                            </TableCell>
                                                        ))
                                                    )}

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow hover tabIndex={-1} role="checkbox">
                                                    {item.object.fields.map((eachheader, indexcolumn) => (
                                                        <>
                                                            {typeof (record[eachheader.field_id]) === "object" ? (
                                                                <>
                                                                    {Object.keys(record[eachheader.field_id]).length > 0 && (
                                                                        <TableCell key={indexcolumn} > {record[eachheader.field_id]["ref_to"][record[eachheader.field_id]["field_value"]]} </TableCell>
                                                                    )}
                                                                    {Object.keys(record[eachheader.field_id]).length === 0 && (
                                                                        <TableCell key={indexcolumn} > </TableCell>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {record[eachheader.field_id] ? (
                                                                        <TableCell key={indexcolumn} align="left">{record[eachheader.field_id]}</TableCell>
                                                                    ) : (
                                                                        null
                                                                    )}
                                                                </>
                                                            )}
                                                        </>
                                                    ))}
                                                </TableRow>

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </TimelineContent>
                            </TimelineItem>
                        ))}    
                    </>
                )}

            </Timeline>
        </>

    )
}

export default TableCustomView