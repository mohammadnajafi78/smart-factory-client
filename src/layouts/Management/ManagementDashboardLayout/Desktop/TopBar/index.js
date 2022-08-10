import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AppBar, Toolbar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Profile from './Profile';
import LogoBTS from 'src/assets/img/LogoBTS.svg';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    margin: 0,
    padding: 0,
    background: '#FFFFFF',
    borderBottom: '0.5px solid #CCD6E2',
    height: '60px',
    width: '295px',
    left: 0
  },
  toolbar: {
    minHeight: 60,
    margin: 0,
    gap: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  openMobile,
  onMobileClose,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <img src={LogoBTS} width="50px" height={'20px'} />
        <Profile />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
