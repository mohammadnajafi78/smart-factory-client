import { Box, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Desktop/InputLabel';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import Swiper from '../Swiper';

export default function HomeDesktop() {
  const history = useHistory();
  const [programs, setPrograms] = useState([]);
  const [data, setData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  // { name: 'club', path: '/club/awards', text: 'کلاب' },
  // { name: 'management', path: '/management/user/allUsers', text: 'مدیریت' }

  useEffect(() => {
    httpService
      .get(
        `${API_BASE_URL}/api/management/util/menu_items/?menu_app=Application`
      )
      .then(res => {
        if (res.status === 200) {
          console.log('program', res.data);
          setPrograms(res.data);
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

    httpService
      .get(`${API_BASE_URL}/api/website/slider/get_list/`)
      .then(res => {
        if (res.status === 200) {
          console.log('images', res.data);
          setData(res.data);
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: '40px 80px',
        gap: '30px',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: '130px',
        width: '100%',
        marginTop: '60px'
      }}
    >
      {data.length > 0 && <Swiper data={data} />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%'
        }}
      >
        <InputLabel
          style={{ color: '#00346D', fontSize: '16px', fontWeight: 800 }}
        >
          برنامه ها
        </InputLabel>
        {/* <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}> */}
        <Grid container spacing={2}>
          {programs.map((item, key) => {
            return (
              <Grid item md={3}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 30px',
                    gap: '10px',
                    width: '100%',
                    height: '120px',
                    background: '#E6EBF0',
                    boxShadow: '2px 2px 8px rgba(146, 146, 146, 0.25)',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                  key={item?.id}
                  onClick={() => {
                    history.push(
                      item?.path['fa'] === '/sale/'
                        ? item?.path['fa'] + 'products'
                        : item?.path['fa']
                    );
                  }}
                >
                  <InputLabel
                    style={{
                      color: '#00346D',
                      fontSize: '14px',
                      fontWeight: 700
                    }}
                  >
                    {item.title['fa']}
                  </InputLabel>
                  <img src={item?.image1} alt="image" />
                </Box>
              </Grid>
            );
          })}
        </Grid>
        {/* </Box> */}
      </Box>
    </Box>
  );
}
