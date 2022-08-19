import React from 'react';
import { IconButton, SvgIcon, Tooltip } from '@mui/material';
import { Home as HomeIcon } from 'react-feather';
import IconBottom from 'src/components/Mobile/Icon/IconBottom';
import PresentIcon from 'src/assets/img/icons/presents.svg';

export default function Awards() {
  return (
    <Tooltip title="Home">
      <IconButton
        sx={{
          width: '48px',
          height: '44px',
          margin: '0px 5px'
        }}
      >
        <IconBottom src={PresentIcon} alt="جوایز" />
      </IconButton>
    </Tooltip>
  );
}
