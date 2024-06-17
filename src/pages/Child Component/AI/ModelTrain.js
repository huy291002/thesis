import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent, timelineOppositeContentClasses } from '@mui/lab';
import React from 'react'


const fake_time_line = [
    {
        time: '2024-05-06 10:50:56',
        name: 'epoch 1',
        validate: 2.512343677878,
        train: 1.566774443425,
        runtime: 123.234567890101
    },
    {
        time: '2024-05-06 10:50:56',
        name: 'epoch 2',
        validate: 2.512343677878,
        train: 1.566774443425,
        runtime: 123.234567890101
    },
    {
        time: '2024-05-06 10:50:56',
        name: 'epoch 3',
        validate: 2.512343677878,
        train: 1.566774443425,
        runtime: 123.234567890101
    },
    {
        time: '2024-05-06 10:50:56',
        name: 'epoch 4',
        validate: 2.512343677878,
        train: 1.566774443425,
        runtime: 123.234567890101
    },
    {
        time: '2024-05-06 10:50:56',
        name: 'epoch 5',
        validate: 2.512343677878,
        train: 1.566774443425,
        runtime: 123.234567890101
    },
    {
        time: '2024-05-06 10:50:56',
        name: 'epoch 6',
        validate: 2.512343677878,
        train: 1.566774443425,
        runtime: 123.234567890101
    }
]

function ModelTrain({ chooseModel, infoModel }) {
    return (
        <Timeline
            sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.3,
                },
                marginRight: 2
            }}
        // position='right'

        >
            {/* <TimelineItem>
                <TimelineOppositeContent color="textSecondary">
                    09:30 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Validate: 12</TimelineContent>
            </TimelineItem> */}
            {chooseModel ? (
                <>
                    {infoModel.epochs.map((timeline, index) => (
                        <TimelineItem key={index}>
                            <TimelineOppositeContent color="textSecondary">
                                {timeline.done_at}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent >Epoch: {timeline.epoch_num}, Train: {timeline.train_loss}, Validate: {timeline.val_loss} </TimelineContent>

                        </TimelineItem>
                    ))}
                </>
            ): (
                <>
                    {fake_time_line.map((timeline, index) => (
                        <TimelineItem key={index}>
                            <TimelineOppositeContent color="textSecondary">
                                {timeline.time}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent >Train: {timeline.train}, Validate: {timeline.validate} , Runtime: {timeline.runtime} </TimelineContent>

                        </TimelineItem>
                    ))}
                </>
            )}

            {/* <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            10:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>Code</TimelineContent>
        </TimelineItem> */}
        </Timeline>
    )
}

export default ModelTrain