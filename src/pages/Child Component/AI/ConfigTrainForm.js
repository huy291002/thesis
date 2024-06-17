import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'

const styletitle = {
    fontWeight: 'bold'
}

function ConfigTrainForm({ handleSubmitConfig, dataConfig, handleDataConfig }) {
    return (
        <form onSubmit={handleSubmitConfig}>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <Typography style={styletitle} color="black">
                        Epoch
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        name='epoch'
                        value={dataConfig.epoch}
                        onChange={handleDataConfig}
                        required
                        disabled
                        size ='small'
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography style={styletitle} color="black">
                        Hidden Size
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        name='hiddenSize'
                        value={dataConfig.hiddenSize}
                        onChange={handleDataConfig}
                        disabled
                        size ='small'
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography style={styletitle} color="black">
                        Patch Size
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        name='patchSize'
                        value={dataConfig.patchSize}
                        onChange={handleDataConfig}
                        required
                        disabled
                        size ='small'
                    />
                </Grid>
                <Grid item xs ={12} sx = {{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button type='submit' variant='contained'>
                        Train
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default ConfigTrainForm