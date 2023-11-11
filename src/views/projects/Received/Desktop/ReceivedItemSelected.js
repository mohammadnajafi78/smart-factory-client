import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import ReceivedDetailDesktop from '../ReceivedDetail/Desktop';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function ReceivedItemSelected({
  selected,
  setRefresh,
  type,
  typeName
}) {
  const [open, setOpen] = useState(false);
  const [qr, setQr] = useState(null);
  const classes = useStyles();

  return (
    <>
      <ReceivedDetailDesktop data={selected} type={type} typeName={typeName} />
    </>
  );
}
