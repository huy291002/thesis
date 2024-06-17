import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Container, Typography, Card, CircularProgress, Button, CardHeader, Box } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import DoneIcon from '@mui/icons-material/Done';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { useChart } from '../components/chart'
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
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

export default function DashboardAppPage() {

  const [signalLayout, setSignalLayout] = useState([])

  const [chartDataBar, setChartDataBar] = useState({})

  const [chartsLabelsBar, setChartsLabelsBar] = useState([])

  const [chartLabelsPie, setChartLabelsPie] = useState({})

  const [chartSeriesPie, setChartSeriesPie] = useState([])

  const [chartOptionsPie, setChartOptionsPie] = useState({})

  const [chartOptionsBar, setChartOptionsBar] = useState({})

  // let chartDataBar = []

  // let chartsLabelsBar = []

  // let chartLabelsPie = [];

  // let chartSeriesPie = [];

  const listDashboard = useSelector(state => state.listDashboard)

  const listObjectsFields = useSelector(state => state.listObjectsFields)

  const [layout, setLayout] = useState([])

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

  const dispatch = useDispatch()

  const theme = useTheme();

  const navigate = useNavigate()

  const chartColorsPie = [
    theme.palette.primary.main,
    theme.palette.info.main,
    theme.palette.warning.main,
  ]



  // const chartOptionsPie = useChart({
  //   colors: chartColorsPie,
  //   labels: chartLabelsPie,
  //   stroke: { colors: [theme.palette.background.paper] },
  //   legend: { floating: true, horizontalAlign: 'center' },
  //   dataLabels: { enabled: true, dropShadow: { enabled: false } },
  //   tooltip: {
  //     fillSeriesColor: false,
  //     y: {
  //       formatter: (seriesName) => fNumber(seriesName),
  //       title: {
  //         formatter: (seriesName) => `${seriesName}`,
  //       },
  //     },
  //   },
  //   plotOptions: {
  //     pie: { donut: { labels: { show: false } } },
  //   },
  // });


  // const chartOptionsBar = useChart({
  //   plotOptions: { bar: { columnWidth: '16%' } },
  //   fill: { type: chartDataBar.map((i) => i.fill) },
  //   labels: chartsLabelsBar,
  //   xaxis: { type: 'datetime' },
  //   tooltip: {
  //     shared: true,
  //     intersect: false,
  //     y: {
  //       formatter: (y) => {
  //         if (typeof y !== 'undefined') {
  //           return `${y.toFixed(0)} `;
  //         }
  //         return y;
  //       },
  //     },
  //   },
  // });

  const handleConfigDashboard = () => {
    navigate('/dashboard/configure')
  }

  useEffect(() => {
    dispatch({ type: 'saga/getAllDashboard' })
  }, [])

  useEffect(() => {
    if (listDashboard.length > 0 && listObjectsFields !== null) {
      //let getAllDashboard = []

      let copyDashboard = JSON.parse(JSON.stringify(listDashboard))
      let copyListObject = JSON.parse(JSON.stringify(listObjectsFields))

      let labelsPie = {};
      for (let i = 0; i < copyDashboard.length; i++) {
        let getObject = copyListObject.filter((object) => object._id === copyDashboard[i].object_id)[0]
        let getField = getObject.fields.filter((field) => field.field_id === copyDashboard[i].field_id_str)[0]
        copyDashboard[i]['object'] = getObject
        copyDashboard[i]['field'] = getField
        copyDashboard[i]['i'] = `item-${i + 1}`
        if (copyDashboard[i]['type'] === 'pie') {
          let data = []
          for (let j = 0; j < copyDashboard[i]['value'].length; j++){
            let a = copyDashboard[i]['value'][j]
            let b = copyDashboard[i]['count'][j]
            data.push({'label': a, 'value': b})
          }
          labelsPie[`item-${i+1}`] = data
        }
        else {
          let temp_barData = [
            {
              fill: 'line',
              data: copyDashboard[i]['count']
            }
          ]
          
          setChartDataBar([{
            name: 'Customer',
            type: 'column',
            fill: 'line',
            data: copyDashboard[i]['count']
          }])
          setChartsLabelsBar(copyDashboard[i]['value'])
          //chartsLabelsBar = copyDashboard[i]['value']
          // let temp_bar = useChart({
          //   plotOptions: { bar: { columnWidth: '16%' } },
          //   fill: { type: temp_barData.map((i) => i.fill) },
          //   labels: copyDashboard[i]['value'],
          //   xaxis: { type: 'datetime' },
          //   tooltip: {
          //     shared: true,
          //     intersect: false,
          //     y: {
          //       formatter: (y) => {
          //         if (typeof y !== 'undefined') {
          //           return `${y.toFixed(0)} `;
          //         }
          //         return y;
          //       },
          //     },
          //   },
          // });
          // setChartOptionsBar(temp_bar)
        }
        setChartLabelsPie(labelsPie)
      }
      setLayout(copyDashboard)

    }
  }, [listDashboard, listObjectsFields])


  return (
    <>
      <Helmet>
        <title> Dashboard | CSA </title>
      </Helmet>

      <Container maxWidth="xl">

        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='outlined' onClick={handleConfigDashboard} >
              Configure Dashboard
            </Button>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}
          {layout?.length > 0 ? (
            <Grid item xs={12}>
              <GridLayout
                className="layout"
                layout={layout}
                cols={12}
                rowHeight={100}
                width={2800}
                onLayoutChange={onLayoutChange}
              >
                {layout?.map((item, index) => (
                  item.type === 'bar' ? (
                    <Card key={item.i}>
                      <AppWebsiteVisits
                        title={item.field.field_name}

                        // subheader="(+43%) than last year"
                        chartLabels={chartsLabelsBar}
                        chartData={chartDataBar}
                      />
                    </Card>


                  ) : (
                    <Card key={item.i}>
                      <AppCurrentVisits
                        title={item.field.field_name}
                        chartData={chartLabelsPie[item.i]}
                        chartColors={[
                          theme.palette.primary.main,
                          theme.palette.info.main,
                          theme.palette.warning.main,
                          // theme.palette.error.main,
                        ]}
                      />
                    </Card>
                  )
                ))}
              </GridLayout>
            </Grid>
          ) : (
            null
          )}


          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Customer Gender"

              // subheader="(+43%) than last year"
              chartLabels={[
                'Male',
                'Female',
                'Others'
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [40, 29, 1],
                },
                // {
                //   name: 'Team B',
                //   type: 'area',
                //   fill: 'gradient',
                //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                // },
                // {
                //   name: 'Team C',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Room"
              chartData={[
                { label: 'Vip', value: 5 },
                { label: 'Duplex', value: 18 },
                { label: 'Single', value: 39 },
                // { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                // theme.palette.error.main,
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Mail status"
              chartData={[
                { label: 'Received', value: 21 },
                { label: 'Waiting-reponse', value: 35 },
                { label: 'New', value: 6 },
                // { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                // theme.palette.error.main,
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"

        />
      </Container>
      {/* <Card sx={{ position: "fixed", right: 10, top: 60, m: 0, p: 1, backgroundColor: 'white', width: '15%', borderRadius: '5px' }}>
        <Grid container spacing={1}>
          <Grid item xs={0.5}>
            <CircularProgress size='2rem' />
          </Grid>
          <Grid item xs={10}>
            Pending
          </Grid>
        </Grid>

      </Card> */}
    </>
  );
}
