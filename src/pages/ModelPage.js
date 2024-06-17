import { Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Divider, Grid, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Iconify from '../components/iconify/Iconify'

const list_model = [
    {
        id: '1',
        title: 'Model 1',
        description: 'BERT is a transformer-based model developed by Google. It uses bidirectional training to understand the context of words in a sentence by looking at both the left and right context. This makes BERT highly effective for sentiment analysis, as it can grasp the nuances of language and context.',
        dataset: 'Dataset 1'
    },
    {
        id: '2',
        title: 'Model 2',
        description: 'BERT is a transformer-based model developed by Google. It uses bidirectional training to understand the context of words in a sentence by looking at both the left and right context. This makes BERT highly effective for sentiment analysis, as it can grasp the nuances of language and context.',
        dataset: 'Dataset 1'
    },
    {
        id: '3',
        title: 'Model 3',
        description: 'BERT is a transformer-based model developed by Google. It uses bidirectional training to understand the context of words in a sentence by looking at both the left and right context. This makes BERT highly effective for sentiment analysis, as it can grasp the nuances of language and context.',
        dataset: 'Dataset 1'
    },
    {
        id: '4',
        title: 'Model 4',
        description: 'BERT is a transformer-based model developed by Google. It uses bidirectional training to understand the context of words in a sentence by looking at both the left and right context. This makes BERT highly effective for sentiment analysis, as it can grasp the nuances of language and context.',
        dataset: 'Dataset 1'
    },
    {
        id: '5',
        title: 'Model 5',
        description: 'BERT is a transformer-based model developed by Google. It uses bidirectional training to understand the context of words in a sentence by looking at both the left and right context. This makes BERT highly effective for sentiment analysis, as it can grasp the nuances of language and context.',
        dataset: 'Dataset 1'
    },
    {
        id: '6',
        title: 'Model 6',
        description: 'BERT is a transformer-based model developed by Google. It uses bidirectional training to understand the context of words in a sentence by looking at both the left and right context. This makes BERT highly effective for sentiment analysis, as it can grasp the nuances of language and context.',
        dataset: 'Dataset 6'
    }

]

function ModelPage() {

    const [open, setOpen] = useState(null)

    const navigate = useNavigate()

    const handleOpenMenu = (e) => {
        setOpen(e.currentTarget)
    }

    const handleNavigateAddModel = () => {
        navigate('/settings/models/AI-prepare')
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sx={{ display: 'flex', marginLeft: 10 }}>
                <Typography variant='h6'>
                    Models
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ marginLeft: 10 }}>
                <Divider />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: 10 }}>
                <Button onClick={handleNavigateAddModel} variant='contained'>
                    Add Model
                </Button>
            </Grid>

            {list_model.map((model, index) => (
                <Grid key={index} item xs={5} sx={{ display: 'flex', justifyContent: 'center', marginLeft: 10, marginTop: 1 }}>
                    <Card sx = {{boxShadow: 5}}>
                        <CardHeader title={model.title} />
                        <CardContent>
                            {model.description}
                        </CardContent>
                        <CardActions sx = {{display: 'flex', justifyContent: 'flex-end'}}>
                            <Chip label={model.dataset} variant='outlined' sx={{ borderRadius: 0.5 }} color='primary' />
                        </CardActions>
                    </Card>
                </Grid>
            ))}

        </Grid>
    )
}

export default ModelPage