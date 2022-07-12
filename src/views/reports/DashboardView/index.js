import React from 'react';
import { Container, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from 'src/components/Page';
import Header from './Header';
import LatestProjects from './LatestProjects';
import NewProjects from './NewProjects';
import PerformanceOverTime from './PerformanceOverTime';
import RealTime from './RealTime';
import RoiPerCustomer from './RoiPerCustomer';
import SystemHealth from './SystemHealth';
import TeamTasks from './TeamTasks';
import TodaysMoney from './TodaysMoney';
import AreaChart from 'src/views/extra/charts/ApexChartsView/AreaChart';
import LineChart from 'src/views/extra/charts/ApexChartsView/LineChart';
import RadialChart from 'src/views/extra/charts/ApexChartsView/RadialChart';
import FinancialStats from '../DashboardAlternativeView/FinancialStats';
import EarningsSegmentation from '../DashboardAlternativeView/EarningsSegmentation';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const DashboardView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Header />
        <Grid container spacing={3}>
          {/* <Grid item lg={3} sm={6} xs={12}>
            <TodaysMoney />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <NewProjects />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <SystemHealth />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <RoiPerCustomer />
          </Grid> */}
          <Grid item lg={3} xs={12}>
            <RealTime />
          </Grid>
          <Grid item lg={9} xs={12}>
            <PerformanceOverTime />
          </Grid>
          {/* <Grid item lg={5} xl={4} xs={12}>
            <TeamTasks />
          </Grid>
          <Grid item lg={7} xl={8} xs={12}>
            <LatestProjects />
          </Grid> */}


          {/* *********new1***************** */}

          <Grid
            item
            lg={8}
            xl={9}
            xs={12}
          >
            <FinancialStats />
          </Grid>
          <Grid
            item
            lg={4}
            xl={3}
            xs={12}
          >
            <EarningsSegmentation />
          </Grid>

          {/* *********new2***************** */}
          <Grid item xs={12}>
            <LineChart />
          </Grid>
          <Grid item xs={12} md={8}>
            <AreaChart />
          </Grid>
          <Grid item xs={12} md={4}>
            <RadialChart />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default DashboardView;
