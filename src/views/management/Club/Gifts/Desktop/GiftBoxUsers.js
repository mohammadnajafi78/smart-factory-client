import React from 'react';
import { Box } from '@mui/material';
import GiftBoxReceiverTable from './GiftBoxReceiverTable';

export default function GiftBoxUsers(props) {
  return (
    <Box>
      <GiftBoxReceiverTable {...props} />
    </Box>
  );
}
