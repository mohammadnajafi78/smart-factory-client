import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, useTheme } from '@mui/material';
import LmsDashboardLayoutFormMobile from './Mobile';
import LmsDashboardLayoutFormDesktop from './Desktop';

const LmsDashboardLayoutForm = ({ children }) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <LmsDashboardLayoutFormMobile>{children}</LmsDashboardLayoutFormMobile>
      ) : (
        <LmsDashboardLayoutFormDesktop>
          {children}
        </LmsDashboardLayoutFormDesktop>
      )}
    </>
  );
};

LmsDashboardLayoutForm.propTypes = {
  children: PropTypes.node
};

export default LmsDashboardLayoutForm;
