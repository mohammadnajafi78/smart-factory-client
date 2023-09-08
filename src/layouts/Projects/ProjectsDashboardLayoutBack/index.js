import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, useTheme } from '@mui/material';
import ProjectDashboardLayoutBackMobile from './Mobile';
import ProjectDashboardLayoutBackDesktop from './Desktop';

const ProjectDashboardLayoutBack = ({ children }) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <ProjectDashboardLayoutBackMobile>
          {children}
        </ProjectDashboardLayoutBackMobile>
      ) : (
        <ProjectDashboardLayoutBackDesktop>
          {children}
        </ProjectDashboardLayoutBackDesktop>
      )}
    </>
  );
};

ProjectDashboardLayoutBack.propTypes = {
  children: PropTypes.node
};

export default ProjectDashboardLayoutBack;
