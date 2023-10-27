import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  SvgIcon
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Menu as MenuIcon } from 'react-feather';
import { THEMES } from 'src/constants';
import Club from './Club';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    padding: '10px 30px',
    ...(theme.name === THEMES.LIGHT
      ? {
          boxShadow: 'none',
          backgroundColor: 'white'
        }
      : {}),
    ...(theme.name === THEMES.ONE_DARK
      ? {
          backgroundColor: theme.palette.background.default
        }
      : {})
  },
  toolbar: {
    minHeight: 64,
    justifyContent: 'space-around'
  }
}));

const BottomBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar
      // className={clsx(classes.root, className)}
      {...rest}
      position="fixed"
      sx={{
        top: 'auto',
        bottom: 0,
        padding: '10px 30px',
        backgroundColor: '#fff'
      }}
    >
      <Toolbar className={classes.toolbar}>
        <Club />
      </Toolbar>
    </AppBar>
  );
};

BottomBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

BottomBar.defaultProps = {
  onMobileNavOpen: () => {}
};

export default BottomBar;
