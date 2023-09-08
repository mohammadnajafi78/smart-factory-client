import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ProjectInfoMobile from './Mobile';
import ProjectInfoDesktop from './Desktop';

function ProjectInfo(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {mobileDevice ? (
        <ProjectInfoMobile {...props} />
      ) : (
        <ProjectInfoDesktop {...props} />
      )}
    </>
  );
}

export default ProjectInfo;
