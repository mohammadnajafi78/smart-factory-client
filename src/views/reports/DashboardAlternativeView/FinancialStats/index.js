import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, CardHeader, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import GenericMoreButton from 'src/components/GenericMoreButton';
import Chart from './Chart';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: 400
  }
}));

const FinancialStats = ({ className, ...rest }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const stats = {
    thisYear: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
    lastYear: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
  };
  const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        action={<GenericMoreButton />}
        title={t('common.FinancialStats')}
      />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={700} pt={4} pr={2} pl={2}>
          <Chart className={classes.chart} data={stats} labels={labels} />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

FinancialStats.propTypes = {
  className: PropTypes.string
};

export default FinancialStats;
