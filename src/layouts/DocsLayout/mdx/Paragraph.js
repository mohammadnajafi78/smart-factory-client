import React from 'react';
import { Typography } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    '& > a': {
      color: theme.palette.secondary.main
    }
  }
}));

const Paragraph = (props) => {
  const classes = useStyles();

  return (
    <Typography
      variant="body1"
      color="textPrimary"
      className={classes.root}
      {...props}
    />
  );
}

export default Paragraph;
