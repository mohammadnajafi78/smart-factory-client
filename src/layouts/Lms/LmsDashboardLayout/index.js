import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, useTheme } from '@mui/material';
import LmsDashboardLayoutMobile from './Mobile';
import LmsDashboardLayoutDesktop from './Desktop';

const LmsDashboardLayout = ({ children }) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <LmsDashboardLayoutMobile>{children} </LmsDashboardLayoutMobile>
      ) : (
        <LmsDashboardLayoutDesktop>{children}</LmsDashboardLayoutDesktop>
      )}
    </>
  );
};

LmsDashboardLayout.propTypes = {
  children: PropTypes.node
};

export default LmsDashboardLayout;
