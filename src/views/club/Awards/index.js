import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import AwardsMobile from './Mobile';
import AwardsDesktop from './Desktop';
import { useParams } from 'react-router-dom';

function Awards(props) {
  const theme = useTheme();
  const { id } = useParams();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  console.log('props', id);

  return <>{mobileDevice ? <AwardsMobile /> : <AwardsDesktop />}</>;
}

export default Awards;
