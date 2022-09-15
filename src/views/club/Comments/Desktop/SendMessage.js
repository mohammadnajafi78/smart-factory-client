import { Box, InputAdornment, makeStyles, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Attach from 'src/assets/img/icons/attachComment.svg';
import SendMessageImage from 'src/assets/img/icons/sendMessage.svg';
import Smile from 'src/assets/img/icons/smile.svg';
import { alpha, styled } from '@mui/material/styles';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { SelectAllRounded } from '@mui/icons-material';

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    borderTop: 'solid 1px #F4F4F4',
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
export default function SendMessage({ message, getData }) {
  const [messageText, setMessageText] = useState();
  const [files, setFiles] = useState(null);

  useEffect(() => {
    if (files) {
      const formData = new FormData();
      formData.append('suggestion_id', message.id);
      formData.append('files', files);

      httpService
        .post(`${API_BASE_URL}/api/club/suggestions/add_response/`, formData)
        .then(res => {
          if (res.status === 201) getData();
        });
    }
  }, [files]);

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
        bottom: 0,
        right: 0,
        width: '54%'
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
        value={messageText}
        onChange={event => setMessageText(event.target.value)}
      />

      {messageText ? (
        <ConfirmButton
          disabled={false}
          variant="contained"
          component="label"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // padding: '9px ',
            // gap: '10px',
            width: '20px',
            height: '20px',
            background: '#00AAB5',
            borderRadius: '22px'
          }}
          onClick={() => {
            httpService
              .post(`${API_BASE_URL}/api/club/suggestions/add_response/`, {
                suggestion_id: message.id,
                message: messageText
              })
              .then(res => {
                if (res.status === 201) getData();
              });
          }}
        >
          <img src={SendMessageImage} width="20px" height="18px" />
        </ConfirmButton>
      ) : (
        <ConfirmButton
          disabled={false}
          variant="contained"
          component="label"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

            width: '20px',
            height: '20px',
            background: '#00AAB5',
            borderRadius: '22px'
          }}
          value={files}
          onChange={event => {
            setFiles(event.target.files[0]);
          }}
        >
          <img src={Attach} width="20px" height="18px" />
          <input type="file" hidden multiple={false} />
        </ConfirmButton>
      )}
    </Box>
  );
}
