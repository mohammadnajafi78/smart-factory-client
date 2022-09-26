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
import NewCommentImg from 'src/assets/img/icons/newComment.svg';

export default function CommentsList({ selected, setSelected }) {
  const history = useHistory();
  const [comments, setComments] = useState(null);
  const [open, setOpen] = useState(false);
  const [topics, setTopics] = useState([]);
  const [topicId, setTopicId] = useState(null);
  const [title, setTitle] = useState();

  function getSuggestions() {
    httpService.get(`${API_BASE_URL}/api/club/suggestions/`).then(res => {
      if (res.status === 200) {
        setComments(res.data);
      }
    });
  }

  function getTopics() {
    httpService.get(`${API_BASE_URL}/api/club/suggestion_topic/`).then(res => {
      if (res.status === 200) {
        setTopics(res.data);
      }
    });
  }

  useEffect(() => {
    getSuggestions();
    getTopics();
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
        {/* <ConfirmButton
          style={{ width: '150px' }}
          onClick={() => {
            // history.push('/club/newComment');
            setOpen(true);
          }}
        >
          ایجاد نظر جدید
        </ConfirmButton> */}
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
              // <div onClick={() => setSelected(item)} style={{ width: '100%' }}>
              <CommentItem
                data={item}
                key={index}
                selected={selected}
                setSelected={setSelected}
              />
              // </div>
            );
          })}
        <Box
          sx={{
            position: 'absolute',
            bottom: '0%',
            width: '35.6%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            height: '60px',
            // padding: '10px',
            gap: '10px',
            padding: '0px 30px 0px'
          }}
        >
          <ConfirmButton
            style={{
              margin: '0px 10px',
              backgroundColor: '#00346D',
              width: '70%'
            }}
            onClick={() => {
              // history.push('/club/newComment');
              setOpen(true);
            }}
          >
            <img src={NewCommentImg} style={{ marginLeft: '3px' }} />
            ایجاد نظر جدید
          </ConfirmButton>
        </Box>
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
            <Box sx={{ mt: 2, width: '100%' }}>
              <InputLabel>عنوان</InputLabel>
              <TextField
                fullWidth
                id="topic"
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
            </Box>
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
                getOptionLabel={option =>
                  option.suggestion_type + ' ' + option.name
                }
                noOptionsText={'موردی یافت نشد'}
              />
            </Box>

            {/* <ConfirmButton
              disabled={false}
              variant="outlined"
              component="label"
            >
              <AttachFile />
              {'آپلود فایل'}
              <input type="file" hidden multiple />
            </ConfirmButton> */}
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
            <ConfirmButton
              disabled={false}
              onClick={() => {
                httpService
                  .post(`${API_BASE_URL}/api/club/suggestions/`, {
                    subject: title,
                    topic: topicId
                  })
                  .then(res => {
                    if (res.status === 201) {
                      setOpen(false);
                      getSuggestions();
                      setSelected(res.data);
                    }
                  });
              }}
            >
              {'ثبت نظر'}
            </ConfirmButton>
          </Box>
        }
      />
    </>
  );
}
