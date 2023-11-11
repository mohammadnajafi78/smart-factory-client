import { Box, Divider } from '@mui/material';
import React from 'react';
import { ChevronLeft } from 'react-feather';
import InputLabel from 'src/components/Desktop/InputLabel';
import { useHistory } from 'react-router-dom';
import MomentFa from 'src/utils/MomentFa';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useSnackbar } from 'notistack';

export default function Item({
  data,
  selected,
  setSelected,
  refresh,
  setRefresh
}) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '12px',
        gap: '15px',
        width: '100%',
        height: '114px',
        background: selected && data.id === selected.id ? '#CCEEF0' : '#FFFFFF',
        boxShadow: '0px 0px 8px rgba(146, 146, 146, 0.25)',
        borderRadius: '8px',
        cursor: 'pointer'
      }}
      onClick={() => {
        if (data?.is_read === false)
          httpService
            .patch(`${API_BASE_URL}/api/message/${data.id}/`, {
              is_read: true
            })
            .then(res => {
              if (res.status === 200) {
                setSelected(res.data);
                setRefresh(!refresh);
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
        else setSelected(data);
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px 15px',
          gap: '10px',

          width: '75px',
          height: '84px',

          background: '#F4F4F4',
          borderRadius: '8px'
        }}
      >
        <img
          src={data?.icon}
          alt={data?.title}
          style={{ width: '44px', height: '60px' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '0px',
          // gap: '22px',

          width: '100%',
          height: '100%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px',
            gap: '8px',

            width: '100%',
            height: '25px'
          }}
        >
          <InputLabel
            style={{ fontWeight: 500, fontSize: '16px', color: '#00346D' }}
          >
            {data?.title}
          </InputLabel>
          {data.is_read === true ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3px 6px !important',
                //   gap: '2px',
                // width: 54.1px,
                // height: '22px',
                background: '#CCEEF0',
                borderRadius: '4px',
                color: '#00AAB5'
              }}
            >
              <InputLabel style={{ color: '#00AAB5', paddingLeft: 0 }}>
                خوانده شده
              </InputLabel>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3px 6px !important',
                //   gap: '2px',
                // width: 54.1px,
                // height: '22px',
                background: '#FDE8E8',
                borderRadius: '4px',
                color: '#F4777C !important'
              }}
            >
              <InputLabel style={{ color: '#F4777C', paddingLeft: 0 }}>
                خوانده نشده
              </InputLabel>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '100%'
          }}
        >
          <Divider
            variant="middle"
            sx={{ margin: '2px', width: '94%', color: '#D3D2D2' }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0px',
              // gap: '8px',

              width: '100%'
              // height: '25px'
            }}
          >
            <InputLabel
              style={{ fontWeight: 400, fontSize: '12px', color: '#808286' }}
            >
              {`ارسال: ${MomentFa(data.create_date)}`}
            </InputLabel>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#00AAB5',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 400,
                cursor: 'pointer'
              }}
            >
              {/* <NavLink
              style={{
                color: '#7B7979',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 400
              }}
              to={'https://google.com'}
            > */}
              مشاهده
              {/* </NavLink> */}
              <ChevronLeft color="#00AAB5" height={'15px'} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
