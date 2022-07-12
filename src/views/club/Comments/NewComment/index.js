import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import NewCommentMobile from './Mobile';
import NewCommentDesktop from './Desktop';

function NewComment() {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <>{mobileDevice ? <NewCommentMobile /> : <NewCommentDesktop />}</>;
}

export default NewComment;
