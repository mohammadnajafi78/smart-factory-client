import { Box } from '@mui/material';
import React from 'react';
import InputLabel from 'src/components/Mobile/InputLabel';
import ScoreIcon from 'src/assets/img/icons/score.svg';
import Icon from 'src/components/Mobile/Icon';
import UserClub from 'src/utils/userClub';
export default function Score() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: '4px',

        width: '105px',
        height: '49px',

        background: '#FFFFFF',
        boxShadow: '1px 1px 6px rgba(201, 201, 201, 0.25)',
        borderRadius: '6px',

        /* Inside auto layout */

        flex: 'none',
        // order: 2,
        flexGrow: 1
      }}
    >
      <Box
        sx={{
          /* Auto layout */

          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '8px 10px',
          gap: '5px',

          width: '123px',
          height: '41px',

          /* Teal-Navi */

          background:
            'linear-gradient(90.02deg, #00AAB5 99.98%, #00346D 99.99%)!important',
          borderRadius: '5px 0px 0px 5px',

          /* Inside auto layout */

          flex: 'none',
          order: 0,
          flexGrow: 0
        }}
      >
        <Icon src={ScoreIcon} style={{ width: '16px', height: '16px' }} />
        <InputLabel style={{ color: 'white', fontSize: '12px' }}>
          {UserClub()}
        </InputLabel>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '5px 12px',
          gap: '5px',

          width: '54px',
          height: '41px',

          background: '#ECECEC',
          borderRadius: '5px 0px 0px 5px',

          /* Inside auto layout */

          flex: 'none',
          order: 1,
          alignSelf: 'stretch',
          flexGrow: 1
        }}
      ></Box>
    </Box>
  );
}
