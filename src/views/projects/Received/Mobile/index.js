import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReceivedList from './ReceivedList';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useHistory } from 'react-router';
import FilterButton from 'src/components/Mobile/Button/Filter';
import { useSnackbar } from 'notistack';

export default function ReceivedMobile() {
  const [received, setReceived] = useState();
  const [filters, setFilters] = useState(null);
  const [filterSelected, setFilterSelected] = useState('DESIGN');
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    httpService
      .get(
        `${API_BASE_URL}/api/project/get_sent_request/?type=${filterSelected}`
      )
      .then(res => {
        if (res.status === 200) {
          setReceived(res.data);
        }
      })
      .catch(ex => {
        if (ex.response.status === 417) {
          enqueueSnackbar(ex.response.data.error, { variant: 'error' });
        } else {
          enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
            variant: 'error'
          });
        }
      });
  }, [filterSelected]);

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/project/get_project_actions`)
      .then(res => {
        if (res.status === 200) {
          setFilters(res.data);
        }
      })
      .catch(ex => {
        if (ex.response.status === 417) {
          enqueueSnackbar(ex.response.data.error, { variant: 'error' });
        } else {
          enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
            variant: 'error'
          });
        }
      });
  }, []);

  return (
    <Box sx={{ padding: '12px', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '2px',
          position: 'sticky',
          top: '55px',
          width: '100%',
          height: '57px',
          backgroundColor: '#E5E5E5',
          zIndex: 100,
          overflow: 'auto',
          minHeight: '70px'
        }}
      >
        {filters &&
          filters.map((item, index) => {
            return (
              <FilterButton
                key={index}
                onClick={() => {
                  setFilterSelected(item.name);
                }}
                style={{ fontWeight: 300, fontSize: '12px', minWidth: 'auto' }}
              >
                {item.label}
              </FilterButton>
            );
          })}
      </Box>
      {received && filters && (
        <ReceivedList
          received={received}
          type={filterSelected.toLowerCase()}
          typeName={filters.filter(f => f.name === filterSelected)[0].label}
        />
      )}
    </Box>
  );
}
