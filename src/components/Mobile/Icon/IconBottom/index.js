import { Box, InputLabel } from '@mui/material';
import React from 'react';

export default function IconBottom({ src, alt }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px',
        gap: '6px',

        width: '48px',
        height: '44px'
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ color: '#00346D', width: '31px', height: '22px' }}
      />
      <InputLabel sx={{ fontWeight: 400, fontSize: '10px', color: '#6685A7' }}>
        {alt}
      </InputLabel>
    </Box>
  );
}
