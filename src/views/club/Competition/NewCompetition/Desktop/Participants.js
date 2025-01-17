import React, { useState } from 'react';
import { Box, Rating } from '@mui/material';
import { useHistory } from 'react-router-dom';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabel from 'src/components/Desktop/InputLabel';
import { useSnackbar } from 'notistack';

export default function Item({ data }) {
  const history = useHistory();
  const [selected, setSelected] = useState(data);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 12px',
        gap: '12px',
        background: '#FFFFFF',
        boxShadow: '1px 1px 8px rgba(214, 212, 212, 0.25)',
        borderRadius: '8px',
        width: '90%'
      }}
    >
      <img
        src={selected?.files[0]?.file}
        style={{
          width: '100%',
          height: '222.03px',
          borderRadius: '8px',
          paddingBottom: '6px'
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0px',
          gap: '36px',
          width: '100%'
        }}
      >
        <InputLabel
          style={{ fontSize: '12px' }}
        >{`تعداد شرکت کننده: ${selected.rate_count}`}</InputLabel>

        <Rating
          value={selected?.overall_rate}
          size="small"
          precision={0.1}
          readOnly={selected?.rates?.length > 0 ? true : false}
          onChange={(event, newValue) => {
            httpService
              .post(`${API_BASE_URL}/api/club/match_rate/`, {
                participant_id: selected?.id,
                rate: newValue
              })
              .then(res => {
                if (res.status === 200) {
                  // console.log('ok');
                  setSelected(res.data);
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
          }}
        />
      </Box>
    </Box>
  );
}
