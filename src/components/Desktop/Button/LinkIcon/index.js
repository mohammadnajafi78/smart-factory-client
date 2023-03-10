import React from 'react';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

export default function Link({ children, variant, ...rest }) {
  return (
    <Button
      //   color="primary"
      fullWidth
      type="submit"
      variant={'contained'}
      sx={{
        color: 'white',
        background: '#00346D',
        height: '48px',
        borderRadius: '8px',
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px',
        fontWeight: 400,
        width: '100%',
        margin: 0,
        fontFamily: 'IRANSans',
        '&:hover': {
          background: '#00346D',
          color: 'white'
        }
      }}
      {...rest}
    >
      <div style={{ display: 'inline-flex', gap: 5 }}>{children}</div>
      <ArrowBack
        color={variant === 'outlined' ? '#00AAB5' : 'white'}
        height="13px"
        width="13px"
      />
    </Button>
  );
}
