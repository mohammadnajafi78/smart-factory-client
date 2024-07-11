import React from 'react';
// import Logo from 'src/assets/img/LogoBTS.svg';
import { Grid, Box } from '@mui/material';

export default function LoginFrame({ children, ...rest }) {
  return (
    <>
      <Grid container sx={{ height: '100vh' }}>
        <Grid
          item
          md={5}
          sx={{
            backgroundColor: '#CCEEF0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {/* <img
            src={Logo}
            alt="logo"
            style={{ width: '308px', height: '127px' }}
          /> */}
        </Grid>
        <Grid
          item
          md={7}
          sx={{
            backgroundColor: '#E5E5E5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {children}
        </Grid>
      </Grid>
    </>
  );
}
