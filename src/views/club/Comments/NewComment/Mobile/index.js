import React, { useEffect, useRef, useState } from 'react';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Drawer,
  TextField
} from '@mui/material';
import LinkIconButton from 'src/components/Mobile/Button/LinkIcon';
import LinkButton from 'src/components/Mobile/Button/Link';
import InputLabel from 'src/components/Mobile/InputLabel';
import iphone13 from 'src/assets/img/icons/iphone13.jpeg';
import { Star } from 'react-feather';
import Received from 'src/assets/img/icons/received.svg';
import Presents from 'src/assets/img/icons/presents.svg';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import { AttachFile } from '@mui/icons-material';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

export default function NewCommentMobile() {
  const [topics, setTopics] = useState([]);
  const [topicId, setTopicId] = useState(null);

  useEffect(() => {
    httpService.get(`${API_BASE_URL}/api/club/suggestion_topic/`).then(res => {
      if (res.status === 200) {
        setTopics(res.data);
      }
    });
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '21px',
          gap: '22px',
          width: '100%'
          // height: '79vh'
        }}
      >
        <InputLabelHeader>نظر جدید</InputLabelHeader>
        <Box sx={{ mt: 2, width: '100%' }}>
          <InputLabel>موضوع</InputLabel>
          <Autocomplete
            disablePortal
            fullWidth
            id="topic"
            options={topics}
            renderInput={params => (
              <TextField {...params} placeholder="موضوع" fullWidth />
            )}
            onChange={(event, newValue) => {
              if (newValue) setTopicId(newValue.id);
            }}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            getOptionLabel={option => option.name}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <InputLabel>متن نظر</InputLabel>
          <TextField fullWidth multiline rows={5} placeholder={'بنویسید ...'} />
        </Box>
        <ConfirmButton disabled={false} variant="outlined" component="label">
          <input type="file" hidden multiple />
          <AttachFile />
          {'آپلود فایل'}
        </ConfirmButton>
      </Box>
      <Box
        sx={{
          display: 'inline-flex',
          justifyContent: 'space-between',
          gap: 2,
          width: '1',
          padding: '12px 21px',
          borderTop: '0.5px solid #D3D2D2',
          position: 'absolute',
          bottom: 0
        }}
      >
        <ConfirmButton
          disabled={false}
          variant="outlined"
          onClick={() => {
            history.back();
          }}
        >
          {'لغو'}
        </ConfirmButton>
        <ConfirmButton disabled={false}>{'ثبت نظر'}</ConfirmButton>
      </Box>
    </Box>
  );
}
