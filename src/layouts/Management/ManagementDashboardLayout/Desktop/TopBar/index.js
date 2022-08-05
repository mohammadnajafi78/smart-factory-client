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
import Logo from 'src/components/Logo';
import { THEMES } from 'src/constants';
import Home from './Home';
import Score from './Score';
import Message from './Message';
import Profile from './Profile';
import { Close } from '@mui/icons-material';
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
    // padding: '20px 20px 20px 16px'
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
    <AppBar
      // sx={{
      //   backgroundColor: '#FFFFFF',
      //   margin: 0,
      //   padding: 0,
      //   boxShadow: 'none',
      //   width: '295px',
      //   left: 0,
      //   // position: 'absolute',
      //   height: '60px',
      //   zIndex: 999999
      // }}
      position="fixed"
      className={classes.root}
    >
      <Toolbar className={classes.toolbar}>
        {/* <Score /> */}

        <img src={LogoBTS} width="50px" height={'20px'} />
        <Profile />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
