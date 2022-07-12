import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Grid, Hidden, IconButton, Tooltip, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ViewConfigIcon from '@mui/icons-material/ViewComfyOutlined';
import ViewWeekIcon from '@mui/icons-material/ViewWeekOutlined';
import ViewDayIcon from '@mui/icons-material/ViewDayOutlined';
import ViewAgendaIcon from '@mui/icons-material/ViewAgendaOutlined';
import {useTranslation} from "react-i18next";
import momentj from "jalali-moment";

const viewOptions = [
  {
    label: 'Month',
    value: 'dayGridMonth',
    icon: ViewConfigIcon
  },
  {
    label: 'Week',
    value: 'timeGridWeek',
    icon: ViewWeekIcon
  },
  {
    label: 'Day',
    value: 'timeGridDay',
    icon: ViewDayIcon
  },
  {
    label: 'Agenda',
    value: 'listWeek',
    icon: ViewAgendaIcon
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const Toolbar = ({
                   className,
                   date,
                   onDateNext,
                   onDatePrev,
                   onDateToday,
                   onAddClick,
                   onViewChange,
                   view,
                   ...rest
                 }) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const localSettings = localStorage.getItem('settings');
  let direction = null;
  if (localSettings && localSettings.length > 0) {

    direction = JSON.parse(localSettings)["direction"];
  } else {
    direction = 'rtl';
  }

  return (
    <Grid
      className={clsx(classes.root, className)}
      alignItems="center"
      container
      justifyContent="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        <ButtonGroup size="small">
          <Button onClick={onDatePrev}>{t('calendar.Prev')}</Button>
          <Button onClick={onDateToday}>{t('calendar.Today')}</Button>
          <Button onClick={onDateNext}>{t('calendar.Next')}</Button>
        </ButtonGroup>
      </Grid>
      <Hidden mdDown>
        <Grid item>
          <Typography
            variant="h3"
            color="textPrimary"
          >
            {direction === 'ltr' ?
              moment(date).format('MMMM YYYY')
              :
              momentj(new Date()).locale('fa').format('MMMM YYYY')

            }
          </Typography>
        </Grid>
        <Grid item>
          {viewOptions.map((viewOption) => {
            const Icon = viewOption.icon;

            return (
              <Tooltip
                key={viewOption.value}
                title={t(viewOption.label)}
              >
                <IconButton
                  color={viewOption.value === view ? 'secondary' : 'default'}
                  onClick={() => onViewChange(viewOption.value)}
                  size="large">
                  <Icon/>
                </IconButton>
              </Tooltip>
            );
          })}
        </Grid>
      </Hidden>
    </Grid>
  );
};

Toolbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  onDateNext: PropTypes.func,
  onDatePrev: PropTypes.func,
  onDateToday: PropTypes.func,
  onAddClick: PropTypes.func,
  onViewChange: PropTypes.func,
  view: PropTypes.oneOf(['dayGridMonth', 'timeGridWeek', 'timeGridDay', 'listWeek'])
};

Toolbar.defaultProps = {
  onDateNext: () => {
  },
  onDatePrev: () => {
  },
  onDateToday: () => {
  },
  onAddClick: () => {
  },
  onViewChange: () => {
  }
};

export default Toolbar;
