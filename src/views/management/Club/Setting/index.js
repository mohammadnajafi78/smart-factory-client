import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import SettingDesktop from './Desktop';
import SettingMobile from './Mobile';

function Setting(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  // return <>{mobileDevice ? <SettingMobile /> : <SettingDesktop />}</>;
  return <SettingDesktop />;
}

export default Setting;
