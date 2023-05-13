import React from 'react';
import { InputLabel } from '@mui/material';

function InputLabelHeader({ children, ...rest }) {
  return (
    <InputLabel
      htmlFor="my-input"
      sx={{
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '20px',
        textAlign: 'start',
        color: '#000000',
        whiteSpace: 'break-spaces',
        textOverflow: 'inherit',
        overflow: 'inherit'
      }}
      {...rest}
    >
      {children}
    </InputLabel>
  );
}

export default InputLabelHeader;
