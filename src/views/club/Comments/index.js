import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import CommentsMobile from './Mobile';
import CommentsDesktop from './Desktop';

function Comments() {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <>{mobileDevice ? <CommentsMobile /> : <CommentsDesktop />}</>;
}

export default Comments;
