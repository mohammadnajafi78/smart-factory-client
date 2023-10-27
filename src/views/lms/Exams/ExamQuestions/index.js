import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ExamQuestionMobile from './Mobile';
import ExamQuestionDesktop from './Desktop';
import { useParams } from 'react-router-dom';

function ExamQuestion(props) {
  const theme = useTheme();
  const { id } = useParams();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <ExamQuestionMobile {...props} />
      ) : (
        <ExamQuestionDesktop {...props} />
      )}
    </>
  );
}

export default ExamQuestion;
