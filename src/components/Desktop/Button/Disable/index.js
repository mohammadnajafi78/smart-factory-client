import React from 'react';
import { Button } from '@mui/material';

export default function Disable({ children, ...rest }) {
  return (
    <Button
      color="primary"
      fullWidth
      type="submit"
      variant="contained"
      sx={{
        padding: '10px',
        color: '#4F4C4D',
        minHeight: '44px',
        borderRadius: '4px',
        borderRadius: '4px',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
        backgroundColor: '#DFDFDF',
        marginBottom: '10px',
        fontFamily: 'IRANSans'
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
