import React from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SearchTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    textAlign: 'right',
    height: '45px',
    backgroundColor: 'white',
    borderRadius: '6px'
  },
  '& .MuiInputBase-input': {
    '&::placeholder': {
      color: '#99AEC5',
      fontSize: '14px'
    }
  }
});
