import React from 'react';
import { Typography } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Paragraph = (props) => {
  const classes = useStyles();

  return (
    <Typography
      variant="body1"
      color="textPrimary"
      component="li"
      className={classes.root}
      {...props}
    />
  );
};

export default Paragraph;
