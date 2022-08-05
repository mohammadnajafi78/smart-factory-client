import React, { useEffect, useState } from 'react';
import CommentItem from './CommentItem';
import InputLabel from 'src/components/Desktop/InputLabel';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import { useHistory } from 'react-router-dom';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import { Autocomplete, Box, TextField } from '@mui/material';
import { AttachFile } from '@mui/icons-material';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

export default function CommentsList({ selected, setSelected }) {
  const history = useHistory();
  const [comments, setComments] = useState(null);
  const [open, setOpen] = useState(false);
  const [topics, setTopics] = useState([]);
  const [topicId, setTopicId] = useState(null);

  useEffect(() => {
    httpService.get(`${API_BASE_URL}/api/club/suggestions/`).then(res => {
      if (res.status === 200) {
        setComments(res.data);
      }
    });

    httpService.get(`${API_BASE_URL}/api/club/suggestion_topic/`).then(res => {
      if (res.status === 200) {
        console.log('topic', res.data);
        setTopics(res.data);
      }
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 15px 6px',
          gap: '10px',
          // position: 'sticky',
          // top: '45px',
          // width: '100%',
          height: '57px',
          // backgroundColor: '#E5E5E5',
          zIndex: 100
        }}
      >
        <InputLabel>نظرات من</InputLabel>
        <ConfirmButton
          style={{ width: '150px' }}
          onClick={() => {
            // history.push('/club/newComment');
            setOpen(true);
          }}
        >
          ایجاد نظر جدید
        </ConfirmButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px 0px 0px',
          gap: '14px',
          // height: '640px',
          overflowY: 'auto'
        }}
      >
        {comments &&
          comments.map((item, index) => {
            return (
              <CommentItem
                data={item}
                key={index}
                selected={selected}
                setSelected={setSelected}
              />
            );
          })}
      </Box>
      <CustomizedDialogs
        title={'ایجاد نظر جدید'}
        open={open}
        handleClose={() => setOpen(false)}
        content={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '8px 16px 12px',
              gap: '32px',
              width: '372px'
              // height: '750px'
            }}
          >
            <Box sx={{ width: '100%' }}>
              <InputLabel>موضوع</InputLabel>
              <Autocomplete
                disablePortal
                fullWidth
                id="topic"
                options={topics}
                // sx={{ width: 300 }}
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
              <TextField
                fullWidth
                multiline
                rows={5}
                placeholder={'بنویسید ...'}
              />
            </Box>
            <ConfirmButton
              disabled={false}
              variant="outlined"
              component="label"
            >
              <AttachFile />
              {'آپلود فایل'}
              <input type="file" hidden multiple />
            </ConfirmButton>
          </Box>
        }
        actions={
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'space-between',
              gap: 2,
              width: '1',
              padding: '12px 21px'
              // borderTop: '0.5px solid #D3D2D2'
            }}
          >
            <ConfirmButton
              disabled={false}
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              {'لغو'}
            </ConfirmButton>
            <ConfirmButton disabled={false}>{'ثبت نظر'}</ConfirmButton>
          </Box>
        }
      />
    </>
  );
}
