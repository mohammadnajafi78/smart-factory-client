import React from 'react';
import { Box, Divider, Grid } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import ChatUser from 'src/assets/img/icons/chatUser.svg';
import PDF from 'src/assets/img/icons/pdf.svg';
import FileDownload from 'src/assets/img/icons/fileDownload.svg';
import MomentTimeFa from 'src/utils/MomentTimeFa';

export default function UserChat({ message }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '10px',
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '10px',
          background: '#CCD6E2',
          borderRadius: '20px'
        }}
      >
        <img
          src={message?.user_info?.user_profile_image}
          style={{ width: '40px', height: '40px', borderRadius: '30px' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '0px',
          gap: '4px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: '12px',
            gap: '10px',

            // width: 480px;
            // height: 68px;
            background: '#00AAB5',
            boxShadow: '0px 4px 8px rgba(146, 146, 146, 0.25)',
            borderRadius: '0px 20px 20px 20px'
          }}
        >
          <Box
            sx={{
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '22px',
              textAlign: 'right',
              color: '#FFFFFF'
            }}
          >
            {message?.message.length > 0 && (
              <InputLabel
                style={{
                  fontWeight: 400,
                  fontSize: '14px',
                  textAlign: 'right',
                  color: 'white'
                }}
              >
                {message.message}
              </InputLabel>
            )}
            {message?.files_list.length > 0 && (
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: '0px',
                    gap: '12px'
                  }}
                >
                  <img src={PDF} width={'31px'} height={'36px'} />
                  <InputLabel
                    style={{
                      color: 'white',
                      width: '130px'
                    }}
                  >
                    {message?.files_list[0]?.file_name}
                  </InputLabel>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px',
                      gap: '10px',
                      width: '36px',
                      height: '36px',
                      background: '#E3E3E3',
                      borderRadius: '8px'
                    }}
                  >
                    <a
                      href={message?.files_list[0]?.file}
                      download
                      // target={'_self'}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '4px',
                          gap: '10px',
                          width: '24px',
                          height: '24px',
                          background: '#E3E3E3',
                          border: '0.5px solid #A7A5A6',
                          borderRadius: '12px'
                        }}
                      >
                        <img src={FileDownload} />
                      </Box>
                    </a>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} color="white" />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0px',
                    gap: '10px'
                  }}
                >
                  {/* <InputLabel style={{ color: 'white' }}>43 صفحه</InputLabel> */}
                  <InputLabel style={{ color: 'white', direction: 'ltr' }}>
                    {`${Math.round(
                      message?.files_list[0]?.file_size / 1024
                    )} KB`}
                  </InputLabel>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px 4px 10px 0px',
            gap: '10px'
          }}
        >
          <InputLabel
            style={{
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '16px',
              textAlign: 'right',
              color: '#A7A5A6',
              direction: 'ltr'
            }}
          >
            {MomentTimeFa(message?.create_date)}
          </InputLabel>
        </Box>
      </Box>
    </Box>
  );
}
