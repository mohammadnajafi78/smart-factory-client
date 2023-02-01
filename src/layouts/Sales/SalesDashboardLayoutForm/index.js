import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, useTheme } from '@mui/material';
import SalesDashboardLayoutFormMobile from './Mobile';
import SalesDashboardLayoutFormDesktop from './Desktop';

const SalesDashboardLayoutForm = ({ children }) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <SalesDashboardLayoutFormMobile>
          {children}
        </SalesDashboardLayoutFormMobile>
      ) : (
        <SalesDashboardLayoutFormDesktop>
          {children}
        </SalesDashboardLayoutFormDesktop>
      )}
    </>
  );
};

SalesDashboardLayoutForm.propTypes = {
  children: PropTypes.node
};

export default SalesDashboardLayoutForm;
