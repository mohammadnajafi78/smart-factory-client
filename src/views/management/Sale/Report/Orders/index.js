import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import SettingDesktop from './Desktop';

function Setting(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <SettingDesktop />;
}

export default Setting;
