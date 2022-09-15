import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import UserChat from './UserChat';
import AdminChat from './AdminChat';
import SendMessage from './SendMessage';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

export default function NewCommentMobile(props) {
  const [chat, setChat] = useState();
  const userId = JSON.parse(localStorage.getItem('user')).user_id;
  const [selected, setSelected] = useState(null);
  const messageId = props.location.state.data.id;

  function getData() {
    httpService
      .get(`${API_BASE_URL}/api/club/suggestions/${messageId}`)
      .then(res => {
        if (res.status === 200) {
          setChat(res.data);
        }
      });
  }

  useEffect(() => {
    getData();
  }, []);

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
        <InputLabelHeader> {chat?.subject}</InputLabelHeader>
        {chat?.message_list?.length &&
          chat?.message_list.map((item, index) => {
            // setSelected(item);
            return item?.user_info?.user_id === userId ? (
              <UserChat message={item} />
            ) : (
              <AdminChat message={item} />
            );
          })}
      </Box>
      <SendMessage message={props.location.state.data} getData={getData} />
    </Box>
  );
}
