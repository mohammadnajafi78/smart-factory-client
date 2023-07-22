import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, useTheme } from '@mui/material';
import SalesDashboardLayoutBackMobile from './Mobile';
import SalesDashboardLayoutBackDesktop from './Desktop';

const SalesDashboardLayoutBack = ({ children }) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <SalesDashboardLayoutBackMobile>
          {children}
        </SalesDashboardLayoutBackMobile>
      ) : (
        <SalesDashboardLayoutBackDesktop>
          {children}
        </SalesDashboardLayoutBackDesktop>
      )}
    </>
  );
};

SalesDashboardLayoutBack.propTypes = {
  children: PropTypes.node
};

export default SalesDashboardLayoutBack;
