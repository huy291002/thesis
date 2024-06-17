import { Box, Card, CardHeader } from '@mui/material';
import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';

const Data = [
    {
        name: 'Metríc1',
        data: [
            {
                x: 'w1',
                y: 70
            },
            {
                x: 'w2',
                y: 0
            },
            {
                x: 'w3',
                y: 34
            },
            {
                x: 'w4',
                y: 19
            },
            {
                x: 'w5',
                y: 4
            },
            {
                x: 'w6',
                y: 85
            },
            {
                x: 'w7',
                y: 8
            },
            {
                x: 'w8',
                y: 5
            },
            {
                x: 'w9',
                y: 55
            },
            {
                x: 'w10',
                y: 74
            }
        ]
    },
    {
        name: 'Metríc2',
        data: [
            {
                x: 1,
                y: 8
            },
            {
                x: 2,
                y: 2
            }
        ]
    }
]

function HeatMapChart({ infoModel }) {
    const generateData = (model) => {
        const series = [];
        for (let i = 0; i < model.length; i++) {
            let x = `${i + 1}`

            let y = model[i]
            series.push({ x, y })

        }
        return series;
    };

    let test = infoModel.confusion_matrix.map((model, index) => model = {
        name: `${index + 1}`,
        data: generateData(model)
    })

    // const [series] = useState([
    //     {
    //         name: '1',
    //         data: generateData(10, { min: 0, max: 90 })
    //     },
    //     {
    //         name: '2',
    //         data: generateData(10, { min: 0, max: 90 })
    //     },
    //     {
    //         name: '3',
    //         data: generateData(10, { min: 0, max: 90 })
    //     },
    //     {
    //         name: '4',
    //         data: generateData(10, { min: 0, max: 90 })
    //     },
    //     {
    //         name: '5',
    //         data: generateData(10, { min: 0, max: 90 })
    //     },
    //     {
    //         name: '6',
    //         data: generateData(10, { min: 0, max: 90 })
    //     },
    //     {
    //         name: '7',
    //         data: generateData(10, { min: 0, max: 90 })
    //     },
    //     {
    //         name: '8',
    //         data: generateData(10, { min: 0, max: 90 })
    //     },
    //     {
    //         name: '9',
    //         data: generateData(10, { min: 0, max: 90 })
    //     },
    //     {
    //         name: '10',
    //         data: generateData(10, { min: 0, max: 90 })
    //     }
    // ]);

    const [options] = useState({
        chart: {
            height: 350,
            type: 'heatmap',
            width: 200
        },
        plotOptions: {
            heatmap: {
                colorScale: {
                    ranges: [{
                        from: 0,
                        to: 10,
                        color: '#e3f2fd'
                    }, {
                        from: 10,
                        to: 50,
                        color: '#bbdefb'
                    }, {
                        from: 50,
                        to: 100,
                        color: '#90caf9'    
                    },{
                        from: 100,
                        to: 500,
                        color: '#64b5f6'
                    }, {
                        from: 500,
                        to: 2000,
                        color: '#42a5f5'
                    }, {
                        from: 2000,
                        to: 5000,
                        color: '#1976d2'
                    }]
                }
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ['#000000']
            }
        },
        colors: ["#008FFB"],
    });
    return (
        <Card sx={{ width: '100%' }}>
            <CardHeader title="Heatmap" />

            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ReactApexChart options={options} series={test} type="heatmap" height={350} />
            </Box>
        </Card>
    )
}

export default HeatMapChart