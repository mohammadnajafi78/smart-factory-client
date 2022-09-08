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
        padding: '15px 16px',
        gap: '8px',
        background: '#F2F7F7',
        width: '100%'
        // borderRadius: '10px'
      }}
    >
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '10px',
          gap: '10px',
          background: '#FFFFFF',
          borderRadius: '10px',
          width: '100%'
        }}
      > */}
      <CssTextField
        fullWidth
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
      {/* </Box> */}
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
