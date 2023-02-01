import { Box } from '@mui/material';
import React from 'react';
import { ChevronLeft, Star } from 'react-feather';
import { NavLink, useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Mobile/InputLabel';
import useSaleSearch from 'src/hooks/useSaleSearch';
import MomentFa from 'src/utils/MomentFa';

export default function ProductItem({ data }) {
  const { searched } = useSaleSearch();
  const history = useHistory();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
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
            src={data?.images[0]?.url}
            // alt={}
            style={{ width: '44px', height: '60px' }}
          />
        </Box>
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
              justifyContent: 'start',
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
                lineHeight: '17px'
              }}
            >
              {data?.name_translate?.item_fa}
            </InputLabel>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'start',
              alignItems: 'center',
              padding: '0px',
              gap: '4px',
              backgroundColor: '#DDF5F6',
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
              {data?.category_detail?.translate_detail?.item_fa}
            </InputLabel>
            <ChevronLeft color="#33BBC4" height={'15px'} />
            <InputLabel
              style={{
                fontWeight: 400,
                fontSize: '12px',
                color: '#335D8A',
                lineHeight: '16px'
              }}
            >
              {data?.subcategory_detail?.translate_detail?.item_fa}
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
          height: '36px',
          width: '100%',

          background: '#E6EBF0',
          borderRadius: '4px'
        }}
      >
        {searched ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '3px 6px !important',
              background: 'white',
              borderRadius: '4px'
              // color: '#00AAB5'
            }}
          >
            <InputLabel style={{ color: '#00346D' }}>{'کد'}</InputLabel>
            <InputLabel style={{ color: '#00346D' }}>{data?.code}</InputLabel>
          </Box>
        ) : (
          <InputLabel
            style={{
              fontWeight: 400,
              fontSize: '14px',
              color: '#00346D',
              lineHeight: '17px'
            }}
          >
            {`${data?.count} اندازه`}
          </InputLabel>
        )}
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
          onClick={() => {
            history.push({
              pathname: '/sale/products/detail',
              state: data
            });
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
            انتخاب
          </InputLabel>
          <ChevronLeft color="#00346D" height={'20px'} />
        </Box>
      </Box>
    </Box>
  );
}
