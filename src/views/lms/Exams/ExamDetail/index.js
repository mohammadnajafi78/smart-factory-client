import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ExamDetailMobile from './Mobile';
import ExamDetailDesktop from './Desktop';
import { useParams } from 'react-router-dom';

function ExamDetail(props) {
  const theme = useTheme();
  const { id } = useParams();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <ExamDetailMobile {...props} />
      ) : (
        <ExamDetailDesktop {...props} />
      )}
    </>
  );
}

export default ExamDetail;
