import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, useTheme } from '@mui/material';
import HomeDashboardLayoutMobile from './Mobile';
import HomeDashboardLayoutDesktop from './Desktop';

const HomeDashboardLayout = props => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <HomeDashboardLayoutMobile {...props}>
          {props.children}
        </HomeDashboardLayoutMobile>
      ) : (
        <HomeDashboardLayoutDesktop {...props}>
          {props.children}
        </HomeDashboardLayoutDesktop>
      )}
    </>
  );
};

HomeDashboardLayout.propTypes = {
  children: PropTypes.node
};

export default HomeDashboardLayout;
