import { FormControl, Grid, InputLabel, ListSubheader, MenuItem, Select, Card, CardHeader, Button, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DashboardForm from './Child Component/Dashboard/DashboardForm'
import { AppCurrentVisits, AppWebsiteVisits } from '../sections/@dashboard/app'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useTheme, styled } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// utils
import { fNumber } from '../utils/formatNumber'
// components
import { useChart } from '../components/chart'
import { LoadingButton } from '@mui/lab'

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(1),
    '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
        overflow: 'visible',
    },
    '& .apexcharts-legend': {
        height: LEGEND_HEIGHT,
        alignContent: 'center',
        position: 'relative !important',
        borderTop: `solid 1px ${theme.palette.divider}`,
        top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
    },
}));

const chartDataPie = [
    { label: 'America', value: 4344 },
    { label: 'Asia', value: 5435 },
    { label: 'Europe', value: 1443 },
    { label: 'Africa', value: 4443 },
]


const chartLabelsBar = [
    '01/01/2003',
    '02/01/2003',
    '03/01/2003',
    '04/01/2003',
    '05/01/2003',
    '06/01/2003',
    '07/01/2003',
    '08/01/2003',
    '09/01/2003',
    '10/01/2003',
    '11/01/2003',
]
const chartDataBar = [
    {
        name: 'Team A',
        type: 'column',
        fill: 'solid',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
    }
]

function DashboardConfigPage() {

    const [loading, setLoading] = useState(false)

    const theme = useTheme();

    const chartColorsPie = [
        theme.palette.primary.main,
        theme.palette.info.main,
        theme.palette.warning.main,
        theme.palette.error.main,
    ]

    const chartLabels = chartDataPie.map((i) => i.label);

    const chartSeries = chartDataPie.map((i) => i.value);

    const chartOptionsPie = useChart({
        colors: chartColorsPie,
        labels: chartLabels,
        stroke: { colors: [theme.palette.background.paper] },
        legend: { floating: true, horizontalAlign: 'center' },
        dataLabels: { enabled: true, dropShadow: { enabled: false } },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (seriesName) => fNumber(seriesName),
                title: {
                    formatter: (seriesName) => `${seriesName}`,
                },
            },
        },
        plotOptions: {
            pie: { donut: { labels: { show: false } } },
        },
    });

    const chartOptionsBar = useChart({
        plotOptions: { bar: { columnWidth: '16%' } },
        fill: { type: chartDataBar.map((i) => i.fill) },
        labels: chartLabelsBar,
        xaxis: { type: 'datetime' },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (y) => {
                    if (typeof y !== 'undefined') {
                        return `${y.toFixed(0)} visits`;
                    }
                    return y;
                },
            },
        },
    });

    const [signalLayout, setSignalLayout] = useState(true)

    const [openDialog, setOpenDialog] = useState(false)

    const [data, setData] = useState({
        object: '',
        field: '',
        type: ''
    })

    const [layout, setLayout] = useState([])

    const customDashboard = useSelector(state => state.customDashboard)

    let count_items = 0

    const dispatch = useDispatch()

    useEffect(() => {
        if (customDashboard.status === 'createCustomDashboardSuccess') {
            toast.success('Create custom Dashboard successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoading(false)
            dispatch({ type: 'customDashboard/setCustomDashboard', payload: { status: 'idle' } })
        }
        else if (customDashboard.status === 'createCustomDashboardError') {
            toast.error('Create custom Dashboard error', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoading(false)
            dispatch({ type: 'customDashboard/setCustomDashboard', payload: { status: 'idle' } })
        }
    }, [customDashboard])

    const handleDataChange = (e) => {
        const value = e.target.value
        setData({
            ...data,
            [e.target.name]: value
        })
        if (e.target.name === 'object') {
            setOpenDialog(true)
        }

    }

    const onLayoutChange = (newLayout) => {
        const newOut = [...newLayout]
        if (signalLayout === true) {
            for (let i = 0; i < layout.length; i++) {
                for (let j = 0; j < newOut.length; j++) {
                    if (newOut[j].i === layout[i].i) {
                        newOut[j]['object'] = layout[i].object
                        newOut[j]['type'] = layout[i].type
                        newOut[j]['field'] = layout[i].field
                        break;
                    }
                }
            }

            setLayout(newOut)

        }
        else {

            setSignalLayout(true)
        }


    };

    const renderSelectGroup = group => {
        const items = group?.objects?.map(object => {
            return (
                <MenuItem sx={{ marginLeft: '12px' }} key={object._id} value={object}>
                    {object.obj_name}
                </MenuItem>
            );
        });
        return [<ListSubheader sx={{ fontWeight: 'bold', color: 'black' }}>{group?.name}</ListSubheader>, items];
    };

    const handleAddComponent = () => {
        setOpenDialog(true)
    }

    const handleSubmitChart = (e) => {
        e.preventDefault()
        let submit = formatCustomDashboard()
        setLoading(true)
        dispatch({ type: 'saga/createCustomDashboard', payload: submit })

    }

    const formatCustomDashboard = () => {
        let views = JSON.parse(JSON.stringify(layout))
        if (views.size === 0) return
        for (let i = 0; i < views.length; i++) {
            views[i]['object_id'] = views[i].object._id
            views[i]['field_id'] = views[i].field.field_id
            views[i]['static'] = true
            delete views[i]['i']
            delete views[i]['id']
            delete views[i]['object']
            delete views[i]['field']
            delete views[i]['moved']
        }
        return views
    }


    const listObject = useSelector(state => state.listObject)



    return (
        <Grid container spacing={1}>
            <Grid item xs={11.75} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='outlined' onClick={handleAddComponent}>
                    Add Component
                </Button>
                <DashboardForm listObject={listObject} renderSelectGroup={renderSelectGroup} data={data} setData={setData} openDialog={openDialog} handleDataChange={handleDataChange} setOpenDialog={setOpenDialog} layout={layout} setLayout={setLayout} count_item={count_items} />
            </Grid>
            <form onSubmit={handleSubmitChart}>
                <Grid item container spacing={1}>
                    <Grid item xs={12}>
                        <GridLayout
                            className="layout"
                            layout={layout}
                            cols={12}
                            rowHeight={100}
                            width={2800}
                            onLayoutChange={onLayoutChange}
                        >
                            {layout.map((item, index) => (

                                item.type === 'pie' ? (
                                    <Card key={item.i}>
                                        <CardHeader title={item.field.field_name} />

                                        <StyledChartWrapper dir="ltr">
                                            <ReactApexChart type="pie" series={chartSeries} options={chartOptionsPie} height={280} />
                                        </StyledChartWrapper>
                                    </Card>


                                ) : (
                                    <Card key={item.i}>
                                        <CardHeader title={item.field.field_name} />

                                        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                                            <ReactApexChart type="line" series={chartDataBar} options={chartOptionsBar} height={364} />
                                        </Box>
                                    </Card>
                                )

                                // <Card sx={{ overflowY: 'auto' }} key={item.i} className='grid-item'   >
                                //     <CardHeader sx={{ display: 'flex', justifyContent: 'center' }} subheader={"Main component"} title={item.field.field_name}>
                                //     </CardHeader>
                                //     <CardContent sx={{ height: 500 }}>
                                //         {item.object?.fields?.length > 0 ? (
                                //             item.object.fields.map((field) => (
                                //                 <Grid key={field._id} item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', margin: 0.5, fontWeight: 'bold' }}>
                                //                     {field.field_name}
                                //                 </Grid>
                                //             ))
                                //         ) : null}
                                //     </CardContent>
                                // </Card>

                            ))}
                        </GridLayout>
                    </Grid>
                    {layout.length > 0 ? (
                        <>

                            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 168 }}>
                                <LoadingButton loading={loading} startIcon={<DoneIcon />} type='submit' variant="contained"  >
                                    Save
                                </LoadingButton>
                            </Grid>
                            {/* <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 0 }}>
                                <Button startIcon={<CloseIcon />} variant='outlined'  >
                                    Cancel
                                </Button>
                            </Grid> */}



                        </>
                    ) : null}

                </Grid>
            </form>
        </Grid>
    )
}

export default DashboardConfigPage