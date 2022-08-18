import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import FilterButton from 'src/components/Desktop/Button/Filter';
import AwardItem from './AwardItem';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { resolveConfig } from 'prettier';

export default function AwardsList({ selected, setSelected }) {
  const [awards, setAwards] = useState(null);
  const [all, setAll] = useState(null);
  const [filters, setFilters] = useState(null);
  const [filterSelected, setFilterSelected] = useState('All');

  useEffect(() => {
    httpService.get(`${API_BASE_URL}/api/club/gift_type/`).then(res => {
      if (res.status === 200) {
        setFilters(res.data);
      }
    });

    httpService.get(`${API_BASE_URL}/api/club/gifts/get_all/`).then(res => {
      if (res.status === 200) {
        setAwards(res.data);
        setAll(res.data);
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
          zIndex: 100
        }}
      >
        {filters &&
          filters.map((item, index) => {
            return (
              <FilterButton
                key={index}
                onClick={() => {
                  if (awards && awards.length > 0) {
                    setFilterSelected(item.name);
                    if (item.name === 'All') setAwards(all);
                    else if (item.name !== 'Lottery' && item.name !== 'All')
                      setAwards(all.filter(f => f.gift_type === item.id));
                    else setAwards(all.filter(f => !f.gift_type));
                  }
                }}
                style={{
                  backgroundColor:
                    filterSelected === item.name && 'rgba(0, 170, 181, 0.04)'
                }}
              >
                {item.translate}
              </FilterButton>
            );
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
