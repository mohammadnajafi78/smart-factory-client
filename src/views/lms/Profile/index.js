import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ProfileMobile from './Mobile';
import ProfileDesktop from './Desktop';
import { useParams } from 'react-router-dom';

function Profile(props) {
  const theme = useTheme();
  const { id } = useParams();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <>{mobileDevice ? <ProfileMobile /> : <ProfileDesktop />}</>;
}

export default Profile;
