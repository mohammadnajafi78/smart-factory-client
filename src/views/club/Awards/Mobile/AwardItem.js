import { Box } from '@mui/material';
import React from 'react';
import { ChevronLeft, Star } from 'react-feather';
import { NavLink, useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Mobile/InputLabel';
import iphone13 from 'src/assets/img/icons/iphone13.jpeg';

export default function AwardItem({ data }) {
  const history = useHistory();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '12px',
        gap: '15px',
        width: '93%',
        height: '114px',
        background: '#FFFFFF',
        boxShadow: '0px 0px 8px rgba(146, 146, 146, 0.25)',
        borderRadius: '8px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px 15px',
          gap: '10px',

          width: '75px',
          height: '84px',

          background: '#F4F4F4',
          borderRadius: '8px'
        }}
      >
        <img
          // src={data.image}
          src={iphone13}
          alt={data.name}
          style={{ width: '44px', height: '60px' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0px',
          gap: '38px',

          width: '100%',
          height: '90px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px',
            gap: '8px',

            width: '100%',
            height: '25px'
          }}
        >
          <InputLabel
            style={{ fontWeight: 500, fontSize: '16px', color: '#00346D' }}
          >
            {data.name}
          </InputLabel>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px 6px !important',
              //   gap: '2px',
              // width: 54.1px,
              height: '22px',
              background: '#CCEEF0',
              borderRadius: '4px',
              color: '#00AAB5'
            }}
          >
            <InputLabel style={{ color: '#00AAB5' }}>
              {data.gift_grade}
            </InputLabel>
            <Star style={{ width: '27px', height: '18px' }} />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px',
            gap: '8px',

            width: '100%',
            height: '25px'
          }}
        >
          <InputLabel
            style={{ fontWeight: 400, fontSize: '12px', color: '#808286' }}
          >
            {data.expire_date}
          </InputLabel>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#7B7979',
              textDecoration: 'none',
              fontSize: '12px',
              fontWeight: 400,
              cursor: 'pointer'
            }}
            onClick={() => {
              history.push({
                pathname: '/club/getAwards',
                state: {
                  data
                }
              });
            }}
          >
            {/* <NavLink
              style={{
                color: '#7B7979',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 400
              }}
              to={'https://google.com'}
            > */}
            مشاهده
            {/* </NavLink> */}
            <ChevronLeft color="#7B7979" height={'15px'} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
