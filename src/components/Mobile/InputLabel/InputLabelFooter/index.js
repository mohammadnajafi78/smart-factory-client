import React from 'react';
import { InputLabel } from '@mui/material';

function InputLabelFooter({ children, ...rest }) {
  return (
    <InputLabel
      htmlFor="my-input"
      sx={{
        width: '100%',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '13px',
        lineHeight: '20px',
        textAlign: 'center',
        color: '#6E6E6E',
        whiteSpace: 'break-spaces'
        // marginTop: '15px'
      }}
      {...rest}
    >
      {children}
    </InputLabel>
  );
}

export default InputLabelFooter;
