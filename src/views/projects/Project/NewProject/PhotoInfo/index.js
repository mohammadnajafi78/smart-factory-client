import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import PhotoInfoMobile from './Mobile';
import PhotoInfoDesktop from './Desktop';

function PhotoInfo(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        <PhotoInfoMobile {...props} />
      ) : (
        <PhotoInfoDesktop {...props} />
      )}
    </>
  );
}

export default PhotoInfo;
