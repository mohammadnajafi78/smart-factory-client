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
import { ArrowRight } from 'react-feather';
import { THEMES } from 'src/constants';
import Home from './Home';
import Score from './Score';
import { useHistory } from 'react-router-dom';

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

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();

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
        <IconButton
          color="inherit"
          onClick={() => {
            history.goBack();
          }}
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
            <ArrowRight color="#00346D" width="25px" height="21px" />
          </SvgIcon>
        </IconButton>
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
