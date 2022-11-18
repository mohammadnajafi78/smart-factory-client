import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, useTheme } from '@mui/material';
import ClubDashboardLayoutBackMobile from './Mobile';
import ClubDashboardLayoutBackDesktop from './Desktop';

const ClubDashboardLayoutBack = ({ children }) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <ClubDashboardLayoutBackMobile>
          {children}
        </ClubDashboardLayoutBackMobile>
      ) : (
        <ClubDashboardLayoutBackDesktop>
          {children}
        </ClubDashboardLayoutBackDesktop>
      )}
    </>
  );
};

ClubDashboardLayoutBack.propTypes = {
  children: PropTypes.node
};

export default ClubDashboardLayoutBack;
