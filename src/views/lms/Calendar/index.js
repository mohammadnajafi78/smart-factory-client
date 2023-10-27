import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import CalendarMobile from './Mobile';
import CalendarDesktop from './Desktop';
import { useParams } from 'react-router-dom';

function Calendar(props) {
  const theme = useTheme();
  const { id } = useParams();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <>{mobileDevice ? <CalendarMobile /> : <CalendarDesktop />}</>;
}

export default Calendar;
