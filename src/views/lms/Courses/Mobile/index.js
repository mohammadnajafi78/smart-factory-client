import { Box, Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CourseList from './CourseList';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useHistory } from 'react-router';
import FilterButton from 'src/components/Mobile/Button/Filter';

export default function CoursesMobile() {
  const [courses, setCourses] = useState();
  const [filters, setFilters] = useState(null);
  const [filterSelected, setFilterSelected] = useState(1);
  const history = useHistory();

  useEffect(() => {
    httpService
      .get(
        `${API_BASE_URL}/api/lms/course/get_course_list?category_id=${filterSelected}`
      )
      .then(res => {
        if (res.status === 200) {
          setCourses(res.data);
        }
      });
  }, [filterSelected]);

  useEffect(() => {
    httpService.get(`${API_BASE_URL}/api/lms/category/`).then(res => {
      if (res.status === 200) {
        setFilters(res.data);
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
          backgroundColor: '#E5E5E5',
          zIndex: 100,
          overflow: 'auto'
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
                style={{ fontWeight: 300, fontSize: '12px', minWidth: 'auto' }}
              >
                {item.name}
              </FilterButton>
            );
          })}
      </Box>
      {courses && filters && (
        <CourseList
          courses={courses}
          type={filterSelected}
          typeName={filters.filter(f => f.id === filterSelected)[0].name}
        />
      )}
    </Box>
  );
}
