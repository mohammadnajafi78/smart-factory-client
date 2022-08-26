import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import CommentDesktop from './Desktop';
import CommentMobile from './Mobile';

function Comment(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  // return <>{mobileDevice ? <CommentMobile /> : <CommentDesktop />}</>;
  return <CommentDesktop />;
}

export default Comment;
