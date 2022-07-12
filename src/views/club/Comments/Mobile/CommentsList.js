import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import FilterButton from 'src/components/Mobile/Button/Filter';
import InputLabel from 'src/components/Mobile/InputLabel';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { useHistory } from 'react-router-dom';
import CommentItem from './CommentItem';

export default function CommentsList() {
  const [Comments, setComments] = useState([
    { name: 'دفاتر و کارشناسان فروش', seen: true, expireDate: 'ارسال ۲/۲۰' },
    { name: 'دفاتر و کارشناسان فروش', seen: false, expireDate: 'ارسال ۲/۲۰' },
    { name: 'دفاتر و کارشناسان فروش', seen: true, expireDate: 'ارسال ۲/۲۰' },
    { name: 'دفاتر و کارشناسان فروش', seen: false, expireDate: 'ارسال ۲/۲۰' },
    { name: 'دفاتر و کارشناسان فروش', seen: true, expireDate: 'ارسال ۲/۲۰' },
    { name: 'دفاتر و کارشناسان فروش', seen: true, expireDate: 'ارسال ۲/۲۰' },
    { name: 'دفاتر و کارشناسان فروش', seen: false, expireDate: 'ارسال ۲/۲۰' }
  ]);
  const history = useHistory();

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
        {Comments.map((item, index) => {
          return <CommentItem data={item} key={index} />;
        })}
      </Box>
    </div>
  );
}
