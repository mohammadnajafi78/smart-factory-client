import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import FilterButton from 'src/components/Mobile/Button/Filter';
import ReceivedItem from './Item';
import { useHistory } from 'react-router-dom';
import Scan from 'src/assets/img/icons/scan-qr.svg';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

export default function ReceivedMobile() {
  const history = useHistory();
  const [received, setReceived] = useState(null);
  useEffect(() => {
    httpService.get(`${API_BASE_URL}/api/club/user_gifts/`).then(res => {
      if (res.status === 200) {
        setReceived(res.data);
      }
    });
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px 0px 60px',
          gap: '14px',
          // height: '1000px',
          overflowY: 'auto'
        }}
      >
        {received &&
          received.map((item, index) => {
            return <ReceivedItem data={item} key={index} />;
          })}
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: '9%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: 'white',
          height: '78px',
          padding: '10px'
        }}
      >
        <ConfirmButton
          style={{ margin: '0px 10px', backgroundColor: '#00346D' }}
        >
          <img src={Scan} style={{ marginLeft: '3px' }} />
          دریافت جایزه
        </ConfirmButton>
      </Box>
    </div>
  );
}
