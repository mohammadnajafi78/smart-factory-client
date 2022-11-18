import React from 'react';
import { IconButton, SvgIcon, Tooltip } from '@mui/material';
import { Home as HomeIcon } from 'react-feather';
import CompetitionIcon from 'src/assets/img/icons/competition.svg';
import Icon from 'src/components/Mobile/Icon';
import IconBottom from 'src/components/Mobile/Icon/IconBottom';

export default function Competition() {
  return (
    <Tooltip title="Home">
      <IconButton
        size="large"
        sx={{
          width: '48px',
          height: '44px',
          margin: '0px 5px'
        }}
      >
        <IconBottom src={CompetitionIcon} alt="مسابقه" />
      </IconButton>
    </Tooltip>
  );
}
