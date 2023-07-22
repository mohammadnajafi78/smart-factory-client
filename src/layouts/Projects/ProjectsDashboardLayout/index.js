import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, useTheme } from '@mui/material';
import ProjectDashboardLayoutMobile from './Mobile';
import ProjectDashboardLayoutDesktop from './Desktop';

const ProjectDashboardLayout = ({ children }) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <ProjectDashboardLayoutMobile>{children} </ProjectDashboardLayoutMobile>
      ) : (
        <ProjectDashboardLayoutDesktop>
          {children}
        </ProjectDashboardLayoutDesktop>
      )}
    </>
  );
};

ProjectDashboardLayout.propTypes = {
  children: PropTypes.node
};

export default ProjectDashboardLayout;
