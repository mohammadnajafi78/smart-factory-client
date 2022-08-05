import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import FilterButton from 'src/components/Desktop/Button/Filter';
import AwardItem from './AwardItem';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { resolveConfig } from 'prettier';

export default function AwardsList({ selected, setSelected }) {
  const [awards, setAwards] = useState(null);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    httpService.get(`${API_BASE_URL}/api/club/lottery/`).then(res => {
      if (res.status === 200) {
        setFilters(res.data);
        console.log('filter', res.data);
      }
    });

    httpService.get(`${API_BASE_URL}/api/club/gifts/`).then(res => {
      if (res.status === 200) {
        console.log('awards', awards);
        setAwards(res.data);
      }
    });
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '14px 15px 6px',
          gap: '10px',
          width: '100%',
          height: '57px',
          // padding: '0px 30px',
          // backgroundColor: '#E5E5E5',
          zIndex: 100
        }}
      >
        {filters &&
          filters.map((item, index) => {
            return <FilterButton key={index}>{item.name}</FilterButton>;
          })}
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
        {awards &&
          awards.map((item, index) => {
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
