import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import FilterButton from 'src/components/Mobile/Button/Filter';
import AwardItem from './AwardItem';

export default function AwardsList({ selected, setSelected }) {
  const [awards, setAwards] = useState([
    { id: 1, name: 'iPhone13', score: '۵۰۰۰', expireDate: '۲۰ اردیبهشت' },
    { id: 2, name: 'iPhone13', score: '۵۰۰۰', expireDate: '۲۰ اردیبهشت' },
    { id: 3, name: 'iPhone13', score: '۵۰۰۰', expireDate: '۲۰ اردیبهشت' },
    { id: 4, name: 'iPhone13', score: '۵۰۰۰', expireDate: '۲۰ اردیبهشت' },
    { id: 5, name: 'iPhone13', score: '۵۰۰۰', expireDate: '۲۰ اردیبهشت' },
    { id: 6, name: 'iPhone13', score: '۵۰۰۰', expireDate: '۲۰ اردیبهشت' },
    { id: 7, name: 'iPhone13', score: '۵۰۰۰', expireDate: '۲۰ اردیبهشت' }
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
          padding: '12px 0px 12px',
          gap: '14px',
          overflowY: 'auto'
        }}
      >
        {awards.map((item, index) => {
          return (
            <AwardItem
              data={item}
              key={index}
              selected={selected}
              setSelected={setSelected}
            />
          );
        })}
      </Box>
    </div>
  );
}
