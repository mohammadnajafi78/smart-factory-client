import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import InputLabelHeader from 'src/components/Desktop/InputLabel';
import InputLabel from 'src/components/Desktop/InputLabel';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import MomentEn from 'src/utils/MomentEn';
import ReceiveTable from './Table';

export default function ReceivedDesktop() {
  return (
    <Box sx={{ width: '100%' }}>
      <ReceiveTable />
    </Box>
  );
}
