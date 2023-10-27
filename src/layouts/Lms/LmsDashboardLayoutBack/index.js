import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, useTheme } from '@mui/material';
import LmsDashboardLayoutBackMobile from './Mobile';
import LmsDashboardLayoutBackDesktop from './Desktop';

const LmsDashboardLayoutBack = ({ children }) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <LmsDashboardLayoutBackMobile>{children}</LmsDashboardLayoutBackMobile>
      ) : (
        <LmsDashboardLayoutBackDesktop>
          {children}
        </LmsDashboardLayoutBackDesktop>
      )}
    </>
  );
};

LmsDashboardLayoutBack.propTypes = {
  children: PropTypes.node
};

export default LmsDashboardLayoutBack;
