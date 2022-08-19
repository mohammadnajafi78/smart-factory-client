import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Desktop/InputLabel';

export default function MessageDesktop() {
  const history = useHistory();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: '40px 80px',
        gap: '30px',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: '130px',
        width: '100%',
        marginTop: '60px'
      }}
    >
      Message
    </Box>
  );
}
