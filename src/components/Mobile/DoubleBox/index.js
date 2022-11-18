import React from 'react';
import { Box } from '@mui/material';

export default function DoubleBox({ children, isSelected }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3px 6px !important',
        background: isSelected === true ? 'white' : '#CCEEF0',
        borderRadius: '4px',
        color: '#00AAB5'
      }}
    >
      {children}
    </Box>
  );
}
