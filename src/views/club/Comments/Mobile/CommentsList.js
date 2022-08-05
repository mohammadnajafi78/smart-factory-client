import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import FilterButton from 'src/components/Mobile/Button/Filter';
import InputLabel from 'src/components/Mobile/InputLabel';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { useHistory } from 'react-router-dom';
import CommentItem from './CommentItem';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

export default function CommentsList() {
  const [comments, setComments] = useState(null);
  const history = useHistory();

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
            history.push('/club/newComment');
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
    </div>
  );
}
