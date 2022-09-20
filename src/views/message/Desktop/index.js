import React, { useState } from 'react';
import { Box } from '@mui/material';
import ReceivedListDesktop from './MessageList';
import MessageDetail from 'src/assets/img/icons/messageDetail.svg';
import ReceivedItemDesktop from '../MessageItem/Desktop';

export default function ReceivedDesktop() {
  const [selected, setSelected] = useState(null);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: '40px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          width: '40%',
          paddingLeft: '130px',
          justifyContent: 'center',
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Box sx={{ width: '100%' }}>
          <ReceivedListDesktop selected={selected} setSelected={setSelected} />
        </Box>
      </Box>
      <Box
        sx={{
          flex: '1 1 auto',
          width: '50%',
          backgroundColor: 'white',
          paddingTop: '20px'
        }}
      >
        {selected ? (
          // <GetCommentDesktop selected={selected} />
          <ReceivedItemDesktop selected={selected} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              pt: 20,
              gap: '40px'
            }}
          >
            <img src={MessageDetail} width="90px" height="90px" />
            <p style={{ color: '#6685A7' }}>
              جهت مشاهده جزئیات پیام، روی آن کلیک کنید
            </p>
          </Box>
        )}
      </Box>
    </div>
  );
}
