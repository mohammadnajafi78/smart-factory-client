import React from 'react';
import { Box, Divider, Grid } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import Call from 'src/assets/img/icons/call.svg';
import PDF from 'src/assets/img/icons/pdf.svg';
import FileDownload from 'src/assets/img/icons/fileDownload.svg';

export default function Admin({ file }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        // padding: '0px 10px 0px 10px',
        gap: '10px',
        width: '100%',
        justifyContent: 'flex-end'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
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

            background: '#FFFFFF',
            boxShadow: '0px 0px 8px rgba(146, 146, 146, 0.25)',
            borderRadius: '20px 0px 20px 20px',
            width: '100%'
          }}
        >
          {!file ? (
            <InputLabel
              style={{
                fontWeight: 400,
                fontSize: '14px',
                textAlign: 'right',
                color: '#4F4C4D'
              }}
            >
              من مشکلی با بخش جوایز دارم. بعد از خرید هدیه غیر تبلیغاتی با
              امتیاز، دو روز طول می‌کشه تا به بخش دریافتی‌هام اضافه بشه
            </InputLabel>
          ) : (
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
                    color: '#4F4C4D',
                    width: '130px'
                  }}
                >
                  سایت_و_اپلیکیشن_های_گروه_صنایع_BTS_v1_7.pdf
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
                </Box>
              </Box>
              <Divider sx={{ my: 2, color: '#D3D2D2' }} />
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
                <InputLabel style={{ color: '#4F4C4D' }}>43 صفحه</InputLabel>
                <InputLabel style={{ color: '#4F4C4D' }}>280kb</InputLabel>
              </Box>
            </Box>
          )}
        </Box>
        <InputLabel
          style={{
            fontWeight: 400,
            fontSize: '10px',
            textAlign: 'right',
            color: '#A7A5A6'
          }}
        >
          5 دقیقه پیش
        </InputLabel>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '10px 9.5px',
          gap: '10px',
          background: '#CCD6E2',
          borderRadius: '20px'
        }}
      >
        <img src={Call} />
      </Box>
    </Box>
  );
}
