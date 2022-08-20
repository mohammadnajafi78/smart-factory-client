import React, { useEffect, useState } from 'react';
import { Box, Button, Divider } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Score from './Score';
import { ArrowBack, KeyboardArrowLeft } from '@mui/icons-material';
import InputLabel from 'src/components/Mobile/InputLabel';
import useAuth from 'src/hooks/useAuth';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

export default function ProfileMobile() {
  const [data, setData] = useState();
  const history = useHistory();
  const { logout } = useAuth();

  useEffect(() => {
    httpService.get(`${API_BASE_URL}/api/users/get_user_profile/`).then(res => {
      if (res.status === 200) {
        setData(res.data);
      }
    });
  }, []);

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
      <Score />
      <Button
        color="primary"
        fullWidth
        type="submit"
        variant={'outlined'}
        sx={{
          color: '#00346D',
          backgroundColor: '#ECF1F8',
          height: '48px',
          borderRadius: '8px',
          border: '0.733333px solid #00346D',
          fontSize: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '12px 11px',
          fontWeight: 500,
          width: '98%',
          margin: 0,
          fontFamily: 'IRANSans'
        }}
      >
        انتقال امتیاز
        <ArrowBack color="#00346D" height="13px" width="13px" />
      </Button>
      <Divider variant="middle" sx={{ margin: '20px 0px', width: '98%' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0px',
          width: '98%'
        }}
      >
        <InputLabel style={{ color: '#6685A7' }}>سطح شما</InputLabel>
        <InputLabel style={{ color: '#00346D' }}>
          {data?.user_club?.grade_info?.name}
        </InputLabel>
      </Box>
      <Divider variant="middle" sx={{ margin: '3px 0px', width: '98%' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0px',
          width: '98%'
        }}
        onClick={() =>
          history.push({
            pathname: '/profile/detail',
            state: {
              data: data
            }
          })
        }
      >
        <InputLabel style={{ color: '#00346D' }}>اطلاعات کاربری</InputLabel>
        <KeyboardArrowLeft style={{ color: '#00346D' }} />
      </Box>
      <Divider variant="middle" sx={{ margin: '3px 0px', width: '98%' }} />
      <InputLabel
        style={{ color: '#ED1C24', cursor: 'pointer' }}
        onClick={() => {
          logout();
        }}
      >
        خروج از حساب کاربری
      </InputLabel>
    </Box>
  );
}
