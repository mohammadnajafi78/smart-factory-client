import React, { useState } from 'react';
import { Box } from '@mui/material';
// import ReceivedListDesktop from './ReceivedList';
import Competition from 'src/assets/img/icons/competition.svg';
import CompetitionListDesktop from './CompetitionList';
import NewCompetitionDesktop from '../NewCompetition/Desktop';
import CompetitionDetailsDesktop from '../CompetitionDetails/Desktop';
// import ReceivedItemDesktop from '../ReceivedItem/Desktop';

export default function CompetitionDesktop() {
  const [selected, setSelected] = useState(null);
  const [newCompetition, setNewCompetition] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          width: '40%',
          paddingLeft: '130px',
          justifyContent: 'center',
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Box sx={{ width: '100%', padding: '40px 30px 0px' }}>
          <CompetitionListDesktop
            selected={selected}
            setSelected={setSelected}
            setNewCompetition={setNewCompetition}
          />
        </Box>
      </Box>
      <Box
        sx={{
          flex: '1 1 auto',
          width: '50%',
          backgroundColor: 'white',
          paddingTop: '50px',
          overflow: 'auto'
        }}
      >
        {newCompetition ? (
          <NewCompetitionDesktop />
        ) : selected ? (
          <CompetitionDetailsDesktop />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              pt: 20,
              gap: '60px'
            }}
          >
            <img src={Competition} width="90px" height="90px" />
            <p>جهت مشاهده جزئیات مسابقه، روی آن کلیک کنید</p>
          </Box>
        )}
      </Box>
    </div>
  );
}
