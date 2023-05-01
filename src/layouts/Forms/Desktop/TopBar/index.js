import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
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
import Logout from 'src/assets/img/logout.svg';

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
  const history = useHistory();

  return (
    <AppBar
      sx={{
        // backgroundColor: '#f4f4f4',
        // backgroundColor: '#f4f4f4',
        margin: 0,
        padding: 0,
        boxShadow: 'none',
        width: '92%',
        backgroundColor: '#33BBC4',
        color: 'white'
      }}
    >
      {selected !== 'profile' ? (
        <Toolbar className={classes.toolbar}>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <InputLabelHeader style={{ color: 'white', paddingRight: '20px' }}>
              {selected === 'home' ? 'خانه' : 'پیام ها'}
            </InputLabelHeader>
          </Box>
        </Toolbar>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            padding: '0px 20px',
            alignItems: 'center'
          }}
        >
          <InputLabelHeader style={{ color: 'white', paddingRight: '20px' }}>
            پروفایل
          </InputLabelHeader>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 10px 0px 10px',
              gap: '10px',
              margin: '5px',

              width: '40px',
              height: '40px',

              background: '#FFFFFF',
              boxShadow: '1px 1px 6px rgba(201, 201, 201, 0.25)',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
            onClick={() => {
              localStorage.clear();
              window.location.href = '/login';
            }}
          >
            <img src={Logout} />
          </Box>
        </Box>
      )}
    </AppBar>
  );
};

export default TopBar;
