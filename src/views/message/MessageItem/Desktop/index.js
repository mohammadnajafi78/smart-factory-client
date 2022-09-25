import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import LinkIconButton from 'src/components/Desktop/Button/LinkIcon';
import Received from 'src/assets/img/icons/received.svg';
import makeStyles from '@mui/styles/makeStyles';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

export default function ReceivedItemDesktop({ selected, setSelected }) {
  // useEffect(() => {
  //   httpService
  //     .patch(`${API_BASE_URL}/api/message/${selected.id}/`, {
  //       is_read: true
  //     })
  //     .then(res => {
  //       if (res.status === 200) {
  //         setSelected(res.data);
  //       }
  //     });
  // }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0px 20px 0px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
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
              gap: '10px',
              width: '100%'
              // height: '570px'
            }}
          >
            {/* <InputLabelHeader>توضیحات</InputLabelHeader>
            <InputLabel>{selected.gift_data.description}</InputLabel> */}

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '20px 16px 40px',
                gap: '0px',
                background: '#FFFFFF'
              }}
            >
              <img src={selected?.image} width="400px" height="320px" />

              <InputLabelHeader style={{ color: '#00346D' }}>
                {selected?.title}
              </InputLabelHeader>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  flexDirection: 'column'
                }}
              >
                <InputLabel>{selected?.description}</InputLabel>
              </Box>
              {/* <Box
              sx={{
                display: 'flex',
                // justifyContent: 'space-between',
                gap: 2,
                // borderTop: '0.5px solid #D3D2D2',
                padding: '12px 16px'
              }}
            >
              <img src={QR} width="128px" height="128px" />
            </Box> */}
            </Box>
          </Box>

          {selected?.link && (
            <a
              href={selected?.link}
              target={selected.link.includes(API_BASE_URL) ? '_self' : '_blank'}
            >
              <LinkIconButton>
                <div>{selected?.action}</div>
              </LinkIconButton>
            </a>
          )}
        </Box>
      </Box>
    </>
  );
}
