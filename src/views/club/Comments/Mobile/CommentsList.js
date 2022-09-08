import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Drawer, TextField } from '@mui/material';
import FilterButton from 'src/components/Mobile/Button/Filter';
import InputLabel from 'src/components/Mobile/InputLabel';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { useHistory } from 'react-router-dom';
import CommentItem from './CommentItem';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));

export default function CommentsList() {
  const [comments, setComments] = useState(null);
  const [openNewComment, setOpenNewComment] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    httpService.get(`${API_BASE_URL}/api/club/suggestions/`).then(res => {
      if (res.status === 200) {
        setComments(res.data);
      }
    });
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 15px 6px',
          gap: '10px',
          position: 'sticky',
          top: '45px',
          width: '100%',
          height: '57px',
          backgroundColor: '#E5E5E5',
          zIndex: 100
        }}
      >
        <InputLabel>نظرات من</InputLabel>
        <ConfirmButton
          style={{ width: '150px' }}
          onClick={() => {
            // history.push('/club/newComment');
            setOpenNewComment(true);
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
            return <CommentItem data={item} key={index} />;
          })}
      </Box>
      <Drawer
        anchor={'bottom'}
        open={openNewComment}
        onClose={() => setOpenNewComment(false)}
        classes={{
          paper: classes.paper
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px',
            gap: '10px',
            background: '#FFFFFF'
          }}
        >
          <InputLabel>جهت ایجاد نظر، موارد زیر را تعیین کنید:</InputLabel>
          <Box sx={{ mt: 2, width: '100%' }}>
            <InputLabel>عنوان</InputLabel>
            <TextField fullWidth id="topic" />
          </Box>
          <Box sx={{ mt: 2, width: '100%' }}>
            <InputLabel>موضوع</InputLabel>
            <Autocomplete
              disablePortal
              fullWidth
              id="topic"
              options={[]}
              renderInput={params => (
                <TextField {...params} placeholder="موضوع" fullWidth />
              )}
              // onChange={(event, newValue) => {
              //   if (newValue) setTopicId(newValue.id);
              // }}
              isOptionEqualToValue={(option, value) =>
                option.label === value.label
              }
              getOptionLabel={option => option.name}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            gap: 2,
            width: '1',
            padding: '12px 21px',
            borderTop: '0.5px solid #D3D2D2',
            marginTop: '30px'
            // position: 'absolute',
            // bottom: 0
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
          <ConfirmButton disabled={false}>{'ثبت'}</ConfirmButton>
        </Box>
      </Drawer>
    </div>
  );
}
