import React, { useState } from 'react';
import { Box } from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import FilterButton from 'src/components/Mobile/Button/Filter';
import ReceivedItem from './Item';
import { useHistory } from 'react-router-dom';
import Scan from 'src/assets/img/icons/scan-qr.svg';

export default function ReceivedMobile() {
  const history = useHistory();
  const [received, setReceived] = useState([
    { name: 'iPhone13', free: true, expireDate: '۲۰ اردیبهشت', score: '۵۰۰۰' },
    { name: 'iPhone13', free: false, expireDate: '۲۰ اردیبهشت', score: '۵۰۰۰' },
    { name: 'iPhone13', free: false, expireDate: '۲۰ اردیبهشت', score: '۵۰۰۰' },
    { name: 'iPhone13', free: true, expireDate: '۲۰ اردیبهشت', score: '۵۰۰۰' },
    { name: 'iPhone13', free: true, expireDate: '۲۰ اردیبهشت', score: '۵۰۰۰' },
    { name: 'iPhone13', free: false, expireDate: '۲۰ اردیبهشت', score: '۵۰۰۰' },
    { name: 'iPhone13', free: true, expireDate: '۲۰ اردیبهشت', score: '۵۰۰۰' },
    { name: 'iPhone13', free: true, expireDate: '۲۰ اردیبهشت', score: '۵۰۰۰' }
  ]);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '14px 15px 6px',
          gap: '10px',
          position: 'sticky',
          top: '40px',
          // width: '385px',
          width: '100%',
          height: '57px',
          backgroundColor: '#E5E5E5',
          zIndex: 100
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
          return <ReceivedItem data={item} key={index} />;
        })}
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: '9%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          height: '73px',
          padding: '10px'
        }}
      >
        <ConfirmButton
          style={{ margin: '0px 10px', backgroundColor: '#00346D' }}
        >
          <img src={Scan} style={{ marginLeft: '3px' }} />
          دریافت جایزه
        </ConfirmButton>
      </Box>
    </div>
  );
}
