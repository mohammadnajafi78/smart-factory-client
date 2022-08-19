import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Mobile/InputLabel';

export default function MessageMobile() {
  const history = useHistory();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: '25px',
        gap: '30px',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%'
      }}
    >
      Message
    </Box>
  );
}
