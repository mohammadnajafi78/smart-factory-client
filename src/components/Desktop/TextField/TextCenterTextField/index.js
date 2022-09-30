import React from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TextCenterTextField = styled(TextField)({
  '& .MuiFilledInput-input': {
    textAlign: 'center',
    padding: '18px'
  },
  '& .Mui-error': {
    backgroundColor: '#FEEEEC'
  },
  '& .MuiFormHelperText-root': {
    backgroundColor: 'white'
  }
});
