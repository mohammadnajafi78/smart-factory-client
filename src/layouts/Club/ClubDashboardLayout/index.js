import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, useTheme } from '@mui/material';
import ClubDashboardLayoutMobile from './Mobile';
import ClubDashboardLayoutDesktop from './Desktop';

const ClubDashboardLayout = ({ children }) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <ClubDashboardLayoutMobile>{children} </ClubDashboardLayoutMobile>
      ) : (
        <ClubDashboardLayoutDesktop>{children}</ClubDashboardLayoutDesktop>
      )}
    </>
  );
};

ClubDashboardLayout.propTypes = {
  children: PropTypes.node
};

export default ClubDashboardLayout;
