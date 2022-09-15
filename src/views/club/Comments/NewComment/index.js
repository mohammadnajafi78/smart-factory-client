import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import NewCommentMobile from './Mobile/index';
import NewCommentDesktop from './Desktop';

function NewComment(props) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <NewCommentMobile {...props} />
      ) : (
        <NewCommentDesktop {...props} />
      )}
    </>
  );
}

export default NewComment;
