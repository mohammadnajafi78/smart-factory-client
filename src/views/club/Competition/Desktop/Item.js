import React from 'react';
import { Box } from '@mui/material';
import { ChevronLeft } from 'react-feather';
import InputLabel from 'src/components/Desktop/InputLabel';
import { useHistory } from 'react-router-dom';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import MomentFa from 'src/utils/MomentFa';

export default function Item({
  data,
  selected,
  setSelected,
  setNewCompetition,
  setParticipateNewCompetition
}) {
  const history = useHistory();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: '12px 12px 8px',
        gap: '6px',
        background: selected && data.id === selected.id ? '#CCEEF0' : '#FFFFFF',
        boxShadow: '0px 0px 8px rgba(146, 146, 146, 0.25)',
        borderRadius: '8px',
        width: '100%',
        height: '145px'
        // overflow: 'auto'
      }}
      onClick={() => {
        setSelected(data);
        setNewCompetition(false);
        setParticipateNewCompetition(false);
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          padding: '0px',
          gap: '15px',
          // width: 309px;
          height: '85px',
          cursor: 'pointer'
          // borderBottom: '0.5px solid #D3D2D2',
          // marginBottom: '6px'
        }}
      >
        <InputLabelHeader
          style={{ color: '#00346D', fontSize: '16px', fontWeight: 500 }}
        >
          {data && data?.name}
        </InputLabelHeader>
        <InputLabel style={{ color: '#7B7979', fontSize: '14px' }}>
          {data && data?.description}
        </InputLabel>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0px',
          gap: '102px',
          width: '100%',
          marginTop: '6px',
          borderTop: '0.5px solid #D3D2D2',
          paddingTop: '6px'
        }}
      >
        <InputLabel
          style={{ color: '#808286', fontSize: '12px' }}
        >{`پایان: ${data && MomentFa(data.end_date)}`}</InputLabel>
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
          مشاهده
          <ChevronLeft color="#00AAB5" height={'15px'} />
        </Box>
      </Box>
    </Box>
  );
}
