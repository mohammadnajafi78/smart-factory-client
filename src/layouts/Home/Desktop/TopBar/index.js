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
import Home from './Home';
import Score from './Score';
import Message from './Message';
import Profile from './Profile';
import { Close } from '@mui/icons-material';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    margin: 0,
    padding: 0,
    // alignItems: 'center',
    // gap: 12,
    ...(theme.name === THEMES.LIGHT
      ? {
          boxShadow: 'none',
          backgroundColor: '#f4f4f4'
        }
      : {}),
    ...(theme.name === THEMES.ONE_DARK
      ? {
          backgroundColor: theme.palette.background.default
        }
      : {})
  },
  toolbar: {
    minHeight: 60,
    margin: 0,
    gap: 200,
    padding: '0px 20px'
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  openMobile,
  onMobileClose,
  selected,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <AppBar
      sx={{
        // backgroundColor: '#f4f4f4',
        // backgroundColor: '#f4f4f4',
        margin: 0,
        padding: 0,
        boxShadow: 'none',
        width: '90%',
        backgroundColor: '#33BBC4',
        color: 'white'
      }}
    >
      <Toolbar className={classes.toolbar}>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <InputLabelHeader style={{ color: 'white' }}>
            {selected === 'home'
              ? 'خانه'
              : selected === 'profile'
              ? 'پروفایل'
              : 'پیام ها'}
          </InputLabelHeader>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
