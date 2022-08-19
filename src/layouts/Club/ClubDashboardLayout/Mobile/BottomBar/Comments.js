import React from 'react';
import { IconButton, SvgIcon, Tooltip } from '@mui/material';
import { Home as HomeIcon } from 'react-feather';
import IconBottom from 'src/components/Mobile/Icon/IconBottom';
import CommentIcon from 'src/assets/img/icons/comment.svg';

export default function Comments() {
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
        <IconBottom src={CommentIcon} alt={'نظرات'} />
      </IconButton>
    </Tooltip>
  );
}
