import React from 'react';
import { Box, Divider, Grid } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import Call from 'src/assets/img/icons/call.svg';
import ChatUser from 'src/assets/img/icons/chatUser.svg';
import AdminChat from './AdminChat';
import UserChat from './UserChat';
import SendMessage from './SendMessage';

export default function Details() {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          padding: '15px',
          gap: '10px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '8px'
        }}
      >
        <InputLabelHeader style={{ color: '#00346D' }}>
          پیشنهاد فنی
        </InputLabelHeader>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div style={{ display: 'inline-flex' }}>
              <InputLabel style={{ color: '#00AAB5' }}>موضوع:</InputLabel>
              <InputLabel style={{ color: '#335D8A' }}>
                {'دفاتر و کارشناس فروش'}
              </InputLabel>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{ display: 'inline-flex' }}>
              <InputLabel style={{ color: '#00AAB5' }}>
                زمان ثبت نام:
              </InputLabel>
              <InputLabel style={{ color: '#335D8A' }}>
                {'دفاتر و کارشناس فروش'}
              </InputLabel>
            </div>
          </Grid>
        </Grid>
        <Divider variant="middle" sx={{ margin: '20px 0px', width: '98%' }} />

        <AdminChat />
        <UserChat />
        <UserChat file={true} />
        <AdminChat file={true} />

        <SendMessage />
      </Box>
    </Box>
  );
}
