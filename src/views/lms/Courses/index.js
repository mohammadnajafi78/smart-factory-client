import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import CoursesMobile from './Mobile';
import CoursesDesktop from './Desktop';
import { useParams } from 'react-router-dom';

function Courses(props) {
  const theme = useTheme();
  const { id } = useParams();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <>{mobileDevice ? <CoursesMobile /> : <CoursesDesktop />}</>;
}

export default Courses;
