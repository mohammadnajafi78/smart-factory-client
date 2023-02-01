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
import Search from '../../Mobile/TopBar/Search';

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
    gap: 600,
    padding: '0px 20px'
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
      sx={{
        // backgroundColor: '#f4f4f4',
        backgroundColor: '#33BBC4',
        color: 'white',
        margin: 0,
        padding: 0,
        boxShadow: 'none',
        width: '100%',
        paddingLeft: '120px'
      }}
    >
      <Toolbar className={classes.toolbar}>
        {/* {!openMobile ? (
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
            size="large"
            style={{
              background: '#FFFFFF',
              boxShadow: '1px 1px 6px rgba(201, 201, 201, 0.25)',
              borderRadius: ' 6px',
              width: '49px',
              height: '44px'
            }}
          >
            <SvgIcon fontSize="small">
              <MenuIcon color="#00346D" width="25px" height="21px" />
            </SvgIcon>
          </IconButton>
        ) : (
          <IconButton
            color="inherit"
            onClick={onMobileClose}
            size="large"
            style={{
              background: '#FFFFFF',
              boxShadow: '1px 1px 6px rgba(201, 201, 201, 0.25)',
              borderRadius: ' 6px',
              width: '49px',
              height: '44px'
            }}
          >
            <SvgIcon fontSize="small">
              <Close
                color="#00346D"
                width="25px"
                height="21px"
                onClick={onMobileClose}
              />
            </SvgIcon>
          </IconButton>
        )} */}

        {/* <Score /> */}
        <Search />
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Message />
          <Profile />
          <Home />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// TopBar.propTypes = {
//   className: PropTypes.string,
//   onMobileNavOpen: PropTypes.func
// };

// TopBar.defaultProps = {
//   onMobileNavOpen: () => {}
// };

export default TopBar;
