import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import DesignerInfoMobile from './Mobile';
import DesignerInfoDesktop from './Desktop';

function DesignerInfo(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        <DesignerInfoMobile {...props} />
      ) : (
        <DesignerInfoDesktop {...props} />
      )}
    </>
  );
}

export default DesignerInfo;
