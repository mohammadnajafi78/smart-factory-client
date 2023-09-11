import { Box, Button } from '@mui/material';
import React from 'react';
import { ChevronLeft, Star } from 'react-feather';
import { NavLink, useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Mobile/InputLabel';
import useSaleSearch from 'src/hooks/useSaleSearch';
import MomentFa from 'src/utils/MomentFa';
import ContentCopy from 'src/assets/img/content_copy.svg';
import Share from 'src/assets/img/share.svg';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

export default function SendItem({ data }) {
  const { searched } = useSaleSearch();
  const history = useHistory();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '15px',
        gap: '10px',
        width: '100%',
        // height: '114px',
        background: '#FFFFFF',
        boxShadow: '0px 0px 8px rgba(146, 146, 146, 0.25)',
        borderRadius: '8px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '12px',

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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '14px'
              }}
            >
              <InputLabel
                style={{
                  fontWeight: 500,
                  fontSize: '16px',
                  color: '#00346D',
                  lineHeight: '17px'
                }}
              >
                {data?.order_num}
              </InputLabel>
              {/* <InputLabel
                style={{
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#00346D',
                  lineHeight: '17px'
                }}
              >
                {data?.final_price + ' '}
              </InputLabel> */}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginTop: '40px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '3px 3px !important',
                  background: JSON.parse(data?.current_state?.data).back,
                  borderRadius: '4px',
                  color: '#00AAB5',
                  width: '100px',
                  mt: 1
                }}
              >
                <InputLabel
                  style={{
                    color: JSON.parse(data?.current_state?.data).text,
                    fontSize: '12px',
                    textAlign: 'center',
                    padding: 0
                  }}
                >
                  {data?.current_state?.label}
                </InputLabel>
              </Box>
              <InputLabel
                style={{
                  fontWeight: 400,
                  fontSize: '12px',
                  color: '#335D8A',
                  lineHeight: '16px',
                  textAlign: 'left'
                }}
              >
                {MomentFa(data?.create_date)}
                {/* {data.final_price + ' '} */}
              </InputLabel>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'start',
              alignItems: 'center',
              padding: '0px',
              gap: '4px',
              // backgroundColor: '#DDF5F6',
              color: '#335D8A',
              width: '100%',
              // height: '25px',
              padding: '3px 6px',
              borderRadius: '4px'
            }}
          >
            <InputLabel
              style={{
                fontWeight: 400,
                fontSize: '12px',
                color: '#335D8A',
                lineHeight: '16px'
              }}
            >
              {/* {MomentFa(data?.create_date)} */}
              {data.final_price + ' '}
            </InputLabel>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '8px 10px',
          gap: '4px',
          width: '100%',

          background: '#E6EBF0',
          borderRadius: '4px'
        }}
      >
        <Box sx={{ display: 'inline-flex', gap: '6px' }}>
          <Button
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: '6px 10px !important',
              gap: '6px',
              background: '#FFFFFF',
              borderRadius: '4px'
            }}
          >
            <img src={ContentCopy} />
            <InputLabel
              sx={{
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',

                color: ' #00346D'
              }}
            >
              کپی
            </InputLabel>
          </Button>
          <Button
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: '6px 10px !important',
              gap: '6px',
              background: '#FFFFFF',
              borderRadius: '4px'
            }}
          >
            <img src={Share} />
            <InputLabel
              sx={{
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',

                color: ' #00346D'
              }}
            >
              اشتراک گذاری
            </InputLabel>
          </Button>
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            alignItems: 'center'
            // gap: '2px'
          }}
          onClick={() => {
            httpService
      .get(`${API_BASE_URL}/api/orders/get_order/?order_num=${data.order_num}`)
      .then(res => {
        if (res.status === 200) {
          console.log('res.data', res.data);
          history.push({
            pathname: '/sale/send/detail',
            state: {
              data: res.data
            }
          });
        }
      });

            // history.push({
            //   pathname: '/sale/send/detail',
            //   state: data
            // });
          }}
        >
          <InputLabel
            style={{
              fontWeight: 500,
              fontSize: '14px',
              color: '#00346D',
              paddingLeft: '0px'
              // lineHeight: '17px'
            }}
          >
            مشاهده
          </InputLabel>
          <ChevronLeft color="#00346D" height={'20px'} />
        </Box>
      </Box>
    </Box>
  );
}
