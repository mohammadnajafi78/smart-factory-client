import { Box, InputAdornment, makeStyles, TextField } from '@mui/material';
import React from 'react';
import Attach from 'src/assets/img/icons/attachComment.svg';
import Smile from 'src/assets/img/icons/smile.svg';
import { alpha, styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    '& fieldset': {
      borderColor: 'white'
    },
    '&:hover fieldset': {
      borderColor: 'white'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white'
    }
  }
});
export default function SendMessage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0px 6px',
        gap: '8px',
        background: 'white',
        width: '100%',
        position: 'absolute',
        bottom: 0
      }}
    >
      <CssTextField
        fullWidth
        multiline
        placeholder="بنویسید..."
        classes={{
          MuiOutlinedInput: {
            root: { backgroundColor: 'white' }
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img src={Smile} />
            </InputAdornment>
          )
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '9px 13.5px',
          gap: '10px',
          width: '36px',
          height: '36px',
          background: '#00AAB5',
          borderRadius: '22px'
        }}
      >
        <img src={Attach} />
      </Box>
    </Box>
  );
}
