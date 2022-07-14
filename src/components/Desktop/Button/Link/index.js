import React from 'react';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

export default function Link({ children, ...rest }) {
  return (
    <Button
      color="primary"
      fullWidth
      type="submit"
      variant="outlined"
      sx={{
        color: '#00AAB5',
        height: '48px',
        borderRadius: '4px',
        fontSize: '20px',
        lineHeight: '20px',
        border: 'solid 1px #00AAB5 ',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 16px',
        width: '100%',
        margin: 0
      }}
      {...rest}
    >
      <div>{children}</div>
      <ArrowBack color={'#00AAB5'} />
    </Button>
  );
}
