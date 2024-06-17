import React from 'react'
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Box, Grid, FormHelperText } from '@mui/material';
function Error({marginsize ,...props}) {
    return (
        <Box >
            <Grid item xs={12}  sx={{ display: 'flex', flexDirection: 'row', m: marginsize }}>
                <ErrorOutlineOutlinedIcon sx={{ fontSize: "25px", color: 'red' }} />
                <FormHelperText sx={{ fontSize: "15px", paddingTop: 0, paddingLeft: 1, color: "red" }}>
                    {props.children}
                </FormHelperText>
            </Grid>
        </Box>
    )
}

export default Error