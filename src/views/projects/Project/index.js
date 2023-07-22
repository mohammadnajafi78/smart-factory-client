import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ProjectMobile from './Mobile';
import ProjectDesktop from './Desktop';
import { useParams } from 'react-router-dom';

function Project(props) {
  const theme = useTheme();
  const { id } = useParams();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <>{mobileDevice ? <ProjectMobile /> : <ProjectDesktop />}</>;
}

export default Project;
