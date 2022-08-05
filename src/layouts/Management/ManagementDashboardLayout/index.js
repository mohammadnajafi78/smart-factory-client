import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, useTheme } from '@mui/material';
import ManagementDashboardLayoutMobile from './Mobile';
import ManagementDashboardLayoutDesktop from './Desktop';

const ManagementDashboardLayout = ({ children }) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {/* {mobileDevice ? (
        <ManagementDashboardLayoutMobile>
          {children}
        </ManagementDashboardLayoutMobile>
      ) : (
        <ManagementDashboardLayoutDesktop>
          {children}
        </ManagementDashboardLayoutDesktop>
      )} */}
      <ManagementDashboardLayoutDesktop>
        {children}
      </ManagementDashboardLayoutDesktop>
    </>
  );
};

ManagementDashboardLayout.propTypes = {
  children: PropTypes.node
};

export default ManagementDashboardLayout;
