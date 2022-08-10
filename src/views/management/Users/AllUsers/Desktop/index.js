import { Box } from '@mui/material';
import React, { useState } from 'react';
import InputLabelHeader from 'src/components/Desktop/InputLabel';
import AllUsersTable from '../table';

export default function AllUsersDesktop() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '20.25px 16px 18.5px 20px',
          gap: '32px',
          height: '60px',
          background: '#FFFFFF',
          borderBottom: '0.5px solid #CCD6E2',
          justifyContent: 'flex-start'
        }}
      >
        <InputLabelHeader
          style={{ color: '#00346D', fontWeight: 700, fontSize: '18px' }}
        >
          همه کاربران
        </InputLabelHeader>
      </Box>
      <Box sx={{ p: '20px' }}>
        <AllUsersTable />
      </Box>
    </Box>
  );
}
