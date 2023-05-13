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
        paddingRight: '8px',
        whiteSpace: 'break-spaces',
        textOverflow: 'inherit',
        overflow: 'inherit'
      }}
      {...rest}
    >
      {children}
    </MuiInputLabel>
  );
}

export default InputLabel;
