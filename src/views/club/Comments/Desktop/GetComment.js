import React, { useEffect, useState } from 'react';
import { Box, Rating } from '@mui/material';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import makeStyles from '@mui/styles/makeStyles';
import axios from 'axios';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import MomentFa from 'src/utils/MomentFa';
import AdminChat from './AdminChat';
import UserChat from './UserChat';
import SendMessage from './SendMessage';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  },
  rating: {
    '& .MuiRating-iconFilled': {
      color: '#D3D2D2'
    },
    '& .MuiRating-iconHover': {
      color: '#faaf00'
    }
  }
}));
export default function GetCommentDesktop({ selected }) {
  const classes = useStyles();
  const [chat, setChat] = useState();
  const userId = JSON.parse(localStorage.getItem('user')).user_id;

  function getData() {
    httpService
      .get(`${API_BASE_URL}/api/club/suggestions/${selected.id}`)
      .then(res => {
        if (res.status === 200) {
          setChat(res.data);
        }
      });
  }
  useEffect(() => {
    getData();
  }, [selected]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '24px 30px 0px !important',
        gap: '20px',
        // background: '#FFFFFF',
        width: '100%',
        overflow: 'auto'
      }}
    >
      <InputLabelHeader>{chat?.subject}</InputLabelHeader>

      <Box
        sx={{
          height: '400px',
          width: '100%',
          overflow: 'auto',
          paddingRight: '30px'
        }}
      >
        {chat?.message_list?.length > 0 &&
          chat.message_list.map((item, index) => {
            return item?.user_info?.user_id === userId ? (
              <UserChat message={item} />
            ) : (
              <AdminChat message={item} />
            );
          })}
      </Box>
      <SendMessage message={selected} getData={getData} />
    </Box>
  );
}
