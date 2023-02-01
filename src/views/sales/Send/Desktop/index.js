import React, { useState } from 'react';
import { Box } from '@mui/material';
// import GetReceived from '../GetReceived';
// import Received from './ReceivedBox';
// import ReceivedList from './ReceivedList';
// import Present from 'src/assets/img/icons/present.svg';
import SendTable from './Table';

export default function ReceivedDesktop() {
  const [selected, setSelected] = useState(null);

  return (
    <div
      style={{
        marginTop: '80px',
        marginRight: '130px',
        width: '100%',
        padding: '10px 30px'
      }}
    >
      <SendTable />
    </div>
  );
}
