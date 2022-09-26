import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import InputLabelHeader from 'src/components/Desktop/InputLabel';
import InputLabel from 'src/components/Desktop/InputLabel';
import UserPieChart from './UserPieChart';
import UserBarChart from './UserBarChart';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import MomentEn from 'src/utils/MomentEn';

export default function HomeDesktop() {
  const [allUser, setAllUser] = useState(0);
  const [verified, setVerified] = useState(0);
  const [todayUser, setTodayUser] = useState(0);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // const yesterday = new Date(today);
  // yesterday.setDate(yesterday.getDate() - 1);

  function getAllUser() {
    httpService
      .get(`${API_BASE_URL}/api/management/user/user_count`)
      .then(res => {
        if (res.status === 200) {
          setAllUser(res.data[0].count);
        }
      });
  }

  function getVerifiedUser() {
    httpService
      .get(
        `${API_BASE_URL}/api/management/user/user_count/?is_verified=VERIFIED`
      )
      .then(res => {
        if (res.status === 200) {
          setVerified(res.data[0].count);
        }
      });
  }
  function getTodayUser() {
    httpService
      .get(
        `${API_BASE_URL}/api/management/user/user_count/?create_date__lt=${MomentEn(
          tomorrow
        )}&create_date__gt=${MomentEn(today)}`
      )
      .then(res => {
        if (res.status === 200) {
          setTodayUser(res.data[0].count);
        }
      });
  }

  useEffect(() => {
    getAllUser();
    getVerifiedUser();
    getTodayUser();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: '20px',
        gap: '16px'
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '40px 20px 20px',
              gap: '33px',
              backgroundColor: 'white',
              borderRadius: '8px'
            }}
          >
            <InputLabelHeader style={{ color: '#00346D', fontSize: '40px' }}>
              {allUser}
            </InputLabelHeader>
            <InputLabel style={{ color: '#00346D' }}>
              همه کاربران ثبت نام شده
            </InputLabel>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '40px 20px 20px',
              gap: '33px',
              backgroundColor: 'white',
              borderRadius: '8px'
            }}
          >
            <InputLabelHeader style={{ color: '#00346D', fontSize: '40px' }}>
              {verified}
            </InputLabelHeader>
            <InputLabel style={{ color: '#00346D' }}>
              کاربران تایید شده
            </InputLabel>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '40px 20px 20px',
              gap: '33px',
              backgroundColor: 'white',
              borderRadius: '8px'
            }}
          >
            <InputLabelHeader style={{ color: '#00346D', fontSize: '40px' }}>
              {todayUser}
            </InputLabelHeader>
            <InputLabel style={{ color: '#00346D' }}>
              کاربران ثبت نامی امروز
            </InputLabel>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: '20px 30px',

              backgroundColor: 'white',
              borderRadius: '8px'
            }}
          >
            <InputLabelHeader
              style={{
                color: '#00346D',
                fontSize: '16px',
                marginBottom: '20px',
                fontWeight: 700
              }}
            >
              کاربران ثبت‌نامی در هر ماه
            </InputLabelHeader>
            <UserBarChart />
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '40px 20px 20px',

              backgroundColor: 'white',
              borderRadius: '8px'
            }}
          >
            {allUser !== 0 && <UserPieChart allUser={allUser} />}
            <InputLabel style={{ color: '#6685A7' }}>
              کاربران با پروفایل تکمیل ‌شده
            </InputLabel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
