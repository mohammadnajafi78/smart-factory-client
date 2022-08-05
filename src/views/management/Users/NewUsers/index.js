import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import NewUsersDesktop from './Desktop';
import NewUsersMobile from './Mobile';

function Awards(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  // return <>{mobileDevice ? <NewUsersMobile /> : <NewUsersDesktop />}</>;
  return <NewUsersDesktop />;
}

export default Awards;
