import React from 'react';
import { InputLabel } from '@mui/material';

function InputLabelHeader({ children, ...rest }) {
  return (
    <InputLabel
      htmlFor="my-input"
      sx={{
        fontStyle: 'bold',
        fontWeight: 700,
        fontSize: '16px',
        // height: '26px',
        textAlign: 'start',
        color: '#000000',
        whiteSpace: 'break-spaces'
        // marginBottom: '26px'
      }}
      {...rest}
    >
      {children}
    </InputLabel>
  );
}

export default InputLabelHeader;
