import React, { useState, useEffect, useRef } from 'react';
import { Box, Divider } from '@mui/material';
import { useHistory } from 'react-router-dom';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import Participants from './Participants';
import LinkIconButton from 'src/components/Mobile/Button/LinkIcon';
import Present from 'src/assets/img/icons/present.svg';
import iphone13 from 'src/assets/img/icons/iphone13.jpeg';

export default function CompetitionDetailsMobile(props) {
  const [awards, setAwards] = useState(props.location.state);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px 10px 0px'
      }}
    >
      {/* <Box
        sx={{
          width: '100%',
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
          padding: '16px 0px 0px',
          gap: '30px',
          borderBottom: '0.5px solid #D3D2D2',
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
          <InputLabel>{awards && awards.description}</InputLabel>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '16px'
          }}
        >
          <InputLabelHeader>جوایز مسابقه</InputLabelHeader>
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
          {awards &&
            awards.prizes.map((item, key) => {
              return (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 16px',
                      gap: '10px',
                      width: '65px',
                      height: '84px',
                      background: '#FFFFFF',
                      borderRadius: '8px'
                    }}
                  >
                    <img src={item?.image} width="44.26px" height="50px" />
                  </Box>
                  <Divider
                    sx={{ m: 1 }}
                    color="#66CCD3"
                    style={{ width: '90%' }}
                  />

                  <InputLabel style={{ color: '#4F4C4D' }}>
                    {item?.name}
                  </InputLabel>
                </>
              );
            })}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '12px 0px',
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
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2px',
            gap: '16px',
            width: '100%'
          }}
        >
          <Participants data={awards.participants[0]} />
        </Box>
      </Box>
    </Box>
  );
}
