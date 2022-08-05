import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import { Box, LinearProgress } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    // backgroundColor: theme.palette.background.default,
    display: 'flex',
    // flexDirection: 'column',
    height: '90vh',
    justifyContent: 'center',
    // minHeight: '100%',
    padding: theme.spacing(3)
  }
}));

const LoadingScreen = () => {
  const classes = useStyles();

  // useEffect(() => {
  //   NProgress.start();

  //   return () => {
  //     NProgress.done();
  //   };
  // }, []);

  return (
    <div className={classes.root}>
      <Box width={400}>
        <LinearProgress />
      </Box>
    </div>
  );
};

export default LoadingScreen;
