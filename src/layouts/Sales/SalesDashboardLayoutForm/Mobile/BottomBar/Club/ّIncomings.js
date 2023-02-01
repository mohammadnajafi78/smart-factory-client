import React from 'react';
import { IconButton, SvgIcon, Tooltip } from '@mui/material';
import { Home as HomeIcon } from 'react-feather';
import IconBottom from 'src/components/Mobile/Icon/IconBottom';
import ReceivedIcon from 'src/assets/img/icons/received.svg';

export default function Incomings() {
  return (
    <Tooltip title="Home">
      <IconButton
        // onClick={handleClick}
        // ref={ref}
        size="large"
        sx={{
          width: '48px',
          height: '44px',
          margin: '0px 5px'
        }}
      >
        <IconBottom src={ReceivedIcon} alt="دریافتی ها" />
      </IconButton>
    </Tooltip>
  );
}
