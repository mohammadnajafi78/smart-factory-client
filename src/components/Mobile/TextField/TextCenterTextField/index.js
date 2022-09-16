import React from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TextCenterTextField = styled(TextField)({
  '& .MuiOutlinedInput-input': {
    textAlign: 'center'
  }
});
