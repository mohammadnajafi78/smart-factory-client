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
import { Close } from '@mui/icons-material';

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
          backgroundColor: '#E5E5E5'
        }
      : {}),
    ...(theme.name === THEMES.ONE_DARK
      ? {
          backgroundColor: theme.palette.background.default
        }
      : {})
  },
  toolbar: {
    minHeight: 49,
    margin: 0,
    gap: 12
    // padding: 0
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
        backgroundColor: '#E5E5E5',
        margin: 0,
        padding: 0,
        boxShadow: 'none'
      }}
    >
      <Toolbar className={classes.toolbar}>
        {!openMobile ? (
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
        )}

        <Score />
        <Home />
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
