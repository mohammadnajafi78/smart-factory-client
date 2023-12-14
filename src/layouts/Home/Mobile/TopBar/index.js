import React, { useEffect, useState } from 'react';
import {
  AppBar,
  SvgIcon,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Button
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ArrowLeft, Menu as MenuIcon } from 'react-feather';
import { THEMES } from 'src/constants';
import Message from './Message';
import Profile from './Profile';
import { Close, KeyboardArrowLeft } from '@mui/icons-material';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import { useHistory } from 'react-router-dom';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useSnackbar } from 'notistack';
import { Star } from 'react-feather';

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
    justifyContent: 'space-between',
    alignItems: 'flex-start'
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
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState();
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/users/get_user_profile/`)
      .then(res => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch(ex => {
        if (ex.response.status === 417) {
          enqueueSnackbar(ex.response.data.error, { variant: 'error' });
        } else {
          enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
            variant: 'error'
          });
        }
      });
  }, []);

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

        <div />
        <Message />
      </Toolbar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          padding: '10px 20px'
        }}
      >
        <Avatar
          alt={data?.first_name}
          src={data?.user_profile_image}
          sx={{
            width: 80,
            height: 80
            // position: 'relative'
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <InputLabelHeader style={{ color: 'white' }}>
            {data?.first_name + ' ' + data?.last_name}
          </InputLabelHeader>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2px 6px !important',
              height: '22px',
              background: 'white',
              borderRadius: '4px',
              color: '#00346D'
            }}
          >
            <Star
              style={{
                width: '27px',
                height: '18px',
                color: '#00346D'
              }}
            />
            <InputLabel style={{ color: '#4F4C4D', fontSize: '' }}>
              {data?.user_club?.grade_info?.name}
            </InputLabel>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        onClick={() => {
          history.push({
            pathname: '/profile',
            state: { formName: 'پروفایل کاربر' }
          });
        }}
      >
        <div />
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <InputLabel style={{ color: 'white', padding: 0 }}>مشاهده</InputLabel>
          <KeyboardArrowLeft style={{ color: 'white', height: '20px' }} />
        </Box>
      </Box>
    </AppBar>
  );
};

export default TopBar;
