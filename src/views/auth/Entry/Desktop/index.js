import React from 'react';
import LoginFrame from 'src/components/Desktop/LoginFrame';
import { Box } from '@mui/material';
import Logo from 'src/assets/img/LogoBTS.svg';
import InputLabel from 'src/components/Desktop/InputLabel';
import LinkButton from 'src/components/Desktop/Button/Link';

function EntryDesktop() {
  return (
    <LoginFrame>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 30px 20px',
          gap: '80px',
          position: 'absolute',
          width: '386px',
          height: '500px',
          background: '#FFFFFF',
          border: '1px solid #D3D2D2',
          borderRadius: '10px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 0,
            justifyContent: 'space-between',
            // gap: '159px',
            gap: '90px'
            // position: 'absolute',
            // width: '90%',
            // // height: '317px',
            // left: '20px',
            // top: '222px'
          }}
        >
          <img
            src={Logo}
            alt="logo"
            style={{ width: '121.27px', height: '50px' }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 0,
              gap: '15px'
            }}
          >
            <InputLabel>
              جهت ورود، یکی از روش‌های زیر را انتخاب کنید:
            </InputLabel>
            <LinkButton>{'ورود با رمز عبور'}</LinkButton>
            <LinkButton>{'ورود با رمز عبور یک بار مصرف'}</LinkButton>
          </Box>
        </Box>
        <Box>
          <InputLabel>
            شماره همراه یا ایمیل خود را اشتباه وارد کردید؟
          </InputLabel>
        </Box>
      </Box>
    </LoginFrame>
  );
}

export default EntryDesktop;
