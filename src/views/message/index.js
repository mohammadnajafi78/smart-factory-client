import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import MessageMobile from './Mobile';
import MessageDesktop from './Desktop';

function Message(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <>{mobileDevice ? <MessageMobile /> : <MessageDesktop />}</>;
}

export default Message;
