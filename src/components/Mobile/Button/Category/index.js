import React from 'react';
import { LoadingButton as Button } from '@mui/lab';
import Loading from '../../Loading';

export default function Category({ children, ...rest }) {
  return (
    <Button
      // color="white"
      fullWidth
      type="submit"
      variant="contained"
      sx={{
        padding: '10px',
        backgroundColor: 'white',
        color: '#00346D',
        bosShadow: '1px 1px 6px rgba(201, 201, 201, 0.25)',
        minHeight: '44px',
        borderRadius: '6px',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
        fontFamily: 'IRANSans',
        width: 'auto',

        ':hover': {
          bgcolor: '#DDF5F6' // theme.palette.primary.main
          // color: 'white'
        }
      }}
      loadingIndicator={<Loading />}
      loadingPosition="end"
      // startIcon={<SaveIcon />}
      {...rest}
    >
      {children}
    </Button>
  );
}
