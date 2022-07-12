import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    borderLeft: `4px solid ${theme.palette.text.secondary}`,
    '& > p': {
      color: theme.palette.text.secondary,
      marginBottom: 0
    }
  }
}));

const Blockquote = (props) => {
  const classes = useStyles();

  return (
    <blockquote
      className={classes.root}
      {...props}
    />
  );
};

export default Blockquote;
