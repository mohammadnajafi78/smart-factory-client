import React, { useState } from 'react';
import { Box, Divider } from '@mui/material';
import Comment from 'src/assets/img/icons/comment.svg';
import CommentsList from './CommentsList';
import GetCommentDesktop from './GetComment';

export default function CommentDesktop() {
  const [selected, setSelected] = useState(null);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: '30px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          width: '42%',
          paddingLeft: '130px',
          justifyContent: 'center',
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Box sx={{ width: '100%', padding: '20px 30px 0px' }}>
          <CommentsList selected={selected} setSelected={setSelected} />
        </Box>
      </Box>
      {selected && <Divider orientation="vertical" />}
      <Box
        sx={{
          flex: '1 1 auto',
          width: '50%',
          backgroundColor: selected ? '#f4f4f4' : 'white',
          paddingTop: '50px'
        }}
      >
        {selected ? (
          <GetCommentDesktop selected={selected} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              pt: 20,
              gap: '60px'
            }}
          >
            <img src={Comment} width="90px" height="90px" />
            <p>جهت مشاهده جزئیات نظر، روی آن کلیک کنید</p>
          </Box>
        )}
      </Box>
    </div>
  );
}
