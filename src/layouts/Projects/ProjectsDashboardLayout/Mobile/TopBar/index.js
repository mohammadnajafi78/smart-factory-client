import React from 'react';
import { AppBar, SvgIcon, Toolbar, IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Menu as MenuIcon } from 'react-feather';
import { THEMES } from 'src/constants';
import Home from './Home';
import { Close } from '@mui/icons-material';
import Search from './Search';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    margin: 0,
    padding: 0,
    ...(theme.name === THEMES.LIGHT
      ? {
          boxShadow: 'none',
          backgroundColor: '##33BBC4'
        }
      : {}),
    ...(theme.name === THEMES.ONE_DARK
      ? {
          backgroundColor: theme.palette.background.default
        }
      : {})
  },
  toolbar: {
    // minHeight: 49,
    margin: 0,
    gap: 12
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
        backgroundColor: '#33BBC4',
        padding: '5px',
        margin: 0,
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

        <Search />
        <Home />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
