import React from 'react';
import { AppBar, SvgIcon, Toolbar, IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Menu as MenuIcon } from 'react-feather';
import { THEMES } from 'src/constants';
import Message from './Message';
import Profile from './Profile';
import { Close } from '@mui/icons-material';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    margin: 0,
    padding: 0,
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
    gap: 12,
    display: 'flex',
    justifyContent: 'space-between'
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
  const history = useHistory();

  return (
    <AppBar
      sx={{
        backgroundColor: '#33BBC4',
        margin: 0,
        padding: '7px 6px',
        boxShadow: 'none'
      }}
    >
      <Toolbar className={classes.toolbar}>
        <Profile />
        <InputLabelHeader
          style={{ color: 'white' }}
          onClick={() => {
            history.push('/home');
          }}
        >
          خانه
        </InputLabelHeader>
        <Message />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
