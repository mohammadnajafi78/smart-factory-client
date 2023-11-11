import React, { useState } from 'react';
import { Box, Divider, Grid } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import AdminChat from './AdminChat';
import UserChat from './UserChat';
import SendMessage from './SendMessage';
import MomentFa from 'src/utils/MomentFa';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useSnackbar } from 'notistack';

export default function Details(props) {
  const [data, setData] = useState(props.location.state.data[0]);
  const userId = JSON.parse(localStorage.getItem('user')).user_id;
  const { enqueueSnackbar } = useSnackbar();

  function getData() {
    httpService
      .get(`${API_BASE_URL}/api/club/suggestions/${data.id}`)
      .then(res => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch(ex => {
        if (ex.response.status === 417) {
          enqueueSnackbar(ex.response.data.error, { variant: 'error' });
        } else {
          enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
            variant: 'error'
          });
        }
      });
  }

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
          {data?.subject}
        </InputLabelHeader>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div style={{ display: 'inline-flex' }}>
              <InputLabel style={{ color: '#00AAB5' }}>موضوع:</InputLabel>
              <InputLabel style={{ color: '#335D8A' }}>
                {data?.topic_detail?.name}
              </InputLabel>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{ display: 'inline-flex' }}>
              <InputLabel style={{ color: '#00AAB5' }}>
                زمان ثبت نام:
              </InputLabel>
              <InputLabel style={{ color: '#335D8A' }}>
                {MomentFa(data?.create_date)}
              </InputLabel>
            </div>
          </Grid>
        </Grid>
        <Divider variant="middle" sx={{ margin: '20px 0px', width: '98%' }} />

        {/* <AdminChat />
        <UserChat />
        <UserChat file={true} />
        <AdminChat file={true} /> */}

        <Box
          sx={{
            height: '75vh',
            width: '100%',
            overflow: 'auto',
            paddingRight: '30px',
            paddingBottom: '25px'
          }}
        >
          {data?.message_list?.length > 0 &&
            data.message_list.map((item, index) => {
              return item?.user_info?.user_id === userId ? (
                <AdminChat message={item} />
              ) : (
                <UserChat message={item} />
              );
            })}
        </Box>

        <SendMessage message={data} getData={getData} />
      </Box>
    </Box>
  );
}
