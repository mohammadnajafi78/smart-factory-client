import React from 'react';
import irisaLogo from '../assets/img/irisa.jpg';
//import irisaLogo from '../assets/img/IRISA.png';
import { alpha } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {},
  main:{
    margin: '3px',
    backgroundColor:alpha(theme.palette.background.default, 0.01),
    //color: fade(theme.palette.text.primary, 0.9)
  },

}));

const Logo = (props) => {
  const classes = useStyles();
  return (
    <img
      className={classes.main}
      alt="Logo"
      //src="/static/logo.svg"
      src={irisaLogo}
      width={'60px'}
      height={'40px'}
      {...props}
    />
  );
};

export default Logo;
