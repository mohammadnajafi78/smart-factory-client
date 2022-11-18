import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, useTheme } from '@mui/material';
import SaleDashboardLayoutMobile from './Mobile';
import SaleDashboardLayoutDesktop from './Desktop';

const SaleDashboardLayout = ({ children }) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <SaleDashboardLayoutMobile>{children} </SaleDashboardLayoutMobile>
      ) : (
        <SaleDashboardLayoutDesktop>{children}</SaleDashboardLayoutDesktop>
      )}
    </>
  );
};

SaleDashboardLayout.propTypes = {
  children: PropTypes.node
};

export default SaleDashboardLayout;
