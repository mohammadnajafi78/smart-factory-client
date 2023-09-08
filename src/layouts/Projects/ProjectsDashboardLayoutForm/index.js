import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, useTheme } from '@mui/material';
import ProjectDashboardLayoutFormMobile from './Mobile';
import ProjectDashboardLayoutFormDesktop from './Desktop';

const ProjectDashboardLayoutForm = ({ children }) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <ProjectDashboardLayoutFormMobile>
          {children}
        </ProjectDashboardLayoutFormMobile>
      ) : (
        <ProjectDashboardLayoutFormDesktop>
          {children}
        </ProjectDashboardLayoutFormDesktop>
      )}
    </>
  );
};

ProjectDashboardLayoutForm.propTypes = {
  children: PropTypes.node
};

export default ProjectDashboardLayoutForm;
