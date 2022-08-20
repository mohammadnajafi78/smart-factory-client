import React, { useEffect, useState } from 'react';
import { Box, Button, Divider } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Score from './Score';
import { ArrowBack, KeyboardArrowLeft, Logout } from '@mui/icons-material';
import InputLabel from 'src/components/Mobile/InputLabel';
import useAuth from 'src/hooks/useAuth';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

export default function ProfileDetailMobile(props) {
  const data = props.location.state.data;
  const history = useHistory();
  const { logout } = useAuth();

  // useEffect(() => {
  //   httpService.get(`${API_BASE_URL}/api/users/get_user_profile/`).then(res => {
  //     if (res.status === 200) {
  //       setData(res.data);
  //     }
  //   });
  // }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: '25px 10px',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
      }}
    >
      <Button
        color="primary"
        fullWidth
        type="submit"
        variant={'outlined'}
        sx={{
          color: '#231F20',
          backgroundColor: '#F7FCFC',
          height: '48px',
          borderRadius: '8px',
          border: '1px solid #CCEEF0',
          fontSize: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '12px 11px',
          fontWeight: 400,
          width: '98%',
          margin: 0,
          fontFamily: 'IRANSans'
        }}
        onClick={() =>
          history.push({
            pathname: '/profile/identity',
            state: {
              data: data
            }
          })
        }
      >
        اطلاعات هویتی
        <KeyboardArrowLeft color="#00346D" height="13px" width="13px" />
      </Button>
      <Button
        color="primary"
        fullWidth
        type="submit"
        variant={'outlined'}
        sx={{
          color: '#231F20',
          backgroundColor: '#F7FCFC',
          height: '48px',
          borderRadius: '8px',
          border: '1px solid #CCEEF0',
          fontSize: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '12px 11px',
          fontWeight: 400,
          width: '98%',
          margin: 0,
          fontFamily: 'IRANSans'
        }}
        onClick={() =>
          history.push({
            pathname: '/profile/location',
            state: {
              data: data
            }
          })
        }
      >
        اطلاعات آدرس
        <KeyboardArrowLeft color="#00346D" height="13px" width="13px" />
      </Button>
      <Button
        color="primary"
        fullWidth
        type="submit"
        variant={'outlined'}
        sx={{
          color: '#231F20',
          backgroundColor: '#F7FCFC',
          height: '48px',
          borderRadius: '8px',
          border: '1px solid #CCEEF0',
          fontSize: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '12px 11px',
          fontWeight: 400,
          width: '98%',
          margin: 0,
          fontFamily: 'IRANSans'
        }}
        onClick={() =>
          history.push({
            pathname: '/profile/work',
            state: {
              data: data
            }
          })
        }
      >
        اطلاعات شغلی
        <KeyboardArrowLeft color="#00346D" height="13px" width="13px" />
      </Button>
    </Box>
  );
}
