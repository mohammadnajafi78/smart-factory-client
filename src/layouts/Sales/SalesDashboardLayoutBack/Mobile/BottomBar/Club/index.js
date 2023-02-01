import React from 'react';
import Awards from './Awards';
import Comments from './Comments';
import Competition from './Competition';
import Incomings from './ّIncomings';
import { Box } from '@mui/material';

export default function Club() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 30px',
        gap: '10px'
      }}
    >
      <Competition />
      <Awards />
      <Comments />
      <Incomings />
    </Box>
  );
}
