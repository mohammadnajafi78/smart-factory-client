import React, { useState } from 'react';
import { Box, Rating } from '@mui/material';
import { useHistory } from 'react-router-dom';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

export default function Item({ data }) {
  const [selected, setSelected] = useState(data);
  const history = useHistory();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '16px 0px',
        gap: '12px',
        background: '#FFFFFF',
        boxShadow: '1px 1px 8px rgba(214, 212, 212, 0.25)',
        borderRadius: '8px',
        width: '100%'
      }}
      // onClick={() =>
      //   history.push({
      //     pathname: '/club/receivedItem',
      //     state: data
      //   })
      // }
    >
      <img
        src={selected?.files[0]?.file}
        style={{
          width: '100%',
          height: '222.03px',
          borderRadius: '8px',
          padding: '4px',
          paddingBottom: '6px'
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '5px',
          gap: '36px',
          width: '100%'
        }}
      >
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
                  setSelected(res.data);
                }
              });
          }}
        />
      </Box>
    </Box>
  );
}
