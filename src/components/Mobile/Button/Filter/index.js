import { Button } from '@mui/material';
import React from 'react';

export default function FilterButton({ children, ...rest }) {
  return (
    <Button
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '6px 12px !important',
        gap: '10px',
        height: '37px',
        background: '#FFFFFF',
        border: '1px solid #99AEC5',
        borderRadius: '8px',
        fontFamily: 'IRANSans',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '25px',
        textAlign: 'center',
        color: '#00346D',
        whiteSpace: 'nowrap'
        // width: '100%'
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
