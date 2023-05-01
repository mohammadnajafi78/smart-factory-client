import React from 'react';
import { AppBar, SvgIcon, Toolbar, IconButton, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Menu as MenuIcon } from 'react-feather';
import { THEMES } from 'src/constants';
import Message from './Message';
import Profile from './Profile';
import { Close } from '@mui/icons-material';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import { useHistory } from 'react-router-dom';
import ArrowRight from 'src/assets/img/icons/arrowRight.svg';
import { propsToClassKey } from '@mui/styles';
import Logout from 'src/assets/img/logout.svg';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    margin: 0,
    padding: 0,
    ...(theme.name === THEMES.LIGHT
      ? {
          boxShadow: 'none',
          backgroundColor: '#FFF'
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
    // gap: 12,
    display: 'flex'
    // justifyContent: 'space-between'
  }
}));

const TopBar = props => {
  const classes = useStyles();
  const history = useHistory();
  console.log('res', props.children.props.location.pathname.split('/')[1]);

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
        {/* <Profile /> */}
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
          {/* <SvgIcon fontSize="small"> */}
          {/* <ArrowRight color="#00346D" width="25px" height="21px" /> */}
          <img src={ArrowRight} width="25px" height="21px" />
          {/* </SvgIcon> */}
        </IconButton>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%'
            // marginRight: '50px'
          }}
        >
          <InputLabelHeader
            style={{ color: 'white' }}
            onClick={() => {
              history.push('/home');
            }}
          >
            {props.children.props.location.state.formName}
          </InputLabelHeader>
        </Box>
        {props.children.props.location.pathname.split('/')[1] === 'profile' && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 10px 0px 10px',
              gap: '10px',
              // margin: '5px',

              width: '49px',
              height: '44px',

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
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
