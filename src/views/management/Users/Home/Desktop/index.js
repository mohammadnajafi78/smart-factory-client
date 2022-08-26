import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import InputLabelHeader from 'src/components/Desktop/InputLabel';
import InputLabel from 'src/components/Desktop/InputLabel';
import UserPieChart from './UserPieChart';
import UserBarChart from './UserBarChart';

export default function HomeDesktop() {
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
              5678
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
              5678
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
              5678
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
            <UserPieChart />
            <InputLabel style={{ color: '#6685A7' }}>
              کاربران با پروفایل تکمیل ‌شده
            </InputLabel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
