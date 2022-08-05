import { Box } from '@mui/material';
import React from 'react';
import { ChevronLeft, Star } from 'react-feather';
// import { NavLink } from 'react-router-dom';
import InputLabel from 'src/components/Mobile/InputLabel';
import iphone13 from 'src/assets/img/icons/iphone13.jpeg';
import { useHistory } from 'react-router-dom';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';

export default function Item({ data }) {
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
        background: '#FFFFFF',
        boxShadow: '0px 0px 8px rgba(146, 146, 146, 0.25)',
        borderRadius: '8px',
        width: '93%',
        height: '145px'
        // overflow: 'auto'
      }}
      // onClick={() =>
      //   history.push({
      //     pathname: '/club/receivedItem',
      //     state: data
      //   })
      // }
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
          height: '85px'
          // borderBottom: '0.5px solid #D3D2D2',
          // marginBottom: '6px'
        }}
      >
        <InputLabelHeader
          style={{ color: '#00346D', fontSize: '16px', fontWeight: 500 }}
        >
          {data?.match?.name}
        </InputLabelHeader>
        <InputLabel style={{ color: '26px', fontSize: '14px' }}>
          {data?.match?.description}
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
        >{`پایان: ${data?.match?.end_date}`}</InputLabel>
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
          onClick={() => {
            history.push({
              pathname: '/club/competitionDetails',
              state: data
            });
          }}
        >
          مشاهده
          <ChevronLeft color="#00AAB5" height={'15px'} />
        </Box>
      </Box>
    </Box>
  );
}
