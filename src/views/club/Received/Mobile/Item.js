import { Box } from '@mui/material';
import React from 'react';
import { ChevronLeft, Star } from 'react-feather';
// import { NavLink } from 'react-router-dom';
import InputLabel from 'src/components/Mobile/InputLabel';
import iphone13 from 'src/assets/img/icons/iphone13.jpeg';
import { useHistory } from 'react-router-dom';
import MomentFa from 'src/utils/MomentFa';

export default function Item({ data }) {
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
      onClick={() =>
        history.push({
          pathname: '/club/receivedItem',
          state: data
        })
      }
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
          src={data.gift_data.image}
          alt={data.gift_data.name}
          style={{ width: '44px', height: '60px' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0px',
          gap: '22px',

          width: '100%',
          height: '70px'
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
            style={{
              fontWeight: 500,
              fontSize: '16px',
              color: '#00346D',
              lineHeight: '17px',
              width: '46%'
            }}
          >
            {data.gift_data.name}
          </InputLabel>
          {data.status === 'valid' ? (
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
              <InputLabel style={{ color: '#00AAB5', paddingLeft: 0 }}>
                موجود
              </InputLabel>
            </Box>
          ) : (
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
                background: '#FDE8E8',
                borderRadius: '4px',
                color: '#F4777C !important'
              }}
            >
              <InputLabel style={{ color: '#F4777C', paddingLeft: 0 }}>
                {data.status === 'used' ? 'استفاده شده' : 'منقضی شده'}
              </InputLabel>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '100%'
          }}
        >
          <InputLabel
            style={{ fontWeight: 400, fontSize: '12px', color: '#808286' }}
          >
            {`اعتبار تا: ${MomentFa(data.expire_date)}`}
          </InputLabel>
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
              style={{
                fontWeight: 400,
                fontSize: '10px',
                color: '#828282',
                lineHeight: '12px'
              }}
            >
              {`تاریخ کسب: ${MomentFa(data.create_date)}`}
            </InputLabel>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#00AAB5',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 400,
                cursor: 'pointer',
                marginBottom: '30px'
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
              <ChevronLeft color="#00AAB5" height={'15px'} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
