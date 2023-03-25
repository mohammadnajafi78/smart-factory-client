import { Box } from '@mui/material';
import React from 'react';
import { ChevronLeft, Star } from 'react-feather';
import InputLabel from 'src/components/Desktop/InputLabel';
import MomentFa from 'src/utils/MomentFa';
import Boshen from 'src/assets/img/boshen.png';
import InputLabelHeader from 'src/components/Desktop/InputLabel';
import useSaleSearch from 'src/hooks/useSaleSearch';
import { useHistory } from 'react-router-dom';

export default function ProductItem({ data }) {
  const { searched } = useSaleSearch();
  const history = useHistory();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '20px 12px 12px',
        gap: '10px',

        height: '280px',
        background: '#FFFFFF',
        boxShadow: '0px 0px 8px rgba(146, 146, 146, 0.25)',
        borderRadius: '9px'
      }}
    >
      <img src={data?.images[0]?.url} width="130px" height="130px" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '100%',
          gap: '8px'
        }}
      >
        <InputLabelHeader
          style={{ color: '#00346D', fontWeight: 700, fontSize: '14px' }}
        >
          {data?.name_translate?.item_fa}
        </InputLabelHeader>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'center',
            backgroundColor: '#DDF5F6',
            color: '#335D8A',
            padding: '3px 6px',
            borderRadius: '4px',
            minHeight: '36px'
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '8px 10px',
            gap: '4px',
            height: '34px',
            width: '100%',
            margin: '6px 0px',

            background: '#E6EBF0',
            borderRadius: '4px'
          }}
        >
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
          <Box
            sx={{
              display: 'inline-flex',
              flexDirection: 'row',
              alignItems: 'center',
              cursor: 'pointer'
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
                paddingLeft: '0px',
                cursor: 'pointer'
              }}
            >
              انتخاب
            </InputLabel>
            <ChevronLeft color="#00346D" height={'20px'} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
