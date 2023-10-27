import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import CourseClassMobile from './Mobile';
import CourseClassDesktop from './Desktop';
import { useParams } from 'react-router-dom';

function CourseClass(props) {
  const theme = useTheme();
  const { id } = useParams();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <CourseClassMobile {...props} />
      ) : (
        <CourseClassDesktop {...props} />
      )}
    </>
  );
}

export default CourseClass;
