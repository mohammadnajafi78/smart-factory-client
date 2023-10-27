import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import CourseDetailMobile from './Mobile';
import CourseDetailDesktop from './Desktop';
import { useParams } from 'react-router-dom';

function CourseDetail(props) {
  const theme = useTheme();
  const { id } = useParams();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <CourseDetailMobile {...props} />
      ) : (
        <CourseDetailDesktop {...props} />
      )}
    </>
  );
}

export default CourseDetail;
