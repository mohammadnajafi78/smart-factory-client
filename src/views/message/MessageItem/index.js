import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ReceivedItemMobile from './Mobile';
import ReceivedItemDesktop from './Desktop';

function ReceivedItem(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <ReceivedItemMobile {...props} />
      ) : (
        <ReceivedItemDesktop {...props} />
      )}
    </>
  );
}

export default ReceivedItem;
