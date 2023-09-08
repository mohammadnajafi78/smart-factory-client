import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import InstructionInfoMobile from './Mobile';
import InstructionInfoDesktop from './Desktop';

function InstructionInfo(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        <InstructionInfoMobile {...props} />
      ) : (
        <InstructionInfoDesktop {...props} />
      )}
    </>
  );
}

export default InstructionInfo;
