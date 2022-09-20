import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  TextField,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import Score from './Score';
import { ArrowBack, KeyboardArrowLeft } from '@mui/icons-material';
import InputLabel from 'src/components/Mobile/InputLabel';
import useAuth from 'src/hooks/useAuth';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import makeStyles from '@mui/styles/makeStyles';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { Minus, Plus, Star } from 'react-feather';
import useScore from 'src/hooks/useScore';
import Main from './Main';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';

export default function ProfileMobile() {
  const [data, setData] = useState();
  const history = useHistory();
  const { logout } = useAuth();
  const { setScore } = useScore();

  useEffect(() => {
    httpService.get(`${API_BASE_URL}/api/users/get_user_profile/`).then(res => {
      if (res.status === 200) {
        setData(res.data);
      }
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          padding: '25px 0px',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '0px 20px 30px',
            gap: '20px',
            width: '100%'
          }}
        >
          <Avatar
            alt={data?.first_name}
            src={data?.user_profile_image}
            sx={{
              width: 100,
              height: 100
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <InputLabelHeader style={{ color: '#00346D', fontSize: '20px' }}>
              {data?.first_name + ' ' + data?.last_name}
            </InputLabelHeader>
            <InputLabel style={{ color: '#00346D' }}>
              {data?.user_id}
            </InputLabel>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3px !important',
                // height: '22px',
                background: '#E3E3E3',
                borderRadius: '4px',
                color: '#4F4C4D'
              }}
            >
              <Star
                style={{ width: '27px', height: '18px', color: '#A7A5A6' }}
              />
              <InputLabel style={{ color: '#4F4C4D' }}>
                {data?.user_club?.grade_info?.name}
              </InputLabel>
              {/* <InputLabel style={{ color: '#4F4C4D', fontSize: '' }}>
                {data?.user_club?.grade_info?.total_credit}
              </InputLabel> */}
            </Box>
          </Box>
        </Box>
        <Main data={data} />
        {/* <Box
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
        </InputLabel> */}
      </Box>
    </>
  );
}
