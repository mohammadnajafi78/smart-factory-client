import React, { useState } from 'react';
import { Box } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import IconButton from 'src/components/Desktop/Button/Icon';
import Received from 'src/assets/img/icons/received.svg';
import makeStyles from '@mui/styles/makeStyles';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import QRCode from 'react-qr-code';
import ProjectDetailDesktop from '../ProjectDetail/Desktop';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function ProjectItemSelected({ selected, setRefresh }) {
  const [open, setOpen] = useState(false);
  const [qr, setQr] = useState(null);
  const classes = useStyles();
  console.log('selected', selected);

  return (
    <>
      <ProjectDetailDesktop data={selected} />
    </>
  );
}
