import { Box } from '@mui/material';
import React from 'react';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import UserChat from './UserChat';
import AdminChat from './AdminChat';
import SendMessage from './SendMessage';

export default function NewCommentMobile() {
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
          padding: '15px',
          gap: '22px',
          width: '100%'
          // height: '79vh'
        }}
      >
        <InputLabelHeader>مشکل در بخش دریافتی ها</InputLabelHeader>
        <Box sx={{ height: '500px', overflow: 'auto', pb: 14 }}>
          <AdminChat />
          <UserChat />
          <AdminChat file={true} />
          <UserChat file={true} />
          <AdminChat />
          <UserChat />
        </Box>
      </Box>
      <SendMessage />
    </Box>
  );
}
