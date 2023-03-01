import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import SettingDesktop from './Desktop';
import SettingMobile from './Mobile';

function Setting(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <SettingDesktop />;
}

export default Setting;
