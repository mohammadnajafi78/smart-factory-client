import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import AllUsersDesktop from './Desktop';
import AllUsersMobile from './Mobile';

function AllUsers(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  // return <>{mobileDevice ? <AllUsersMobile /> : <AllUsersDesktop />}</>;
  return <AllUsersDesktop />;
}

export default AllUsers;
