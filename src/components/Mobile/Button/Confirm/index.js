import React from 'react';
// import { Button } from '@mui/material';
import { LoadingButton as Button } from '@mui/lab';
import { DotLoader } from 'react-spinners';

export default function Confirm({ children, ...rest }) {
  return (
    <Button
      color="primary"
      fullWidth
      type="submit"
      variant="contained"
      sx={{
        padding: '10px',
        color:
          rest.variant === 'outlined'
            ? rest.disabled === true
              ? '#CCEEF0 !important'
              : '#00AAB5'
            : 'white',
        border: rest.disabled
          ? '1px solid #CCEEF0 !important'
          : '1px solid #00AAB5',
        minHeight: '44px',
        borderRadius: '4px',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
        fontFamily: 'IRANSans'
      }}
      {...rest}
      loadingIndicator={
        <DotLoader
          // color={color}
          loading={rest.loading}
          // cssOverride={override}
          size={20}
        />
      }
      loadingPosition="start"
      // startIcon={<SaveIcon />}
    >
      {children}
    </Button>
  );
}
