import { Box, Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExamList from './ExamList';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useHistory } from 'react-router';
import FilterButton from 'src/components/Mobile/Button/Filter';
import { useSnackbar } from 'notistack';

export default function ExamDesktop() {
  const [exams, setExams] = useState();
  const [filters, setFilters] = useState(null);
  const [filterSelected, setFilterSelected] = useState(1);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    httpService
      .get(
        `${API_BASE_URL}/api/lms/exam/get_exam_list?category_id=${filterSelected}`
      )
      .then(res => {
        if (res.status === 200) {
          setExams(res.data);
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
      .get(`${API_BASE_URL}/api/lms/category/`)
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: '35px',
        padding: '0px 20px',
        marginRight: '140px',
        overflow: 'auto'
      }}
    >
      <Box sx={{ padding: '12px', display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '2px',
            position: 'sticky',
            top: '25px',
            width: '100%',
            backgroundColor: '#E5E5E5',
            zIndex: 100,
            overflow: 'auto',
            padding: '10px'
          }}
        >
          {filters &&
            filters.map((item, index) => {
              return (
                <FilterButton
                  key={index}
                  onClick={() => {
                    setFilterSelected(item.id);
                  }}
                  style={{
                    fontWeight: 300,
                    fontSize: '12px',
                    minWidth: 'auto'
                  }}
                >
                  {item.name}
                </FilterButton>
              );
            })}
        </Box>
        {exams && filters && (
          <ExamList
            exams={exams}
            type={filterSelected}
            typeName={filters.filter(f => f.id === filterSelected)[0].name}
          />
        )}
      </Box>
    </div>
  );
}
