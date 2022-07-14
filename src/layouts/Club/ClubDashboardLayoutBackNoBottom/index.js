import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, useTheme } from '@mui/material';
import ClubDashboardLayoutBackNoBottomMobile from './Mobile';
import ClubDashboardLayoutBackNoBottomDesktop from './Desktop';

const ClubDashboardLayoutBackNoBottom = ({ children }) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <ClubDashboardLayoutBackNoBottomMobile>
          {children}
        </ClubDashboardLayoutBackNoBottomMobile>
      ) : (
        <ClubDashboardLayoutBackNoBottomDesktop>
          {children}
        </ClubDashboardLayoutBackNoBottomDesktop>
      )}
    </>
  );
};

ClubDashboardLayoutBackNoBottom.propTypes = {
  children: PropTypes.node
};

export default ClubDashboardLayoutBackNoBottom;
