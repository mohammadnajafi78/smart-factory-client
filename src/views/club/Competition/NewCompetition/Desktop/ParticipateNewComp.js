import React, { useState } from 'react';
import { Box, Button, IconButton, Divider } from '@mui/material';
import InputLabelHeader from 'src/components/Desktop/InputLabel';
import InputLabel from 'src/components/Desktop/InputLabel';
import Upload from 'src/assets/img/icons/upload.svg';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import Delete from 'src/assets/img/icons/delete.svg';
import Attach from 'src/assets/img/icons/attach.svg';

export default function ParticipateNewComp({ selected }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '30px',
        gap: '30px'
      }}
    >
      <InputLabelHeader style={{ fontWeight: 700, fontSize: '20px' }}>
        شرکت در مسابقه
      </InputLabelHeader>
      <InputLabel>{selected?.description}</InputLabel>
      <InputLabel>
        جهت شرکت در مسابقه عکس مورد نظر خود را انتخاب کنید:
      </InputLabel>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginBottom: '30px'
        }}
      >
        {!selected.participants[0] ? (
          <Button
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '40px 0px',
              gap: '30px',
              width: '480px',
              height: '150px',
              border: '2px dashed #99DDE1',
              borderRadius: '4px',
              color: '#4F4C4D',
              fontFamily: 'IRANSans',
              fontWeight: 400,
              fontSize: '16px'
            }}
            component="label"
          >
            <img src={Upload} with="33px" height="28px" />
            {'انتخاب فایل'}
            <input type="file" hidden />
          </Button>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: '20px 0px 5px',
              gap: '20px',
              width: '480px',
              height: '320px',
              border: '2px dashed #99DDE1',
              borderRadius: '4px'
            }}
          >
            <img
              src={
                'https://apidev.bts-co.com/media/club/match_files/MATCH2208001/category_1_435.jpeg'
              }
              width="300px"
              height="180px"
              style={{ borderRadius: '8px' }}
            />
            <InputLabel style={{ color: '#335D8A' }}>
              {'photo_5958729518304835816_y.jpg'}
            </InputLabel>
            {/* <img src={selected?.participants[0]?.image} />
            <InputLabel>{selected?.participants[0]?.image}</InputLabel> */}

            {/* <Divider variant="middle" sx={{ margin: '10px 0px' }} /> */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%'
              }}
            >
              <Button
                sx={{
                  fontFamily: 'IRANSans',
                  fontSize: '16px',
                  fontWeight: 400
                }}
              >
                <img src={Delete} width="13px" height="13px" />
                پاک کردن
              </Button>
              <Button
                sx={{
                  fontFamily: 'IRANSans',
                  fontSize: '16px',
                  fontWeight: 400
                }}
              >
                {' '}
                <img src={Attach} width="13px" height="20px" />
                تغییر فایل
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '0%',
          width: '55%',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60px',
          gap: '12px'
        }}
      >
        <ConfirmButton
          disabled={false}
          variant="outlined"
          style={{ width: '150px' }}
          //   onClick={() => setOpen(false)}
        >
          {'لغو'}
        </ConfirmButton>
        <ConfirmButton disabled={false} style={{ width: '150px' }}>
          {'ثبت'}
        </ConfirmButton>
      </Box>
    </Box>
  );
}
