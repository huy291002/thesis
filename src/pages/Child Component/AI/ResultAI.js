import { Grid, Typography } from '@mui/material'
import React from 'react'

const styletitle = {
    fontWeight: 'bold'
}

function ResultAI({ infoModel }) {
    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <Typography sx={styletitle} color={'black'}>
                    Precision
                </Typography>
            </Grid>
            <Grid item xs={6}>
                {Object.keys(infoModel).length > 0 ? infoModel.precision : ''}
            </Grid>
            <Grid item xs={6}>
                <Typography sx={styletitle} color={'black'}>
                    Recall
                </Typography>
            </Grid>
            <Grid item xs={6}>
                {Object.keys(infoModel).length > 0 ? infoModel.recall : ''}
            </Grid>
            <Grid item xs={6}>
                <Typography sx={styletitle} color={'black'}>
                    F1-score
                </Typography>
            </Grid>
            <Grid item xs={6}>
                {Object.keys(infoModel).length > 0 ? infoModel.f1_score : ''}
            </Grid>
            <Grid item xs={6}>
                <Typography sx={styletitle} color={'black'}>
                    Accuracy
                </Typography>
            </Grid>
            <Grid item xs={6}>
                {Object.keys(infoModel).length > 0 ? infoModel.accuracy : ''}
            </Grid>
        </Grid>
    )
}

export default ResultAI