import React, { useState } from 'react';
import { Box } from '@mui/material';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import FilterButton from 'src/components/Desktop/Button/Filter';
import ReceivedItem from './Item';
import { useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Desktop/InputLabel';
import Scan from 'src/assets/img/icons/scan-qr.svg';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';

export default function ReceivedListDesktop({ selected, setSelected }) {
  const history = useHistory();
  const [received, setReceived] = useState([
    {
      id: 1,
      name: 'iPhone13',
      free: true,
      expireDate: '۲۰ اردیبهشت',
      score: '۵۰۰۰'
    },
    {
      id: 2,
      name: 'iPhone13',
      free: false,
      expireDate: '۲۰ اردیبهشت',
      score: '۵۰۰۰'
    },
    {
      id: 3,
      name: 'iPhone13',
      free: false,
      expireDate: '۲۰ اردیبهشت',
      score: '۵۰۰۰'
    },
    {
      id: 4,
      name: 'iPhone13',
      free: true,
      expireDate: '۲۰ اردیبهشت',
      score: '۵۰۰۰'
    },
    {
      id: 5,
      name: 'iPhone13',
      free: true,
      expireDate: '۲۰ اردیبهشت',
      score: '۵۰۰۰'
    },
    {
      id: 6,
      name: 'iPhone13',
      free: false,
      expireDate: '۲۰ اردیبهشت',
      score: '۵۰۰۰'
    },
    {
      id: 7,
      name: 'iPhone13',
      free: true,
      expireDate: '۲۰ اردیبهشت',
      score: '۵۰۰۰'
    },
    {
      id: 8,
      name: 'iPhone13',
      free: true,
      expireDate: '۲۰ اردیبهشت',
      score: '۵۰۰۰'
    }
  ]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          padding: '12px 12px 0px',
          gap: '20px',
          width: '100%',
          padding: '40px 30px 0px',
          paddingBottom: '40px'
        }}
      >
        <InputLabelHeader style={{ color: '#00346D' }}>
          جوایز دریافتی
        </InputLabelHeader>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            height: '57px'
            // padding: '0px 30px'
          }}
        >
          <FilterButton>همه</FilterButton>
          <FilterButton>جوایز</FilterButton>
          <FilterButton>قرعه کشی</FilterButton>
          <FilterButton>هدایا تبلیغاتی</FilterButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px 0px 60px',
            gap: '14px',
            // height: '1000px',
            overflowY: 'auto'
          }}
        >
          {received.map((item, index) => {
            return (
              <ReceivedItem
                data={item}
                key={index}
                selected={selected}
                setSelected={setSelected}
              />
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '0%',
          width: '40%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          height: '79px',
          // padding: '10px',
          gap: '10px',
          padding: '0px 30px 0px'
        }}
      >
        <ConfirmButton
          style={{
            margin: '0px 10px',
            backgroundColor: '#00346D',
            width: '70%'
          }}
        >
          <img src={Scan} style={{ marginLeft: '3px' }} />
          دریافت جایزه
        </ConfirmButton>
      </Box>
    </>
  );
}
