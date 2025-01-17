import React, { useState } from 'react';
import { Box } from '@mui/material';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import Participants from './Participants';

export default function CompetitionDetailsDesktop({ selected }) {
  const userId = JSON.parse(localStorage.getItem('user')).user_id;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0px 50px'
      }}
    >
      {/* <Box
        sx={{
          width: '95%',
          height: '140px',
          background:
            'linear-gradient(91.93deg, #5FD5DD -10%, #00AAB5 109.19%)',
          opacity: 0.7,
          filter: 'drop-shadow(1px 1px 8px rgba(82, 82, 82, 0.25))',
          borderRadius: '10px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '11.92px',
            padding: '12px'
          }}
        >
          <InputLabelHeader style={{ color: '#00346D' }}>
            مسابقه جدید
          </InputLabelHeader>
          <InputLabel style={{ color: '#00346D' }}>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
          </InputLabel>
        </Box>
      </Box> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '16px 16px 0px',
          gap: '30px',
          // borderBottom: '0.5px solid #D3D2D2',
          width: '100%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '16px'
          }}
        >
          <InputLabelHeader>توضیحات</InputLabelHeader>
          <InputLabel>{selected?.description}</InputLabel>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '10px',
            gap: '10px',
            background: '#CCEEF0',
            borderRadius: '8px',
            width: '100%'
          }}
        >
          <InputLabelHeader>جوایز مسابقه</InputLabelHeader>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              width: '100%'
            }}
          >
            <div>
              {selected.prizes.map((item, key) => {
                return (
                  <InputLabel style={{ color: '#4F4C4D' }}>
                    {item?.name}
                  </InputLabel>
                );
              })}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }}
            >
              {selected.prizes.map((item, key) => {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 16px',
                      gap: '10px',
                      width: '73px',
                      height: '84px',
                      background: '#FFFFFF',
                      borderRadius: '8px'
                    }}
                  >
                    <img src={item?.image} width="44.26px" height="50px" />
                  </Box>
                );
              })}
            </div>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '12px',
          width: '100%',
          gap: '10px',
          marginTop: '6px'
        }}
      >
        <InputLabelHeader style={{ marginBottom: '6px' }}>
          تصویر شما
        </InputLabelHeader>
        <Box
          sx={{
            display: 'flex',
            padding: '0px',
            gap: '16px',
            width: '100%',
            // gridTemplateColumns: 'repeat(2, 1fr)'
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Participants
            data={
              selected?.participants.filter(f => f.user.user_id === userId)[0]
            }
          />
        </Box>
      </Box>
    </Box>
  );
}
