import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import EntryMobile from './Mobile';
import EntryDesktop from './Desktop';

function Entry(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? <EntryMobile {...props} /> : <EntryDesktop {...props} />}
    </>
  );
}

export default Entry;
