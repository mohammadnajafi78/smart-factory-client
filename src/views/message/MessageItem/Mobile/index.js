import React, { useEffect, useState } from 'react';
import { Box, Drawer } from '@mui/material';
import { ChevronLeft, Star } from 'react-feather';
import InputLabel from 'src/components/Mobile/InputLabel';
import iphone13 from 'src/assets/img/icons/iphone13.jpeg';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import LinkIconButton from 'src/components/Mobile/Button/LinkIcon';
import Received from 'src/assets/img/icons/received.svg';
import makeStyles from '@mui/styles/makeStyles';
import { height } from '@mui/system';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import MomentFa from 'src/utils/MomentFa';

export default function ReceivedItemMobile(props) {
  const [data, setData] = useState(props.location.state.data);

  useEffect(() => {
    httpService
      .patch(`${API_BASE_URL}/api/message/${data.id}/`, {
        is_read: true
      })
      .then(res => {
        if (res.status === 200) {
          setData(res.data);
        }
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px 12px 0px'
          // marginTop: '50px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '16px 0px',
            width: '100%'
            // gap: '480px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              paddingBottom: '10px',
              gap: '16px'
              // height: '470px'
            }}
          >
            <img src={data?.image} width="320px" height="150px" />
            <InputLabelHeader>{data?.title}</InputLabelHeader>
            <InputLabel>{data?.description}</InputLabel>
          </Box>

          {data?.link && (
            <a
              href={data?.link}
              target={data.link.includes(API_BASE_URL) ? '_self' : '_blank'}
            >
              <LinkIconButton
              // onClick={() => {
              //   setOpen(true);
              //   httpService
              //     .get(
              //       `${API_BASE_URL}/api/club/user_gifts/get_gift_qrcode/?gift_id=${data.id}`
              //     )
              //     .then(res => {
              //       if (res.status === 200) {
              //         setQr(res.data.qr_code);
              //       }
              //     });
              // }}
              // style={{
              //   position: 'absolute',
              //   bottom: '10px',
              //   width: '93%'
              // }}
              >
                <div>{data?.action}</div>
              </LinkIconButton>
            </a>
          )}
        </Box>
      </Box>
    </>
  );
}
