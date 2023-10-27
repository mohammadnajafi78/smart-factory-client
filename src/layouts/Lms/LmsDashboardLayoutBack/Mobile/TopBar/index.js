import React, { useEffect, useState } from 'react';
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
import ArrowRight from 'src/assets/img/icons/arrowRight.svg';
import { THEMES } from 'src/constants';
import Home from './Home';
import Score from './Score';
import { useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Mobile/InputLabel';

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
    // minHeight: 49,
    margin: 0,
    gap: 12,
    display: 'flex',
    justifyContent: 'space-between'
    // padding: 0
  }
}));

const TopBar = ({ className, onMobileNavOpen, location, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const [path, setPath] = useState('profile');
  const list = [
    { key: 'course', name: 'دوره ها', path: '/lms/course' },
    { key: 'profile', name: 'پروفایل', path: '/lms/profile' },
    { key: 'calendar', name: 'برنامه هفتگی', path: '/lms/calendar' },
    { key: 'exam', name: 'آزمون ها', path: '/lms/exam' }
  ];
  useEffect(() => {
    setPath(location.split('/')[2]);
  }, []);

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
        <IconButton
          color="inherit"
          size="large"
          style={{
            background: '#FFFFFF',
            boxShadow: '1px 1px 6px rgba(201, 201, 201, 0.25)',
            borderRadius: ' 6px',
            // width: '49px',
            height: '44px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: '5px'
          }}
          onClick={() => history.push(list.filter(f => f.key === path)[0].path)}
        >
          <img src={ArrowRight} width="12px" height="14px" />
          <InputLabel
            style={{
              color: '#00346D',
              fontSize: '14px',
              fontWeight: 400,
              marginRight: '5px'
            }}
          >
            {list.filter(f => f.key == path)[0].name}
          </InputLabel>
        </IconButton>
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