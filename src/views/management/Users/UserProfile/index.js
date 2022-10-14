import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ProfileMobile from './Mobile';
import ProfileDesktop from './Desktop';

function Profile(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <ProfileMobile {...props} />
      ) : (
        <ProfileDesktop {...props} />
      )}
    </>
  );
}

export default Profile;
