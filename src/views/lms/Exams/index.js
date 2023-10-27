import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ExamsMobile from './Mobile';
import ExamsDesktop from './Desktop';
import { useParams } from 'react-router-dom';

function Exams(props) {
  const theme = useTheme();
  const { id } = useParams();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <>{mobileDevice ? <ExamsMobile /> : <ExamsDesktop />}</>;
}

export default Exams;
