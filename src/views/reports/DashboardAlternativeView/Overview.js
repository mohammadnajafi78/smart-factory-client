import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Card, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Label from 'src/components/Label';
import convertToPersian from 'src/helper/converttopersian';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`
      }
    },
    [theme.breakpoints.down('md')]: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  },
  valueContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginLeft: theme.spacing(1)
  }
}));

const Overview = ({ className, ...rest }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const overview = {
    income: '854,355.00',
    expanses: '373,250.50',
    profit: '123,532.00',
    subscriptions: '26,000'
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Grid alignItems="center" container justifyContent="space-between">
        <Grid className={classes.item} item md={3} sm={6} xs={12}>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            {t('common.TotalIncome')}
          </Typography>
          <div className={classes.valueContainer}>
            <Typography variant="h3" color="textPrimary">
              $
              {localStorage.getItem('settings') &&
              JSON.parse(localStorage.getItem('settings'))['direction'] ===
                'ltr'
                ? overview.income
                : convertToPersian(overview.income)}
            </Typography>
            <Label className={classes.label} color="success">
              {localStorage.getItem('settings') &&
              JSON.parse(localStorage.getItem('settings'))['direction'] ===
                'ltr'
                ? '+25%'
                : convertToPersian('+25%')}
            </Label>
          </div>
        </Grid>
        <Grid className={classes.item} item md={3} sm={6} xs={12}>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            {t('common.TotalExpanses')}
          </Typography>
          <div className={classes.valueContainer}>
            <Typography variant="h3" color="textPrimary">
              $
              {localStorage.getItem('settings') &&
              JSON.parse(localStorage.getItem('settings'))['direction'] ===
                'ltr'
                ? overview.expanses
                : convertToPersian(overview.expanses)}
            </Typography>
            <Label className={classes.label} color="success">
              {localStorage.getItem('settings') &&
              JSON.parse(localStorage.getItem('settings'))['direction'] ===
                'ltr'
                ? '+12%'
                : convertToPersian('+12%')}
            </Label>
          </div>
        </Grid>
        <Grid className={classes.item} item md={3} sm={6} xs={12}>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            {t('common.NetProfit')}
          </Typography>
          <div className={classes.valueContainer}>
            <Typography variant="h3" color="textPrimary">
              {localStorage.getItem('settings') &&
              JSON.parse(localStorage.getItem('settings'))['direction'] ===
                'ltr'
                ? overview.profit
                : convertToPersian(overview.profit)}
            </Typography>
            <Label className={classes.label} color="error">
              {localStorage.getItem('settings') &&
              JSON.parse(localStorage.getItem('settings'))['direction'] ===
                'ltr'
                ? '-20%'
                : convertToPersian('-20%')}{' '}
            </Label>
          </div>
        </Grid>
        <Grid className={classes.item} item md={3} sm={6} xs={12}>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            {t('common.ActiveSubscriptions')}
          </Typography>
          <div className={classes.valueContainer}>
            <Typography variant="h3" color="textPrimary">
              {localStorage.getItem('settings') &&
              JSON.parse(localStorage.getItem('settings'))['direction'] ===
                'ltr'
                ? overview.subscriptions
                : convertToPersian(overview.subscriptions)}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

Overview.propTypes = {
  className: PropTypes.string
};

export default Overview;
