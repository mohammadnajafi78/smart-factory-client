import React from 'react';
import { InputLabel as MuiInputLabel } from '@mui/material';

function InputLabel({ children, ...rest }) {
  return (
    <MuiInputLabel
      htmlFor="my-input"
      sx={{
        // fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '26px',
        minHeight: '26px',
        textAlign: 'start',
        color: '#000000',
        whiteSpace: 'break-spaces',
        // marginBottom: '15px',
        paddingRight: '8px'
      }}
      {...rest}
    >
      {children}
    </MuiInputLabel>
  );
}

export default InputLabel;
